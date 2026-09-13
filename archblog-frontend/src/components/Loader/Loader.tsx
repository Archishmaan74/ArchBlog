import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

interface LoaderProps {
  small?: boolean;
}

interface StyledLoaderProps {
  small: boolean;
}

const StyledLoader = styled("div")<StyledLoaderProps>(({ theme, small }) => ({
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

const Loader = ({ small = false }: LoaderProps) => (
  <StyledLoader small={small}>
    <CircularProgress className="loader-spinner" />
  </StyledLoader>
);

export default Loader;
