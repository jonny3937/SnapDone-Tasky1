import React from "react";
import { useTasks } from "../context/AuthContext";
import Layout from "../components/Layout";
import { Box, Typography, Card, CardContent, Button, CardActions } from "@mui/material";

const CompletedTasks: React.FC = () => {
  const { tasks, updateTask } = useTasks();

  return (
    <Layout currentPage="Completed Tasks">
      <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#333" }}>
          Completed Tasks
        </Typography>
        {tasks.filter(task => task.isCompleted).length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No completed tasks yet.
          </Typography>
        ) : (
          tasks.filter(task => task.isCompleted).map((task) => (
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
                  color="primary"
                  onClick={() => updateTask(task.id, { isCompleted: false })}
                >
                Incomplete
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </Layout>
  );
};

export default CompletedTasks; 