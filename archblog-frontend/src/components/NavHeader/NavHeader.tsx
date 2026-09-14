import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";
import StyledNavHeader, { StyledDrawer } from "./NavHeaderStyles";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "../../context/ThemeContext";

const NavHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavigation = () => {
    setMobileOpen(false);
  };

  const drawerItems = [
    { label: "Home", icon: <HomeIcon />, to: "/home" },
    { label: "Write", icon: <CreateIcon />, to: "/write" },
    { label: "My Blogs", icon: <ArticleIcon />, to: "/myblogs" },
    { label: "Profile", icon: <PersonIcon />, to: "/profile" },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {drawerItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.to}
            onClick={handleNavigation}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        <ListItem onClick={toggleTheme}>
          <ListItemIcon>
            {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </ListItemIcon>
          <ListItemText
            primary={theme === "light" ? "Dark Mode" : "Light Mode"}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledNavHeader>
      <AppBar position="static" elevation={0} className="nav-appbar">
        <Toolbar className="nav-toolbar">
          <Box component={Link} to="/home" className="nav-logo-wrap">
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
            {drawerItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.to}
                className="nav-button"
              >
                {item.icon}
              </Button>
            ))}

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              aria-label="toggle theme"
            >
              {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>

          <IconButton
            edge="end"
            className="nav-menu-icon"
            color="inherit"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <StyledDrawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </StyledDrawer>
    </StyledNavHeader>
  );
};

export default NavHeader;
