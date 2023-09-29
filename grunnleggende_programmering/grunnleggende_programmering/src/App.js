/* eslint-disable eqeqeq */
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

/*
import React, { useState } from "react";
import './App.css';

const choices = ["rock", "paper", "scissors"];

export default function RPSGame() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const generateComputerChoice = () => choices[Math.floor(Math.random() * choices.length)];

  const determineWinner = (player, computer) => {
    if (player == computer) return "It's a tie!";
    const winConditions = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper"
    };
    return winConditions[player] == computer ? "You win!" : "Computer wins!";
  };

  const handleChoice = (choice) => {
    const computerChoice = generateComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(determineWinner(choice, computerChoice));
  };

  return (
    <div className="rps-container">
      <h1>Stein,Saks,Papir</h1>
      <div className="button-container">
        {choices.map((choice) => (
          <button
            key={choice}
            className="rps-button"
            onClick={() => handleChoice(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      {computerChoice&&(
        <div className="result-container">
          <p>Computer chose: {computerChoice}</p>
          <p className="result-text">{result}</p>
        </div>
      )}
    </div>
  );
}

*/

import './App.css';
import Elev from './Elev';

function App() {

  return (
    <div className='container'>

      <div className='learer'>

        <Elev name="lærer"/>

      </div>

      <div className='forste_rad'>

        <Elev name="Martin" />

        <Elev name="Mathias"/>

        <Elev name="Kevin"/>

        <Elev name="Andreas"/>

      </div>

      <div className='andre_rad'>

        <Elev name="Falk"/>
        <Elev name="Sander"/>
        <Elev name="Ylva"/>

        <Elev name="Vanessa"/>
        <Elev name="Chen"/>

      </div>

      <div className='tredje_rad'>

        <Elev name="Luz"/>
        <Elev name="Fridjiof"/>

      </div>



    </div>
  );
}

export default App;

