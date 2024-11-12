import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Table } from "react-bootstrap"
import { Reimbursement } from "./Reimbursement"

export const AllReimbursementManager:React.FC=()=>{

    const[allReimb,setAllReimb]=useState<Reimbursement[]>([])
    const[isError,setIsError]=useState(false)
    useEffect(()=>{

      getAllreimb();
    })
    const getAllreimb=async()=>{
        const response=await axios.get("http://localhost:7777/reimb")
        setAllReimb(response.data);
        
    }
    return(
        <div>
            <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Reimb_id</th>
                        <th>Describtion</th>
                        <th>userName</th>
                        <th>amount</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {allReimb.map((reimb)=>
                    <tr key={reimb.reimbId}>
                        <td>{reimb.reimbId}</td>
                        <td>{reimb.description}</td>
                        <td>{reimb.userName}</td>
                        <td>{reimb.amount}</td>
                        <td>{reimb.status}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
            </Container>
        </div>
    )
}