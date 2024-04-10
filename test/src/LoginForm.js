import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(password);
  };

  return (
    <div id="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
