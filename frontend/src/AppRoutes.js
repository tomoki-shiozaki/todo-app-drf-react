import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

import AddTodo from "./pages/AddTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodosList from "./pages/TodosList";
import TodoDetail from "./pages/TodoDetail";

function AppRoutes() {
  const { token, currentUsername, login, signup } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<TodosList token={token} />} />
      <Route path="/todos/create" element={<AddTodo />} />
      <Route path="/todos/:id" element={<TodoDetail />} />
      <Route
        path="/login"
        element={<Login login={login} user={currentUsername} />}
      />
      <Route path="/signup" element={<Signup signup={signup} />} />
    </Routes>
  );
}

export default AppRoutes;
