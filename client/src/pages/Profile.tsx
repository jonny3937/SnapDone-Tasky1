import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  TextField,
  Button,
  Stack,
  Alert,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AvatarUpload from "../components/avatar";
import { updateAvatar, getProfile } from "../services/userService";

type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
  firstName?: string;
  lastName?: string;
};

const Profile: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pwForm, setPwForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [pwFeedback, setPwFeedback] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);

  if (!isAuthenticated || !user) {
    return (
      <Layout currentPage="Profile">
        <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
          <Typography variant="h5">You are not logged in.</Typography>
        </Box>
      </Layout>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = async (avatarUrl: string) => {
    setForm((prev) => ({ ...prev, avatar: avatarUrl }));
    try {
      const token = localStorage.getItem("token");
      if (token && avatarUrl) {
        await updateAvatar(avatarUrl, token);
        // Fetch latest profile and update context
        const latestProfile = await getProfile(token) as User;
        updateUser(latestProfile);
        setForm({
          firstName: latestProfile.firstName || "",
          lastName: latestProfile.lastName || "",
          username: latestProfile.username || "",
          email: latestProfile.email || "",
          avatar: latestProfile.avatar || "",
        });
        setFeedback("Avatar updated successfully.");
        setError(null);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to update avatar");
    }
  };

  const handleSave = async () => {
    if (!form.username || !form.email) {
      setError("Username and email are required.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const latestProfile = await getProfile(token) as User;
        updateUser(latestProfile);
        setForm({
          firstName: latestProfile.firstName || "",
          lastName: latestProfile.lastName || "",
          username: latestProfile.username || "",
          email: latestProfile.email || "",
          avatar: latestProfile.avatar || "",
        });
        setFeedback("Profile updated successfully.");
        setError(null);
        setEditMode(false);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      username: user.username || "",
      email: user.email || "",
      avatar: user.avatar || "",
    });
    setEditMode(false);
    setError(null);
    setFeedback(null);
  };

  const handlePwChange = () => {
    if (!pwForm.current || !pwForm.new || !pwForm.confirm) {
      setPwError("All password fields are required.");
      return;
    }
    if (pwForm.new !== pwForm.confirm) {
      setPwError("New passwords do not match.");
      return;
    }
    setPwFeedback("Password changed (simulated, no backend). Reset fields.");
    setPwError(null);
    setPwForm({ current: "", new: "", confirm: "" });
  };

  return (
    <Layout currentPage="Profile">
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Paper sx={{ p: 4, textAlign: "center", mb: 4 }}>
          {editMode ? (
            <Stack spacing={2}>
              <AvatarUpload
                onUpload={handleAvatarUpload}
                currentAvatar={form.avatar}
              />
              <TextField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          ) : (
            <>
              <Avatar
                src={form.avatar}
                sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
              >
                {form.firstName?.charAt(0) || form.username.charAt(0)}
              </Avatar>
              <Typography variant="subtitle1" sx={{ color: "#666", mb: 1 }}>
                @{user.username}
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2, bgcolor: "#e2e2dbff" }}
                onClick={() => setEditMode(true)}
                startIcon={<EditIcon />}
              >
                edit
              </Button>
              {feedback && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {feedback}
                </Alert>
              )}
            </>
          )}
        </Paper>
        <Divider sx={{ my: 4 }} />
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Change Password
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Current Password"
              type="password"
              value={pwForm.current}
              onChange={(e) =>
                setPwForm({ ...pwForm, current: e.target.value })
              }
            />
            <TextField
              label="New Password"
              type="password"
              value={pwForm.new}
              onChange={(e) => setPwForm({ ...pwForm, new: e.target.value })}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={pwForm.confirm}
              onChange={(e) =>
                setPwForm({ ...pwForm, confirm: e.target.value })
              }
            />
            {pwError && <Alert severity="error">{pwError}</Alert>}
            {pwFeedback && <Alert severity="success">{pwFeedback}</Alert>}
            <Button
              variant="contained"
              sx={{ bgcolor: "#1C1678" }}
              onClick={handlePwChange}
            >
              Change Password
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Profile;
