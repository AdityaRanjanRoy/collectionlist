import React from "react";
import Add from "./Add";

function Navbar() {
  return (
    <>
    <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand">Collections</a>
    {/* <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success me-5" type="submit">Search</button>
    </form> */}
    <div>
      <Add/>
      </div>
      {/* <div>
      <Delete/>
    </div> */}
  </div>
</nav>

</>

    
  );
}

export default Navbar;
