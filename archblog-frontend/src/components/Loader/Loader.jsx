import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

const StyledLoader = styled("div")(({ theme }) => ({
  height: 600,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "inherit",
  padding: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    height: 400,
    padding: theme.spacing(2),
  },

  "& .loader-spinner": {
    width: 40,
    height: 40,
    color: theme.palette.warning.main,
    thickness: 4,
  },
}));

const Loader = () => (
  <StyledLoader>
    <CircularProgress className="loader-spinner" />
  </StyledLoader>
);

export default Loader;
