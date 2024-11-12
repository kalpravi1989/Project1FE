import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../GlobalData/store";
import axios from "axios";
import { ReimbursementTable } from "./ReimbursementTable";
import { Button, Container, Modal, Table } from "react-bootstrap";

interface Reimbursement{

    reimbId:number,
    description:string,
    amount:number,
    reason:string,
    status:string,
    comment:string

}
export const EmployeePendingReimbursement:React.FC=()=>{

    const[reimb,setReimb]=useState<Reimbursement[]>([])
    const [data, setData] = useState<Reimbursement[]>(reimb);
    const [selectedRow, setSelectedRow] = useState<Reimbursement|null>(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [newDescription, setNewDescription] = useState<string>("");
 
    const navigate=useNavigate();
    useEffect(()=>{
        if(store.loggedInUser.userId===0){
            navigate("/")
        }else{
        getAllReimbByuserId()
        }
    },[])
    

    const handleEditclick=(row:Reimbursement)=>{
        setSelectedRow(row);
        setNewDescription(row.description);
        setIsModalOpen(true);
  }
    const getAllReimbByuserId=async()=>{
            const response=await axios.get("http://localhost:7777/reimb/users?status=Pending&userId="+store.loggedInUser.userId)
            setReimb(response.data)

    }

    const handleSave = async () => {
        try {
          // Send a PUT request to the backend to update the description
          const response = await axios.patch(`http://localhost:7777/reimb/description/${selectedRow?.reimbId}`,newDescription,{
            headers: {
              'Content-Type': 'text/plain',
            },
          })
    
          if (response.status === 200) {
            // If the update is successful, update the frontend state
            const updatedData =data.map((item) =>
              item.reimbId ===selectedRow?.reimbId ? { ...item, description: newDescription } : item
            );
            getAllReimbByuserId();
            setData(updatedData);
            setIsModalOpen(false); // Close the modal
          } else {
            console.error("Failed to update data in the backend");
          }
        } catch (error) {
          console.error("Error updating data:", error);
        }
      };
    
    return(
        <>
        <Container>
            <h3>{store.loggedInUser.userName}'s Pending Reimbursement</h3>
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
                    <td><Button onClick={()=>{handleEditclick(reim)}}>Edit</Button></td>

                </tr>)}
            </tbody>
        </Table>
    
        </Container>

        {isModalOpen && (
       <div
       className="modal show"
       style={{ display: 'block', position: 'initial' }}
     >
       <Modal.Dialog>
 
          <h3>Edit Description</h3>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)} // Update description value
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </Modal.Dialog>
          </div>
      )}
        </>
    )
}