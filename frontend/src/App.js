// src/App.js
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, Routes, Route, Link } from "react-router-dom";

import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodosList from "./components/TodosList";

import TodoDataService from "./services/todos";

function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState("");
  const location = useLocation();

  // ログイン時にトークンセット
  async function login(user) {
    if (!user || !user.username || !user.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const data = await TodoDataService.login(user);
      console.log("Login token:", data.token);
      setToken(data.token);
      setUser(user.username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", user.username);
      setError("");
    } catch (e) {
      console.log("login", e);
      const message = e.response?.data?.message || e.message || "Login failed.";
      setError(message);
    }
  }

  // ログアウト処理
  async function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // サインアップ処理（必要に応じて）
  async function signup(user = null) {
    setUser(user);
  }

  // マウント時にlocalStorageから復元
  React.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
  }, []);

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav
            className="me-auto"
            variant="pills"
            activeKey={location.pathname}
            style={{ display: "flex", gap: "10px" }}
          >
            <Nav.Item>
              <Nav.Link as={Link} to="/todos" eventKey="/todos">
                Todos
              </Nav.Link>
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
                  <Nav.Link as={Link} to="/login" eventKey="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/signup" eventKey="/signup">
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </div>
      </Navbar>

      <Container className="mt-4">
        {/* エラーメッセージの表示 */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Routes>
          <Route path="/" element={<TodosList token={token} />} />
          <Route path="/todos" element={<TodosList token={token} />} />
          <Route path="/todos/create" element={<AddTodo token={token} />} />
          <Route path="/todos/:id" element={<AddTodo token={token} />} />
          <Route path="/login" element={<Login login={login} user={user} />} />
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
            rel="noreferrer"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/greglim81"
          >
            Greg Lim
          </a>{" "}
          -{" "}
          <a
            target="_blank"
            rel="noreferrer"
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
