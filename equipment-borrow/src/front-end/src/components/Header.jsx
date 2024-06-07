import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../hooks/useAuth";

/**
 * Renders the header component.
 */
function Header() {
  const { logout, user, tokenValid, userIsAdmin } = useAuth();

  return (
    <Navbar bg="light" expand="lg" className="container-fluid px-3">

      <LinkContainer to="/">
        <Navbar.Brand>ViHjelperDeg</Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          <LinkContainer to="/">
            <Nav.Link>Produkter</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/cart">
            <Nav.Link>Handlekurv</Nav.Link>
          </LinkContainer>
          
          <LinkContainer to="/feedback">
            <Nav.Link>Feedback</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/about">
            <Nav.Link>Om oss</Nav.Link>
          </LinkContainer>
        </Nav>

        <Nav>
          {userIsAdmin && (
            <LinkContainer to="/admin">
              <Nav.Link>Admin</Nav.Link>
            </LinkContainer>
          )}

          {tokenValid && <Nav.Link onClick={logout}>Logg ut, {user?.username}</Nav.Link>}
          {!tokenValid && (
            <LinkContainer to="/login">
              <Nav.Link>Logg inn</Nav.Link>
            </LinkContainer>
          )}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
