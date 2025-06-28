import { styled } from "@mui/material/styles";

const StyledLogin = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #151617 30%, #272727 90%)",
  padding: theme.spacing(2),

  "& .login-paper": {
    padding: theme.spacing(4),
    maxWidth: 425,
    width: "100%",
    borderRadius: theme.spacing(2),
    backgroundColor: "#1f1f1f",
    color: "#fff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  },

  "& .login-title": {
    fontWeight: 600,
    fontSize: "1.8rem",
    marginBottom: theme.spacing(3),
    color: "#FF6D00",
    textAlign: "center",
  },

  "& .login-textfield": {
    marginBottom: theme.spacing(2),
  },

  "& .login-textfield .MuiInputBase-root": {
    backgroundColor: "#2b2b2b",
    color: "#fff",
  },

  "& .login-textfield .MuiInputLabel-root": {
    color: "#bbb",
  },

  "& .login-textfield .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#FF6D00",
    },

  "& .login-textfield .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#FF6D00",
    },

  "& .login-button": {
    marginTop: theme.spacing(2),
    width: "100%",
    backgroundColor: "#FF6D00",
    color: "#fff",
    fontWeight: "bold",
  },

  "& .googlesignin-button": {
    marginTop: theme.spacing(2),
    width: "100%",
    backgroundColor: "#fff",
    color: "#151617",
    fontWeight: 400,
    textTransform: "none",
    border: "1px solid #ddd",

    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },

  "& .login-button:hover": {
    backgroundColor: "#e65c00",
  },

  "& .forgot-password": {
    display: "block",
    textAlign: "right",
    marginTop: "-8px",
    fontSize: 14,
    textDecoration: "none",
    color: "#FF6D00",
    "&:hover": {
      textDecoration: "underline",
    },
  },

  "& .signup-text": {
    display: "block",
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },
  "& .signup-link": {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default StyledLogin;
