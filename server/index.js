const express = require('express');
const path = require('path');
const api = require('./api.js');
const crud = require('./crud');

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, '/../dist')));
app.use('/:id', express.static('dist'));
app.use(express.json());
app.listen(`${port}`, () => {
  console.log(`Running on port ${port}!`);
});

app.get('/products/:id', (req, res, next) => {
  const data = [];
  api.get('products', req.params.id, (err, result) => {
    if (err) {
      console.log('There was an error getting products from database: ', err);
      next();
    } else {
      data.push(result);
      const shopId = JSON.parse(result)[0].shop_id;
      api.get('shops', shopId, (shopErr, shopResult) => {
        if (err) {
          console.error('There was an error getting shops from database: ', shopErr);
          next();
        } else {
          data.push(shopResult);
          let id;
          if (req.params.id < 20) {
            id = 1;
          } else if (req.params.id < 40) {
            id = 2;
          } else if (req.params.id < 60) {
            id = 3;
          } else if (req.params.id < 80) {
            id = 4;
          } else if (req.params.id >= 80) {
            id = 5;
          }
          api.get8Random(id, (randomErr, randomResult) => {
            if (randomErr) {
              console.error('There was an error getting 8 random photos from products: ', randomErr);
            } else {
              data.push(randomResult);
              res.send(data);
            }
          });
        }
      });
    }
  });
});

app.get('/get/random', (req, res) => {
  api.get6Random((err, result) => {
    if (err) {
      console.error(`There was an error getting 6 random from database: ${err}`);
    } else {
      res.send(result);
    }
  });
});

app.post('/products/', (req, res) => {
  const params = Object.values(req.body);
  crud.create(params, (err, result) => {
    if (err) {
      console.log('POST ERROR', err);
      res.status(500);
    } else {
      res.send(result);
    }
  });
});
app.get('/newproducts/:id', (req, res) => {
  const params = req.params.id;
  crud.read(params, (err, result) => {
    if (err) {
      res.status(500).send('GET ERROR', err);
    } else {
      res.send(result);
    }
  });
});
app.patch('/products/:id', (req, res) => {
  const params = Object.values(req.body);
  crud.update(params, (err, result) => {
    if (err) {
      res.status(500).send('UPDATE ERROR', err);
    } else {
      res.send(result);
    }
  });
});
app.delete('/products/:id', (req, res) => {
  const params = req.params.id;
  crud.delete(params, (err, result) => {
    if (err) {
      res.status(500).send('DELETE ERROR', err);
    } else {
      res.send(result);
    }
  });
});
