import { Outlet } from "react-router-dom";
import NavHeader from "./components/NavHeader/NavHeader";
import NavFooter from "./components/NavFooter/NavFooter";
import { Container, Box } from "@mui/material";

const AppLayout = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <NavHeader />
        <Box component="main" flexGrow={1}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Outlet />
          </Container>
        </Box>
        <NavFooter />
      </Box>
    </>
  );
};

export default AppLayout;
