const Redis = require('ioredis');

const client = new Redis();

const getProducts = (id, cb) => {
  client.get(id, (err, docs) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, docs);
    }
  });
};

const insert = (id, data) => {
  client.set(id, data)
    .catch((err) => console.log(err));
};

// const getRandoms = (id, cb) => {

// };

module.exports = {
  getProducts,
  insert,
};
