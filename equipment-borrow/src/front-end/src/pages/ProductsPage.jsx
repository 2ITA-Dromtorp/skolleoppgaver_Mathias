import { ProductList } from "../components/product";
import { Container } from "react-bootstrap";
import productService from "../services/product-service";
import { useEffect, useState } from "react";

/**
 * Renders the Home Page component.
 */
function ProductsPage() {
  const [products, setProducts] = useState([]);

  /**
   * Refreshes the list of products by fetching them from the productService.
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
    <Container>
      <h2>Våre produkter</h2>
      <ProductList products={products} />
    </Container>
  );
}

export default ProductsPage;
