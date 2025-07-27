import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import Layout from "../components/Layout";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
  };
}

const Login: React.FC = () => {
  const [form, setForm] = useState({ user: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [forgotStatus, setForgotStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = form.user.includes("@")
        ? { email: form.user, password: form.password }
        : { username: form.user, password: form.password };
      const res = await API.post<LoginResponse>('/api/auth/login', payload);
      const data = res.data;
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
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
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

  const handleForgotPassword = async () => {
    setForgotStatus(null);
    if (!forgotEmail || !forgotNewPassword || !forgotConfirmPassword) {
      setForgotStatus("Please fill in all fields.");
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotStatus("Passwords do not match.");
      return;
    }
    try {
      await API.post("/api/auth/forgot-password", {
        email: forgotEmail,
        newPassword: forgotNewPassword,
      });
      setForgotStatus("Password reset successful. You can now log in.");
    } catch (err: any) {
      setForgotStatus("Failed to reset password. Please try again.");
    }
  };

  return (
    <Layout currentPage="Login">
      <Box sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#333" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username or Email"
            name="user"
            value={form.user}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: 700, borderRadius: 2, py: 1, mt: 2 }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Button
          color="primary"
          sx={{ mt: 2, textTransform: "none" }}
          onClick={() => setForgotOpen(true)}
        >
          Forgot password?
        </Button>
        <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <TextField
              label="Email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Password"
              type="password"
              value={forgotNewPassword}
              onChange={(e) => setForgotNewPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={forgotConfirmPassword}
              onChange={(e) => setForgotConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            {forgotStatus && <Alert severity="info">{forgotStatus}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleForgotPassword} color="primary">
              Reset
            </Button>
            <Button onClick={() => setForgotOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default Login;
