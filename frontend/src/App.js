import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import useAuth from "./hooks/useAuth";

function App() {
  const { currentUsername, token, error, login, logout, signup, setError } =
    useAuth();

  const location = useLocation();

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

            {currentUsername ? (
              <Nav.Item>
                <Link className="nav-link" onClick={logout}>
                  Logout ({currentUsername})
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
        <AppRoutes
          token={token}
          user={currentUsername}
          login={login}
          signup={signup}
        />
      </Container>

      <footer className="text-center text-lg-start bg-light text-muted mt-4">
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
