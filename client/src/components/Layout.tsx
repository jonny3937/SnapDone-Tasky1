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
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : 0,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #1C1678 0%, #2C225C 100%)',
            color: '#fff',
            overflow: 'hidden',
            boxShadow: '2px 0 16px 0 rgba(44,34,92,0.12)',
            borderRight: 'none',
            transition: 'width 0.3s ease',
          },
        }}
      >
        <Toolbar sx={{ minHeight: 32, px: 0.5 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 900, fontSize: '1rem', letterSpacing: 1.2, color: '#fff' }}
          >
            SnapDone
          </Typography>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        <Box
          sx={{
            p: 0.5,
            textAlign: 'center',
            display: sidebarOpen ? 'block' : 'none',
          }}
        >
          <Avatar
            src={user?.avatar}
            sx={{
              width: 48,
              height: 48,
              mx: 'auto',
              mb: 0.5,
              border: '3px solid #5CB338',
              boxShadow: 2,
              bgcolor: '#fff',
              color: '#1C1678',
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            {user?.firstName?.charAt(0) || (user?.username ? user.username.charAt(0).toUpperCase() : "")}
          </Avatar>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, fontSize: '1rem', color: '#fff', lineHeight: 1.1 }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', mt: -0.5 }}
          >
            {user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : ""}
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        <List sx={{ flexGrow: 1, display: sidebarOpen ? 'block' : 'none', mt: 1 }}>
          {[{ label: 'Dashboard', icon: <DashboardIcon fontSize="small" /> },
            { label: 'Add Tasks', icon: <AddIcon fontSize="small" /> },
            { label: 'Completed Tasks', icon: <CheckCircleIcon fontSize="small" /> },
            { label: 'Trash', icon: <DeleteIcon fontSize="small" /> },
            { label: 'Profile', icon: <PersonIcon fontSize="small" /> }].map(({ label, icon }) => (
            <ListItem disablePadding key={label}>
              <ListItemButton
                sx={{
                  ...getButtonStyle(label),
                  py: 0.6,
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  transition: 'background 0.18s, box-shadow 0.18s',
                  boxShadow: currentPage === label ? '0 2px 10px 0 rgba(92,179,56,0.10)' : 'none',
                  '&:hover': {
                    bgcolor: 'rgba(92,179,56,0.10)',
                    boxShadow: '0 2px 10px 0 rgba(92,179,56,0.14)',
                  },
                }}
                onClick={() => handleNavigation(label)}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: 24 }}>{icon}</ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 1.5, display: sidebarOpen ? 'block' : 'none', mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LogoutIcon fontSize="small" />}
            onClick={handleLogout}
            sx={{
              bgcolor: '#5CB338',
              color: '#fff',
              fontWeight: 800,
              borderRadius: 2,
              py: 1.1,
              fontSize: '1rem',
              letterSpacing: 1,
              boxShadow: '0 2px 12px 0 rgba(92,179,56,0.18)',
              mt: 2,
              '&:hover': { bgcolor: '#4AA43A', boxShadow: '0 4px 18px 0 rgba(92,179,56,0.28)' },
              transition: 'all 0.18s',
            }}
          >
            LOGOUT
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
            bgcolor: '#fff',
            color: '#1C1678',
            boxShadow: '0 2px 12px 0 rgba(44,34,92,0.04)',
            borderBottom: '1px solid #e0e0e0',
            borderRadius: '0 0 16px 16px',
            height: 58,
            display: 'flex',
            justifyContent: 'center',
            px: { xs: 1, sm: 3 },
          }}
        >
          <Toolbar sx={{ minHeight: 58, px: { xs: 1, sm: 2 }, width: '100%' }}>
            <IconButton
              color="inherit"
              aria-label="toggle sidebar"
              onClick={toggleSidebar}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 900,
                fontSize: { xs: '1.1rem', sm: '1.4rem' },
                textAlign: 'center',
                letterSpacing: 1.2,
                color: '#1C1678',
                textShadow: '0 1px 2px #f3f6fb',
              }}
            >
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
