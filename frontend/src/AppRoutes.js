import React from "react";
import { Routes, Route } from "react-router-dom";

import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodosList from "./components/TodosList";

function AppRoutes({ token, user, login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<TodosList token={token} />} />
      <Route path="/todos" element={<TodosList token={token} />} />
      <Route path="/todos/create" element={<AddTodo token={token} />} />
      <Route path="/todos/:id" element={<AddTodo token={token} />} />
      <Route path="/login" element={<Login login={login} user={user} />} />
      <Route path="/signup" element={<Signup signup={signup} />} />
    </Routes>
  );
}

export default AppRoutes;
