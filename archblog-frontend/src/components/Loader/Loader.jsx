import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

const StyledLoader = styled("div")(({ theme, small }) => ({
  height: small ? "auto" : 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "inherit",
  padding: small ? theme.spacing(0.5) : theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    height: small ? "auto" : 400,
    padding: small ? theme.spacing(0.5) : theme.spacing(2),
  },

  "& .loader-spinner": {
    width: small ? 20 : 40,
    height: small ? 20 : 40,
    color: theme.palette.warning.main,
  },
}));

const Loader = ({ small = false }) => (
  <StyledLoader small={small}>
    <CircularProgress className="loader-spinner" />
  </StyledLoader>
);

export default Loader;
