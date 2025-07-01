import { useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import StyledLogin from "./LoginStyles";
import { Link, useNavigate } from "react-router-dom";
import { usePostLoginUserMutation } from "../../app/services/authApi";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = usePostLoginUserMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const validateForm = () => {
    const newErrors = {
      email: !formData.email,
      password: !formData.password,
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await loginUser(formData).unwrap();
      const { token, user } = result;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/home", { replace: true });
      } else {
        alert("Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please check your credentials.");
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
              Welcome to ArchBlog!
            </Typography>
          </div>

          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            className="login-textfield"
            error={errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            className="login-textfield"
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />

          <Link to="/forgotpassword" className="forgot-password">
            Forgot password?
          </Link>

          {isLoading ? (
            <Loader />
          ) : (
            <Button type="submit" variant="contained" className="login-button">
              Login
            </Button>
          )}

          <Button
            type="button"
            className="googlesignin-button"
            startIcon={<GoogleIcon />}
          >
            Sign In with Google
          </Button>

          <Typography className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign-up
            </Link>
          </Typography>
        </form>
      </Paper>
    </StyledLogin>
  );
};

export default Login;
