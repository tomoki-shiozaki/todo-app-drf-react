import React from "react";
import { Container } from "react-bootstrap";

import AppRoutes from "./AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import AppNavbar from "./components/Navbar";
import ErrorAlert from "./components/ErrorAlert";

function App() {
  return (
    <div className="App">
      <ErrorProvider>
        <AuthProvider>
          <AppNavbar />
          <Container className="mt-4">
            <ErrorAlert />
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
        </AuthProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;
