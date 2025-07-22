import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
} from "@mui/material";
import { useTasks } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

const Trash: React.FC = () => {
  const { tasks, restoreTask, deleteTask } = useTasks();
  const [restored, setRestored] = useState(false);
  const deletedTasks = tasks.filter((task) => task.isDeleted);

  return (
    <Layout currentPage="Trash">
      <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        {restored && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Task restored successfully
          </Alert>
        )}
        <Typography variant="h4" sx={{ mb: 3, color: "#333" }}>
          Trash
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Items in trash will be deleted after 30 days.
        </Typography>
        {deletedTasks.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No deleted tasks.
          </Typography>
        ) : (
          deletedTasks.map((task) => (
            <Card key={task.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => {
                    restoreTask(task.id);
                    setRestored(true);
                    setTimeout(() => setRestored(false), 2000);
                  }}
                >
                  Restore
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete Permanently
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </Layout>
  );
};

export default Trash;
