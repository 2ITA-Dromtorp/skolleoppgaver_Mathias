import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReturnEquipment.css"; // Import the CSS file
import { useAuth } from "../components/auth/AuthProvider";

const createAxiosConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

function ReturnEquipment(props) {
  const [borrowedEquipment, setBorrowedEquipment] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    console.log("ReturnEquipment", props.elevId);
    if (props.elevId > 0) {
      fetchBorrowedEquipment();
    }
  }, [props.elevId]);

  const fetchBorrowedEquipment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/borrowed/${props.elevId}`,
        createAxiosConfig(token)
      );
      setBorrowedEquipment(response.data);
    } catch (error) {
      console.error("Error fetching borrowed equipment:", error.message);
    }
  };

  const onReturnClicked = async (item) => {
    try {
      await axios.post(
        "http://localhost:3001/return",
        {
          loanId: item.loanId,
          equipmentId: item.id,
        },
        createAxiosConfig(token)
      );
      fetchBorrowedEquipment(); // Refresh borrowed equipment list after successful returning
    } catch (error) {
      console.error("Failed returning equipment:", error.message);
    }
  };

  return (
    <div className="return-equipment">
      <div className="container">
        <h1>Borrowed Equipment</h1>
        <div className="borrowed-equipment-list">
          {borrowedEquipment.length === 0 ? (
            <p>You have nothing to return.</p>
          ) : (
            borrowedEquipment.map((item) => (
              <div key={item.id} className="borrowed-equipment-item">
                <h2>{item.name}</h2>
                <p>{item.type}</p>
                <button onClick={() => onReturnClicked(item)}>Return</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ReturnEquipment;