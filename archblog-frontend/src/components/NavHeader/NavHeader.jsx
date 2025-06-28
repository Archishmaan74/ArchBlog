import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import StyledNavHeader from "./NavHeaderStyles";

const NavHeader = () => {
  return (
    <StyledNavHeader>
      <AppBar position="static" elevation={0} className="nav-appbar">
        <Toolbar className="nav-toolbar">
          <Box className="nav-logo-wrap">
            <Box
              component="img"
              src="/archblog_icon.png"
              alt="Logo"
              className="nav-logo-img"
            />
            <Typography variant="h6" className="nav-logo-text">
              ArchBlog
            </Typography>
          </Box>

          <Box className="nav-links">
            <Button component={Link} to="/home" className="nav-button">
              Home
            </Button>
            <Button component={Link} to="/blogs" className="nav-button">
              Blogs
            </Button>
            <Button component={Link} to="/login" className="nav-button">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </StyledNavHeader>
  );
};

export default NavHeader;
