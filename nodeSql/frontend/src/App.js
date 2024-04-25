import React, { useState } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import BorrowEquipment from './components/BorrowEquipment';

function App() {
  const [elevId, setElevId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      setMessage(data.message);
      setElevId(data.user.ElevID);

      // If login is successful, setLoggedIn to true
      if (response.ok) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setMessage('Failed to log in');
    }
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div>
          <h1>Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>{message}</p>

          {/* Registration Form */}
          <h2>Registration</h2>
          <RegistrationForm />
        </div>
      ) : (
        <BorrowEquipment elevId={elevId}  />
      )}
    </div>
  );
}

export default App;
