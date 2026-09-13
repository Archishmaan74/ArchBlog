import { Box, styled } from "@mui/material";

const StyledEmptyState = styled(Box)({
  textAlign: "center",
  padding: "80px 16px",
  animation: "fadeUp 0.5s ease-out",
  "@keyframes fadeUp": {
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  ".empty-title": {
    fontWeight: 700,
    marginBottom: "8px",
  },
  ".empty-message": {
    maxWidth: "420px",
    margin: "0 auto",
    lineHeight: 1.7,
    color: "#666",
  },
});

export default StyledEmptyState;
