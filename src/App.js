import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AdminHomePage from "./pages/AdminHomePage";
import Employee from "./pages/Employee";
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminhomepage" element={<AdminHomePage />} />
          <Route path="/createemployee" element={<Employee />} />
          <Route path="/employeelist" element={<EmployeeList />} />
          <Route path="/createemployee/:id" element={<Employee />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
