export let api;

export default class ApiC {
  constructor(pathBase) {
    this.pathBase = pathBase;
    api = this;
  }
  
  get(path, setState) {
    this._fetch('get', path, null, setState)
  }
  post( path, obj, setState) {
    this._fetch('POST', path, obj, setState)
  }
  put(path, obj, setState) {
    this._fetch('PUT', path, obj, setState)
  }
  delete(path, key, setState) {
    this._fetch('DELETE', `${path}/${key}`, null, setState)
  }
  
  _fetch(method_, path, obj, setState) {
    const CPath = this.pathBase +  path;
    
   // throw new Error(`Error! status: ${CPath}`);

    try {
     fetch(CPath, {
          method:method_,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: 'application/json',
            /* Authorization: 'Bearer ', */
            'Content-Type': 'application/json',
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: obj, 
        })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {

          setState({err: null, data})

     })
      .catch((err) => {
            setState({err:"Hubo un problema con la petición Fetch: " +
            err.message + CPath , data: null})
      });
    } catch (err) {
      alert(err)
    }
    
  }
}
/*
{
        "key": "cc087858-6797-4d15-887d-1073a7f2db47",
        "Date": "2023-07-07T06:29:26.225Z",
        "client": {
            "key": "74312e89-87fe-4889-8137-dc79177eac3e",
            "Name": "Luis E. Frias",
            "Direction": "calle 3",
            "DateRegiste": "2023/08/12"
        },
        "Products": [
            {
                "key": "8468e24b-93a0-4c7e-bfa0-5a6da48f15b0",
                "Name": "Salami",
                "Description": "Salami super especial induveca",
                "PurchasePrice": 200.15,
                "SalePrice": 307.0301,
                "Itbis": 18,
                "Stock": 50
            },
            {
                "key": "aa3e0570-b1dc-4f48-a532-f07a07976b2e",
                "Name": "Queso",
                "Description": "Queso danez",
                "PurchasePrice": 300.37,
                "SalePrice": 460.76758,
                "Itbis": 18,
                "Stock": 30
            },
            {
                "key": "1ecaca9b-fc30-431b-b4ee-8fe383907c1d",
                "Name": "Queso",
                "Description": "Queso gouda",
                "PurchasePrice": 310.37,
                "SalePrice": 476.10758,
                "Itbis": 18,
                "Stock": 39
            }
        ],
        "TotalPrice": 1243.90526
    },
    
    */