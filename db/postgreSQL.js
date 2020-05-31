const { Sequelize, DataTypes } = require('sequelize');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const dataPath = path.join(__dirname, 'data.csv');

const pgProduct = new Pool({
  user: process.env.POST_USER,
  host: process.env.POST_HOST,
  database: process.env.POST_DB,
  password: process.env.POST_PASS,
  port: process.env.POST_PORT,
});

const sequelize = new Sequelize(process.env.POST_DB, process.env.POST_USER, process.env.POST_PASS, {
  host: process.env.POST_HOST,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
  },
  logging: false,
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
  .then(() => pgProduct.query(`COPY products FROM '${dataPath}' DELIMITER ',' CSV HEADER`))
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
