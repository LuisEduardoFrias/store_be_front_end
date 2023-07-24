import { useState, useEffect } from "react";
import './viewStylePage.css';
import { api } from '../../callApi';
import ViewsData from '../../ui_components/view_data/viewsData';
import LdDualRing from '../../ui_components/ld_dual_ring/ldDualRing';

export default function ViewBills() {

 const [ bills , setBill] = useState(null);
 const [ error , setError] = useState("");

 const baseUrl = '/bills';
 
 useEffect(() => 
 {
    setTimeout(function(){
      api.get(baseUrl, (resp) => {
        if(resp.err) {
          setError(resp.err);
        } else {
          setBill(resp.data)
        }
      });
    }, 3000);
  }, []);

  return (
    <div className="page" > 
     {  !bills ? 
          
          <LdDualRing error={error} errorMessage={error} />
          
          :
          
          <ViewsData
          tableName = "Bills"
          hiddenColumn={[0]}
          languaje="en"
          data={bills}
          eventEdit={(event, index) => {alert("edit no configurado: "+index)}} 
 
          eventDelete={(event, index, setRows) => 
          { 
            const key = bills[index].key;
           
            if(key) {
             /*
              api.delete(baseUrl, key, (resp) => {
              
                if(resp.err) {
                  alert(resp.err)
                } else {
                  alert(resp.data.data)
                  
                  setBill([...bills.filter((e,i) => i !== index)]);
                }
              }); */
              
              
              alert("by backend logic the 'bills' are not deleted, this is a simulation.")
              
              const newBills = [...bills.filter((e,i) => i !==
              index)];
              
              setRows(newBills)
              setBill(newBills)
             
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
