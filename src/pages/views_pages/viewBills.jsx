import { useState, useEffect } from "react";
import './viewStylePage.css';
import { api } from '../../callApi';
import ViewsData from '../../ui_components/view_data/viewsData';

export default function ViewBills() {

const [ result , setData] = useState({err:null, data:null});
  
 const baseUrl = '/bills';
 
 useEffect(() => {
   setTimeout(function(){
    api.get(baseUrl, setData);
   }, 3000);
  }, []) 

  return (
    <div className="page" > 
     {  !result.data ? 
          
           <div className="container-load ">
             { !result.err ? 
               <div className="ld-dual-ring"></div> : 
               <label className="error-label">{result.err}</label> 
             }
           </div>
          
          :
          
          <ViewsData
          tableName = "Bills"
          //customHeaders={["Nombre","descripcion","Fecha de regristo"]}
          hiddenColumn={[0]}
         // pages = {15}
          languaje="en"
          data={result.data}
          eventEdit={(event, index) => {alert("edit no configurado: "+index)}} 
          eventDelete={(event, index) => 
          { 
            const key = result.data[index].key;
           
            if(key) {
            
              api.delete(baseUrl, key, setData);
            
              if(result.err) {
                alert(result.err)
              } else {
              
                setData({err: null, data: [...result.data.filter( (e,i) => i !== index)]});
              }
            }
            else {
              setData({err: "key undefined",  data: null});
            }
          }
        }  
       /> 
        
      }
    </div>
  );
}
