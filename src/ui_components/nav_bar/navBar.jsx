import { Link } from "react-router-dom";
import "./navBar.css";

export default function NavBar(props) {

const openSubMenu = (classElement) => {

  if(classElement) {
  const ele = document.querySelector(`#${classElement}`);
  const icon = document.querySelector(`#icon-${classElement}`);
  
  
  ele.style.display !== "none" ?
  icon.innerHTML = "chevron_right" :
  icon.innerHTML = "expand_more";
  
  ele.style.display === "none" ?
  ele.style.display = "block" :
  closeSubMenu(classElement);
  }
}

const closeSubMenu = (classElement) => {

  if(classElement) {
  const ele = document.querySelector(`#${classElement}`);
  
  ele.style.display = "none";
  }
}

const a = (nav, subMenuList) => {
    return (
    <li className="menu-item li-item" onClick={event => closeSubMenu(subMenuList)} >
      <a href={nav.href} className={ nav.icon ? "links" : "link-item" }>
        { nav.icon ? 
        <span className="menu-icon">
          <span className="material-symbols-rounded">{nav.icon}</span>
        </span>    
        : null }
        <span className="menu-title">{nav.name}</span>
      </a>
    </li>)
}

const link = (nav, subMenuList) => {
  return (
  <li className="menu-item li-item" onClick={event => closeSubMenu(subMenuList)} >
    <Link to={nav.href} className={ nav.icon ? "links" : "link-item" }>
      { nav.icon ? 
      <span className="menu-icon">
        <span className="material-symbols-rounded">{nav.icon}</span>
      </span>    
      : null }
      <span className="menu-title">{nav.name}</span>
    </Link>
  </li>)
}

const li = (nav, subMenuList) => {
  return nav.isLoad ? a(nav, subMenuList) : link(nav, subMenuList);
}

const li_ul = (nav,index) => {

 const subMenuList = 
    `sub-menu-${nav.name}-${index}`.replace(/\s+/g, '')  
 
  return( 
  <li className="menu-item" >
  
    <div className="first-option-menu" onClick={event => openSubMenu(subMenuList)} >
    
      <div className="container-tittle-icon" >
      
        { nav.icon ? 
          <span className="menu-icon">
            <span className="material-symbols-rounded">{nav.icon}</span>
          </span>    
        : null }
        
        <span className="menu-title" >{nav.name}</span>
      </div>
      
      <span id={`icon-${subMenuList}`} className="material-symbols-rounded" >chevron_right</span>
      
    </div>
    
    <div style={{display:"none"}} id={subMenuList} className="sub-menu-list slide-rotate-ver-left">
      <ul className="secondari-list" >
        { nav.sub.map((ele, i)=> ele.sub ? li_ul(ele, i) : li(ele, subMenuList) )}
      </ul>
      
      <hr />
      
    </div>
    
  </li>)
}

  return (
    <nav className="contontainer-menu">
      <ul className="first-list">
        { props.nav.map((e,i) => e.sub ? li_ul(e,i) : li(e) )}
      </ul>
    </nav>
  )
}