import { useState } from "react";
import StyledForgotPassword from "./ForgotPasswordStyles";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { usePostForgotPasswordMutation } from "../../app/services/authApi";
import Loader from "../../components/Loader/Loader";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: false });
  const [forgotPasswordUser, { isLoading }] = usePostForgotPasswordMutation();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setMessage("");
  };

  const validateForm = () => {
    const newErrors = {
      email: !formData.email,
    };
    setErrors(newErrors);
    return !newErrors.email;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await forgotPasswordUser(formData);
      setMessage("OTP sent to your email successfully!");
    } catch (error) {
      setMessage("Failed to send OTP. Please check your email.");
    }
  };

  return (
    <StyledForgotPassword>
      <Typography className="forgotpassword-title">
        Please reset your password by providing your email
      </Typography>

      <Paper className="forgotpassword-paper" elevation={10}>
        <form className="forgotpassword-form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            className="forgotpassword-textfield"
            error={errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />

          {isLoading ? (
            <Loader small />
          ) : (
            <Button type="submit" className="otp-button" variant="contained">
              Send OTP
            </Button>
          )}
        </form>

        {message && (
          <Typography className="forgotpassword-message">{message}</Typography>
        )}
      </Paper>
    </StyledForgotPassword>
  );
}

export default ForgotPassword;
