import axios from "axios";
import React, { useEffect,useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




  
export default function Index(){
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const time=new Date()
    const month= time.getMonth()
    const day=time.getDay()
    const year=time.getFullYear()
   
    
    const [name,setName]=useState("")
    const [date,setDate]=useState()
    const [items,setItems]=useState([])
    const [task,setTask]=useState("")
    const [dates,setDates]=useState()
    const [id,setId]=useState("")
    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleupdate=()=>setShow2(false)
  const handleopenupdate=()=>setShow2(true)
  const uid=sessionStorage.getItem("rollno")
  const names=sessionStorage.getItem("name")
  const navigate=useNavigate()
    

 
    useEffect(()=>{
        
        axios.post("http://localhost:8000/getid",{
          uid:uid

        }).then((res)=>{

            
            setItems(res.data)
            
            
        })
    })
    const add=()=>{
        axios.post("http://localhost:8000/add",{
            roll:uid,
            name:name,
            date:date,

        }).then((res)=>{
            console.log("Data added Sucessfully")
            toast.success("Data Added Sucessfully")
            setShow(false)
        })
    }
    const dele=(id)=>{
      axios.get(`http://localhost:8000/delete/${id}}`).then((res)=>{
        toast.error(res.data)
        
      })

    }
    const upda=(id)=>{
      axios.post(`http://localhost:8000/update/${id}`,{

        task:task,
        dates:dates
      }).then((res)=>{
        console.log("Updated")
        setShow2(false)

      })
      

    }
    const gets=(id)=>{
      setShow2(true)

      axios.get(`http://localhost:8000/get/${id}`).then((res)=>{
        setId(res.data[0].ID)
        setTask(res.data[0].tasks)
        setDates(res.data[0].date)
        console.log(name)
      })
    }
    const logout=()=>{
      sessionStorage.clear()
      navigate('/')
    }
    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      
      
      
      <li className="nav-tem" >
        <a className="nav-link" style={{marginRight:"1000px"}} onClick={logout}>Logout</a>
      </li>
      <li className="nav-tem" >
      <a className="nav-link" style={{marginRight:"1000px"}}>Welcome {names}</a>
      </li>
      
      
    </ul>
    
  </div>
</nav>
            <div className="container">
                
                <h1>TODO LIST</h1>
                <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>
      <br/>

            </div>
            <div>

            </div>
            <div className="container p-5 my-5 border">
                <table className="table">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Todo</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View Details</th>
                        </tr>
                    </thead>

                    <tbody>
                      {
                        items.map((item,index)=>(
                          <tr>
                            <td>{item.ID}</td>
                            <td>{item.tasks}</td>
                            <td><button type="button" className="btn btn-outline-secondary" onClick={()=>gets(item.ID)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
                              </button></td>
                              <td><button className="btn btn-outline-danger" onClick={()=>dele(item.ID)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></button></td>
                          </tr>

                        ))
                      }
                        
                    </tbody>

                </table>

            </div>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title align="text-center">Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Task: <input type="text" className="form-control" onChange={((e)=>setName(e.target.value))} /><br/>
            Date:<input type="date" className="form-control"  onChange={((e)=>setDate(e.target.value))} />
            <br></br>
            
            <div className="d-grip gap-2 text-center">
            
            </div>
           

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={add}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={show2} onHide={handleupdate}>
        <Modal.Header closeButton>
          <Modal.Title align="text-center">Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Task: <input type="text" className="form-control" value={task} onChange={((e)=>setTask(e.target.value))}  /><br/>
            Date:<input type="date" className="form-control"  value={dates} onChange={((e)=>setDates(e.target.value))}  />
            <br></br>
            
            <div className="d-grip gap-2 text-center">
            <Button variant="outline-success" size="lg" onClick={()=>upda(id)}>Update</Button>

            </div>
           

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleupdate}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
      
           
  

        </div>
    )

}