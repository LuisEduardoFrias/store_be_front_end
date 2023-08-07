export let api;

export default class ApiC {
  constructor(pathBase) {
    this.pathBase = pathBase;
    api = this;
  }
  
  get(path, setState) {
    this._fetch('get', path, null, setState)
  }
  post(path, obj, setState) {
    this._fetch('post', path, obj, setState)
  }
  put(path, obj, setState) {
    this._fetch('put', path, obj, setState)
  }
  delete(path, key, setState) {
    this._fetch('delete', `${path}/${key}`, null, setState)
  }
  
  _fetch(method_, path, obj, setState) {
  
    const CPath = this.pathBase +  path;
 
    try {
      fetch(CPath,
       {
          method:method_,
            mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            /*Accept: 'application/json',*/
            /* Authorization: 'Bearer ', */
            "Content-type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: obj ? JSON.stringify(obj) : null,
        }
      )
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
        setState({err:"Hubo un problema con la petición Fetch: " + err.message +
        "\n" + CPath , data: {}})
      });   
    } catch (err) {
      setState({err, data: {}})
    }
  }
}