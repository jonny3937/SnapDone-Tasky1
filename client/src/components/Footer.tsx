import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      width: "100%",
      py: 3,
      textAlign: "center",
      bgcolor: "rgba(255,255,255,0.85)",
      mt: 8,
    }}
  >
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} SnapDone. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
