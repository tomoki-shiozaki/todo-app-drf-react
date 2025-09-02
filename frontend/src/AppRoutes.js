import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AddTodo from "./pages/AddTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodosList from "./pages/TodosList";

function AppRoutes({ token, user, login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<TodosList token={token} />} />
      <Route path="/todos/create" element={<AddTodo token={token} />} />
      <Route path="/todos/:id" element={<AddTodo token={token} />} />
      <Route path="/login" element={<Login login={login} user={user} />} />
      <Route path="/signup" element={<Signup signup={signup} />} />
    </Routes>
  );
}

export default AppRoutes;
