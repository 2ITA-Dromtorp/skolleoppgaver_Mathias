import useCart from "../../hooks/useCart";
import { Button, Card, CardFooter, Form, InputGroup } from "react-bootstrap";

/**
 * Renders a list of products.
 */
function Product({ product }) {
  const { addCartItem, removeCartItem, getCartItem } = useCart();
  const cartItem = getCartItem(product);

  return (
    <Card className="flex-grow-1">
      {product.imageUrl && <Card.Img variant="top" src={product.imageUrl} />}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <CardFooter className="d-flex justify-content-center">
      {!cartItem && (
        <Button variant="primary" onClick={() => addCartItem(product)}>
        Kjøp
        </Button>
      )}
      
      {cartItem && (
        <InputGroup>
          <Button variant="outline-secondary" onClick={() => removeCartItem(product)}>-</Button>
          <Form.Control className="text-center" type="number" min={0} max={parseInt(product.quantityAvailable)} readOnly value={cartItem?.quantity ?? 0} />
          <Button variant="outline-secondary" onClick={() => addCartItem(product)}>+</Button>
        </InputGroup>
      )}

        </CardFooter>
    </Card>
  );
}

export default Product;
