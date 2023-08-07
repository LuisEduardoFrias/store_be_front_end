import { useState } from "react";
import ModalWindow from "../modal_window/modalWindow";

let edit = undefined, _delete = undefined;

// Retorna una tabla vacia si los datos viene vacio.
export function CheckData(data, tableName) {
  let isReturn = false;
  
  if(!Array.isArray(data) || data?.length === 0) {
    isReturn = true;
  }
  
  return {isReturn , table: ( 
    <label style={{color:"red", fontSize:"45px"}} > No data </label>
  )};
}

// Eslitos 'isWrap' para las celdas.
export function wraping(styleHeaderCell, isWrap) {

  const styleRowCell = { whiteSpace:"noisWrap", overflow: "auto" }; 
  Reflect?.set(styleHeaderCell, "whiteSpace", "noisWrap");
  Reflect?.set(styleHeaderCell, "overflow", "auto");
  
  if(isWrap) {
    Reflect?.set(styleRowCell, "whiteSpace", "normal");
    Reflect?.set(styleRowCell, "overflowX", "auto");
    Reflect?.set(styleRowCell, "overflowY", "none");
    
    Reflect?.set(styleHeaderCell, "whiteSpace", "noisWrap");
    Reflect?.set(styleHeaderCell, "overflow", "auto");
  }
  
  return styleRowCell;
}

//* Cambia el valor booleanl por los valores especificados en el atrivuto 'booleanConvert'.
export function _booleanConvert(property, cellValue, booleanConvert) {
    if(typeof cellValue == "boolean") 
    {
      let value = Reflect?.get(booleanConvert, property);
      
      if(value === undefined) throw `'${property}' no found in
      'booleanConvert' attribute.`;
      
      return cellValue ? value[0] : value[1];
    }
    
    return cellValue; 
 }
  
//* Asigna los colores entre filas
export function getColorRow(n, styleTr, colorRow, colorBetweenRow) {
  styleTr.backgroundColor = n % 2 ? colorRow : colorBetweenRow ;
  
  return styleTr;
}
  
// Selecciona el contenido de una cerda entre texto o un botton.
export function selectBetweenButtonLabel(index, obj, property, styleEditBtn,
  styleDeleteBtn,
  styleFootBtn,
  eventEdit,
  eventDelete,
  hiddenColumn,
  setRows,
  eventOpenModal) {
    
    const value = Reflect?.get(obj, property);
    
    if(Array.isArray(value) || typeof value === "object") {
     // const _value = {name:"jose", edad:12};
      return <>
        <ModalWindow id={`${index}-${property}`} tableName={property}
        data={Array.isArray(value) ? value : [value]} />
        <button
        style={ styleEditBtn  }
        hiddenColumn={hiddenColumn}
        className="btn"
        onClick={ 
        (event) => eventOpenModal(event, `${index}-${property}`) } >
            { property?.toUpperCase() }
        </button> </>
    }
    else {
    
      if(value === edit || value === _delete) 
      {
        if(styleEditBtn.backgroundColor === undefined)
        {
          styleEditBtn.backgroundColor = "gray";
          styleEditBtn.border = "1px solid black";
        }
      
        if(styleDeleteBtn.backgroundColor === undefined)
        {
          styleDeleteBtn.backgroundColor = "white";
          styleDeleteBtn.border = "1px solid black";
        }
       
        return <button
        style={ value === edit ? styleEditBtn : styleDeleteBtn }
        className="btn"
        onClick={ value === edit ?
        (event) => eventEdit(event, index) :
        (event) => eventDelete(event, index, setRows) } >
            { value?.toUpperCase() }
        </button>
      }
      else
      {
        return _booleanConvert(property, value);
      }
    }
 }
  
// Asigna anchos especificado para cada columna.
export function customsWidth(index, styleObj ={}) {
   
 /*     Reflect?.set(styleObj, "display", "grid");
      styleObj.gridTemplateColumns ="50px 50px 50px 50px 50px 80px 30px";
    */
    return styleObj;
}

export function useInsertButtons(eventEdit,
eventDelete, 
data, 
languaje,
hiddenColumn,
customHeaders ) {

//* Asigna el idioma de los botones segun se rl idioma espesificado y si los eventos corespo dientes fueron asignados.
const langE = {
  "es":  "editar",
  "en":  "edit",
  "fr":  "modifier",
  "ita": "modificare",
  "deu": "bearbeiten"
};
  
const langD = {
  "es":  "eliminar",
  "en":  "delete",
  "fr":  "éliminer",
  "ita": "eliminare",
  "deu": "beseitigen"
};
  
function getLang(btn,languaje) {
  return btn === "edit" ? langE[languaje] : langD[languaje];
}

 edit = eventEdit     ? getLang('edit', languaje)  : undefined;
 _delete = eventDelete ? getLang('delete', languaje): undefined;

//* Obtiene las propiedade y asignas los botones para las abeceras de la tabla.
const [headers, setHeaders] = useState(
 [...
    [...
      [...(data.length !== 0 ? Reflect?.ownKeys(data[0]) : []), edit, _delete]
      .filter((e) => Boolean(e))
    ].filter((e, i) =>
    {
   
    let ret = true;
    
    if(hiddenColumn.length !== 0)
    
      hiddenColumn.forEach(col => { 
        if(col === i) ret = false;
      })
    
      return ret;
    })
  ]
);

//* Asignas los botones a los cabeceras 'custom'.
const [conbainerHeaders, setConbainerHeaders] = useState(
 customHeaders ?
 [...
    [...customHeaders, edit, _delete]
    .filter((e) => Boolean(e))
 ] 
   :
   headers
);

//* Asigna los bootones como propiedades y valor.
if(edit !== undefined)
  data?.map(e => Reflect?.set(e, edit, edit) );

if(_delete !== undefined)
  data?.map(e => Reflect?.set(e, _delete, _delete) );
  
  return {headers, conbainerHeaders };
}

export function getDataPage(data = [], dn, an) {
  if(data?.length === 0 || !Array.isArray(data)) return [];
  
  return data?.filter((e,i) => i >= dn && i < an);
}

export function getPaginator(data, pages, styleFootBtn, setArr ) {

  const _pages = Math.ceil(data?.length / pages);
  
  const pagesNum  = [];
  
  for (let i = 0; i < _pages; i++) 
  {
    pagesNum.push(<a class={`footBtn-viewData botton-${i} ${i === 0 ? "active" : ""}`}
    
    style={styleFootBtn}
    onClick={(event) => {
      
      const elem = document.querySelectorAll(".footBtn-viewData");
    
      if(elem !== null)
        elem.forEach(e => e.className = `footBtn-viewData botton-${i}`);
    
      event.target.className = `footBtn-viewData botton-${i} active`;

      setArr(getDataPage(data, i*pages, ((i+1)*pages)))
      
    }}
    
    href="#">{i+1}</a>)
  }
  
  return pagesNum;
}