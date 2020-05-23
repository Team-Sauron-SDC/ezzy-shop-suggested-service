const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mydb', 'hieuho', 'pass', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    freezeTableName: true,
  },
});

try {
  sequelize.authenticate();
  console.log('success');
} catch (err) {
  console.err('errr', err);
}

const Product = sequelize.define('mydb', {
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

Product.sync({ alter: true });

console.log('asdasda', Product.count());

Product.count({})
  .then((res) => console.log(res))
  .catch((err) => console.log('err', err));

// COPY products_by_shop FROM '/home/hieuho/Hack Reactor/sdc/suggested-module/data.csv'DELIMITER ',' CSV HEADER
