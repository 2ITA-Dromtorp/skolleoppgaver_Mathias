// Score.js
import React from "react";
import { useLocation } from "react-router-dom";

const Score = () => {
  const location = useLocation();
  const { score, total } = location.state;

  return (
    <div>
      <h2>Quiz Complete!</h2>
      <p>Your Score: {score} out of {total}</p>
    </div>
  );
};

export default Score;
