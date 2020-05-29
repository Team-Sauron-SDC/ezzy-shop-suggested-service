const faker = require('faker');

const getRandomPage = (userContext, events, done) => {
  const id = faker.random.number({ min: 9000000, max: 10000000 });
  userContext.vars.id = id;
  return done();
};

const randomImg = () => {
  const id = Math.floor(Math.random() * 1000);
  return `https://i.picsum.photos/id/${id}/300/300.jpg`;
};

const randomDataGen = (userContext, events, done) => {
  const shopID = faker.random.number({ min: 10000001, max: 200000000 });
  const shopName = 'HieuTest';
  const shopDate = 'May 22, 1995';
  const shopSales = 42;
  const shopLoc = 'Neo-Tokyo';
  const shopURL = faker.image.avatar();
  const shopItems = 99;
  const productID = shopID;
  const productName = 'Bubbles';
  const productPrice = '2.99';
  const productShipping = 'FREE Shipping';
  const productURL = randomImg();

  userContext.vars.shopID = shopID;
  userContext.vars.shopName = shopName;
  userContext.vars.shopDate = shopDate;
  userContext.vars.shopSales = shopSales;
  userContext.vars.shopLoc = shopLoc;
  userContext.vars.shopURL = shopURL;
  userContext.vars.shopItems = shopItems;
  userContext.vars.productID = productID;
  userContext.vars.productName = productName;
  userContext.vars.productPrice = productPrice;
  userContext.vars.productShipping = productShipping;
  userContext.vars.productURL = productURL;

  return done();
};
module.exports = {
  getRandomPage,
  randomDataGen,
};
