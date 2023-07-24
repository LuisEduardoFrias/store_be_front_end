import './modalWindow.css';
import ViewsData from '../view_data/viewsData';

export default function ModalWindow({data = [], id, tableName="modal"}) {

 window.addEventListener("click",function(event) {
    if (event.target == document.getElementById(id)) {
      document.getElementById(id).style.display = "none";
    }
  });
  
  const _data = data;
  return (  
    <div id={id} class="modal">
      <div class="modal-content">
        <span class="close" onClick={ (event) => {
         document.getElementById(id).style.display = "none";
        }}>&times;</span>
        <h1>Ventana modal</h1>
        <div className="container-tabla" >
        <ViewsData
          tableName={tableName}
          //customHeaders={["Nombre","descripcion","Fecha de regristo"]}
          hiddenColumn={[0]}
         // pages = {15}
          languaje="en"
          data={_data}

          />
        </div>
      </div>
    </div>
  );
}