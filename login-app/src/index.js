import React, { useState } from 'react';
import './App.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add your authentication logic here.
    // For simplicity, let's assume successful login if the username and password are not empty.
    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <div>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <header>
            <p>Welcome, {username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </header>
        </div>
      ) : (
        <div>
          <header>
            <LoginForm onLogin={handleLogin} />
          </header>
        </div>
      )}
    </div>
  );
}

export default App;
