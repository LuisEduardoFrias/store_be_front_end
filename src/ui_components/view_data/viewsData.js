import "./viewData.css";
import { useState } from "react";
//import ModalWindow from "../modal_window/modalWindow";
import { CheckData, wraping, getColorRow, selectBetweenButtonLabel, useInsertButtons, getDataPage, getPaginator } from "./toolsViewData";

export default function ViewsData(props) {
  
  const { 
    // atributos
    languaje = "es", // | "en" | "fr" | "ita" | "deu"
    eventEdit, 
    eventDelete, 
    colorBetweenRow = "#52AEF5", 
    colorRow = "#c3e1ff",
    pages=10,
    isWrap, 
    customHeaders,
    booleanConvert,
    customWidthCells = [],
    hiddenColumn = [],
    tableName,
    // Estilos
    styleTr = {},
    styleFootBtn= {},
    styleFootTd= {},
    styleTable= {},
    styleThead= {},
    styleTh= {},
    styleTd= {},
    styleTBody= {},
    styleEditBtn= {},
    styleTableName= {},
    styleDeleteBtn= {},
    styleHeader= {}, 
    styleHeaderCell = {}, 
    // datos
    data = [] } = props;
  
  const [arr, setArr] = useState(getDataPage(data, 0, pages));

  const {headers, conbainerHeaders} = useInsertButtons(eventEdit, eventDelete, data, languaje, hiddenColumn, customHeaders );

  const {isReturn, table } = CheckData(data, tableName);
  if(isReturn) return table;
  
  // wraping();
  
  const pagesNum  =  getPaginator(data, pages, styleFootBtn, setArr);
  
  
  function eventOpenModal(event, id) {
    var modal = document.getElementById(id);
    modal.style.display = "block";
  }
  
  return (
  <div>
    <table className="table-viewData" style={ styleTable } >

      { tableName !== null ? <caption 
      className="caption-viewData"
      style={styleTableName} >{tableName}</caption> : null }
      
      <thead className="thead-viewData" style={ styleThead }>
        <tr className="th-viewData" style={ styleTh }>
          { 
            conbainerHeaders?.map( textHead => 
          
            <th className="td-viewData" style={ styleTd }>
                {textHead?.toUpperCase()} 
            </th>) 
          }
        </tr>
      </thead>
      
     <tbody className="tbody-viewData" style={styleTBody} >
       { 
          arr?.map((e,index) => 
            <tr className="tr-viewData" 
                style={ getColorRow(index ,styleTr, colorRow, colorBetweenRow) }>
              { headers?.map( h => 
              
                <td className="th-viewData" style={ styleTd } >
                 { 
                    selectBetweenButtonLabel(index, e, h, styleEditBtn, styleDeleteBtn, styleFootBtn, eventEdit, eventDelete, eventOpenModal)
                  } 
                </td>)
              }
            </tr>
          )
        }
     </tbody>
      
      <tfoot>
        <tr className="tr-viewData" >
          <td colspan={conbainerHeaders?.length} className="td-viewData"
          style={styleFootTd} >
            <div class="links">
              <a href="#" className="footBtn-viewData" style={styleFootBtn} >&laquo;</a>
              
              { pagesNum }

              <a href="#" className="footBtn-viewData" 
            style={styleFootBtn} >&raquo;</a>
            </div>
          </td>
        </tr> 
      </tfoot>
      
    </table>
  </div>
 )
  
}