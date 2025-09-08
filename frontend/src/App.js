import React from "react";
import { Container } from "react-bootstrap";

import AppRoutes from "./AppRoutes";

import { useAuthContext } from "./context/AuthContext";
import AppNavbar from "./components/Navbar";

function App() {
  const { error } = useAuthContext();

  return (
    <div className="App">
      <AppNavbar />

      <Container className="mt-4">
        {/* エラーメッセージの表示 */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <AppRoutes />
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
