import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";

import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodosList from "./components/TodosList";

import TodoDataService from "./services/todos";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState("");

  async function login(user) {
    if (!user || !user.username || !user.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await TodoDataService.login(user);
      setToken(response.data.token);
      setUser(user.username);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", user.username);
      setError("");
    } catch (e) {
      console.log("login", e);
      const message = e.response?.data?.message || e.message || "Login failed.";
      setError(message);
    }
  }

  async function logout() {
    setUser(null);
  }

  async function signup(user = null) {
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
            style={{ display: "flex", gap: "10px" }}
          >
            <Nav.Item>
              <Link className="nav-link" to={"/todos"}>
                Todos
              </Link>
            </Nav.Item>
            {user ? (
              <Nav.Item>
                <Link className="nav-link" onClick={logout}>
                  Logout ({user})
                </Link>
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

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<TodosList token={token} />} />
          <Route path="/todos" element={<TodosList token={token} />} />
          <Route path="/todos/create" element={<AddTodo token={token} />} />
          <Route path="/todos/:id" element={<AddTodo token={token} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
        </Routes>
      </Container>

      <footer
        className="text-center text-lg-start
        bg-light text-muted mt-4"
      >
        <div className="text-center p-4">
          © Copyright -{" "}
          <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/greglim81"
          >
            Greg Lim
          </a>{" "}
          -{" "}
          <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/danielgarax"
          >
            Daniel Correa
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
