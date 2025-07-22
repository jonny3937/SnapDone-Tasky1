import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login: React.FC = () => {
  const [form, setForm] = useState({ user: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState<string | null>(null);
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
      const payload = form.user.includes("@")
        ? { email: form.user, password: form.password }
        : { username: form.user, password: form.password };
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
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
        navigate("/dashboard");
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
          background:
            "linear-gradient(135deg,rgb(31, 13, 99) 0%,rgb(37, 43, 53) 100%)",
          borderRadius: 5,
          boxShadow: 6,
          minWidth: 340,
          maxWidth: 400,
          width: "100%",
          p: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 4, color: "#eee", textAlign: "center" }}
        >
          Login to SnapDone
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
          <Stack spacing={3} mb={2}>
            <TextField
              label="Username or Email"
              name="user"
              value={form.user}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              size="small"
              slotProps={{
                input: { style: { color: "#fff" } },
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
                input: { style: { color: "#fff" } },
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
            <Button
              variant="text"
              sx={{
                color: "#5CB338",
                alignSelf: "flex-end",
                mt: -2,
                mb: 1,
                fontWeight: 700,
              }}
              onClick={() => {
                setForgotOpen(true);
                setForgotStatus(null);
                setForgotEmail("");
              }}
            >
              Forgot Password?
            </Button>
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
              alignSelf: "center",
              display: "block",
              mx: "auto",
              "&:hover": { background: "#49a09d" },
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </Box>
      </Card>
      <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          {forgotStatus && (
            <Typography
              sx={{ mt: 2 }}
              color={forgotStatus.startsWith("Success") ? "green" : "error"}
            >
              {forgotStatus}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotOpen(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              setForgotStatus(null);
              try {
                const res = await fetch("/api/auth/forgot-password", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: forgotEmail }),
                });
                const data = await res.json();
                if (!res.ok) {
                  setForgotStatus(
                    data.message || "Failed to send reset email.",
                  );
                } else {
                  setForgotStatus(
                    "Success! Please check your email for reset instructions.",
                  );
                }
              } catch (err) {
                setForgotStatus("Network error. Please try again.");
              }
            }}
            disabled={!forgotEmail}
          >
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;
