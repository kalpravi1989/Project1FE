import axios from "axios"
import { useState } from "react"
import {  useNavigate } from "react-router-dom"
import { Button, Container, Form } from "react-bootstrap"
import { store } from "../GlobalData/store"

export const CreateReimnursement:React.FC=()=>{
    
    const[reimb,setReimb]=useState({
        describtion:"",
        amount:0,
        reason:""
    })
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const[iserrorMsg,setIsErrorMsg]=useState(false)
    const[successMsg,setSuccessMsg]=useState(false)
    const[errorMsg,setErrorMsg]=useState("")
    const navigate=useNavigate()

    const storeValue=(input:any)=>{
        const name=input.target.name
        const value=input.target.value
        setReimb((reimb)=>({...reimb,[name]:value}))
    }
    const showAlert = () => {
      setIsAlertVisible(true); // Show the alert
      setTimeout(() => {
        setIsAlertVisible(false); // Hide the alert after 2 seconds
      }, 2000); // 2000ms = 2 seconds
    };
    const create=async()=>{
        console.log(store.loggedInUser.userId)
        const response=await axios.post("http://localhost:7777/reimb/"+store.loggedInUser.userId,reimb).then((response)=>{
        console.log(response.data)
        console.log(response.status)
        if(response.status===201){
          setSuccessMsg(true)
          showAlert()
          setReimb({
           describtion:"",
            amount: 0,
            reason: "",
          });
        
        }}).catch((error)=>{
          setIsErrorMsg(true)
        //setErrorMsg(error.response.data)
        showAlert()
        setIsErrorMsg(false)
      })
    }
    return(
      <>
      
        <Container>
          <h3>Create new Reimbursement</h3>
      <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control  name="description"type='text'  onChange={storeValue}/>
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Label>Amount</Form.Label>
        <Form.Control  name="amount"type='number'  onChange={storeValue}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Reason</Form.Label>
        <Form.Control  name="reason"type='text'  onChange={storeValue}/>
      </Form.Group>

          <Button className="btn-success m-1" onClick={create}>Create</Button>
          {(store.loggedInUser.role=='User'||store.loggedInUser.role=='user')&&
          <Button className="backBtn" 
            onClick={()=>{navigate("/reimb")}}>Back</Button>}
          
          </Form>
          {isAlertVisible&&successMsg && (
        <div className="alert alert-success mt-3" role="alert">
          Success! Your action was successful.
        </div>
          )} 
          {(isAlertVisible && iserrorMsg) && (
        <div className="alert alert-danger mt-3" role="alert">
          Enter valid details{errorMsg}
        </div>
          )} 
          </Container>
        
          </>
    )
}