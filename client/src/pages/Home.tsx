import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { Box, Typography, Card, CardContent, CardActions, Button, Alert, TextField } from "@mui/material";
import { useTasks } from "../context/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();
  const [movedToTrash, setMovedToTrash] = useState(false);
  const [search, setSearch] = useState("");

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
          onChange={e => setSearch(e.target.value)}
          size="small"
          sx={{ mb: 3, maxWidth: 300, borderRadius: 3, background: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
        />
        {tasks.filter(task => !task.isDeleted && !task.isCompleted && task.title.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No tasks yet. Add a task to get started!
          </Typography>
        ) : (
          tasks.filter(task => !task.isDeleted && !task.isCompleted && task.title.toLowerCase().includes(search.toLowerCase())).map((task) => (
            <Card key={task.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(task.dateCreated).toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                  Last Updated: {new Date(task.lastUpdated).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="text"
                  sx={{color:"#16C47F", textDecoration:'none'}} 
                  onClick={() => {
                    updateTask(task.id, { isCompleted: true });
                    navigate("/completed-tasks");
                  }}
                >
                  isComplete
                </Button>
                <Button
                  variant="text"
                  sx={{color:"#F93827", textDecoration:'none'}}
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    updateTask(task.id, { isDeleted: true });
                    setMovedToTrash(true);
                    setTimeout(() => setMovedToTrash(false), 2000);
                  }}
                >
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </Layout>
  );
};

export default Home; 