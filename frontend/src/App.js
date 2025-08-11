import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";

import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodosList from "./components/TodosList";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState("");
  async function login(user = null) {
    // default user to null
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }
  async function signup(user = null) {
    // default user to null
    setUser(user);
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav
            className="me-auto"
            variant="pills"
            defaultActiveKey="/todos"
            style={{ display: "flex", gap: "10px" }} // これで横並びにする
          >
            <Nav.Item>
              <Link className="nav-link" to={"/todos"}>
                Todos
              </Link>
            </Nav.Item>
            {user ? (
              <Nav.Item>
                <Link className="nav-link">Logout ({user})</Link>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="nav-link" to={"/signup"}>
                    Sign Up
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </div>
      </Navbar>

      <Routes>
        <Route path="/todos" element={<TodosList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-todo" element={<AddTodo />} />
      </Routes>
    </div>
  );
}

export default App;
