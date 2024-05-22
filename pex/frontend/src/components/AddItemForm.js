import React, { useState } from 'react';
import './AddItemForm.css';

const AddItemForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemAvailability, setItemAvailability] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name: itemName, price: itemPrice, available: itemAvailability });
    setItemName('');
    setItemPrice(0);
    setItemAvailability(0);
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="item-name">Item Name</label>
        <input
          type="text"
          id="item-name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="item-price">Item Price</label>
        <input
          type="number"
          id="item-price"
          value={itemPrice}
          onChange={(e) => setItemPrice(parseFloat(e.target.value))}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="item-availability">Item Availability</label>
        <input
          type="number"
          id="item-availability"
          value={itemAvailability}
          onChange={(e) => setItemAvailability(parseInt(e.target.value))}
          required
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
