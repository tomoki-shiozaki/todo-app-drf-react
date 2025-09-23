import { Container } from "react-bootstrap";

import AppRoutes from "./AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import AppNavbar from "./components/Navbar";
import ErrorAlert from "./components/ErrorAlert";
import Footer from "./components/Footer";

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
