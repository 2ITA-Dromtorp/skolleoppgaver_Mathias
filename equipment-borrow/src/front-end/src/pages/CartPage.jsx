import { ProductList } from "../components/product";
import { Alert, Button, Container, Row } from "react-bootstrap";
import orderService from "../services/order-service";
import useCart from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

function getFormattedPrice(price) {
  return Number(price).toLocaleString('nb-NO', { style: 'currency', currency: 'NOK' });
}

/**
 * Renders the Home Page component.
 */
function CartPage() {
  const { clearCart, cartItems } = useCart();
  const [cartProducts, setCartProducts] = useState([]);
  const [orderSent, setOrderSent] = useState(false);

  const { user } = useAuth();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems?.forEach((item) => {
      totalPrice += item.quantity * item.product.unitPrice;
    });
    return totalPrice;
  };

  const calculateTotalPriceAfterMVA = () => {
    const totalPrice = calculateTotalPrice();
    return Math.round(totalPrice * 1.25); // 25%
  };

  useEffect(() => {
    setCartProducts(cartItems?.map((c) => c.product));
  }, [cartItems]);

  const handleAddOrder = async () => {
    try {
      const orderLines = cartItems.map((item) => {
        return {
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.unitPrice,
        };
      });

      await orderService.createOrder({
        customerId: user.id,
        address: "",
        status: "new",
        orderLines: orderLines,
      });

      clearCart();
      setOrderSent(true);
    } catch (error) {
      console.error("Unable to create order", error);
    }
  };

  if (orderSent) {
    return (
      <Alert variant="success">
        <Alert.Heading>Ordre sendt!</Alert.Heading>
        <p>
          Din ordre er registrert og varene er snart på vei.
        </p>
        <hr />
        <p className="mb-0">Vi kommer snart med en egen side der du kan følge status på din ordre og se odrehistorikk.</p>
      </Alert>
    );
  }

  return (
    <Container>
      <Row>
        <h2>Handlekurv</h2>
        <p>Se gjennom og trykk kjøp 🛍️</p>
        {cartProducts && <ProductList products={cartProducts} />}
      </Row>
      <Row className="d-flex justify-content-center mt-5">
        {cartProducts?.length > 0 && (<>
            <h4 className="text-center pb-4">
              Totalpris før MVA: {getFormattedPrice(calculateTotalPrice())}
              <br />
              Totalpris etter MVA: {getFormattedPrice(calculateTotalPriceAfterMVA())}
            </h4>
          <Button className="col-4 py-3" onClick={() => handleAddOrder()}>
            Bestill
            </Button>
        </>)}

        {cartProducts?.length === 0 && <p>Handlekurven er tom!</p>}
      </Row>
    </Container>
  );
}

export default CartPage;

