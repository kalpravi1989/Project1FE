import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { NavAndFooter } from './Components/NavAndFooterComponent/NavAndFooter';
import { Login } from './Components/LoginRegister/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from './Components/LoginRegister/Register';
import { ReimbursementContainer } from './Components/ReimbursementComponent/ReimbursementContainer';
import { CreateReimnursement } from './Components/ReimbursementComponent/createReimbursement'
import { Home } from './Components/NavAndFooterComponent/Home';
import { ReimbursementContainerManager } from './Components/ReimbursementComponent/ReimbursementContainerManager';
import { UserContainer } from './Components/UserComponet/UserContainer';
import { Logout } from './Components/LoginRegister/Logout';
import { AllReimbursementManager } from './Components/ReimbursementComponent/AllReimbursementManager';
import { EmployeePendingReimbursement } from './Components/ReimbursementComponent/EmployeePendindReimbursement';

function App() {
  return (
    <div className="App">
      <NavAndFooter></NavAndFooter>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/CreateTicket" element={<CreateReimnursement/>}></Route>
      <Route path="/pendingTickets" element={<EmployeePendingReimbursement/>}></Route>
      <Route path="/reimb" element={<ReimbursementContainer/>}></Route>
      <Route path="/reimbs" element={<ReimbursementContainerManager/>}></Route>
      <Route path="/users" element={<UserContainer/>}></Route>
      <Route path="/allTicket" element={<AllReimbursementManager/>}></Route>
      <Route path="/logout" element={<Logout/>}></Route>
      </Routes></BrowserRouter>
      
    </div>
  );
}

export default App;
