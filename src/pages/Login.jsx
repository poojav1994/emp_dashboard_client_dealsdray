import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const gradientStyle = {
    backgroundImage: "linear-gradient(to right, #96C9F4, #4a90e2)",
    height: "100vh",
    width: "100%",
  };

  const validate = () => {
    let validationErrors = {};
    if (!username) validationErrors.username = "Username is required";
    if (!password) validationErrors.password = "Password is required";
    return validationErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const loginData = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        loginData
      );
      console.log("Login successful:", response.data);
      toast.success("Login Succussfully");
      navigate("/adminhomepage");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center vh-100 vw-100"
      style={gradientStyle}
    >
      <div className="row w-100">
        <div className="col-md-4 col-sm-6 mx-auto mt-4">
          <div className="text-center mb-4 mt-5">
            <h2>Login Page</h2>
          </div>
          <div className="card p-4 shadow-sm">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="uname" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="uname"
                    name="uname"
                    className="form-control"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <small className="text-danger">{errors.username}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
