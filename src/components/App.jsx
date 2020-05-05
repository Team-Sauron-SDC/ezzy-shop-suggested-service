import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ShopInfo from './ShopInfo.jsx';
import ShopItems from './ShopItems.jsx';

function App() {

  const obj = [];
  for (let i = 0; i < 8; i ++) {
    obj.push({id: 1, name: "1", price: "1", shipping: "1", shop_id: 1, image_url: "1"});
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
        var products = JSON.parse(result[0]);
        var shops = JSON.parse(result[1]);
        var randomItems = JSON.parse(result[2]);
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
      productsName: products[0].name,
      imgUrl: products[0].image_url,
      shopName: shops[0].name,
      date: shops[0].date,
      sales: shops[0].sales,
      location: shops[0].location,
      profileImgUrl: shops[0].profile_img_url,
      numOfItems: shops[0].items
    });
    updateRandomItems(randomProductItems);
  }

  return (
    <div className="wrapper">
      <img className="topImg" src="https://imgforfec.s3.us-east-2.amazonaws.com/bettershemetsy.png" />
      <div className="shop">
        <ShopInfo data={shopInfoData} />
        <ShopItems data={randomItems} />
      </div>
    </div>
  );

}

export default App;
