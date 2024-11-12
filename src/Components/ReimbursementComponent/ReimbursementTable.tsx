import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap"
import { store } from "../GlobalData/store";
import { useNavigate } from "react-router-dom";

interface Reimbursement{

    reimbId:number,
    description:string,
    amount:number,
    reason:string,
    status:string,
    comment:string

}

export const ReimbursementTable:React.FC<{reimb:Reimbursement[]}>=({reimb})=>{

   const navigate=useNavigate()
  useEffect(()=>{
    if(store.loggedInUser.userId===0){
        navigate("/")
  }},[])
 

      


    return(
        <>
        <Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Reimb_Id</th>
                    <th>Describtion</th>
                
                    <th>amount</th>
                    <th>Status</th>
        
                </tr>
            </thead>
            <tbody>
                {reimb.map((reim)=>
                <tr key={reim.reimbId}>
                    <td>{reim.reimbId}</td>
                    <td>{reim.description}</td>
                    <td>{reim.amount}</td>
                    <td>{reim.status}</td>
                   

                </tr>)}
            </tbody>
        </Table>
    
        </Container>

        </>
    )
}