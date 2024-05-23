import React, { useState, useEffect } from 'react';
import './AdminManagement.css';
import { useAuth } from './auth/AuthProvider';

export const ManageUsers = ({ onUpdateUser, onDeleteUser }) => {
  const [users, setUsers] = useState([]);
  const {token, isTokenValid} = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3001/admin/users', {
      headers: {
      Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    setUsers(data);
  };

  const handleDeleteUser = async (userId) => {
    await onDeleteUser(userId);
    fetchUsers();
  };

  return (
    <div className="admin-management">
      <h2>Manage Users</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email} - {user.userRole}
            {onDeleteUser && <button onClick={() => handleDeleteUser(user.id)}>Delete</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ManageOrders = () => {
  // Implement similar to ManageUsers if needed
  return <div>Manage Orders</div>;
};

export const ManageStock = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemAvailability, setItemAvailability] = useState(0);

  const handleAddItem = () => {
    onAddItem({ name: itemName, price: itemPrice, available: itemAvailability });
  };

  return (
    <div className="admin-management">
      <h2>Manage Stock</h2>
      <div className="form-group">
        <label>Item Name</label>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Item Price</label>
        <input type="number" value={itemPrice} onChange={(e) => setItemPrice(parseFloat(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Item Availability</label>
        <input type="number" value={itemAvailability} onChange={(e) => setItemAvailability(parseInt(e.target.value))} />
      </div>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};
