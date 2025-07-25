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
        backgroundColor: "#000", // fallback if image fails
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Background Image Layer */}
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

      {/* Foreground Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: { xs: 340, sm: 420, md: 640 },
          px: { xs: 1.5, sm: 3, md: 6 },
          py: { xs: 3, sm: 5, md: 8 },
          bgcolor: "rgba(255, 255, 255, 0.94)",
          borderRadius: { xs: 2, sm: 3, md: 5 },
          boxShadow: {
            xs: "0 4px 12px rgba(0, 0, 0, 0.18)",
            sm: "0 8px 18px rgba(0, 0, 0, 0.22)",
            md: "0 10px 25px rgba(0, 0, 0, 0.3)"
          },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: "#1C1678", mb: 1, letterSpacing: 1.2, fontSize: { xs: "1.4rem", sm: "2rem", md: "2.25rem" } }}
        >
          <span style={{ color: "#5CB338" }}>SNAP</span>
          <span style={{ color: "#1C1678" }}>DONE</span>
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            mb: 3,
            color: "#181c3a",
            fontSize: { xs: "1.5rem", sm: "2.2rem", md: "3.2rem", lg: "3.8rem" },
            lineHeight: 1.2,
          }}
        >
          Organize Freely.
          <br />
          Achieve Boldly.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: "#555",
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
            lineHeight: 1.6,
          }}
        >
          Turn your tasks into achievements with <strong>SnapDone</strong>, the productivity platform that's about to become your favorite task-managing companion.
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: "#5CB338",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 3,
            px: 6,
            py: 1.8,
            fontSize: 18,
            textTransform: "none",
            boxShadow: "0 6px 15px rgba(92,179,56,0.4)",
            transition: "0.3s ease-in-out",
            "&:hover": {
              background: "#4AA43A",
              transform: "scale(1.05)",
              boxShadow: "0 8px 20px rgba(92,179,56,0.5)",
            },
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
