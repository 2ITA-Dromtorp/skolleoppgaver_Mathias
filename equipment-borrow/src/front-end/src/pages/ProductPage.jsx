import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import productService from "../services/product-service";
import { ProductList } from "../components/product";

/**
 * Renders the ProductPage component.
 * This component displays a list of products and provides functionality to create, edit, and delete products.
 */
function ProductPage() {
  const [products, setProducts] = useState([]);

  /**
   * Refreshes the list of products by fetching all products from the productService.
   */
  const refreshProducts = async () => {
    try {
      const allProducts = await productService.getAll();
      setProducts(allProducts);
    } catch (error) {
      console.error("Get products error", error);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-end m-2">
        <ProductList products={products} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;

