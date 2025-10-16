import { Container } from "react-bootstrap";
import { useAuthContext } from "../../context/AuthContext";
import { Loading, AppNavbar, Footer, ErrorAlert } from "../common";
import AppRoutes from "../../AppRoutes";

const AppContent = () => {
  const { authLoading } = useAuthContext();

  if (authLoading) {
    return <Loading message="認証情報を確認中..." />;
  }

  return (
    <>
      <AppNavbar />
      <Container className="mt-4 flex-grow-1">
        <ErrorAlert />
        <AppRoutes />
      </Container>
      <Footer />
    </>
  );
};

export default AppContent;
