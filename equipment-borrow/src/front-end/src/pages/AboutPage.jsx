import { Container } from "react-bootstrap";

/**
 * Renders the Home Page component.
 */
function HomePage() {
  return (
    <Container className="col-6">
      <h4>Hvem er ViHjelperDeg AS?</h4>
      <p>
        ViHjelperDeg AS (VHD) er en bedrift med 50 ansatte. der for deg når du skal planlegge og installere eller trenger hjelp til å drifte dine IT-løsninger.
      </p>
      <p>
      Vi kan hjelpe de fleste norske bedrifter og har kunder fra 10 til 200 ansatte.
      </p>
      <p>
      For våre eksisterende kunder tilbyr vi kjøp på nett av både maskin- og programvare. Etter å ha logget på finner du dette på våre <a href="/">produktsider</a>.
      </p>
    </Container>
  );
}

export default HomePage;
