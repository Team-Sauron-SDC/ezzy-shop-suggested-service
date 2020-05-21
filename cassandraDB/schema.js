const cassandra = require('cassandra-driver');
const faker = require('faker');

const tempClient = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'system' });

const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'sauron_sdc' });

const connect = () => tempClient.connect()
  .then(() => {
    const create = "CREATE KEYSPACE IF NOT EXISTS sauron_sdc WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' }AND DURABLE_WRITES =  true;";
    return tempClient.execute(create);
  })
  .then(() => {
    client.connect((err) => (err ? console.log('There was an ERROR', err) : console.log('Connected to Cassandra!')));
  })
  .then(() => {
    const createTable = 'CREATE TABLE IF NOT EXISTS sauron_sdc.products_by_shop (shopID int, shopName text, shopDate text, shopSales int, shopLoc text, shopURL text, shopItems int, productID int, productName text, productPrice int, productShipping text, productUrl text, PRIMARY KEY(shopID, productID))';

    return client.execute(createTable);
  })
  // .then(() => {
  //   const createTable = 'CREATE TABLE IF NOT EXISTS sauron_sdc.shops_by_id (id int PRIMARY KEY, name text, date text, sales int, location text, url text, items int)';
  //   return client.execute(createTable);
  // })
  .then(() => client.metadata.getTable('sauron_sdc', 'products_by_shop'))
  .then((results) => console.log('metaData1', results))
  // .then(() => client.metadata.getTable('sauron_sdc', 'shops_by_id'))
  // .then((results) => console.log('metaData2', results))
  .catch((err) => console.log('Connection ERROR', err));

// cosnt seed = () => {
//   let id = 1;

// }

// const finally = (async () => {
//   await connect()
//   await seed()
// })

connect();
