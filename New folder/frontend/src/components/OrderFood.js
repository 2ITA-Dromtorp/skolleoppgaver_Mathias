import React, { useState, useEffect } from 'react';

const OrderFood = ({ elevId }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch food items from backend when the component mounts
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/food');
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const handleOrder = async () => {
    try {
      const response = await fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ foodId: selectedFood, quantity: quantity, userId: elevId }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error placing food order:', error);
    }
  };

  return (
    <div>
      <h2>Order Food</h2>
      <select value={selectedFood} onChange={(e) => setSelectedFood(e.target.value)}>
        <option value="">Select Food Item</option>
        {foodItems.map((food) => (
          <option key={food.id} value={food.id}>
            {food.name} - ${food.price}
          </option>
        ))}
      </select>
      <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleOrder}>Order</button>
    </div>
  );
};

export default OrderFood;
