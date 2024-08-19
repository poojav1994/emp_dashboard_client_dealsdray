import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [count, setCount] = useState(0);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("f_Name");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/employees");
      const sortedEmployees = sortEmployees(
        response.data,
        sortColumn,
        sortDirection
      );
      // Filter employees based on the search query
      const filteredEmployees = sortedEmployees.filter((employee) =>
        Object.values(employee).some((value) =>
          value.toString().toLowerCase().includes(searchQuery)
        )
      );

      setEmployees(filteredEmployees);
      setCount(response.data.length);
      console.log(count);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [sortColumn, sortDirection, searchQuery]);

  const handleLogout = () => {
    navigate("/");
  };

  const sortEmployees = (employees, column, direction) => {
    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedEmployees;
  };

  const handleClick = () => {
    navigate("/createemployee");
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `http://localhost:8000/employees/${id}`
      );
      if (response.status === 200) {
        fetchEmployees();
        toast.success("Deleted Succussfully");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const handleSort = (column) => {
    const newSortDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newSortDirection);
  };

  const convertByteArrayToString = (byteArray) => {
    return String.fromCharCode(...byteArray);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  return (
    <div
      className="container-fluid vh-100"
      style={{ backgroundColor: "#D1E9F6" }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/adminhomepage">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employeelist">
                Employee List
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="heading" style={{ backgroundColor: "#f0f8ff" }}>
        <h3>Employee List</h3>
      </div>
      <div className="d-flex justify-content-end align-items-center flex-direction-row ">
        <span className="me-3">Total Count:{count}</span>{" "}
        <button className="btn btn-primary" onClick={handleClick}>
          Create Employee
        </button>
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <input
          type="text"
          placeholder="Search"
          className="form-control me-2 mr-2"
          style={{ maxWidth: "250px" }}
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => handleSort("f_image")}>Image</th>
              <th onClick={() => handleSort("f_Name")}>Name</th>
              <th onClick={() => handleSort("f_Email")}>Email</th>
              <th onClick={() => handleSort("f_Mobile")}>Mobile</th>
              <th onClick={() => handleSort("f_Designation")}>Designation</th>
              <th onClick={() => handleSort("f_Gender")}>Gender</th>
              <th onClick={() => handleSort("f_Course")}>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.f_id}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={"user_image.jpg"}
                    alt={employee.f_Name}
                    thumbnail
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{employee.f_Name}</td>
                <td>{employee.f_Email}</td>
                <td>{employee.f_Mobile}</td>
                <td>{employee.f_Designation}</td>
                <td>{employee.f_Gender}</td>
                <td>{employee.f_Course}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/createemployee/${employee.f_id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(employee.f_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
