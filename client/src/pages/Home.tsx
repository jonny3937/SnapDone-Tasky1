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
  Stack,
  IconButton,
} from "@mui/material";
import { useTasks } from "../context/AuthContext";
import type { Task } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PushPinIcon from '@mui/icons-material/PushPin';

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
        {(() => {
          const filtered = tasks.filter(
            (task) =>
              !task.isDeleted &&
              !task.isCompleted &&
              task.title.toLowerCase().includes(search.toLowerCase()),
          );
          const pinned = filtered.filter((task) => task.isPinned);
          const others = filtered.filter((task) => !task.isPinned);
          return (
            <>
              {pinned.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#d32f2f' }}>Urgent</Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 650px)' },
                      gap: 3,
                      alignItems: 'stretch',
                      mb: 2,
                      justifyContent: 'center',
                    }}
                  >
                    {pinned.map((task) => (
                      <Card
                        key={task.id}
                        sx={{
                          width: 650,
                          height: 220,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          transition: "transform 0.2s",
                          position: 'relative',
                          "&:hover": { transform: "scale(1.03)" },
                        }}
                      >
                     {/* my pin button here */}
                        <IconButton
                          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, color: task.isPinned ? '#d32f2f' : '#aaa', background: 'none', boxShadow: 'none', '&:hover': { color: '#b71c1c', background: 'none' } }}
                          onClick={() => updateTask(task.id, { isPinned: !task.isPinned })}
                          size="small"
                        >
                          <PushPinIcon />
                        </IconButton>
                        <CardContent sx={{ flexGrow: 1 }}>
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
                          <Stack direction="row" spacing={2} alignItems="center" gap={2}>
                            <Button
                              variant="text"
                              sx={{ color: "#16C47F", textDecoration: "none", '&:hover': { backgroundColor: '#e6f9f0' } }}
                              onClick={() => {
                                updateTask(task.id, { isCompleted: true });
                                navigate("/completed-tasks");
                              }}
                            >
                              isComplete
                            </Button>
                            <Button
                              variant="text"
                              sx={{ color: "#1976d2", '&:hover': { backgroundColor: '#e3f0fc' } }}
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
                              sx={{ color: "#F93827", textDecoration: "none", '&:hover': { backgroundColor: '#fdecea' } }}
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                setTaskToDelete(task);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              Delete
                            </Button>
                            <TipsAndUpdatesIcon sx={{ ml: 1, color: '#FFA500', cursor: 'pointer', transition: '0.2s', '&:hover': { color: '#ffb84d', transform: 'scale(1.2)' } }} />
                          </Stack>
                        </CardActions>
                      </Card>
                    ))}
                  </Box>
                </>
              )}
              {others.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#000000' }}>Active Tasks</Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 650px)' },
                      gap: 3,
                      alignItems: 'stretch',
                      mb: 2,
                      justifyContent: 'center',
                    }}
                  >
                    {others.map((task) => (
                      <Card
                        key={task.id}
                        sx={{
                          width: 650,
                          height: 220,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          transition: "transform 0.2s",
                          position: 'relative',
                          "&:hover": { transform: "scale(1.03)" },
                        }}
                      >
                    
                       <IconButton
                          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, color: task.isPinned ? '#d32f2f' : '#aaa', background: 'none', boxShadow: 'none', '&:hover': { color: '#b71c1c', background: 'none' } }}
                          onClick={() => updateTask(task.id, { isPinned: !task.isPinned })}
                          size="small"
                        >
                          <PushPinIcon />
                        </IconButton>
                        <CardContent sx={{ flexGrow: 1 }}>
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
                          <Stack direction="row" spacing={2} alignItems="center" gap={2}>
                            <Button
                              variant="text"
                              sx={{ color: "#16C47F", textDecoration: "none", '&:hover': { backgroundColor: '#e6f9f0' } }}
                              onClick={() => {
                                updateTask(task.id, { isCompleted: true });
                                navigate("/completed-tasks");
                              }}
                            >
                              isComplete
                            </Button>
                            <Button
                              variant="text"
                              sx={{ color: "#1976d2", '&:hover': { backgroundColor: '#e3f0fc' } }}
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
                              sx={{ color: "#F93827", textDecoration: "none", '&:hover': { backgroundColor: '#fdecea' } }}
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                setTaskToDelete(task);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              Delete
                            </Button>
                            <TipsAndUpdatesIcon sx={{ ml: 1, color: '#FFA500', cursor: 'pointer', transition: '0.2s', '&:hover': { color: '#ffb84d', transform: 'scale(1.2)' } }} />
                          </Stack>
                        </CardActions>
                      </Card>
                    ))}
                  </Box>
                </>
              )}
              {pinned.length === 0 && others.length === 0 && (
                <Typography variant="body1" color="text.secondary">
                  No tasks yet. Add a task to get started!
                </Typography>
              )}
            </>
          );
        })()}
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
      <Dialog
        open={expandedTaskId !== null}
        onClose={() => setExpandedTaskId(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, p: 2, minHeight: 300, minWidth: 400, maxWidth: 700 }
        }}
      >
        {(() => {
          const task = tasks.find(t => t.id === expandedTaskId);
          if (!task) return null;
          return (
            <Box sx={{ position: 'relative', p: 2 }}>
              <IconButton
                onClick={() => setExpandedTaskId(null)}
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
              >
                <span style={{ fontSize: 24, fontWeight: 'bold' }}>&times;</span>
              </IconButton>
              <Typography variant="h4" sx={{ mb: 2 }}>{task.title}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{task.description}</Typography>
              <Typography variant="caption" sx={{ color: "#000000" }}>
                Created: {new Date(task.dateCreated).toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: "#000000", ml: 2 }}>
                Last Updated: {new Date(task.lastUpdated).toLocaleString()}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" gap={2} sx={{ mt: 3 }}>
                <Button
                  variant="text"
                  sx={{ color: "#16C47F", textDecoration: "none", '&:hover': { backgroundColor: '#e6f9f0' } }}
                  onClick={() => {
                    updateTask(task.id, { isCompleted: true });
                    setExpandedTaskId(null);
                    navigate("/completed-tasks");
                  }}
                >
                  isComplete
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "#1976d2", '&:hover': { backgroundColor: '#e3f0fc' } }}
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setEditTask(task);
                    setEditTitle(task.title);
                    setEditDescription(task.description);
                    setEditOpen(true);
                    setExpandedTaskId(null);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "#F93827", textDecoration: "none", '&:hover': { backgroundColor: '#fdecea' } }}
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setTaskToDelete(task);
                    setDeleteDialogOpen(true);
                    setExpandedTaskId(null);
                  }}
                >
                  Delete
                </Button>
                <TipsAndUpdatesIcon sx={{ ml: 1, color: '#FFA500', cursor: 'pointer', transition: '0.2s', '&:hover': { color: '#ffb84d', transform: 'scale(1.2)' } }} />
              </Stack>
            </Box>
          );
        })()}
      </Dialog>
    </Layout>
  );
};

export default Home;
