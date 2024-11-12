import { useEffect, useState } from "react"
import { User } from "./User"
import axios, { all } from "axios"
import { Button, Container, Table } from "react-bootstrap"


export const UserTable:React.FC=()=>{
     
    const[allUser,setAlluser]=useState<User[]>([])

    useEffect(()=>{
    getAllUser()
    })
    const getAllUser=async()=>{
        const response=await axios.get("http://localhost:7777/users")
        setAlluser(response.data)

    }
    const removeUser=async(userId:number)=>{
        const response=await axios.delete("http://localhost:7777/users/"+userId)
         
        setAlluser((prevUser)=>prevUser.filter((allUser)=>allUser.userId!==userId))
    }
    return(
        <>
        <Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>emp_id</th>
                    <th>emp_name</th>
                </tr>
            </thead>
            <tbody>
                {allUser.map((user)=>
                <tr>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td className="d-flex justify-content-center"><Button onClick={()=>removeUser(user.userId)}>Remove</Button></td>
                </tr>)}
            </tbody>
        </Table>
        </Container>
        </>
    )
}