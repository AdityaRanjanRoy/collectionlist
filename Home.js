import React, { useEffect, useState,useRef} from "react";
import Check from "./Check";


function Home() {

  const[uid, setId]=useState();
  const [inpval,setinp]= useState({
    colname:"",
    colcity:""
  })
 
  const setdata=(e)=>{
   e.preventDefault()
    const {name,value}=e.target;
    setinp((preval)=>{
      return{
        ...preval,
        [name]:value
      }
    })
  }

  const getadata=async(id)=>{
    setId(id);
    const res=await fetch(`/api/collec/getsdata/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    });
    
    const data=await res.json();
    if(res.status===422||!data){
      console.log("error");
    }
    else{
      setinp(data)
      console.log(data);
    }
  
  }
   useEffect(()=>{
     getadata();
   },[]);
   const refClose=useRef(null)
   const uptodate=async(id)=>{
    const {colname,colcity}=inpval;
    const res2=await fetch(`/api/collec/updata/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        colname,colcity
      })

    });
    
    const data2=await res2.json();
 console.log(data2);
    if(res2.status===422 || !data2){
      alert("fill the data");
    }else{
     alert("data change successfully");
     refClose.current.click()
     getdata();
    }
   }
// *****************************************************
  const [getcoldata, setcoldata]=useState([]);


  const getdata=async(e)=>{
    const res=await fetch("/api/collec/getdata",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data=await res.json();
    if(res.status===404||!data){
      console.log("error");
    }
    else{
      setcoldata(data)
      console.log("get data");
    }
    
  }
  useEffect(()=>{
    getdata();
  },[])
//*************************************************************** */
  const deletecoll = async (id) => {

    const res2 = await fetch(`/api/collec/deletedata/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
        console.log("error");
    } else {
        console.log("user deleted");
        getdata();
    }

}
/***************************************************************** */
const serchHandle=async (event)=>{
  let key=event.target.value;
  if(key){
    let result=await fetch(`/api/collec/serch/${key}`)
    result=await result.json();
    if(result){
      setcoldata(result)
    }
  }else{
    getdata();
  }
}

  return (
    <>
   <div>
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={serchHandle}/>
      <button className="btn btn-outline-success me-5" type="submit">Search</button>
    </form>
    </div>
    <div>
      <table className="table">
        <thead>
          <tr className="table-info">
            <th scope="col">Sl.No</th>
            <th scope="col">Collection Name</th>
            <th scope="col">City</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            getcoldata.map((element,id)=>{
              return(
                <>
                <tr>
            <th scope="row">{id+1}</th>
            <td>{element.colname}</td>
            <td>{element.colcity}</td>
            <td className="d-flex justify-content-between">
    <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal"data-bs-target="#exa2" onClick={()=>getadata(element._id)}>
        Edit
      </button>
       <div className="modal fade"  id="exa2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabe1">
                Collection details
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Collection Name</label>
                  <input type="text"
                    value={inpval.colname} onChange={setdata}
                    name="colname" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
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
              <button type="button" className="btn btn-primary" onClick={()=>uptodate(uid)}>Save change</button>
            </div>
          </div>
        </div>
      </div>  
    </div> 
              <div><Check/></div>
              <button className="btn btn-danger" onClick={() => deletecoll(element._id)}>Delete</button>
            </td>
          </tr>
          </>
              )
            })
          }
          
        </tbody>
      </table>
      </div>
      </>
  );
}

export default Home;
