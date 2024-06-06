import { Col, Container, Row } from "react-bootstrap";
import Product from "./Product";

/**
 * Renders a list of products.
 */
function ProductList({ products }) {
  return (
    <Container className="col-lg-6 col-md-8">
      <Row>
        {products.map((item) => (
          <Col md={6} key={item.id} className="d-flex pb-4">
            <Product product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
