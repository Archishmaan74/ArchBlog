import { useState } from "react";
import StyledForgotPassword from "./ForgotPasswordStyles";
import { Paper, Typography, TextField, Button } from "@mui/material";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleChange = () => {};
  const handleSubmit = () => {};
  return (
    <StyledForgotPassword>
      <Typography className="forgotpassword-title">
        Pls reset your password here by providing your email!
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
            // value={value}
            onChange={handleChange}
            className="forgotpassword-textfield"
          ></TextField>

          <Button className="otp-button">Send OTP</Button>
        </form>
      </Paper>
    </StyledForgotPassword>
  );
}

export default ForgotPassword;
