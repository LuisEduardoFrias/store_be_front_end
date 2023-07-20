import { useState, useEffect } from "react";
import './viewStylePage.css';
import { api } from '../../callApi';
import ViewsData from '../../ui_components/view_data/viewsData';

// colorBR="#4b7bff" colorR="#4bbcff" 

export default function ViewProducts() {
  
 const [ result , setData] = useState({err:null, data:null});
  
 const baseUrl = '/products';
 
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
          tableName = "Products"
          hiddenColumn={[0,3]}
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
