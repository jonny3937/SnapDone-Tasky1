import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #fff 50%, rgba(24,28,58,0.7) 100%), url('/landing.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 8 },
        py: { xs: 6, md: 0 },
      }}
    >
        <Box sx={{ maxWidth: 500, zIndex: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1C1678", mb: 2 }}>
          <span style={{ color: "#5CB338" }}>SNAP</span>
          <span style={{ color: "#1C1678" }}>DONE</span>
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, color: "#181c3a" }}>
          Organize Freely.<br />Achieve Boldly.
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: "#444" }}>
          Turn your Tasks into achievements with SnapDone the productivity site that`s about to become your new task managing Friend.
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
        <Box
        sx={{
          position: "relative",
          width: { xs: "100%", md: 500 },
          mt: { xs: 6, md: 0 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      </Box>
    </Box>
  );
};

export default Landing; 