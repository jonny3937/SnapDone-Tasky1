import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const drawerWidth = 200;

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page: string) => {
    if (page === "Profile") {
      navigate("/profile");
    } else {
      navigate(`/${page.toLowerCase().replace(" ", "-")}`);
    }
  };

  const getButtonStyle = (pageName: string) => {
    const isActive = currentPage === pageName;
    return {
      color: "#fff",
      bgcolor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
      "&:hover": {
        bgcolor: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
      },
    };
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidth : 0,
          flexShrink: 0,
          transition: "width 0.3s ease",
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? drawerWidth : 0,
            boxSizing: "border-box",
            background:
              "linear-gradient(135deg, rgb(31, 13, 99) 0%, rgb(37, 43, 53) 100%)",
            color: "#fff",
            overflow: "hidden",
            transition: "width 0.3s ease",
          },
        }}
      >
        <Toolbar sx={{ minHeight: 32, px: 0.5 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700, fontSize: "0.8rem" }}
          >
            SnapDone
          </Typography>
        </Toolbar>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <Box
          sx={{
            p: 0.5,
            textAlign: "center",
            display: sidebarOpen ? "block" : "none",
          }}
        >
          <Avatar
            src={user?.avatar}
            sx={{ width: 32, height: 32, mx: "auto", mb: 0.25 }}
          >
            {user?.firstName?.charAt(0) ||
              (user?.username ? user.username.charAt(0).toUpperCase() : "")}
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem" }}>
            {user?.username
              ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
              : ""}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <List sx={{ flexGrow: 1, display: sidebarOpen ? "block" : "none" }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ ...getButtonStyle("Dashboard"), py: 0.3 }}
              onClick={() => handleNavigation("Dashboard")}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 24 }}>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: "0.8rem" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ ...getButtonStyle("Add Tasks"), py: 0.3 }}
              onClick={() => handleNavigation("Add Tasks")}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 24 }}>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Add Tasks" primaryTypographyProps={{ fontSize: "0.8rem" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ ...getButtonStyle("Completed Tasks"), py: 0.3 }}
              onClick={() => handleNavigation("Completed Tasks")}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 24 }}>
                <CheckCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Completed Tasks" primaryTypographyProps={{ fontSize: "0.8rem" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ ...getButtonStyle("Trash"), py: 0.3 }}
              onClick={() => handleNavigation("Trash")}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 24 }}>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Trash" primaryTypographyProps={{ fontSize: "0.8rem" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ ...getButtonStyle("Profile"), py: 0.3 }}
              onClick={() => handleNavigation("Profile")}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 24 }}>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: "0.8rem" }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ p: 0.5, display: sidebarOpen ? "block" : "none" }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LogoutIcon fontSize="small" />}
            onClick={handleLogout}
            sx={{
              bgcolor: "#5CB338",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 2,
              py: 0.5,
              fontSize: "0.8rem",
              "&:hover": { bgcolor: "#49a09d" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#f3f6fb", minHeight: "100vh" }}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: "#fff",
            color: "#333",
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle sidebar"
              onClick={toggleSidebar}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {currentPage}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
