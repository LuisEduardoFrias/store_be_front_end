import Form from "../../ui_components/form/form";
import LdDualRing from '../../ui_components/ld_dual_ring/ldDualRing';
import "./addPages.css";
import { api } from '../../callApi';
import { useState, useEffect, useReducer } from "react";

export default function AddBuys() {

  const [ client , setClient] = useState({err:null, data:[]});

  useEffect(() => {
    setTimeout(function() {
      api.get('/clients', setClient);
    }, 2000);
  }, []) 
  
  return (  client.data.length === 0 ? 
      <LdDualRing error={client.err} errorMessage={client.err} />
      : <Buys data={client.data} /> );
}

function Buys({data}) {
  
  const [buyState, setBuyState] = useState({});
  const baseUrl = '/bills';
  
  const forms = [
    {
      itemName : "input",
      className: "datePicker",
      title: "Date",
      type: "text",
      readOnly: true,
      name:  "Date",
      value: new Date().toLocaleDateString('en-GB')
    },
    {
      itemName: "select",
      title: "clients",
      options: [],
    },
    {
      itemName: "search_list",
      name: "Product"
    }
  ];
  
  const _options = [];
  
  data?.forEach(e => {
    _options.push({value: e.key, text: e.Name});
  });
   
  forms[1].options = _options;
  
  let isPost = false;
  useEffect(() => {
    if(isPost) {
      if(buyState.err) {
        alert("Buy done")
      } else {
        alert(buyState.err)
      }
    }
    
    isPost = false;
    setBuyState({});
  },[buyState])
  
  const submit = (state, setState) => {
    
     setBuyState(state);
     
    if(state.err === undefined) {
      const newState = state;
      let TotalPrice = 0;
      
      newState.Product.forEach(e => TotalPrice += e.price);
    
      newState.TotalPrice = TotalPrice.toFixed(2);
      newState.Product = newState.Product.map(e => e.key);
    
      api.post(baseUrl, newState, setBuyState );
      isPost = true;
    }
    
    /*  
  const newStyle = state;
    delete newStyle.loader;
    
    api.post('/products', newStyle, (response) => {
      if(!response.err)
      {
        alert(response.data.data);
        setState({loader: false})
      }
      else {
        alert(response.err)
        setState({...state, loader: false})
      }
    }); */
   
  
  }

  return (
    <div className="contact">
      <Form tittle="bills" textSubmit="Sale" submit={submit} forms={forms} />
    </div>
  );
}