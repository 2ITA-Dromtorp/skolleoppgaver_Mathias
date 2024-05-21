import React from "react";
import { useAuth } from "./AuthProvider";
import "./LogoutButton.css";

export const LogoutButton = ({ onLogout }) => {
  const { user } = useAuth();

  const handleLogout = () => {
    onLogout?.();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="logout-button-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout {user.firstName} {user.lastName}
      </button>
    </div>
  );
};
