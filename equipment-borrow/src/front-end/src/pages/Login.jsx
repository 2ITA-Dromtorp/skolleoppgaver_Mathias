import { useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardText, CardTitle, Container } from "react-bootstrap";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../components/auth/useAuth";

/**
 * Renders the Login component.
 */
function Login() {
  const { login, logout, user, tokenValid } = useAuth();
  const [error, setError] = useState(null);

  /**
   * Handles the form submission for the login form.
   *
   * @param {string} username - The username entered in the login form.
   * @param {string} password - The password entered in the login form.
   */
  const handleLoginFormSubmit = async (username, password) => {
    const loginResult = await login(username, password);
    if (loginResult.success === false) {
      setError(loginResult.error);
    }
  };

  /**
   * Handles the logout functionality.
   */
  const handleLogout = () => {
    logout();
  };

  if (tokenValid) {
    // Already logged in
    return (
      <Container className="justify-content-lg-center col-lg-4 col-md-12 mt-3">
        <Card border="success">
          <CardHeader className="bg-success-subtle text-success-emphasis">
            <CardTitle>Allerede innlogget</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>Du er innlogget som {(user?.username) ?? "<ukjent>"}</CardText>
            <ButtonGroup className="text-center mt-3">
              <Button onClick={handleLogout}>Logg ut</Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </Container>
    );
  } else {
    // Not logged in
    return (
      <Container className="justify-content-lg-center col-lg-4 col-md-12 mt-3">
        <Card>
          <CardHeader>Logg inn</CardHeader>
          <CardBody>
            <LoginForm onSubmit={handleLoginFormSubmit} defaultUsername={user?.username} />
          </CardBody>
        </Card>

        {error instanceof Error && <Card border="danger-subtle" className="mt-3">
          <CardHeader className="bg-danger-subtle text-danger-emphasis">
            <CardTitle>Innlogging feilet</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>{error.message}</CardText>
          </CardBody>
        </Card>
        }

      </Container>
    );
  }
}

export default Login;
