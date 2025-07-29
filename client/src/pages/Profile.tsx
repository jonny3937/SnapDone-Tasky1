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
        const latestProfile = (await getProfile(token)) as User;
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
        await import("../services/userService").then(({ updateUserProfile }) =>
          updateUserProfile(
            {
              username: form.username,
              email: form.email,
              firstName: form.firstName,
              lastName: form.lastName,
            },
            token,
          ),
        );
        const latestProfile = (await import("../services/userService").then(
          ({ getProfile }) => getProfile(token),
        )) as User;
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
      <Box
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          maxWidth: 600,
          mx: "auto",
          width: "100%",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 4 },
            textAlign: "center",
            mb: 4,
            borderRadius: { xs: 2, sm: 3 },
            boxShadow: { xs: 2, sm: 6 },
          }}
        >
          {editMode ? (
            <Stack spacing={2} alignItems="center">
              <AvatarUpload
                onUpload={handleAvatarUpload}
                currentAvatar={form.avatar}
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ width: "100%" }}
              >
                <TextField
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Stack>
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                fullWidth
              />
              {error && <Alert severity="error" sx={{ width: "100%" }}>{error}</Alert>}
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={handleCancel} sx={{ minWidth: 100 }}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={2} alignItems="center">
              <Avatar
                src={form.avatar}
                sx={{
                  width: { xs: 80, sm: 100 },
                  height: { xs: 80, sm: 100 },
                  mx: "auto",
                  mb: 1,
                  border: "3px solid #1C1678",
                  boxShadow: 2,
                  fontSize: 38,
                  bgcolor: "#fff",
                  color: "#1C1678",
                }}
              >
                {form.firstName?.charAt(0) || form.username.charAt(0)}
              </Avatar>
              <Typography variant="subtitle1" sx={{ color: "#666", mb: 0 }}>
                @{user.username}
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
              <Typography variant="body1">
                {user.firstName} {user.lastName}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 3,
                  color: "#1C1678",
                  borderColor: "#1C1678",
                  "&:hover": { bgcolor: "#f3f3fa" },
                }}
              >
                Edit Profile
              </Button>
              {feedback && (
                <Alert severity="success" sx={{ width: "100%" }}>
                  {feedback}
                </Alert>
              )}
            </Stack>
          )}
        </Paper>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Change Password
        </Typography>
        <Stack
          spacing={2}
          maxWidth={400}
          mx="auto"
          sx={{
            p: { xs: 1, sm: 2 },
            bgcolor: "#fafbfc",
            borderRadius: 2,
            boxShadow: { xs: 1, sm: 3 },
          }}
        >
          <TextField
            label="Current Password"
            type="password"
            value={pwForm.current}
            onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
            fullWidth
          />
          <TextField
            label="New Password"
            type="password"
            value={pwForm.new}
            onChange={(e) => setPwForm({ ...pwForm, new: e.target.value })}
            fullWidth
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={pwForm.confirm}
            onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
            fullWidth
          />
          {pwError && <Alert severity="error">{pwError}</Alert>}
          {pwFeedback && <Alert severity="success">{pwFeedback}</Alert>}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1C1678",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              fontSize: 16,
              "&:hover": { bgcolor: "#140e4a" },
            }}
            onClick={handlePwChange}
            fullWidth
          >
            Change Password
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Profile;
