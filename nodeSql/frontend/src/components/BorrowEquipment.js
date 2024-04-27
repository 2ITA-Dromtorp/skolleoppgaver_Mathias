import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BorrowEquipment(props) {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const fetchEquipmentData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/equipment');
      setEquipment(response.data);
    } catch (error) {
      console.error('Error fetching equipment data:', error.message);
    }
  };

  const onBorrowClicked = async (item) => {
    console.log(`Student ID ${props.elevId} Borrowing equipment with ID: ${item.UtstyrID}`);
    try {
      const response = await axios.post('http://localhost:3001/borrow', {
        ElevID: props.elevId,
        UtstyrID: item.UtstyrID
      });
      if (response.status === 200) {
        fetchEquipmentData(); // Refresh equipment list after successful borrowing
      } else {
        console.error('Failed to borrow equipment:', response.data.message);
      }
    } catch (error) {
      console.error('Error borrowing equipment:', error.message);
    }
  };

  return (
    <div className="borrow-equipment">
      <h1>Borrow Equipment Page</h1>
      <div className="equipment-list">
        {equipment.map((item) => (
          <div key={item.UtstyrID} className="equipment-item">
            <h2>{item.Type}</h2>
            <p>{item.Spesifikasjoner}</p>
            {item.Tilgjengelig ? (
              <button onClick={() => onBorrowClicked(item)}>Borrow</button>
            ) : (
              <p>This item is currently unavailable</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BorrowEquipment;
