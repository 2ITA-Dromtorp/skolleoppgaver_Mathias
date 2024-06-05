import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../components/Header";

/**
 * The main layout of the application.
 */
function MainLayout() {
  return (
    <Container fluid className="p-3">
      <Header />
      <Container fluid className="pt-3">
        <Outlet />
      </Container>
    </Container>
  );
}

export default MainLayout;
