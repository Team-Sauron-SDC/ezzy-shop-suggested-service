const db = require('../db/index.js');

const crud = {
  create: (params, callback) => {
    db.query('INSERT INTO shops (name, date, sales, location, profile_img_url, items) VALUES (??)', params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, JSON.stringify(result));
      }
    });
  },
  read: (id, callback) => {
    db.query(`SELECT * FROM products WHERE shop_id = ${id}`, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, JSON.stringify(result));
      }
    });
  },
  update: (params, callback) => {
    db.query('UPDATE products SET name = ?, sales = ? WHERE shop_id = ?', params, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, JSON.stringify(result));
      }
    });
  },
  delete: (id, callback) => {
    db.query(`DELETE FROM shops WHERE shop_id = ${id}`, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, JSON.stringify(result));
      }
    });
  },
};

module.exports = crud;
