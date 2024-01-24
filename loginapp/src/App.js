import React, { useState } from 'react';
import './App.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic here
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Log In" />
        </form>
    );
}

function App() {
  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
