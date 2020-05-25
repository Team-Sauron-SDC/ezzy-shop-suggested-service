const { Sequelize, DataTypes } = require('sequelize');
const { Pool } = require('pg');

const pgProduct = new Pool({
  user: 'hieuho',
  host: 'localhost',
  database: 'mydb',
  password: 'pass',
  port: 5432,
});

const sequelize = new Sequelize('mydb', 'hieuho', 'pass', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    freezeTableName: true,
  },
});

const Product = sequelize.define('products', {
  shopID: { type: DataTypes.INTEGER, primaryKey: true },
  shopName: { type: DataTypes.STRING },
  shopDate: { type: DataTypes.STRING },
  shopSales: { type: DataTypes.INTEGER },
  shopLoc: { type: DataTypes.STRING },
  shopURL: { type: DataTypes.STRING },
  shopItems: { type: DataTypes.INTEGER },
  productID: { type: DataTypes.INTEGER },
  productName: { type: DataTypes.STRING },
  productPrice: { type: DataTypes.STRING },
  productShipping: { type: DataTypes.STRING },
  productURL: { type: DataTypes.STRING },
}, { timestamps: false });

const doAll = () => Product.sync()
  .then(() => pgProduct.query("COPY products FROM '/home/hieuho/Hack Reactor/sdc/suggested-module/data.csv' DELIMITER ',' CSV HEADER"))
  .then(() => console.log('PostgreSQL ready for actions!'))
  .catch((err) => console.log('Connection or Seeding Error', err));

const getShop = (id) => Product.findAll({ where: { shopID: id } });
const get8 = (id) => Product.findAll({ attributes: ['productName', 'productPrice', 'productShipping', 'productURL'], where: { shopID: id } });
const getSuggested = (id) => Product.findAll({ attributes: ['shopName', 'productName', 'productPrice', 'productShipping', 'productURL'], where: { shopID: id } });

const createShop = (product) => Product.create(product);
const updateShop = (product) => Product.update(product.info, { where: { shopID: product.id } });
const deleteShop = (id) => Product.destroy({ where: { shopID: id } });

module.exports = {
  doAll,
  getShop,
  get8,
  getSuggested,
  createShop,
  updateShop,
  deleteShop,
};
