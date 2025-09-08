import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AppNavbar = () => {
  const location = useLocation();
  const { currentUsername, logout } = useAuthContext();

  return (
    <Navbar bg="primary" variant="dark">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          TodosApp
        </Navbar.Brand>
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
  );
};

export default AppNavbar;
