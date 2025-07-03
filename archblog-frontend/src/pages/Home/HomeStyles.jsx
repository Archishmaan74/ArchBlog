import { styled } from "@mui/material/styles";

const StyledHome = styled("div")(({ theme }) => ({
  maxWidth: 800,
  margin: "0 auto",
  padding: theme.spacing(2),
  color: "#fff",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
  },

  "& .home-title": {
    marginBottom: theme.spacing(3),
    color: "#FF6D00",
    fontWeight: 600,
    fontSize: 32,
    textAlign: "center",
  },

  "& .blog-card": {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: "#1f1f1f",
    borderRadius: theme.spacing(2),
  },

  "& .blog-title": {
    color: "#FF9100",
    fontWeight: 600,
    fontSize: 20,
  },

  "& .blog-genre": {
    color: "gray",
    fontSize: 14,
  },

  "& .blog-content": {
    marginTop: theme.spacing(1),
    fontSize: 16,
  },

  "& .blog-date": {
    display: "block",
    marginTop: theme.spacing(1),
    fontSize: 12,
    color: "gray",
  },
}));

export default StyledHome;
