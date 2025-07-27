import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTasks, Task } from "../context/AuthContext";

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

  const handleExpandClick = (taskId: number) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleEditClick = (task: Task) => {
    setEditTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditOpen(true);
  };

  const handleEditSave = () => {
    if (editTask) {
      updateTask(editTask.id, { title: editTitle, description: editDescription });
      setEditOpen(false);
      setEditTask(null);
    }
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      updateTask(taskToDelete.id, { isDeleted: true });
      setMovedToTrash(true);
      setTimeout(() => setMovedToTrash(false), 2000);
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      !task.isDeleted &&
      (task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout currentPage="Dashboard">
      <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#333" }}>
          My Tasks
        </Typography>
        <TextField
          label="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />
        {movedToTrash && <Alert severity="success">Task moved to trash!</Alert>}
        {filteredTasks.length === 0 ? (
          <Typography color="text.secondary">No tasks found.</Typography>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography color="text.secondary">{task.description}</Typography>
                <IconButton
                  onClick={() => handleExpandClick(task.id)}
                  aria-expanded={expandedTaskId === task.id}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
                <IconButton onClick={() => handleEditClick(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(task)}>
                  <DeleteIcon />
                </IconButton>
                <Collapse in={expandedTaskId === task.id} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">Details...</Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))
        )}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
            <Button onClick={() => setEditOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to move this task to trash?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
            <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default Home;
