import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../components/auth/AuthProvider";

const createAxiosConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

function BorrowEquipment(props) {
  const [equipment, setEquipment] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const fetchEquipmentData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/equipment`,
        createAxiosConfig(token)
      );
      setEquipment(response.data);
    } catch (error) {
      console.error("Error fetching equipment data:", error.message);
    }
  };

  const onBorrowClicked = async (item) => {
    console.log(
      `Student ID ${props.elevId} Borrowing equipment with ID: ${item.id}`
    );
    try {
      await axios.post(
        "http://localhost:3001/borrow",
        {
          ElevID: props.elevId,
          UtstyrID: item.id,
        },
        createAxiosConfig(token)
      );

      await fetchEquipmentData();
    } catch (error) {
      console.error("Error borrowing equipment:", error.message);
    }
  };

  return (
    <div className="borrow-equipment">
      <h1>Borrow Equipment Page</h1>
      <div className="equipment-list">
        {equipment.map((item) => (
          <div key={item.id} className="equipment-item">
            <h2>{item.name}</h2>
            <p>{item.type}</p>
            {item.available ? (
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
