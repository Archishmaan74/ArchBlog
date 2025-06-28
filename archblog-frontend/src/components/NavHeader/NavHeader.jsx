import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import StyledNavHeader from "./NavHeaderStyles";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";

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
              <HomeIcon />
            </Button>
            <Button component={Link} to="/write" className="nav-button">
              <CreateIcon />
            </Button>
            <Button component={Link} to="/yourblogs" className="nav-button">
              <ArticleIcon />
            </Button>
            <Button component={Link} to="/user" className="nav-button">
              <PersonIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </StyledNavHeader>
  );
};

export default NavHeader;
