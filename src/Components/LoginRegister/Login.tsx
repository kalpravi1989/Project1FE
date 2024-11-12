import { Button, Container, Form, Nav } from "react-bootstrap"

import { useState } from "react";
import axios from "axios";
import { store } from "../GlobalData/store";
import { useNavigate } from "react-router-dom";
import { error } from "console";

export const Login:React.FC=()=>{
    
    const[errorMsg,setErrorMsg]=useState("")
    const[isError,setIsError]=useState(false)
    const[loginCreds,setLoginCreds]=useState({
        userName:"",
        password:""
    })
    const navigate=useNavigate()
    const storeValue=(input:any)=>{
      
     const name=input.target.name

     const value=input.target.value

     setLoginCreds((loginCreds)=>({...loginCreds,[name]:value}))
    }
    const login=async()=>{
        const response=await axios.post("http://localhost:7777/login",loginCreds).then((response)=>{console.log(response.data)
          store.loggedInUser=response.data
          if(store.loggedInUser.role=='Manager'||store.loggedInUser.role=='manager'){
            navigate("/reimbs")
          }else if(store.loggedInUser.role=='User'||store.loggedInUser.role=='user'){
            navigate("/reimb")
          }
        }).catch(error => {
          if (error.response && error.response.status === 400) {
            // handle 400 error
            console.error('Bad Request:', error.response.data.message);
           setIsError(true)
          } else {
            // handle other errors
            console.error(error);
          }
          setTimeout(() => {
            // Reload the page after 3 seconds
            window.location.reload();
          }, 3000); 
        });
         
        
        
    }
    

    return (
       
    <Container className="center-container">
      <Form className="form-border">
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control  name="userName"type='text'  onChange={storeValue}/>
      </Form.Group>
        
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="password" 
          name='password' type='password' onChange={storeValue}/>
      </Form.Group>
       <div className="center-buttons">
      <Button className="btn-success m-1" onClick={login}>Sign in</Button>
      <div>
      <Button id="reg"onClick={()=>{navigate("/register")}}> Create New Account</Button>
      </div>
      </div>
       {isError &&   (
        <div className="alert alert-danger mt-3" role="alert">
          Enter valid Credentials.
        </div>
      )} 
      </Form>
    
         
         
            </Container>
       
        )
}