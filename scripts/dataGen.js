const fs = require('fs');
const faker = require('faker');

const start = new Date();
const writeData = fs.createWriteStream('data.csv');
writeData.write('shopID, shopName, shopDate, shopSales, shopLoc, shopURL, shopItems, productID, productName, productPrice, productShipping, productURL\n', 'utf8');

const randomImg = () => {
  const id = Math.floor(Math.random() * 1000);
  return `https://i.picsum.photos/id/${id}/300/300.jpg`;
};

const dataGen = (writer, encoding, callback) => {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const shopID = id;
      const shopName = faker.company.companyName(0);
      const shopDate = faker.date.recent().toString();
      const shopSales = faker.random.number(50000);
      const shopLoc = faker.address.city();
      const shopURL = faker.image.avatar();
      const shopItems = faker.random.number(1000);
      const productID = id;
      const productName = faker.commerce.productName();
      const productPrice = faker.commerce.price();
      const productShipping = faker.random.boolean() ? 'FREE Shipping' : 'Free Shipping Eligible';
      const productURL = randomImg();
      const data = `${shopID},${shopName},${shopDate},${shopSales},${shopLoc},${shopURL},${shopItems},${productID},${productName},${productPrice},${productShipping},${productURL}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  console.log(`Seeding Start at ${start.toUTCString()}`);
  write();
};

dataGen(writeData, 'utf-8', () => {
  writeData.end();
  const ending = new Date().getTime() - start.getTime();
  console.log(`Seeding Completed! It took: ${Math.floor(ending / 60000)}mins and ${((ending % 60000) / 1000).toFixed(0)}secs`);
});
