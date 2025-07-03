import { styled } from "@mui/material/styles";

const StyledMyBlogs = styled("div")(({ theme }) => ({
  padding: 32,
  maxWidth: 900,
  margin: "auto",

  ".home-title": {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 16,
    textAlign: "center",
  },

  ".blog-card": {
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },

  ".blog-header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
    flexWrap: "nowrap",

    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },

  ".blog-title": {
    fontSize: 22,
    fontWeight: 600,
    flex: 1,
    wordBreak: "break-word",
  },

  ".flex-box": {
    display: "flex",
    gap: 8,
    flexShrink: 0,
  },

  ".blog-content": {
    fontSize: 16,
    marginBottom: 8,
  },

  ".blog-date": {
    fontSize: 14,
    color: "#666",
  },

  ".action-buttons": {
    display: "flex",
    gap: 8,
    marginTop: 8,
    justifyContent: "flex-end",
  },
}));

export default StyledMyBlogs;
