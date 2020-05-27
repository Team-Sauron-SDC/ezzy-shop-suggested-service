const faker = require('faker');

const getRandomPage = (userContext, events, done) => {
  const id = faker.random.number({ min: 1, max: 10000000 });
  userContext.vars.id = id;
  return done();
};

const randomImg = () => {
  const id = Math.floor(Math.random() * 1000);
  return `https://i.picsum.photos/id/${id}/300/300.jpg`;
};

const randomDataGen = (userContext, events, done) => {
  const shopID = faker.random.number({ min: 10000001, max: 200000000 });
  const shopName = faker.company.companyName(0);
  const shopDate = faker.date.recent().toString();
  const shopSales = faker.random.number(50000);
  const shopLoc = faker.address.city();
  const shopURL = faker.image.avatar();
  const shopItems = faker.random.number(1000);
  const productID = shopID;
  const productName = faker.commerce.productName();
  const productPrice = faker.commerce.price();
  const productShipping = faker.random.boolean() ? 'FREE Shipping' : 'Free Shipping Eligible';
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
};
