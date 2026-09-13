import {
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import StyledForgotPassword from "./ForgotPasswordStyles";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { usePostForgotPasswordMutation } from "../../app/services/authApi";
import Loader from "../../components/Loader/Loader";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { getApiErrorMessage } from "../../utils/apiError";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: false });
  const [showError, setShowError] = useState(false);
  const [forgotPasswordUser, { isLoading, error }] =
    usePostForgotPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateForm = () => {
    const newErrors = {
      email: !formData.email,
    };

    setErrors(newErrors);
    return !newErrors.email;
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await forgotPasswordUser(formData).unwrap();
      navigate("/resetpassword", { replace: true });
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
      </Paper>
    </StyledForgotPassword>
  );
}

export default ForgotPassword;
