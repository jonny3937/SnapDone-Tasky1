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
import { useAuth } from "../context/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import API from '../api/axios';


type RegisterResponse = {
  user: {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    firstName: string;
    lastName: string;
  };
  token: string;
};

const SignUp: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        firstName: form.firstName,
        lastName: form.lastName,
      };
      const res = await API.post<RegisterResponse>('/api/auth/register', payload);
      const data = res.data;
      const userData = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        avatar: data.user.avatar || "",
      };
      localStorage.setItem("token", data.token);
      login(userData);
      navigate("/login");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
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
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 10,
          bgcolor: "green",
          color: "#fff",
          "&:hover": { bgcolor: "darkred" },
        }}
        onClick={() => navigate("/")}
        aria-label="Back to landing"
      >
        <ArrowBackIcon />
      </IconButton>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: { xs: 2, sm: 3, md: 5 },
          boxShadow: {
            xs: 2,
            sm: 4,
            md: 6
          },
          minWidth: { xs: 240, sm: 300, md: 340 },
          maxWidth: { xs: 340, sm: 480, md: 800 },
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: 120, sm: 180, md: 260 },
            background:
              "linear-gradient(135deg,rgb(31, 13, 99) 0%,rgb(37, 43, 53) 100%)",
            color: "#fff",
            borderTopLeftRadius: { xs: 8, sm: 12, md: 20 },
            borderBottomLeftRadius: { xs: 8, sm: 12, md: 20 },
            borderTopRightRadius: { xs: 8, sm: 0, md: 0 },
            borderBottomRightRadius: { xs: 8, sm: 0, md: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, sm: 3, md: 4 },
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" } }}>
            Welcome to SnapDone!
          </Typography>
          <Typography sx={{ mb: 4, color: "rgba(255,255,255,0.85)", fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" } }}>
            Enter your personal details to use all of site features
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#5CB338",
              color: "#fff",
              borderColor: "#fff",
              borderRadius: 2,
              px: { xs: 3, sm: 5 },
              fontWeight: 700,
              fontSize: { xs: 14, sm: 16 },
              minWidth: { xs: 100, sm: 120 },
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
            minWidth: { xs: 160, sm: 220, md: 300 },
            background:
              "linear-gradient(135deg,rgb(37, 43, 53) 0%,rgb(31, 13, 99) 100%)",
            borderTopRightRadius: { xs: 8, sm: 12, md: 20 },
            borderBottomRightRadius: { xs: 8, sm: 12, md: 20 },
            borderTopLeftRadius: { xs: 8, sm: 0, md: 0 },
            borderBottomLeftRadius: { xs: 8, sm: 0, md: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, sm: 3, md: 5 },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 2, color: "#eee", fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" } }}
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
          <Typography sx={{ color: "#eee", fontSize: { xs: 12, sm: 14 }, mb: 2 }}>
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
                name="lastName"
                type="text"
                value={form.lastName}
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
                py: { xs: 0.8, sm: 1 },
                fontSize: { xs: 15, sm: 16 },
                px: { xs: 2.5, sm: 4 },
                mt: 1,
                mx: "auto",
                display: "block",
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
