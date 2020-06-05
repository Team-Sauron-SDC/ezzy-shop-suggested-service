const nr = require('newrelic');
const express = require('express');
const path = require('path');
const compression = require('compression');
const router = require('./template');
const postgres = require('../db/postgreSQL');

const app = express();
const port = 4000;

app.use(compression());
app.use('/', router);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.set('Cache-Control', 'public, max-age=31536000');
  next();
});
app.use(express.static(path.join(__dirname, '/dist')));
app.use('/:id', express.static('dist'));
app.use(express.json());
app.listen(port, () => {
  console.log(`PostgreSQL Server Listening on ${port}!`);
});

app.get('/products/:id', (req, res) => {
  const params = req.params.id.split(',').map(Number);
  let data;
  postgres.getShop(params)
    .then((result) => {
      data = result;
      const random8 = Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000));
      return postgres.get8(random8);
    })
    .then((result) => {
      data = data.concat([result]);
      res.set('Cache-Control', 'public, max-age=31536000');
      res.send(data);
    })
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.parent.code}`))
    .finally(() => res.end());
});

app.get('/get/random', (req, res) => {
  const suggested = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000));
  postgres.getSuggested(suggested)
    .then((result) => {
      res.set('Cache-Control', 'public, max-age=31536000');
      res.send(result);
    })
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.parent.code}`))
    .finally(() => res.end());
});

app.post('/products/:id', (req, res) => {
  const newShop = req.body;
  postgres.createShop(newShop)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.parent.code}`))
    .finally(() => res.end());
});

app.patch('/products/:id', (req, res) => {
  const { shopID, ...rest } = req.body;
  const params = { info: rest, id: req.body.shopID };
  postgres.updateShop(params)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.parent.code}`))
    .finally(() => res.end());
});

app.delete('/products/:id', (req, res) => {
  const params = req.params.id;
  postgres.deleteShop(params)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.parent.code}`))
    .finally(() => res.end());
});
