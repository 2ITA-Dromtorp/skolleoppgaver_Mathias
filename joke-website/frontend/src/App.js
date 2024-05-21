// frontend/src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [message, setMessage] = useState('');
  const [memes, setMemes] = useState([]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        // Fetch memes after successful login
        fetchMemes();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred while logging in');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: registerUsername, password: registerPassword })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred while registering');
    }
  };

  const fetchMemes = async () => {
    try {
      const response = await fetch('http://localhost:3001/memes');
      const data = await response.json();
      setMemes(data);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };

  return (
    <div className="App">
      <div id="login-form">
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div id="register-form">
        <h2>Register</h2>
        <input type="text" placeholder="Username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
      </div>
      {message && <p>{message}</p>}
      <div id="memes">
        <h2>Memes</h2>
        {memes.map((meme, index) => (
          <div key={index} className="meme">
            <h3>{meme.title}</h3>
            <img src={meme.imageUrl} alt="Meme" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
