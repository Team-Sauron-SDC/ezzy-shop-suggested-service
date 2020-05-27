const express = require('express');
const path = require('path');
const cassandra = require('../db/cassandraDB');

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, '/dist')));
app.use('/:id', express.static('dist'));
app.use(express.json());
app.listen(`${port}`, () => {
  console.log(`Cassandra Server Listening on ${port}!`);
});

app.get('/products/:id', (req, res) => {
  const params = req.params.id;
  let data;
  cassandra.getShop(params)
    .then((result) => {
      data = result.rows;
      const random8 = Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000));
      return cassandra.get8(random8);
    })
    .then((result) => {
      data = data.concat([result.rows]);
      res.send(data);
    })
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.code}`))
    .finally(() => res.end());
});

app.get('/get/random', (req, res) => {
  const suggested = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000));
  cassandra.getSuggested(suggested)
    .then((result) => res.send(result.rows))
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.code}`))
    .finally(() => res.end());
});

app.post('/products/:id', (req, res) => {
  const params = Object.values(req.body);
  params.splice(0, 1, parseInt(params[0]));
  params.splice(3, 1, parseInt(params[3]));
  params.splice(6, 1, parseInt(params[6]));
  params.splice(7, 1, parseInt(params[7]));
  console.log('params: ', params);
  cassandra.create(params)
    .then((result) => res.send(result.rows))
    .catch((err) => res.status(500).send(err))
    .finally(() => res.end());
});
