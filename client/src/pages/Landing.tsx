import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100vh",
        overflow: "hidden",
        width: "100vw",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Box
          component="img"
          src="/landing.jpg"
          alt="Landing"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(24,28,58,0.6) 100%)",
            zIndex: 1,
          }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 600,
          px: 4,
          py: 8,
          bgcolor: "rgba(255,255,255,0.85)",
          borderRadius: 4,
          boxShadow: 6,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1C1678", mb: 2 }}
        >
          <span style={{ color: "#5CB338" }}>SNAP</span>
          <span style={{ color: "#1C1678" }}>DONE</span>
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, mb: 2, color: "#181c3a" }}
        >
          Organize Freely.
          <br />
          Achieve Boldly.
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: "#444" }}>
          Turn your Tasks into achievements with SnapDone the productivity site
          that`s about to become your new task managing Friend.
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: "#5CB338",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 2,
            px: 5,
            py: 1.5,
            fontSize: 18,
            boxShadow: 3,
            "&:hover": { background: "#49a09d" },
          }}
          size="large"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
