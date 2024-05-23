import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ foodData, placeOrder }) => {
  const [cart, setCart] = useState([]);

  const handlePlaceOrder = async () => {
    await placeOrder?.(cart);
    setCart([]);
  }

  const selectableFood = (item) => {
    return (
      <div key={item.id}>
        {item.name}&nbsp;
        <input
          type="number"
          min="0"
          max={item.available}
          value={cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value >= 0 && value <= item.available) {
              let foundInCart = false;
              const updatedCart = cart.map((cartItem) => {
                if (cartItem.id === item.id) {
                  foundInCart = true;
                  return { ...cartItem, quantity: value, sum: item.price * value };
                }
                return cartItem;
              });

              if (!foundInCart) {
                updatedCart.push({ id: item.id, itemPrice: item.price, quantity: value, sum: item.price * value });
              }

              setCart(updatedCart);
            }
          }}
        />
      </div>
    );
  };

  const orderSummary = () => {
    const totalCost = cart.reduce((total, item) => total + item.sum, 0);
    return (
      <>
      <p>Total cost: ${totalCost}</p>
      </>
    );
  };


  return (
    <>
      <h2>Selections</h2>
      {foodData?.map(selectableFood)}

      {orderSummary()}

      <button onClick={handlePlaceOrder}>Purchase</button>
    </>
  );
};

export default OrderForm;
