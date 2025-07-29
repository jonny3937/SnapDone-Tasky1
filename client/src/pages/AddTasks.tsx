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
  Alert,
  Paper,
} from "@mui/material";
import { useTasks } from "../context/AuthContext";

const AddTasks: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addTask } = useTasks();
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
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: 600,
          mx: "auto",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: "#1C1678",
            fontWeight: 700,
            textAlign: "center",
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
          }}
        >
          Add New Task
        </Typography>
        <Paper
          component="form"
          onSubmit={handleAddTask}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: "#fff",
            borderRadius: { xs: 2, sm: 3 },
            boxShadow: { xs: 2, sm: 4, md: 6 },
            border: "1px solid #e0e0e0",
          }}
        >
          <Stack spacing={3}>
            <TextField
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "#1C1678",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1C1678",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1C1678",
                },
              }}
            />
            <TextField
              label="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              placeholder="Describe your task in detail..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "#1C1678",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1C1678",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1C1678",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#1C1678",
                fontWeight: 700,
                borderRadius: 2,
                py: 1.5,
                fontSize: 16,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(28, 22, 120, 0.3)",
                "&:hover": {
                  bgcolor: "#140e4a",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 16px rgba(28, 22, 120, 0.4)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Add Task
            </Button>
            {success && (
              <Alert
                severity="success"
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  "& .MuiAlert-icon": {
                    fontSize: "1.2rem",
                  },
                }}
              >
                Task added successfully!
              </Alert>
            )}
          </Stack>
        </Paper>
      </Box>
    </Layout>
  );
};

export default AddTasks;
