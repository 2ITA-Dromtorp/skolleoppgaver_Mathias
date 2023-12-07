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
/*
import './App.css';
import { Route, Routes } from "react-router-dom";
import Klassekart from './klassekart';
import Profile from './profile';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Klassekart />} />
      <Route path="/:profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
*/

/*
import React, { useState, useEffect } from 'react';
import './App.css';
import DogImage from './images/Dog.jpg';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState({});

  const [person, setPerson] = useState({ navn: '', alder: 0 });
  const [hund, setHund] = useState({ navn: '', alder: 0 });

  const [visHilsen, setVisHilsen] = useState(false);

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    type === 'person' ? setPerson({ ...person, [name]: value }) : setHund({ ...hund, [name]: value });
  };

  const handleLoginClick = () => {
    if (users[username] === password) {
      setLoggedIn(true);
    } else {
      alert('Feil brukernavn eller passord');
    }
  };

  const handleRegisterClick = () => {
    const newUsers = {
      ...users,
      [username]: password,
    };
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    setUsername('');
    setPassword('');
  };

  const handleSendClick = () => setVisHilsen(true);

  const handleDeleteUser = (userToDelete) => {
    const newUsers = { ...users };
    delete newUsers[userToDelete];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const handleUpdateUser = (usernameToUpdate, newPassword) => {
    const newUsers = {
      ...users,
      [usernameToUpdate]: newPassword,
    };
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const adminAccount = { admin: 'admin' };
      setUsers(adminAccount);
      localStorage.setItem('users', JSON.stringify(adminAccount));
    }
  }, []);

  if (!loggedIn) {
    return (
      <div className="login-container">
        <input className="input-field" type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Brukernavn" />
        <input className="input-field" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Passord" />
        <button className="login-button" onClick={handleLoginClick}>Logg inn</button>
        <button className="register-button" onClick={handleRegisterClick}>Registrer</button>
      </div>
    );
  }

  if (username === 'admin') {
    return (
      <div className="container" style={{ backgroundImage: `url(${DogImage})`, height: '100vh' }}>
        <h2>Administrator Dashboard</h2>
        <h3>Brukere:</h3>
        <ul>
          {Object.keys(users).map((user, index) => (
            <li key={index}>
              {user}
              <button onClick={() => handleDeleteUser(user)}>Slett bruker</button>
              <button onClick={() => handleUpdateUser(user, prompt('Skriv inn nytt passord'))}>Endre passord</button>
            </li>
          ))}
        </ul>
        <button onClick={() => setLoggedIn(false)}>Logg ut</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ backgroundImage: `url(${DogImage})`, height: '100vh' }}>
      <label className="input-label">
        Ditt navn:
        <input className="input-field" type="text" name="navn" value={person.navn} onChange={(e) => handleInputChange(e, 'person')} />
      </label>
      <label className="input-label">
        Din alder:
        <input className="input-field" type="number" name="alder" value={person.alder} onChange={(e) => handleInputChange(e, 'person')} />
      </label>
      <label className="input-label">
        Hundens navn:
        <input className="input-field" type="text" name="navn" value={hund.navn} onChange={(e) => handleInputChange(e, 'hund')} />
      </label>
      <label className="input-label">
        Hundens alder:
        <input className="input-field" type="number" name="alder" value={hund.alder} onChange={(e) => handleInputChange(e, 'hund')} />
      </label>
      <button className="send-button" onClick={handleSendClick}>Send</button>
      <button onClick={() => setLoggedIn(false)}>Logg ut</button>

      {visHilsen && (
        <p className="greeting-message">
          Hei, {person.navn} og {hund.navn}.  alder din {person.navn} i hundeår er omtrent {person.alder * 5} år, og {hund.navn} er {hund.alder * 5} år i hundeår.
        </p>
      )}
    </div>
  );
}

export default App;
*/

