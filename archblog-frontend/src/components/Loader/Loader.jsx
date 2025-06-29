import { CircularProgress, Box } from "@mui/material";

const Loader = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress color="warning" />
  </Box>
);

export default Loader;
