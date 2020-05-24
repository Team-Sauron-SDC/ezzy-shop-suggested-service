const express = require('express');
const path = require('path');
const postgres = require('../db/postgreSQL');

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.json());
app.listen(`${port}`, () => {
  console.log(`PostgreSQL Server Listening on ${port}!`);
});

app.get('/postgres/:id', (req, res) => {
  const params = req.params.id.split(',').map(Number);
  const data = [];
  return postgres.getShop(params)
    // .then((result) => data.push(result))
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(`${err.name}. Error Code: ${err.parent.code}`))
    .finally(() => res.end());
});
