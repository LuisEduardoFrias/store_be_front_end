import Form from "../../ui_components/form/form";
import "./addPages.css";
import { api } from '../../callApi';

export default function AddClients() {
  
  const forms = [
    {
      itemName : "input",
      title: "Name",
      type: "text",
      name:  "Name",
    },
    {
      itemName : "input",
      title: "Direction",
      type: "text",
      name:  "Direction",
    },
    {
      itemName : "input",
      className: "datePicker",
      title: "Date Registe",
      name:  "DateRegiste",
      value: new Date().toLocaleDateString('en-GB'),
      
    },
  ]
  
  const submit = (state, setState) => {
  
  const newStyle = state;
  delete newStyle.loader;
  
    api.post('/clients', newStyle, (response) => {
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