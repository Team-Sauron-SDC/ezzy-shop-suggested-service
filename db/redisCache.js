const Redis = require('ioredis');

const client = new Redis();

const insert = (id, data) => {
  client.set(id, data, 'EX', 1800)
    .catch((err) => console.log(err));
};

const getProducts = (id, cb) => {
  client.get(id, (err, docs) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, docs);
    }
  });
};

module.exports = {
  getProducts,
  insert,
};
