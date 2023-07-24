import "./ldDualRing.css";

export default function LdDualRing({ error, errorMessage }) {
  return (
    <div className="container-load ">
      { !error ? 
          <div className="ld-dual-ring"></div> 
        : 
          <label className="error-label">{errorMessage}</label> 
        }
    </div>
  )
}