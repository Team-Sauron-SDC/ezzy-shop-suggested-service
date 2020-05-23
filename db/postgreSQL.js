const { Sequelize, DataTypes } = require('sequelize');
const { Pool } = require('pg');
const seed = require('../scripts/dataGen.js');

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
  .then(() => {
    seed.dataGen(seed.writeData, 'utf-8', () => {
      seed.writeData.end();
    });
  })
  .then(() => pgProduct.query("COPY products FROM '/home/hieuho/Hack Reactor/sdc/suggested-module/data.csv' DELIMITER ',' CSV HEADER"))
  .then(() => {
    const ending = new Date().getTime() - seed.start.getTime();
    return console.log(`Seeding Completed! It took: ${Math.floor(ending / 60000)}mins and ${((ending % 60000) / 1000).toFixed(0)}secs`);
  })
  .catch((err) => console.log('Connection or Seeding Error', err));

doAll();
