import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/settings");
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ background: "rgba(255,255,255,0.95)" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <CheckCircleOutlineIcon
            sx={{ color: "#1cb5e0", fontSize: 32, mr: 1 }}
          />
          <Typography variant="h5" sx={{ color: "#000000", fontWeight: 700 }}>
            SnapDone
          </Typography>
        </Box>

        <Box display="flex" gap={2} alignItems="center">
          {isAuthenticated ? (
            <>
              <Typography
                variant="body2"
                sx={{ color: "#000000", fontWeight: 600 }}
              >
                Welcome, {user?.firstName || user?.username}!
              </Typography>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  p: 0,
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <Avatar
                  src={user?.avatar}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid #1cb5e0",
                    bgcolor: user?.avatar ? "transparent" : "#1cb5e0",
                  }}
                >
                  {!user?.avatar && <AccountCircleIcon />}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <MenuItem onClick={handleProfile}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }}>
                      {!user?.avatar && <AccountCircleIcon />}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {user?.firstName} {user?.lastName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Typography variant="body2">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  background: "#d4ff00",
                  color: "#222",
                  fontWeight: 700,
                  "&:hover": { background: "#c0e800" },
                }}
                onClick={() => navigate("/signup")}
              >
                CREATE ACCOUNT
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#1cb5e0",
                  borderColor: "#1cb5e0",
                  fontWeight: 700,
                }}
                onClick={() => navigate("/login")}
              >
                LOG IN
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
