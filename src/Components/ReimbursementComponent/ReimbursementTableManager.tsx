import { useEffect, useState } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { Reimbursement } from "./Reimbursement"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { store } from "../GlobalData/store"


export const ReimbursementTableManager:React.FC=()=>{
 
    const[allReimbs,setAllReimbs]=useState<Reimbursement[]>([])
    const accpect:string="Approved"
    const reject:string="Rejected"
    const navigate=useNavigate();
    useEffect(()=>{
        if(store.loggedInUser.userId===0 ){
            navigate("/")
        }
       getallReimb();

    },[])
    const getallReimb=async()=>{
        const response=await axios.get("http://localhost:7777/reimb/status?status=Pending")
        console.log(response.data)
        setAllReimbs(response.data)
    }
    const approveReimb=async(remId:number)=>{
        const response=await axios.patch("http://localhost:7777/reimb/"+remId,accpect,{
            headers: {
              'Content-Type': 'text/plain',
            },
          })
          console.log(response.data)
          setAllReimbs((prevReimb) => prevReimb.filter((allReimbs) => allReimbs.reimbId !== remId))

    }

    const rejectReimb=async(remId:number)=>{
        const response=await axios.patch("http://localhost:7777/reimb/"+remId,reject,{
            headers: {
              'Content-Type': 'text/plain',
            },
          });
          console.log(response.data)
          setAllReimbs((prevReimb) => prevReimb.filter((allReimbs) => allReimbs.reimbId !== remId))     
    }
    return(
        <>
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Reimb_id</th>
                        <th>UserName</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Approve/Denial</th>
                    </tr>
                </thead>
                <tbody>
                    {allReimbs.map((reimb)=>
                    <tr key={reimb.reimbId}>
                        <td>{reimb.reimbId}</td>
                        <td>{reimb.userName}</td>
                        <td>{reimb.description}</td>
                        <td>{reimb.amount}</td>
                        <td><Button onClick={()=>approveReimb(reimb.reimbId)}>Approve</Button> <Button onClick={()=>rejectReimb(reimb.reimbId)}>Reject</Button></td>
                    </tr>)}
                </tbody>
            </Table>
        </Container>
        </>
    )
}