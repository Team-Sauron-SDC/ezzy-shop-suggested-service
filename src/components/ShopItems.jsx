import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function ShopItems({ data }) {

  const items = data.map( (item, index) => {
    if (index < 8) {
      return (
        <div className="joseph-imgItem">
          <img src={item.productURL} />
          <div className="joseph-textWrapper">
            <p className="joseph-itemName">{item.productName}</p>
            <p className="joseph-price">{item.productPrice}</p>
            <p className={item.productShipping === ' FREE Shipping' ? 'FREEshipping' : 'Freeshippingeligible'}>{item.productShipping}</p>
          </div>
        </div>
      );
    }
  })

  return (
    <div className="joseph-imgContainer">
      {items}
    </div>
  );
}

export default ShopItems