import React, { useState } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import BorrowEquipment from './components/BorrowEquipment';
import ReturnEquipment from './components/ReturnEquipment'; // Import the ReturnEquipment component

function App() {
  const [elevId, setElevId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [returnPageVisible, setReturnPageVisible] = useState(false); // State to manage visibility of the return page

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

  // Function to toggle visibility of the return page
  const toggleReturnPage = () => {
    setReturnPageVisible(!returnPageVisible);
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
        <div>
          {/* If returnPageVisible is true, render the ReturnEquipment component */}
          {returnPageVisible ? (
            <ReturnEquipment elevId={elevId} />
          ) : (
            <BorrowEquipment elevId={elevId} />
          )}

          {/* Button to toggle visibility of the return page */}
          <button onClick={toggleReturnPage}>
            {returnPageVisible ? 'Hide Return Equipment' : 'Return Equipment'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
