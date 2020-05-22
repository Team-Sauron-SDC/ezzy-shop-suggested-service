const cassandra = require('cassandra-driver');
const seedDB = require('../scripts/dataGen');

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
  .catch((err) => console.log('Cannot Connect to Cassandra!', err));

// COPY is a command of the shell cqlsh. COPY does not exist in standard syntax.
/*
const save = () => {
  const query = 'COPY sauron_sdc.products_by_shop (shopID, shopName, shopDate, shopSales, shopLoc, shopURL, shopItems, productID, productName, productPrice, productShipping, productURL) FROM ? WITH header=true AND delimiter=?';
  const params = [' ', ','];
  client.execute(query, params);
  console.log('Copy to Cassandra Completed!');
};
*/

const seed = () => connectAndCreate()
  .then(() => {
    seedDB.dataGen(seedDB.writeData, 'utf-8', () => {
      seedDB.writeData.end();
      const ending = new Date().getTime() - seedDB.start.getTime();
      console.log(`Seeding Completed! It took: ${Math.floor(ending / 60000)}mins and ${((ending % 60000) / 1000).toFixed(0)}secs`);
    });
  })
  .catch((err) => console.log('Connection or Seeding Error!', err));

seed();
