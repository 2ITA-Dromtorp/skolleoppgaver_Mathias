// Login.js
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("User");
  const [password, setPassword] = useState("Password");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    console.log(`Email: ${email}, Password: ${password}`);
    
    // Add your login logic here
    
    // Redirect to a website after successful login
    window.location.href = "https://youtube.com/";
  };

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
