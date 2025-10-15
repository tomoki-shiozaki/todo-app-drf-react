import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const AppNavbar = () => {
  const location = useLocation();
  const { currentUsername, logout } = useAuthContext();

  return (
    <Navbar bg="primary" variant="dark">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          Todo管理アプリ
        </Navbar.Brand>
        <Nav
          className="me-auto"
          variant="pills"
          activeKey={location.pathname}
          style={{ display: "flex", gap: "10px" }}
        >
          <Nav.Item>
            <Nav.Link as={Link} to="/todos" eventKey="/todos">
              Todo一覧
            </Nav.Link>
          </Nav.Item>

          {currentUsername ? (
            <Nav.Item>
              <Nav.Link
                as="button"
                onClick={logout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                ログアウト ({currentUsername})
              </Nav.Link>
            </Nav.Item>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/login" eventKey="/login">
                  ログイン
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/signup" eventKey="/signup">
                  新規登録
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
