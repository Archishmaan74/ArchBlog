import { styled } from "@mui/material/styles";

const StyledNavHeader = styled("header")(({ theme }) => ({
  "& .nav-appbar": {
    backgroundColor: "#CC5500",
  },

  "& .nav-toolbar": {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
  },

  "& .nav-logo-wrap": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },

  "& .nav-logo-img": {
    width: 32,
    height: 32,
    objectFit: "contain",
  },

  "& .nav-logo-text": {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
  },

  "& .nav-links": {
    display: "flex",
    gap: theme.spacing(2),
  },

  "& .nav-button": {
    color: theme.palette.common.white,
    textTransform: "none",
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default StyledNavHeader;
