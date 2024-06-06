import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from './auth/useAuth';

/**
 * Renders the header component.
 */
function Header() {
  const { logout, user, tokenValid } = useAuth();

  return (
    <Navbar bg="light" expand="lg" className="container-fluid px-3">
      <LinkContainer to="/">
        <Navbar.Brand>Min App</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Produkter</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin">
            <Nav.Link>Admin</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/cart">
            <Nav.Link>Handlekurv</Nav.Link>
          </LinkContainer>
        </Nav>

        <Nav>
          {tokenValid && <Nav.Link onClick={logout}>Logg ut, {user?.username}</Nav.Link>}
          {!tokenValid && <LinkContainer to="/login"><Nav.Link>Logg inn</Nav.Link></LinkContainer>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

