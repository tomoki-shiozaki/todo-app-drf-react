import { Routes, Route, Navigate } from "react-router-dom";

import AddTodo from "./pages/AddTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodosList from "./pages/TodosList";
import TodoDetail from "./pages/TodoDetail";

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
