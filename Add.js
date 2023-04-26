import React, {useRef, useState, useEffect} from "react";

function Add() {

  const [inpval,setinp]= useState({
    colname:"",
    colcity:""
  })
  const setdata=(e)=>{
    const {name,value}=e.target;
    setinp((preval)=>{
      return{
        ...preval,
        [name]:value
      }
    })
  }
  const refClose=useRef(null)
  const adddata=async(e)=>{
    e.preventDefault();
    const {colname,colcity}=inpval;
    const res=await fetch("/api/collec/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        colname,colcity
      })
    });
    refClose.current.click()
    const data=await res.json();
    if(res.status===404||!data){
      alert("error");
    }
    else{
      alert("Added Successfully");
    }
    
  }
  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Collection details
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Collection Name</label>
                  <input type="text" value={inpval.colname} onChange={setdata} name="colname" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  <div id="emailHelp" className="form-text">Required</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">City</label>
                  <input
                    type="text"
                    value={inpval.colcity}
                    onChange={setdata}
                    name="colcity"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={adddata} className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
