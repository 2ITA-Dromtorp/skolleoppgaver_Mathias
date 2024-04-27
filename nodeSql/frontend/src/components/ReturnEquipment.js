import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReturnEquipment(props) {
  const [borrowedEquipment, setBorrowedEquipment] = useState([]);

  useEffect(() => {
    fetchBorrowedEquipment();
  }, []);

  const fetchBorrowedEquipment = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/borrowed/${props.elevId}`);
      setBorrowedEquipment(response.data);
    } catch (error) {
      console.error('Error fetching borrowed equipment:', error.message);
    }
  };

  const onReturnClicked = async (item) => {
    try {
      const response = await axios.post('http://localhost:3001/return', {
        UtlånID: item.UtlånID,
        UtstyrID: item.UtstyrID
      });
      if (response.status === 200) {
        fetchBorrowedEquipment(); // Refresh borrowed equipment list after successful returning
      } else {
        console.error('Failed to return equipment:', response.data.message);
      }
    } catch (error) {
      console.error('Error returning equipment:', error.message);
    }
  };

  return (
    <div className="return-equipment">
      <h1>Return Equipment Page</h1>
      <div className="borrowed-equipment-list">
        {borrowedEquipment.map((item) => (
          <div key={item.UtlånID} className="borrowed-equipment-item">
            <h2>{item.Type}</h2>
            <p>{item.Spesifikasjoner}</p>
            <button onClick={() => onReturnClicked(item)}>Return</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReturnEquipment;
