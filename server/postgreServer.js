const nr = require('newrelic');
const express = require('express');
const path = require('path');
const postgres = require('../db/postgreSQL');

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, '/dist')));
app.use('/:id', express.static('dist'));
app.use(express.json());
app.listen(`${port}`, () => {
  console.log(`PostgreSQL Server Listening on ${port}!`);
});

app.get('/products/:id', (req, res) => {
  const params = req.params.id.split(',').map(Number);
  let data;
  postgres.getShop(params)
    .then((result) => {
      const random8 = Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000));
      return result + postgres.get8(random8);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.parent.code}`))
    .finally(() => res.end());
});

app.get('/get/random', (req, res) => {
  const suggested = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000));
  postgres.getSuggested(suggested)
    .then((result) => res.send(result))
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
