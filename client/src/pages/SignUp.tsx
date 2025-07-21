import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";
import AvatarUpload from "../components/avatar";
import { useAuth } from "../context/AuthContext";

const SignUp: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    LastName: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = (avatarUrl: string) => {
    setForm({ ...form, avatar: avatarUrl });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
        avatar: form.avatar,
      };
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        const userData = {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          avatar: data.user.avatar || "",
          firstName: data.user.firstName,
          lastName: data.user.lastName,
        };
        
        localStorage.setItem("token", data.token);
        login(userData);
        navigate("/login"); 
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "#f3f6fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 5,
          boxShadow: 6,
          minWidth: 340,
          maxWidth: 800,
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 260,
            background:
              "linear-gradient(135deg,rgb(31, 13, 99) 0%,rgb(37, 43, 53) 100%)",
            color: "#fff",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            textAlign: "center",
          }}
        >
          <AvatarUpload onUpload={handleAvatarUpload} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Welcome to SnapDone!
          </Typography>
          <Typography sx={{ mb: 4, color: "rgba(255,255,255,0.85)" }}>
            Enter your personal details to use all of site features
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#5CB338",
              color: "#fff",
              borderColor: "#fff",
              borderRadius: 2,
              px: 5,
              fontWeight: 700,
              "&:hover": { bgcolor: "#5CB338" },
            }}
            onClick={() => navigate("/login")}
          >
            SIGN IN
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1.2,
            minWidth: 300,
            background:
              "linear-gradient(135deg,rgb(37, 43, 53) 0%,rgb(31, 13, 99) 100%)",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 3, md: 5 },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 2, color: "#eee" }}
          >
            Create Account
          </Typography>
          <Stack direction="row" spacing={2} mb={2}>
            <IconButton sx={{ border: "1px solid #eee", color: "#fff" }}>
              <GoogleIcon />
            </IconButton>
            <IconButton sx={{ border: "1px solid #eee", color: "#fff" }}>
              <GitHubIcon />
            </IconButton>
            <IconButton sx={{ border: "1px solid #eee", color: "#fff" }}>
              <LinkedInIcon />
            </IconButton>
          </Stack>
          <Typography sx={{ color: "#eee", fontSize: 14, mb: 2 }}>
            Use your email or Username for registration
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", color: "#eee" }}
          >
            {error && (
              <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
                {error}
              </Typography>
            )}
            <Stack spacing={2} mb={2}>
              <TextField
                label="First Name"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                slotProps={{
                  input: {
                    style: { color: "#fff" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#fff" },
                    "&.Mui-focused fieldset": { borderColor: "#fff" },
                  },
                  "& .MuiInputLabel-root": { color: "#fff" },
                }}
              />
              <TextField
                label="Last Name"
                name="LastName"
                type="text"
                value={form.LastName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                slotProps={{
                  input: {
                    style: { color: "#fff" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#fff" },
                    "&.Mui-focused fieldset": { borderColor: "#fff" },
                  },
                  "& .MuiInputLabel-root": { color: "#fff" },
                }}
              />
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                slotProps={{
                  input: {
                    style: { color: "#fff" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#fff" },
                    "&.Mui-focused fieldset": { borderColor: "#fff" },
                  },
                  "& .MuiInputLabel-root": { color: "#fff" },
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                slotProps={{
                  input: {
                    style: { color: "#fff" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#fff" },
                    "&.Mui-focused fieldset": { borderColor: "#fff" },
                  },
                  "& .MuiInputLabel-root": { color: "#fff" },
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                slotProps={{
                  input: {
                    style: { color: "#fff" },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#fff" },
                    "&.Mui-focused fieldset": { borderColor: "#fff" },
                  },
                  "& .MuiInputLabel-root": { color: "#fff" },
                }}
              />
            </Stack>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#5CB338",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 2,
                py: 1,
                fontSize: 16,
                px: 4,
                ml: "30%",
                "&:hover": { background: "#49a09d" },
                alignSelf: "center",
              }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUp;
