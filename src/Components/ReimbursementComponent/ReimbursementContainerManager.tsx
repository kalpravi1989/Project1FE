import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReimbursementTableManager } from "./ReimbursementTableManager";
import { store } from "../GlobalData/store";

export const ReimbursementContainerManager:React.FC=()=>{
    

    const[isAuth,setIsAuth]=useState(false)
    useEffect(()=>{
      if(store.loggedInUser.userId===0&&store.loggedInUser.role==='User'){
        navigate("/")
      }else{
        setIsAuth(true)
      }
    },[])
    const navigate=useNavigate();
    return(
        <>
       
       {isAuth &&
        <Container>
            
             <Button  style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "5px 5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer", 
          }}onClick={()=>{navigate("/users")}}>All Employees</Button>
             <Button  style={{
            position: "absolute",
            top: "10px",
            right: "130px",
            padding: "5px 5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer", 
          }}onClick={()=>{navigate("/allTicket")}}>All Tickets</Button>
           <Button  style={{
            position: "absolute",
            top: "10px",
            right: "220px",
            padding: "5px 5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer", 
          }}onClick={()=>{navigate("/CreateTicket")}}>Create Ticket</Button>
          <Button  style={{
            position: "absolute",
            top: "10px",
            right: "330px",
            padding: "5px 5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer", 
          }}onClick={()=>{navigate("/pendingTickets")}}>Edit Ticket</Button>
          
           <h3>Manager reimbursement table contains all reimbursement</h3>
           <ReimbursementTableManager ></ReimbursementTableManager>

        </Container>
}
        </>
    )
}