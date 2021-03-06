const nr = require('newrelic');
const express = require('express');
const path = require('path');
const compression = require('compression');
const router = require('./template');
const postgres = require('../db/postgreSQL');
const redis = require('../db/redisCache');

const app = express();
const port = 4000;

app.use(compression());
app.use('/', router);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, max-age=31536000');
  } else {
    res.set('Cache-Control', 'no-store, no-cache, max-age=0');
  }
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
  redis.getProducts(`product${params}`, (err, docs) => {
    if (err) res.status(500).send(`There was an error: ${err}`);
    if (docs !== null) {
      const result = JSON.parse(docs);
      res.send(result);
      res.end();
    } else {
      postgres.getShop(params)
        .then((result) => {
          data = result;
          const random8 = Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000));
          return postgres.get8(random8);
        })
        .then((result) => {
          data = data.concat([result]);
          redis.insert(`product${params}`, JSON.stringify(data));
          res.send(data);
        })
        .catch((error) => res.status(500).send(`${error.name}. Error Code: ${error.parent.code}`))
        .finally(() => res.end());
    }
  });
});

app.get('/get/random', (req, res) => {
  const suggested = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000));
  postgres.getSuggested(suggested)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.parent.code}`))
    .finally(() => res.end());
});

app.get('/get/random2', (req, res) => {
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
