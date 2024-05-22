import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ foodData, placeOrder }) => {
  const [selectedFoodId, setSelectedFoodId] = useState(foodData[0]?.id || '');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(selectedFoodId, quantity);
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2>Place an Order</h2>
      <div className="form-group">
        <label htmlFor="food">Food Item:</label>
        <select
          id="food"
          value={selectedFoodId}
          onChange={(e) => setSelectedFoodId(e.target.value)}
        >
          {foodData.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
