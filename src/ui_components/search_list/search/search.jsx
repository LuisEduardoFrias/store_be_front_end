import "./search.css";
import { useState } from 'react';

export default function Search({ onAddItem }) {

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
          placeholder="search items"        
          onChange={event => {

          const ul = document.querySelector(".ul-search");
          
          ul.childNodes?.forEach(e => ul.removeChild(e));
          
          const arr = array.filter(i => i.name.search(event.target.value) !== -1 );

          if(event.target.value !== "" ) {
            ul.style.display = "block"
          }
          else {
            ul.style.display = "none"
          }
          
          arr.forEach(e => {
          
            const a = document.createElement("a");
            const li = document.createElement("li");
            
            a.setAttribute("id", e.key);
            a.setAttribute("href", "#");
            a.setAttribute("class", "a-search");
            a.innerHTML = e.name;
            a.addEventListener("dblclick", event => {
              onAddItem({key:e.key, price:e.price, name:e.name})
              document.querySelector(".input-search").focus();
            })
            
            li.appendChild(a);
            li.setAttribute("class", "li-search")
            ul.appendChild(li);
            
          })
          
          }}  />
          
        <ul className="ul-search" >
        </ul>
      </div>
    </div>
  )
}

const array= [
{key:"8468e24b-93a0-4c7e-bfa0-5a6da48f15b0", price: 100, price:90.99, name:"Salami"},
{key:"aa3e0570-b1dc-4f48-a532-f07a07976b2e", price: 120.95, price:90.99, name:"Queso"},
{key:"65bcc582-9db7-4099-8093-143fb87c47e6", price:75.95, price:90.99, name:"Jamon"},
{key:"2a66b754-786f-400d-9ec3-1366cbc1924c", price: 90.55, price:90.99, name:"Peperoni"},
{key:"c8b215d5-e38f-4724-b746-a16300bfbaba", price:80, price:90.99, name:"Tocinetas"},
/* {key:"6", price:90.99, name:"queso danez"},
{key:"7", price:90.99, name:"salami induveca espcia"},
{key:"8", price:90.99, name:"salami induveca estelar"},
{key:"9", price:90.99, name:"jamon induveca"},
{key:"10", price:90.99, name:"jamon de bavo"},
{key:"11", price:90.99, name:"salami de pollo"},
{key:"12", price:90.99, name:"salchichas sozua"},
{key:"13", price:90.99, name:"quesadilla"},
{key:"14", price:90.99, name:"jabon"},
{key:"15", price:90.99, name:"salmon"},
{key:"16", price:90.99, name:"pepinillos"},
{key:"17", price:90.99, name:"jamoneta"},
{key:"18", price:90.99, name:"verenjena"},
{key:"19", price:90.99, name:"veron"},
{key:"20", price:90.99, name:"salsa"},
{key:"21", price:90.99, name:"salami de cerdo"},
{key:"22", price:90.99, name:"tomates"},
{key:"23", price:90.99, name:"tomates varcelo"},
{key:"24", price:90.99, name:"jamon cerrano"},
{key:"25", price:90.99, name:"queso blanco"},
{key:"26", price:90.99, name:"queso en porvo sosua"},
{key:"27", price:90.99, name:"queso de hoja"},
{key:"28", price:90.99, name:"pan"},
{key:"29", price:90.99, name:"pan frances"},
{key:"30", price:90.99, name:"carne de cerso"},
{key:"31", price:90.99, name:"cerne de res"},
{key:"32", price:90.99, name:"carne de res #7"},
{key:"33", price:90.99, name:"pollo"},
{key:"34", price:90.99, name:"alitas de pollo"},
{key:"35", price:90.99, name:"lata de guandules"},
{key:"36", price:90.99, name:"lata de habichuela rojas"},
{key:"37", price:90.99, name:"lata de habichuela negras"},
{key:"38", price:90.99, name:"lata de habichuela blanca"},
{key:"39", price:90.99, name:"lata de alvejas"},
{key:"40", price:90.99, name:"lata de maiz"},
{key:"41", price:90.99, name:"tomate en latas"},
{key:"42", price:90.99, name:"lata de vegetales"}, */
  ]