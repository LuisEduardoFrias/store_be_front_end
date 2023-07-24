import Form from "../../ui_components/form/form";
import "./addPages.css";
import { api } from '../../callApi';

export default function AddProducts() {
  
  const forms = [
    {
      itemName : "input",
      title: "Name",
      type: "text",
      name:  "Name",
    },
    {
      itemName : "input",
      title: "Description",
      type: "text",
      name:  "Description",
    },
    {
      itemName : "input",
      title: "Purchase Price",
      type: "Number",
      name:  "PurchasePrice",
    },
    {
      itemName : "input",
      title: "Itbis",
      type: "Number",
      name:  "Itbis",
    },
    {
      itemName : "input",
      title: "Stock",
      type: "Number",
      name:  "Stock",
    },
  ]
  
  const submit = (state, setState) => {
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
    });
  }
  
  return (
    <div className="contact">
      <Form tittle="Product" textSubmit="Create" submit={submit} forms={forms} />
    </div>
  );
}