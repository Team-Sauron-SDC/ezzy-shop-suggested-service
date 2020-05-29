import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

function Suggested() {

  let counter = 1;
  const [suggestionItems, updateSuggestionItems] = useState([]);

  function get() {
    $.ajax({
      context: this,
      method: 'GET',
      url: '/get/random',
      success: function(result) {
        updateSuggestionItems(result);
      },
      error: function(err) {
        console.error('There was an error getting suggested items from database: ', err);
      }
    });
  }

  useEffect(() => {
    get();
  }, []);

  const suggestedNodes = suggestionItems.map( (item, i) => {
    return (
      <div className="joseph-suggestedItm" key={i}>
        <img src={item.productURL} />
        <p className="joseph-itemName" >{item.productName}</p>
        <div className="joseph-shopName-small">{item.shopName}</div>
        <div className="joseph-price">{item.productPrice}</div>
        <div className={item.productShipping === ' FREE Shipping' ? 'FREEshipping' : 'Freeshippingeligible'}>{item.productShipping}</div>
      </div>
    );
  });


  return (
    <div className="joseph-suggested">
      {suggestedNodes}
    </div>
  );
}

export default Suggested;