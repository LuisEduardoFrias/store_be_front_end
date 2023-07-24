import { useState, useEffect } from "react";
import './viewStylePage.css';
import { api } from '../../callApi';
import ViewsData from '../../ui_components/view_data/viewsData';
import LdDualRing from '../../ui_components/ld_dual_ring/ldDualRing';

export default function ViewProducts() {
  
 const [ products , setProduct] = useState(null);
 const [ error , setError] = useState("");
 
 const baseUrl = '/products';
 
 useEffect(() => 
 {
    setTimeout(function(){
      api.get(baseUrl, (resp) => {
        if(resp.err) {
          setError(resp.err);
        } else {
          setProduct(resp.data)
        }
      });
    }, 3000);
  }, []);

  return (
    <div className="page" > 
     {  !products ? 
          
          <LdDualRing error={error} errorMessage={error} />
          
          :
          
          <ViewsData
          tableName = "Products"
          hiddenColumn={[0,3]}
          languaje="en"
          data={products}
          eventEdit={(event, index) => {alert("edit no configurado: "+index)}} 
 
          eventDelete={(event, index, setRows) => 
          { 
            const key = products[index].key;
           
            if(key) {
             /*
              api.delete(baseUrl, key, (resp) => {
              
                if(resp.err) {
                  alert(resp.err)
                } else {
                  alert(resp.data.data)
                  
                  setProduct([...products.filter((e,i) => i !== index)]);
                }
              }); */
              
              
              alert("by backend logic the 'products' are not deleted, this is a simulation.")
              
              const newProducts = [...products.filter((e,i) => i !==
              index)];
              
              setRows(newProducts)
              setProduct(newProducts)
             
            }
            else {
              alert("key undefined");
            }
          } 
        } 
       /> 
        
      }
    </div>
  );
}
