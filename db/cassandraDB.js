const cassandra = require('cassandra-driver');
const path = require('path');

const dataPath = path.join(__dirname, 'data.csv');

const tempClient = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'system' });
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'sauron_sdc' });

const connectAndCreate = () => tempClient.connect()
  .then(() => {
    const create = "CREATE KEYSPACE IF NOT EXISTS sauron_sdc WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' }AND DURABLE_WRITES =  true;";
    return tempClient.execute(create);
  })
  .then(() => client.connect())
  .then(() => {
    console.log('Connected to Cassandra!');
    const createTable = 'CREATE TABLE IF NOT EXISTS sauron_sdc.products_by_shop ("shopID" int, "shopName" text, "shopDate" text, "shopSales" int, "shopLoc" text, "shopURL" text, "shopItems" int, "productID" int, "productName" text, "productPrice" text, "productShipping" text, "productURL" text, PRIMARY KEY("shopID", "productID")) WITH CLUSTERING ORDER BY ("productID" ASC);';

    return client.execute(createTable);
  })
  .catch((err) => console.log('Cannot Connect to Cassandra!', err));

const save = () => {
  const query = `COPY sauron_sdc.products_by_shop ("shopID", "shopName", "shopDate", "shopSales", "shopLoc", "shopURL", "shopItems", "productID", "productName", "productPrice", "productShipping", "productURL") FROM '${dataPath}' WITH header=true AND delimiter=',';`;
  client.execute(query);
  console.log('Copy to Cassandra Completed!');
};

const doAll = () => connectAndCreate()
  // .then(() => save()) // COPY is a command of the shell cqlsh. COPY does not exist in standard syntax.
  .then(() => console.log('Cassandra ready for actions!'))
  .catch((err) => console.log('Connection or Seeding Error!', err));

doAll();

const getShop = (id) => client.execute(`SELECT * FROM sauron_sdc.products_by_shop WHERE "shopID" IN (${id})`);

const get8 = (id) => client.execute(`SELECT "productName", "productPrice", "productShipping", "productURL" FROM sauron_sdc.products_by_shop WHERE "shopID" IN (${id})`);

const getSuggested = (id) => client.execute(`SELECT "shopName", "productName", "productPrice", "productShipping", "productURL" FROM sauron_sdc.products_by_shop WHERE "shopID" IN (${id})`);

const createShop = (data) => client.execute(`INSERT INTO sauron_sdc.products_by_shop ("shopID", "shopName", "shopDate", "shopSales", "shopLoc", "shopURL", "shopItems", "productID", "productName", "productPrice", "productShipping", "productURL") VALUES (${data[0]}, '${data[1]}', '${data[2]}', ${data[3]}, '${data[4]}', '${data[5]}', ${data[6]}, ${data[7]}, '${data[8]}', '${data[9]}', '${data[10]}', '${data[11]}')`);


module.exports = {
  doAll,
  getShop,
  get8,
  getSuggested,
  createShop,
};
