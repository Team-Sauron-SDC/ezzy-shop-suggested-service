const express = require('express');
const path = require('path');
const cassandra = require('../db/cassandraDB');

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.json());
app.listen(`${port}`, () => {
  console.log(`Cassandra Server Listening on ${port}!`);
});

app.get('/cassandra/:id', (req, res) => {
  const params = req.params.id;
  return cassandra.getShop(params)
    .then((result) => res.send(result.rows))
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.code}`))
    .finally(() => res.end());
});
