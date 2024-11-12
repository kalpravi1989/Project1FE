import axios from "axios"
import { useState } from "react"
import { Alert, Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export const Register:React.FC=()=>{

    const[iserror,setIserror]=useState(false);
    const [successAlert,setSuccessAlert]=useState(false)
    const[userCred,setUserCred]=useState({
        userName:"",
        password:"",
        firstName:"",
        lastName:""

})
  
const storeValue=(input:any)=>{
 const name=input.target.name
 const value=input.target.value

 setUserCred((userCred)=>({...userCred,[name]:value}))

}
const navigate=useNavigate()

const register=async()=>{
  if(userCred.userName==""||userCred.password==""||userCred.firstName==""||userCred.lastName==""){
   setIserror(true)
   setTimeout(() => {
    // Reload the page after 3 seconds
    window.location.reload();
  }, 3000);
  }
  else{
   const response=await axios.post("http://localhost:7777/users/signup",userCred)
   console.log(response.data)
   console.log(response.status)
   if(response.status==201){
    setSuccessAlert(true)
    setTimeout(() => {
      // Reload the page after 3 seconds
      window.location.reload();
    }, 3000); 
   }
  }
   
}
const uniqueUserName=()=>{

}

return(
    <div>
       <h3 className="center-heading" >Create new Account</h3> 

       <Container className="center-container">
      <Form className="form-border2">
      <Form.Group className="mb-3" >
        <Form.Label>First Name</Form.Label>
        <Form.Control  name="firstName"type='text'  onChange={storeValue}/>
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Label>Last Name</Form.Label>
        <Form.Control  name="lastName"type='text'  onChange={storeValue}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>User Name</Form.Label>
        <Form.Control  name="userName"type='text'  onChange={storeValue}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="password" 
          name='password' type='password' onChange={storeValue}/>
      </Form.Group>

         <div className="center-buttons">
          <Button className="btn-success m-1" onClick={register}>Sign Up</Button>
         <div>
          <nav>
          <a href="/login">Already have an Account?</a></nav>
         </div>
        
            
         </div>
         {successAlert && (
        <div className="alert alert-success mt-3" role="alert">
          Success! Your action was successful.
        </div>
      )}
       {iserror && (
        <div className="alert alert-danger mt-3" role="alert">
          Enter vaild details.
        </div>
      )}
          </Form>
         
            </Container>
    </div>
)

}