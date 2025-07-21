import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { 
  Typography, 
  Card, 
  CardContent, 
  Switch, 
  FormControlLabel, 
  Box,
  Divider 
} from "@mui/material";
import { 
  LightMode as LightModeIcon, 
  DarkMode as DarkModeIcon 
} from "@mui/icons-material";

const Settings: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout currentPage="Settings">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, color: isDarkMode ? "#fff" : "#333" }}>
          Settings
        </Typography>
      
      <Card sx={{ 
        mb: 3, 
        maxWidth: 600,
        bgcolor: isDarkMode ? "#2d2d2d" : "#fff",
        color: isDarkMode ? "#fff" : "#333"
      }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            Theme Settings
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Typography>
              <Typography variant="body2" sx={{ color: isDarkMode ? "#ccc" : "#666" }}>
                {isDarkMode 
                  ? "Switch to light mode for a brighter interface" 
                  : "Switch to dark mode for a more comfortable viewing experience"
                }
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  color="primary"
                />
              }
              label=""
            />
          </Box>
        </CardContent>
      </Card>

      <Typography variant="body1" sx={{ color: isDarkMode ? "#ccc" : "#666" }}>
        More settings will be available here in the future.
      </Typography>
      </Box>
    </Layout>
  );
};

export default Settings; 