import { Container, Nav, Navbar } from "react-bootstrap"
import { store } from "../GlobalData/store"
import { useEffect } from "react"


export const NavAndFooter:React.FC=()=>{
 
  useEffect(()=>{

  }
  )

    return(
        
        <Navbar bg="dark" data-bs-theme="dark">
         
        <Container>
          <Navbar.Brand href="">Employee Reimbursement System</Navbar.Brand>
        </Container>
      </Navbar>
    )
}