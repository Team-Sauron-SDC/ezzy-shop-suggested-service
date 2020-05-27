const faker = require('faker');

const getRandomPage = () => {
  const id = faker.random.number({ min: 1, max: 10000000 });
  return id;
};

module.exports = {
  getRandomPage,
};
