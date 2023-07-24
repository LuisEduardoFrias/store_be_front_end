import SearchList from "../search_list/searchList";
import { useState, useEffect } from "react";
import LdDualRing from '../../ui_components/ld_dual_ring/ldDualRing';

export default function Form({ initState = {}, forms, tittle, textSubmit, submit } )
{

  const [ state, setState ] = useState({...initState, loader: false});
  
  //erace element of form
  useEffect(() => {
    if(Reflect.ownKeys(state).length === 1 && 
       Reflect.ownKeys(state)[0] === "loader") {
    
      eraceElement.forEach(e => {
        if(e.element === "input") {
          document.querySelector("." + e.className).value = "";
        }
        else if(e.element === "select") {
          document.querySelector("." + e.className).selectedIndex = 0;
        }
        else if(e.element === "radio") {
          document.querySelectorAll("." + e.className)
          .forEach(ele => ele.checked = false)
        }
      })
    }
    
  },[state])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const newState = state;
    Reflect.set(newState, name, value);
    setState(newState)
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()
    setState({...state, loader: true});
    submit(state, setState)
  }

  const getSelect = (title, options, _className) => 
  {
        
    const _options = [];
    
    for(const item in options)
    { 
      const ele = options[item];
      _options.push(<option value={ele.value}>{ele.text}</option>)
    }
        
    return(
      <div className="container-select" >
        <label for>{title}</label> 
        <select name={title} className={_className} onChange={handleChange} >
          <option>select {title}</option>
          {_options}
        </select>
      </div>
    )
 }

  const getFormItems = (item) =>
  {
    const eraceClassName = `${item?.itemName}-${eraceElement.length}`;
    const _className = `${item?.className} ${eraceClassName}`;
    
    eraceElement.push({element: item?.itemName, className: eraceClassName });
    
    const _switch = {
    
      input : (<div className="container-input" > <label for>
      {item?.title} </label> 
      <input
        type={item?.type}
         name={item?.name}
         value={item?.value}
         placeholder={item?.placeholder}
         className={_className}
         onChange={handleChange}
         readOnly={item?.readOnly} />
      </div>),
      
      select : getSelect(item.title, item.options, _className),
      
      radio : (
      <div>
        <p>{item?.title}</p>
        <div>
          { item?.radio?.forEach((ele, index) => { 
             <div>
              <input className={_className} onChange={handleChange}  type="radio" name={ele.name} value={ele.value} />
              <label for>{ele.text}</label>
            </div>
          }) }
        </div>
      </div>),
      
      search_list : ( <SearchList value={item.value} name={item.name} onChange={handleChange} />)
    }
    
    return _switch[item?.itemName]
  }
    
  const elements = [];
  const eraceElement = [];
  for(const item in forms)
  { 
    elements.push( getFormItems(forms[item]) )
  }
    
  return (
    <div style={{width:"100%", height:"100%"}}>
      <h1>{tittle}</h1>
      { state.loader && <LdDualRing />  }
      <form onSubmit={handleSubmit} className="form-auto">
        { elements }
        <button className="submit" type="submit">{textSubmit}</button>
      </form>
    </div>
  )
}