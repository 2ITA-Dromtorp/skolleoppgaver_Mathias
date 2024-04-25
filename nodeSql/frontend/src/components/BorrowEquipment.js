import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BorrowEquipment(props) {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const fetchEquipmentData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/equipment'); // Assuming this endpoint returns equipment data
      setEquipment(response.data);
    } catch (error) {
      console.error('Error fetching equipment data:', error.message);
    }
  };

  const onBorrowClicked = async (item) => {
    // Handle borrowing request for the selected equipment
    // Send a request to the backend to process the borrowing
    // This is just a placeholder function
    console.log(`Student ID ${props.elevId} Borrowing equipment with ID: ${item.UtstyrID}`);
    try {
      const response = await axios.post('http://localhost:3001/borrow', {
        ElevID: props.elevId,
        UtstyrID: item.UtstyrID
      }); // Assuming this endpoint returns equipment data
    } catch (error) {
      console.error('Error fetching equipment data:', error.message);
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
            <button onClick={() => onBorrowClicked(item)}>Borrow</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BorrowEquipment;
