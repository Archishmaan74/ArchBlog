import {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import StyledForgotPassword from "../../pages/ForgotPassword/ForgotPasswordStyles";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { usePostResetPasswordMutation } from "../../app/services/authApi";
import Loader from "../../components/Loader/Loader";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { getApiErrorMessage } from "../../utils/apiError";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [formData, setFormData] = useState({ otp: "", newPassword: "" });
  const [errors, setErrors] = useState({
    otp: false,
    newPassword: false,
  });
  const [showError, setShowError] = useState(false);
  const [resetPasswordUser, { isLoading, error }] =
    usePostResetPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  const validateForm = () => {
    const newErrors = {
      otp: !formData.otp,
      newPassword: !formData.newPassword,
    };

    setErrors(newErrors);

    return !newErrors.otp && !newErrors.newPassword;
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await resetPasswordUser(formData).unwrap();
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledForgotPassword>
      <ErrorModal
        open={showError}
        message={error ? getApiErrorMessage(error) : ""}
        onClose={() => setShowError(false)}
      />

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
