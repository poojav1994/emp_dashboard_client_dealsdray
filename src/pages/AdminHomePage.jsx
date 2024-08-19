import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminHomePage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="container-fluid vh-100">
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
      <div className="mb-4 p-2" style={{ backgroundColor: "#0174BE" }}>
        <h4>Dashboard</h4>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center vh-100"
        style={{
          marginTop: "-120px",
          backgroundImage: "linear-gradient(to right, #96C9F4, #4a90e2)",
        }}
      >
        <h1>Welcome Admin Panel</h1>
      </div>
    </div>
  );
}

export default AdminHomePage;

// import React from "react";
// import { Link } from "react-router-dom";

// function AdminHomePage() {
//   return (
//     <div className="container-fluid vh-100">
//       <div className="row h-100">
//         <nav className="col-md-2 d-none d-md-block bg-light sidebar">
//           <div className="position-sticky">
//             <ul className="nav flex-column">
//               <li className="nav-item">
//                 <span className="nav-link active" aria-current="page">
//                   Home
//                 </span>
//               </li>
//               <li className="nav-item">
//                 <Link to="/employee-list" className="nav-link">
//                   Employee List
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>
//         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex flex-column align-items-center justify-content-center">
//           <div className="text-center mb-4">
//             <h2>Dashboard</h2>
//           </div>
//           <h1>Welcome to Admin Panel</h1>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminHomePage;
