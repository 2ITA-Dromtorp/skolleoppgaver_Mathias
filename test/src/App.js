import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm';

function App() {
  const [showContent, setShowContent] = useState(false);

  const handleLogin = (password) => {
    // Simulate login functionality here
    // You can send a request to your backend for authentication

    // For demonstration purposes, just toggle the content visibility
    setShowContent(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {!showContent && <LoginForm onLogin={handleLogin} />}
      {showContent && (
        <div id="content">
          <h2>Protected Content</h2>
          <p>This is your protected content.</p>
        </div>
      )}
    </div>
  );
}

export default App;
