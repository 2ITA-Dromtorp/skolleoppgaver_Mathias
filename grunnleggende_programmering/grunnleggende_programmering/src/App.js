/* klokke
import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [time, setTime] = useState();

  function getFormattedTime() {
    const d = new Date();
    return d.toLocaleTimeString();
  }

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className="klokke">
      <div className="screen">
        <h1 className="time">{time}</h1>
      </div>
    </div>
  );
} 
*/


/*
import React, { useState } from "react";
import './App.css'; // Import your CSS file

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement100 = () => {
    setCount(count + 100);
  };

  const handleIncrement10 = () => {
    setCount(count + 10);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleDecrement10 = () => {
    setCount(count - 10);
  };

  const handleDecrement100 = () => {
    setCount(count - 100);
  };
  


  return (
    <div className="counter-container">
      <div className="centered-content">
        <p className="count-display">{count}</p>
      </div>
      <div className="button-container">
      <button className="btn btn-success" onClick={handleIncrement100}>+100</button>
        <button className="btn btn-success" onClick={handleIncrement10}>+10</button>
        <button className="btn btn-success" onClick={handleIncrement}>+</button>
        <button className="btn btn-primary" onClick={handleReset}>Reset</button>
        <button className="btn btn-danger" onClick={handleDecrement}>-</button>
        <button className="btn btn-danger" onClick={handleDecrement10}>-10</button>
        <button className="btn btn-danger" onClick={handleDecrement100}>-100</button>
        
      </div>
    </div>
  );
}
*/






