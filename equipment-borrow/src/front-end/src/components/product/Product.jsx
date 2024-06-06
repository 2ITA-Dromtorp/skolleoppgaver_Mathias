import useCart from "../../hooks/useCart";
import { Badge, Button, Card, CardFooter, Form, InputGroup } from "react-bootstrap";

function getFormattedPrice(price) {
  return Number(price).toLocaleString('nb-NO', { style: 'currency', currency: 'NOK' });
}

/**
 * Renders a list of products.
 */
function Product({ product }) {
  const { addCartItem, removeCartItem, getCartItem } = useCart();

  const cartItem = getCartItem?.(product);

  return (
    <Card className="flex-grow-1">

      <Badge pill bg="light" text="dark" className="position-absolute" style={{ top: '20px', right: '10px', fontSize: '1.4em' }}>{getFormattedPrice(product.unitPrice)}</Badge>

      {product.imageUrl && <Card.Img variant="top" src={product.imageUrl} />}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <CardFooter className="d-flex justify-content-center">

        {/* Product sold out */}
        {!cartItem && product.quantityAvailable < 1 && (
          <span>Utsolgt</span>
        )}

        {/* Product not inn cart */}
        {!cartItem && product.quantityAvailable > 0 && (
          <Button variant="primary" onClick={() => addCartItem(product)}>
            Legg til
          </Button>
        )}

        {/* Product already inn cart */}
        {cartItem && (
          <InputGroup>
            <Button variant="outline-secondary" id="button-removeOne" onClick={() => removeCartItem(product)}>-</Button>
            <Form.Control className="text-center w-auto" type="number" min={0} max={parseInt(product?.quantityAvailable ?? 0)} readOnly value={cartItem?.quantity ?? 0} />
            <Button variant="outline-secondary" id="button-addOne" onClick={() => addCartItem(product)} disabled={cartItem.quantity >= product.quantityAvailable}>+</Button>
          </InputGroup>
        )}

      </CardFooter>
    </Card>
  );
}

export default Product;
