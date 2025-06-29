import { styled } from "@mui/material/styles";

const StyledMyBlogs = styled("div")({
  padding: "2rem",
  maxWidth: "900px",
  margin: "auto",

  ".home-title": {
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: "1rem",
    textAlign: "center",
  },

  ".blog-card": {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#fafafa",
  },

  ".blog-title": {
    fontSize: "1.4rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },

  ".blog-content": {
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },

  ".blog-date": {
    fontSize: "0.875rem",
    color: "#666",
  },
});

export default StyledMyBlogs;
