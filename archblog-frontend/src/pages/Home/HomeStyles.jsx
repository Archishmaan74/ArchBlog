import { styled } from "@mui/material/styles";

const StyledHome = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  color: "#fff",

  "& .home-title": {
    marginBottom: theme.spacing(3),
    color: "#FF6D00",
    fontWeight: 600,
    fontSize: "2rem",
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
