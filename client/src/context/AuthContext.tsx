import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getProfile } from "../services/userService";

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  firstName?: string;
  lastName?: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dateCreated: string;
  lastUpdated: string;
  isDeleted: boolean;
  isCompleted: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (
    task: Omit<
      Task,
      "id" | "dateCreated" | "lastUpdated" | "isDeleted" | "isCompleted"
    >,
  ) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  restoreTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateAvatar: (avatarUrl: string) => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token)
        .then((profile) => {
          setUser(profile);
          localStorage.setItem("user", JSON.stringify(profile));
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateAvatar = (avatarUrl: string) => {
    if (user) {
      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    updateAvatar,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (
    task: Omit<
      Task,
      "id" | "dateCreated" | "lastUpdated" | "isDeleted" | "isCompleted"
    >,
  ) => {
    const now = new Date().toISOString();
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now(),
        dateCreated: now,
        lastUpdated: now,
        isDeleted: false,
        isCompleted: false,
      },
    ]);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              lastUpdated: new Date().toISOString(),
              // If marking as complete and already complete, move to trash
              isDeleted:
                updates.isCompleted === true && task.isCompleted === true
                  ? true
                  : (updates.isDeleted ?? task.isDeleted),
            }
          : task,
      ),
    );
  };

  const restoreTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isDeleted: false } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, restoreTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
