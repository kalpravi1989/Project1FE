import { Button, Container } from "react-bootstrap"
import { store } from "../GlobalData/store"
import { useEffect, useState } from "react"
import axios from "axios"
import { ReimbursementTable } from "./ReimbursementTable"
import { useNavigate } from "react-router-dom"



export const ReimbursementContainer:React.FC=()=>{

    const[reimb,setReimb]=useState([])
    const navigate=useNavigate();
    useEffect(()=>{
        if(store.loggedInUser.userId===0){
            navigate("/")
        }else{
        getAllReimbByuserId()
        }
    },[])
    
    const getAllReimbByuserId=async()=>{
            const response=await axios.get("http://localhost:7777/reimb/users/"+store.loggedInUser.userId)
            console.log(response.data)
            setReimb(response.data)

    }

    return(
        <>
        
        <Container>
            
             <Button  style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer", 
          }}onClick={()=>{navigate("/CreateTicket")}}>Create Ticket</Button>
            <Button  style={{
            position: "absolute",
            top: "10px",
            right: "200px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer", 
          }}onClick={()=>{navigate("/pendingTickets")}}>Pending Ticket</Button>
          {(store.loggedInUser.role=="user"|| store.loggedInUser.role=="User")&& <> <h3>{store.loggedInUser.userName}'s Reimbursements</h3>
            <ReimbursementTable reimb={reimb}></ReimbursementTable></>}
           
        </Container>
        </>
    )
}