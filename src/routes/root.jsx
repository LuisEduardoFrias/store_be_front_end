import { Outlet, Link } from "react-router-dom";
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
        <div id="menu-burguer" >
           <span class="material-symbols-rounded">menu</span>
        </div>
        <Outlet />
      </main>
 
    </div>
  );
}