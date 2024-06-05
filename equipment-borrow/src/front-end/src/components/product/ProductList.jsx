import { Col, Container, Row } from "react-bootstrap";
import Product from "./Product";

/**
 * Renders a list of products.
 */
function ProductList({ products }) {

  return (
    <Container className="col-lg-8 col-md-12">
      <Row>
        {products.map(item => (
          <Col key={item.id} md={6} lg={3} className="d-flex pb-4">
            <Product product={item} />
          </Col>
        ))} 
      </Row>
    </Container>
  );
}

export default ProductList;
