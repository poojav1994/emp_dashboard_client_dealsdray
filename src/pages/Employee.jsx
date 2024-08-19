import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

function Employee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch employee data for editing if id is present
      const fetchEmployeeData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/employees/${id}`
          );
          const employee = response.data;
          setFormData({
            name: employee.f_Name,
            email: employee.f_Email,
            mobile: employee.f_Mobile,
            designation: employee.f_Designation,
            gender: employee.f_Gender,
            courses: employee.f_Course ? employee.f_Course.split(", ") : [],
            image: null,
          });
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };
      fetchEmployeeData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        courses: checked
          ? [...prevState.courses, value]
          : prevState.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else {
      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(formData.mobile)) {
        errors.mobile = "Please enter a valid 10-digit mobile number";
      }
    }

    if (!formData.designation) {
      errors.designation = "Designation is required";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    if (formData.courses.length === 0) {
      errors.courses = "At least one course must be selected";
    }

    if (!formData.image) errors.image = "Image is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const newErrors = validateForm(formData);

    // If there are errors, set them and do not proceed with the form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      f_Name: formData.name,
      f_Email: formData.email,
      f_Mobile: formData.mobile,
      f_Designation: formData.designation,
      f_Gender: formData.gender,
      f_Course: formData.courses.join(", "),
      f_Createdate: new Date().toISOString().split("T")[0],
      f_image: formData.image ? formData.image.name : null,
    };

    try {
      let response;
      if (id) {
        response = await axios.patch(
          `http://localhost:8000/employees/${id}`,
          data
        );
        toast.success("Employee updated successfully");
      } else {
        console.log("f-b", data);
        response = await axios.post("http://localhost:8000/employees", data);
        toast.success("Employee added successfully");
      }
      navigate("/employeelist");
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("Failed to save employee");
    }
  };

  return (
    <div
      className="container-fluid vh-100 w-100"
      style={{ backgroundColor: "#D1E9F6" }}
    >
      <div className="row w-100">
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
            <ul className="navbar-nav me-auto p-1">
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
        <div className="mb-4" style={{ backgroundColor: "#f0f8ff" }}>
          <h2>{id ? "Edit" : "Create"} Employee</h2>
        </div>
        <div className="col-md-4 col-sm-6 col-lg-6 mx-auto mt-4">
          <div className="card p-4 w-100 shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                  {errors.mobile && (
                    <div className="text-danger">{errors.mobile}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="designation" className="form-label">
                    Designation
                  </label>
                  <select
                    id="designation"
                    name="designation"
                    className="form-select"
                    value={formData.designation}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Designation</option>
                    <option value=" Manager"> Manager</option>
                    <option value="HR">HR</option>
                    <option value="sales ">Sales </option>
                  </select>
                  {errors.designation && (
                    <div className="text-danger">{errors.designation}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                        className="form-check-input"
                        checked={formData.gender === "Male"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="male" className="form-check-label">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        className="form-check-input"
                        checked={formData.gender === "Female"}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="female" className="form-check-label">
                        Female
                      </label>
                    </div>
                  </div>
                  {errors.gender && (
                    <div className="text-danger">{errors.gender}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Course</label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="MCA"
                      name="courses"
                      value="MCA"
                      className="form-check-input"
                      checked={formData.courses.includes("MCA")}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="MCA" className="form-check-label">
                      MCA
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="BSC"
                      name="courses"
                      value="BSC"
                      className="form-check-input"
                      checked={formData.courses.includes("BSC")}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="BSC" className="form-check-label">
                      BSC
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="BCA"
                      name="courses"
                      value="BCA"
                      className="form-check-input"
                      checked={formData.courses.includes("BCA")}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="BCA" className="form-check-label">
                      BCA
                    </label>
                  </div>
                  {errors.courses && (
                    <div className="text-danger">{errors.courses}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                  {errors.image && (
                    <small className="text-danger">{errors.image}</small>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;

// const handleInputChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   if (type === "checkbox") {
//     setFormData((prevState) => ({
//       ...prevState,
//       courses: checked
//         ? [...prevState.courses, value]
//         : prevState.courses.filter((course) => course !== value),
//     }));
//   } else if (type === "file") {
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: e.target.files[0],
//     }));
//   } else {
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }
// };
