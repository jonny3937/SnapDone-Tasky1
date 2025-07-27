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
import API from '../api/axios';

type LoginResponse = {
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

type ForgotPasswordResponse = {
  message: string;
};

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
      navigate("/dashboard");
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
                setForgotNewPassword("");
                setForgotConfirmPassword("");
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
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={forgotNewPassword}
            onChange={(e) => setForgotNewPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={forgotConfirmPassword}
            onChange={(e) => setForgotConfirmPassword(e.target.value)}
            sx={{ mt: 2 }}
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
                const res = await API.post<ForgotPasswordResponse>(
                  '/api/auth/reset-password',
                  {
                    email: forgotEmail,
                    newPassword: forgotNewPassword,
                    confirmPassword: forgotConfirmPassword,
                  }
                );
                if (res.data && res.data.message) {
                  setForgotStatus("Success! Your password has been reset. You can now log in.");
                } else {
                  setForgotStatus("Success! Your password has been reset. You can now log in.");
                }
              } catch (err: any) {
                if (
                  err.response &&
                  err.response.data &&
                  typeof err.response.data === 'object' &&
                  'message' in err.response.data
                ) {
                  setForgotStatus((err.response.data as { message: string }).message);
                } else {
                  setForgotStatus("Network error. Please try again.");
                }
              }
            }}
            disabled={
              !forgotEmail || !forgotNewPassword || !forgotConfirmPassword
            }
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;
