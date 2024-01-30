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
    // Simulate a basic login check (replace this with your actual authentication logic)
    if (email === "User" && password === "Password") {
      console.log("Login successful!");
      // Redirect to a website after successful login
      window.location.href = "https://youtube.com/";
    } else {
      console.log("Login failed. Please check your credentials.");
    }
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