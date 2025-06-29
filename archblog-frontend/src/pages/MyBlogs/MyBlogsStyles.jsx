import { styled } from "@mui/material";

const StyledMyBlogs = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  color: "#fff",

  "& .myblogs-title": {
    marginBottom: theme.spacing(3),
    color: "#FF6D00",
    fontWeight: 600,
    fontSize: "2rem",
  },
}));

export default StyledMyBlogs;
