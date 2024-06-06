import { Container, Table, Button } from 'react-bootstrap';
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cartItems, addCartItem, removeCartItem, completePurchase } = useCart();
  const navigate = useNavigate();

  const handleCompletePurchase = () => {
    completePurchase();
    navigate('/');
  };

  return (
    <Container>
      <h1 className="mt-3">My Cart</h1>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.product.id}>
              <td>{index + 1}</td>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{item.product.price}NOK</td>
              <td className="text-center">
                <Button variant="success" size="sm" onClick={() => addCartItem(item.product)}>
                  Add
                </Button>
                <Button variant="danger" size="sm" onClick={() => removeCartItem(item.product)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" className="mt-3" onClick={handleCompletePurchase}>
        Complete Purchase
      </Button>
    </Container>
  );
}

export default CartPage;