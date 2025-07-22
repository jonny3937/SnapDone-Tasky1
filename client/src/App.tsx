import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddTasks from "./pages/AddTasks";
import Trash from "./pages/Trash";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import CompletedTasks from "./pages/CompletedTasks";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/add-tasks" element={<AddTasks />} />
            <Route path="/completed-tasks" element={<CompletedTasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
