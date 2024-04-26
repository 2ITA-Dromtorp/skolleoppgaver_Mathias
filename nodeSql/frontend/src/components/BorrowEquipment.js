import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BorrowEquipment(props) {
  const [equipment, setEquipment] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage(response.data.message);
      fetchEquipmentData(); // Refresh equipment data after borrowing
    } catch (error) {
      console.error('Error borrowing equipment:', error.message);
    }
  };

  const onReturnClicked = async (UtlånID) => {
    console.log(`Returning equipment with ID: ${UtlånID}`);
    try {
      const response = await axios.post('http://localhost:3001/return', { UtlånID });
      setErrorMessage(response.data.message);
      fetchEquipmentData(); // Refresh equipment data after returning
    } catch (error) {
      console.error('Error returning equipment:', error.message);
    }
  };

  return (
    <div className="borrow-equipment">
      <h1>Borrow Equipment Page</h1>
      <p>{errorMessage}</p>
      <div className="equipment-list">
        {equipment.map((item) => (
          <div key={item.UtstyrID} className="equipment-item">
            <h2>{item.Type}</h2>
            <p>{item.Spesifikasjoner}</p>
            {item.Tilgjengelig > 0 ? (
              <button onClick={() => onBorrowClicked(item)}>Borrow</button>
            ) : (
              <p>No available equipment left</p>
            )}
            {item.Tilgjengelig < item.TotaltAntall ? (
              <button onClick={() => onReturnClicked(item.UtlånID)}>Return</button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BorrowEquipment;
