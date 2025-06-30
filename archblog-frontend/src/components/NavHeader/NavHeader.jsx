import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import StyledNavHeader from "./NavHeaderStyles";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";

const NavHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerItems = [
    { label: "Home", icon: <HomeIcon />, to: "/home" },
    { label: "Write", icon: <CreateIcon />, to: "/write" },
    { label: "My Blogs", icon: <ArticleIcon />, to: "/myblogs" },
    { label: "Profile", icon: <PersonIcon />, to: "/profile" },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        {drawerItems.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.to}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

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

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </StyledNavHeader>
  );
};

export default NavHeader;
