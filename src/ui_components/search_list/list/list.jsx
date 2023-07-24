import "./list.css";
import { useState } from 'react';

export default function List({ items, onRemoveItem }) {
  let totalprice = 0;
  return (
   <div className="container-ul-list" >
      <ul className="ul-List" >
        <li className="li-List" >
          <div className="container-item-list" >
           <div><label className="label-cib-list" > Name </label></div>
           <div><label className="label-price-cib-list" > Price </label></div>
           <div className="last-child" ><label className="label-price-cib-list" > Remove </label></div>
          </div>
        </li>
        {items?.map(item => {
        
        totalprice += item.price;
        return (
          <li key={item.key} className="li-List" >
            <Item
              item={item}
              onRemoveItem={onRemoveItem}
            />
          </li>
        )})}
      </ul>
      <label className="label-total-price-list" >total price: {totalprice.toFixed(2)}</label>
    </div>
  );
}
  
function Item({ item, onRemoveItem }) {
  return (
    <div className="container-item-button-list" >
      <div>
        <label className="label-cib-list" >
          {item.name} 
        </label>
      </div>
      <div>
        <label className="label-price-cib-list" >
          {item.price} 
        </label>
      </div>
      <button type="button" className="button-cib-list" 
      onClick={ () => onRemoveItem(item.key) }>
        remove
      </button>
    </div>
  );
}
