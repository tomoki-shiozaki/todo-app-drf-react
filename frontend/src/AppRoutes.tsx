import { Routes, Route, Navigate } from "react-router-dom";

import { AddTodo, TodoDetail, TodosList } from "./pages/todos";
import { Login, Signup } from "./pages/auth";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<TodosList />} />
      <Route path="/todos/create" element={<AddTodo />} />
      <Route path="/todos/:id" element={<TodoDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default AppRoutes;
