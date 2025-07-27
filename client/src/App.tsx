import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddTasks from "./pages/AddTasks";
import Trash from "./pages/Trash";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import CompletedTasks from "./pages/CompletedTasks";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/add-tasks" element={<ProtectedRoute><AddTasks /></ProtectedRoute>} />
            <Route path="/completed-tasks" element={<ProtectedRoute><CompletedTasks /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/trash" element={<ProtectedRoute><Trash /></ProtectedRoute>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
