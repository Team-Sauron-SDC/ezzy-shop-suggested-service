const cassandra = require('cassandra-driver');
const csvWriter = require('csv-write-stream');
const fs = require('fs');

const writer = csvWriter();
const faker = require('faker');

const tempClient = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'system' });

const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'sauron_sdc' });

const connectAndCreate = () => tempClient.connect()
  .then(() => {
    const create = "CREATE KEYSPACE IF NOT EXISTS sauron_sdc WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' }AND DURABLE_WRITES =  true;";
    return tempClient.execute(create);
  })
  .then(() => {
    client.connect((err) => (err ? console.log('There was an ERROR', err) : console.log('Connected to Cassandra!')));
  })
  .then(() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS sauron_sdc.products_by_shop (shopID int, shopName text, shopDate text, shopSales int, shopLoc text, shopURL text, shopItems int, productID int, productName text, productPrice text, productShipping text, productUrl text, PRIMARY KEY(shopID, productID))';

    return client.execute(createTable);
  })
  .catch((err) => console.log('Connection ERROR', err));

const seedDB = (id) => {
  const data = {
    shopID: id,
    shopName: faker.company.companyName(0),
    shopDate: faker.date.recent().toString(),
    shopSales: faker.random.number(50000),
    shopLoc: `${faker.address.city()}, ${faker.address.state()}`,
    shopURL: faker.image.avatar(),
    shopItems: faker.random.number(1000),
    productID: id,
    productName: faker.commerce.productName(),
    productPrice: faker.commerce.price(),
    productShipping: faker.random.boolean() ? 'FREE Shipping' : 'Free Shipping Eligible',
    productURL: faker.image.cats(),
  };
  return data;
};

const save = () => {
  const query = 'COPY sauron_sdc.products_by_shop (shopID, shopName, shopDate, shopSales, shopLoc, shopURL, shopItems, productID, productName, productPrice, productShipping, productURL) FROM "./data.csv" WITH header=true AND delimiter=","';

  client.execute(query);
  console.log('copied');
};

const dataGen = () => {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let i = 0; i < 10000000; i += 1) {
    writer.write(seedDB(i));
  }
  writer.end();
  console.log('done');
};

const seed = async () => {
  await connectAndCreate();
  await dataGen();
};
// /home/hieuho/Hack Reactor/sdc/suggested-module/data.csv
seed();
