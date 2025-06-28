import { styled } from "@mui/material/styles";

const StyledNavFooter = styled("footer")(({ theme }) => ({
  backgroundColor: "#CC5500",
  color: theme.palette.common.white,
  textAlign: "center",
  padding: theme.spacing(2, 0),
  marginTop: "auto",

  "& .footer-text": {
    fontSize: theme.typography.body2.fontSize,
  },
}));

export default StyledNavFooter;
