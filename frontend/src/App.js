import React from "react";
import { Container } from "react-bootstrap";

import AppRoutes from "./AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import AppNavbar from "./components/Navbar";
import ErrorAlert from "./components/ErrorAlert";
import Footer from "./components/Footer";

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
          <Footer />
        </AuthProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;
