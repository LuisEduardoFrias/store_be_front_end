import "./search.css";
import { useState } from 'react';
import { api } from '../../../callApi';

export default function Search({ onAddItem, placeholder }) {

  window.addEventListener("click", (event) => {
    const input = "input-search";
    const ul = "ul-search";
    const li = "li-search";
    const a = "a-search";

    if (
    event.target.getAttribute("class") !== input &&
    event.target.getAttribute("class") !== ul    &&
    event.target.getAttribute("class") !== li    &&
    event.target.getAttribute("class") !== a
    ) {
      
      document.querySelector(".input-search").value = "";
      document.querySelector(".ul-search").style.display = "none";
    }
  });
 
  return (
    <div className="container-search" >
      <div className="container-search-search" >
        <input
          className="input-search"
          placeholder={placeholder ?? "search items"}
          onChange={event => {

          const ul = document.querySelector(".ul-search");
          
          ul.childNodes?.forEach(e => ul.removeChild(e));
          
          api.get('/products', list => {
            
            if(!list.err) {
            
            if(event.target.value !== "" ) {
              ul.style.display = "block"
            }
            else {
              ul.style.display = "none"
            }
            
            list.data.map(i => i.Name
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1 && i)
            .filter(e => e !== false)
            .forEach(e => {
              const a = document.createElement("a");
              const li = document.createElement("li");
            
              a.setAttribute("href", "#");
              a.setAttribute("class", "a-search");
              a.innerHTML = e.Name;
              a.addEventListener("dblclick", event => {
                onAddItem({key:e.key, price:e.SalePrice, name:e.Name})
                document.querySelector(".input-search").focus();
              });
            
              li.appendChild(a);
              li.setAttribute("class", "li-search");
              ul.appendChild(li);
            
            });
            
            }
          });
          
          }}  />
          
        <ul className="ul-search" >
        </ul>
      </div>
    </div>
  )
}