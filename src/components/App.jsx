import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ShopInfo from './ShopInfo.jsx';
import ShopItems from './ShopItems.jsx';
import Suggested from './Suggested.jsx';
import Footer from './Footer.jsx';

function App() {

  const obj = [];
  for (let i = 0; i < 8; i ++) {
    obj.push({productID: 1, productName: "Loading...", productPrice: "Loading...", productShipping: "Loading...", shopID: 1, productURL: "Loading..."});
  }

  const [shopInfoData, updateShopInfoData] = useState('test')
  const [randomItems, updateRandomItems] = useState(obj);

  function getRequest() {
    const path = window.location.pathname;
    let id;
    if (path[2] === '/') {
      id = window.location.pathname.slice(1, 2);
    } else if (path[3] === '/') {
      id = window.location.pathname.slice(1, 3);
    } else {
      id = window.location.pathname.slice(1, 4);
    }

    $.ajax({
      context: this,
      method: 'GET',
      url: `/products/${id}`,
      success: function(result) {
        console.log('result: ', result);
        var products = result[0];
        var shops = result[0];
        var randomItems = result[1];
        updateBasicInfo(products, shops, randomItems);
      },
      error: function(err) {
        console.log('There was an error getting data from express server: ', err);
      }
    });
  }

  useEffect(() => {
    getRequest();
  }, [shopInfoData]);

  function updateBasicInfo(products, shops, randomProductItems) {
    updateShopInfoData({
      productsName: products.productName,
      imgUrl: products.productURL,
      shopName: shops.shopName,
      date: shops.shopDate.substring(12, 16),
      sales: shops.shopSales,
      location: shops.shopLoc,
      profileImgUrl: shops.shopURL,
      numOfItems: shops.shopItems
    });
    updateRandomItems(randomProductItems);
  }

  return (
    <div className="joseph-wrapper">
      <img className="joseph-topImg" src="https://imgforfec.s3.us-east-2.amazonaws.com/bettershmetsy.png" />
      <div className="joseph-shop">
        <ShopInfo data={shopInfoData} />
        <ShopItems data={randomItems} />
      </div>
      <div className="joseph-alsoLike">
        <h1>You may also like</h1>
        <span className="joseph-shopMore">Shop more similar items <i className="fa fa-arrow-right joseph-rightArrow"></i></span>
      </div>
      <div className="joseph-suggested">
        <Suggested />
      </div>
      <h1 className="joseph-popular">Popular right now</h1>
      <div className="joseph-suggested">
        <Suggested />
      </div>
      <Footer />
    </div>
  );

}

export default App;
