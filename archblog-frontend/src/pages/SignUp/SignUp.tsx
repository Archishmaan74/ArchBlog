import { useState } from "react";
import { Typography, Paper, TextField, Button, MenuItem } from "@mui/material";
import StyledLogin from "../../pages/Login/LoginStyles";
import Loader from "../../components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { usePostRegisterUserMutation } from "../../app/services/authApi";

function SignUp() {
  const initialState = {
    firstName: "",
    lastName: "",
    gender: "",
    companyName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = usePostRegisterUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = [
      "firstName",
      "lastName",
      "gender",
      "companyName",
      "email",
      "password",
    ];

    fields.forEach((field) => {
      if (formData[field].trim() === "") {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await registerUser(formData).unwrap();
      alert("You are registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <StyledLogin>
      <Paper className="login-paper" elevation={10}>
        <form onSubmit={handleSubmit}>
          <div className="login-header">
            <img
              className="img-icon"
              src="/archblog_icon.png"
              alt="ArchBlog Logo"
            />
            <Typography className="login-title">
              Please fill in your details to Sign Up
            </Typography>
          </div>

          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            required
            variant="outlined"
            className="login-textfield"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            helperText={errors.firstName ? "First Name is required" : ""}
          />

          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            required
            variant="outlined"
            className="login-textfield"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            helperText={errors.lastName ? "Last Name is required" : ""}
          />

          <TextField
            select
            label="Gender"
            name="gender"
            fullWidth
            required
            variant="outlined"
            className="login-textfield"
            value={formData.gender}
            onChange={handleChange}
            error={errors.gender}
            helperText={errors.gender ? "Gender is required" : ""}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </TextField>

          <TextField
            label="Company Name"
            name="companyName"
            fullWidth
            required
            variant="outlined"
            className="login-textfield"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
            helperText={errors.companyName ? "Company Name is required" : ""}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            variant="outlined"
            className="login-textfield"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            variant="outlined"
            className="login-textfield"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />

          {isLoading ? (
            <Loader small />
          ) : (
            <Button type="submit" variant="contained" className="login-button">
              Sign Up
            </Button>
          )}

          <Typography className="signup-text">
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </StyledLogin>
  );
}

export default SignUp;
