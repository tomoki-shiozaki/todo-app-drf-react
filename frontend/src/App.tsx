import { Container } from "react-bootstrap";

import AppRoutes from "./AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import { AppNavbar, ErrorAlert, Footer } from "./components/common";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ErrorProvider>
        <AuthProvider>
          <AppNavbar />
          <Container className="mt-4 flex-grow-1">
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
