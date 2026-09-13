import { styled } from "@mui/material/styles";

const StyledAddBlog = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),

  "& .addblog-paper": {
    padding: theme.spacing(4),
    maxWidth: 600,
    width: "100%",
    borderRadius: theme.spacing(2),
    backgroundColor: "#1f1f1f",
    color: "#fff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  },

  "& .addblog-header": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  "& .addblog-title": {
    fontWeight: 600,
    fontSize: "1.8rem",
    marginBottom: theme.spacing(3),
    color: "#FF6D00",
    textAlign: "center",
  },

  "& .addblog-textfield": {
    marginBottom: theme.spacing(2),
  },

  "& .addblog-textfield .MuiInputBase-root": {
    backgroundColor: "#2b2b2b",
    color: "#fff",
  },

  "& .addblog-textfield .MuiInputLabel-root": {
    color: "#bbb",
  },

  "& .addblog-textfield .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#FF6D00",
    },

  "& .addblog-textfield .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#FF6D00",
    },

  "& .submit-button": {
    marginTop: theme.spacing(2),
    width: "100%",
    backgroundColor: "#FF6D00",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e65c00",
    },
  },
}));

export default StyledAddBlog;
