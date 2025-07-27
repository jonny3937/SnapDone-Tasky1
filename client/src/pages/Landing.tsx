import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="/image.jpg"
          alt="Landing Background"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 1,
            filter: "brightness(0.65) contrast(1.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
            zIndex: 1,
          }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
          Welcome to SnapDone
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: "#e0e0e0" }}>
          Organize your tasks, boost your productivity, and achieve your goals.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ fontWeight: 700, borderRadius: 2, px: 5, py: 1.5 }}
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{ fontWeight: 700, borderRadius: 2, px: 5, py: 1.5, ml: 2, borderColor: "#fff", color: "#fff" }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
