import { useState } from "react";
import StyledForgotPassword from "../../pages/ForgotPassword/ForgotPasswordStyles";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { usePostResetPasswordMutation } from "../../app/services/authApi";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [formData, setFormData] = useState({ otp: "", newPassword: "" });
  const [errors, setErrors] = useState({ otp: false, newPassword: false });
  const [resetPasswordUser, { isLoading }] = usePostResetPasswordMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateForm = () => {
    const newErrors = {
      otp: !formData.otp,
      newPassword: !formData.newPassword,
    };
    setErrors(newErrors);
    return !newErrors.otp && !newErrors.newPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await resetPasswordUser(formData);
      if (result) {
        alert("Password reset successful!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <StyledForgotPassword>
      <Typography className="forgotpassword-title">
        Enter OTP and your new password
      </Typography>

      <Paper className="forgotpassword-paper" elevation={10}>
        <form className="forgotpassword-form" onSubmit={handleSubmit}>
          <TextField
            label="OTP"
            name="otp"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={formData.otp}
            onChange={handleChange}
            className="forgotpassword-textfield"
            error={errors.otp}
            helperText={errors.otp ? "OTP is required" : ""}
          />

          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={formData.newPassword}
            onChange={handleChange}
            className="forgotpassword-textfield"
            error={errors.newPassword}
            helperText={errors.newPassword ? "New password is required" : ""}
          />

          {isLoading ? (
            <Loader small />
          ) : (
            <Button type="submit" className="otp-button" variant="contained">
              Reset Password
            </Button>
          )}
        </form>
      </Paper>
    </StyledForgotPassword>
  );
}

export default ResetPassword;
