import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Alert
} from "@mui/material";
import { useTasks } from "../context/AuthContext";

const AddTasks: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { tasks, addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, description });
    setTitle("");
    setDescription("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <Layout currentPage="Add Tasks">
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Task created successfully
          </Alert>
        )}
        <Typography variant="h4" sx={{ mb: 3, color: "#333" }}>
          Add New Task
        </Typography>
        <form onSubmit={handleAddTask}>
          <Stack spacing={2}>
            <TextField
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </Stack>
        </form>
      </Box>
    </Layout>
  );
};

export default AddTasks; 