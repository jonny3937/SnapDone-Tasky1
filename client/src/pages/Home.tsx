import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  TextField,
} from "@mui/material";
import { useTasks } from "../context/AuthContext";
import type { Task } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();
  const [movedToTrash, setMovedToTrash] = useState(false);
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout currentPage="Dashboard">
      <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        {movedToTrash && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Moved to trash
          </Alert>
        )}
        <Typography variant="h4" sx={{ mb: 3, color: "#333" }}>
          Dashboard
        </Typography>
        <TextField
          label="Search tasks by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            mb: 3,
            maxWidth: 300,
            borderRadius: 3,
            background: "#fff",
            "& .MuiOutlinedInput-root": { borderRadius: 3 },
          }}
        />
        {tasks.filter(
          (task) =>
            !task.isDeleted &&
            !task.isCompleted &&
            task.title.toLowerCase().includes(search.toLowerCase()),
        ).length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No tasks yet. Add a task to get started!
          </Typography>
        ) : (
          tasks
            .filter(
              (task) =>
                !task.isDeleted &&
                !task.isCompleted &&
                task.title.toLowerCase().includes(search.toLowerCase()),
            )
            .map((task) => (
              <Card
                key={task.id}
                sx={{
                  mb: 2,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {expandedTaskId === task.id ||
                    task.description.split(" ").length <= 20
                      ? task.description
                      : `${task.description.split(" ").slice(0, 20).join(" ")}...`}
                    {task.description.split(" ").length > 20 &&
                      expandedTaskId !== task.id && (
                        <Button
                          size="small"
                          onClick={() => setExpandedTaskId(task.id)}
                          sx={{ ml: 1, textTransform: "none", padding: 0 }}
                        >
                          Read more
                        </Button>
                      )}
                    {task.description.split(" ").length > 20 &&
                      expandedTaskId === task.id && (
                        <Button
                          size="small"
                          onClick={() => setExpandedTaskId(null)}
                          sx={{ ml: 1, textTransform: "none", padding: 0 }}
                        >
                          Show less
                        </Button>
                      )}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#000000" }}>
                    Created: {new Date(task.dateCreated).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#000000", ml: 2 }}
                  >
                    Last Updated: {new Date(task.lastUpdated).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="text"
                    sx={{ color: "#16C47F", textDecoration: "none" }}
                    onClick={() => {
                      updateTask(task.id, { isCompleted: true });
                      navigate("/completed-tasks");
                    }}
                  >
                    isComplete
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: "#1976d2" }}
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setEditTask(task);
                      setEditTitle(task.title);
                      setEditDescription(task.description);
                      setEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: "#F93827", textDecoration: "none" }}
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setTaskToDelete(task);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))
        )}
      </Box>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (editTask && editTitle.trim()) {
                updateTask(editTask.id, {
                  title: editTitle,
                  description: editDescription,
                });
                setEditOpen(false);
              }
            }}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (taskToDelete) {
                updateTask(taskToDelete.id, { isDeleted: true });
                setMovedToTrash(true);
                setTimeout(() => setMovedToTrash(false), 2000);
              }
              setDeleteDialogOpen(false);
              setTaskToDelete(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Home;
