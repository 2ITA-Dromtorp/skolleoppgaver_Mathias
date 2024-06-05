import { Container, Tab, Tabs } from "react-bootstrap";
import UserPage from "./UserPage";

/**
 * Renders the AdminPage component.
 */
function AdminPage() {
  return (
    <Container fluid>
      <h2>Administrasjon</h2>
      <p>Her kommer administrasjon av brukere, roller, m.m.</p>
      <Tabs defaultActiveKey="user" className="my-3">
        <Tab eventKey="user" title="Brukere">
          <UserPage />
        </Tab>
        <Tab eventKey="other" title="...">
          Det kommer mer her...
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminPage;
