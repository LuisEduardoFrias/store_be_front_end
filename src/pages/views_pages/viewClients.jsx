import { useState, useEffect } from "react";
import './viewStylePage.css';
import { api } from '../../callApi';
import ViewsData from '../../ui_components/view_data/viewsData';
import LdDualRing from '../../ui_components/ld_dual_ring/ldDualRing';

export default function ViewClients() {
  
 const [ clients , setClient] = useState(null);
 const [ error , setError] = useState("");
 
 const baseUrl = '/clients';
 
 useEffect(() => 
 {
    setTimeout(function(){
      api.get(baseUrl, (resp) => {
        if(resp.err) {
          setError(resp.err);
        } else {
          setClient(resp.data)
        }
      });
    }, 3000);
  }, []);

  return (
    <div className="page" > 
     {  !clients ? 
          
          <LdDualRing error={error} errorMessage={error} />
          
          :
          
          <ViewsData
          tableName = "Clients"
          hiddenColumn={[0]}
          languaje="en"
          data={clients}
          eventEdit={(event, index) => {alert("edit no configurado: "+index)}} 
 
          eventDelete={(event, index, setRows) => 
          { 
            const key = clients[index].key;
           
            if(key) {
             
              api.delete(baseUrl, key, (resp) => {
              
                if(resp.err) {
                  alert(resp.err)
                } else {
                  alert(resp.data.data)
                  
                  const newClients = [...clients.filter((e,i) => i !==
              index)];
              
                  setRows(newClients)
                  setClient(newClients)
                }
              }); 
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