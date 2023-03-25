import axios from "axios";
import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Login(){
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const [roll,setRoll]=useState("")
    const [address,setAddress]=useState("")
    const [gender,setGender]=useState("male")
    const [area,setArea]=useState("")
    const [phone,setPhone]=useState("")
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleupdate=()=>setShow2(false)
  const handleopenupdate=()=>setShow2(true)
  const navigate=useNavigate()
  console.log(gender)
  const add=()=>{
    axios.post("http://localhost:8000/addregi",{
        name:name,
        roll:roll,
        address:address,
        phone:phone,
        gender:gender,
        area:area,
        password:password

    }).then((res)=>{
        console.log(res.data)
        toast.success("Data Added Sucessfully")
        setShow2(false)
    })
}
const login=()=>{
    axios.post("http://localhost:8000/login",{
        roll:username,
        password:password

    }).then((res)=>{
        console.log(res.data[0].Rollno)
        sessionStorage.setItem("rollno",res.data[0].Rollno)
        sessionStorage.setItem("name",res.data[0].name)
        navigate("/todo")
        setShow(false)
    })
}
    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <h1>Welcome to TODO</h1>
            </div>
            
            
            <br></br>
            <br></br>


            <div className="container text-center">
                <Button onClick={handleShow}>Login</Button>&nbsp;&nbsp;<Button onClick={handleopenupdate}>Registartion</Button>
            </div>
            <div className="container">



            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title align="text-center">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Username: <input type="text" className="form-control" onChange={((e)=>setUsername(e.target.value))} /><br/>
            Password:<input type="password" className="form-control"  onChange={((e)=>setPassword(e.target.value))} />
            <br></br>
            
            <div className="d-grip gap-2 text-center">
            

            </div>
           

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={login}>
            Login
          </Button>
         
        </Modal.Footer>
      </Modal>

                           </div>
                           <div className="container">
                           <Modal show={show2} onHide={handleupdate}>
        <Modal.Header closeButton>
          <Modal.Title align="text-center">Registartion Fomr</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Name: <input type="text" className="form-control" onChange={((e)=>setName(e.target.value))} /><br/>
            Rollno:<input type="text" className="form-control"  onChange={((e)=>setRoll(e.target.value))} /><br/>
            Address:<textarea className="form-control" onChange={((e)=>setAddress(e.target.value))} /><br/>
            Area:<input type="text" className="form-control" onChange={((e)=>setArea(e.target.value))} /><br/>
            Phone:<input type="number" className="form-control" onChange={((e)=>setPhone(e.target.value))} /><br/>
            Password:<input type="password" className="form-control"  onChange={((e)=>setPassword(e.target.value))} /><br></br>
            Gender:<div class="form-check">
  <input type="radio" class="form-check-input" id="radio1" name="optradio" onClick={((e)=>setGender("Male"))} checked />Male
  <label class="form-check-label" for="radio1"></label>
</div>
<div class="form-check">
  <input type="radio" class="form-check-input" id="radio2" name="optradio" value="option2" onClick={((e)=>setGender("Female"))} />Female
  <label class="form-check-label" for="radio2"></label>
</div> 
<br/>
            
            
            
           

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleupdate}>
            Close
          </Button>
          <Button variant="primary" onClick={add}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
                           </div>

        </div>
    )
}