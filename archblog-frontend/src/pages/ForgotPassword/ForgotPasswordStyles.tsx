import { styled } from "@mui/material/styles";

const StyledForgotPassword = styled("div")(({ theme }) => ({
  minHeight: 768,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #151617 30%, #272727 90%)",
  padding: theme.spacing(2),
  boxSizing: "border-box",

  "& .forgotpassword-title": {
    fontWeight: 600,
    fontSize: 28,
    marginBottom: theme.spacing(4),
    color: "#FF6D00",
    textAlign: "center",

    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
  },

  "& .forgotpassword-paper": {
    padding: theme.spacing(4),
    width: "100%",
    borderRadius: theme.spacing(2),
    backgroundColor: "#1f1f1f",
    color: "#fff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [theme.breakpoints.up("md")]: {
      maxWidth: 600,
    },
  },

  "& .forgotpassword-form": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  "& .forgotpassword-textfield": {
    marginBottom: theme.spacing(3),
    width: "100%",
  },

  "& .forgotpassword-textfield .MuiInputBase-root": {
    backgroundColor: "#2b2b2b",
    color: "#fff",
  },

  "& .forgotpassword-textfield .MuiInputBase-root.Mui-focused": {
    backgroundColor: "#2b2b2b",
  },

  "& .forgotpassword-textfield input": {
    caretColor: "#FF6D00",
  },

  "& .forgotpassword-textfield .MuiOutlinedInput-notchedOutline": {
    borderColor: "#555",
  },

  "& .forgotpassword-textfield .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FF6D00",
  },

  "& .forgotpassword-textfield .MuiInputLabel-root": {
    color: "#bbb",
  },

  "& .otp-button": {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.2, 4),
    backgroundColor: "#FF6D00",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: theme.spacing(1),
    textTransform: "none",
    width: "100%",
  },

  "& .otp-button:hover": {
    backgroundColor: "#e65c00",
  },

  "& .forgotpassword-loader": {
    height: 10,
  },
}));

export default StyledForgotPassword;
