import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "./root.css"
import NavBar from "../ui_components/nav_bar/navBar";

const _nav = [
  {
    name:"Products",
    icon:"production_quantity_limits",
    href:"#",
    isLoad:false,
    sub: [
      {
        name:"Add Products",
        href: "/products/add",
        isLoad:false,
        sub: null
      },
      {
        name:"List Products",
        href: "/products/view",
        isLoad:false,
        sub: null,
      }
    ]
  },
  {
    name:"Clients",
    icon:"supervised_user_circle",
    href:"#",
    isLoad:false,
    sub: [
      {
        name:"Add Clients",
        href: "/clients/add",
        isLoad:false,
        sub: null,
      },
      {
        name:"List Clients",
        href: "/clients/view",
        isLoad:false,
        sub: null,
      }
    ]
  },
  {
    name:"Add buys",
    icon:"file_open",
    href:"/buy/add",
    isLoad:false,
    sub: null,
  },
  {
    name:"View bills",
    icon:"view_timeline",
    href:"/bill/view",
    isLoad:true,
    sub: null,
  }
]

export default function Root() {
  
  const [click, setClick] = useState(false);
  
  const menuClick = (event) => {
    
    const sidebar = document.querySelector(".sidebar");
    const layout = document.querySelector(".layout");
    
    if(!click) {
      event.target.style.transform = "rotate3d(0, 0, 1, 90deg)";
      event.target.style.display = "flex";
      event.target.style.justifyContent = "center";
      event.target.style.alignItems = "center";
   
      layout.style.gridTemplateColumns = "150px 1fr";
      layout.style.gridTemplateRows = "100vh";
      layout.style.gridTemplateAreas = '"sidebar mainLayout"';
  
      sidebar.style.display = "block"
    }
    else {
      event.target.style.transform = "rotate3d(0, 0, 1, 0deg)";
      
      layout.style.gridTemplateColumns = "1fr";
      layout.style.gridTemplateAreas = '"mainLayout"';
  
      sidebar.style.display = "none"
    }
    
    setClick(!click);
 }

  return (
    <div class="layout">
     
      <aside class="sidebar">
        
        <div class="sidebar-header">
          <div class="pro-sidebar-logo">
            <div>B.E</div>
            <h5>Store BE</h5>
          </div>
        </div>
        
        <div class="sidebar-content">
          < NavBar nav={_nav} />
        </div>
      
      </aside>
        
      <main class="main-layout"> 
        <div id="menu-burguer" onClick={menuClick} >
           <span class="material-symbols-rounded">menu</span>
        </div>
        <Outlet />
      </main>
 
    </div>
  );
}