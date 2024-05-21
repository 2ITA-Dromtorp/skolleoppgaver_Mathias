import React, { useEffect, useState } from 'react';
import { useAuth } from './components/auth/AuthProvider';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import { LogoutButton } from "./components/auth/LogoutButton";

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [foodData, setFoodData] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isTokenValid()) {
      fetchFoodData();
    }
  }, [auth]);

  const fetchFoodData = async () => {
    try {
      const response = await fetch('http://localhost:3001/food', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();
      setFoodData(data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await auth.loginAction({ username, password });
      if (auth.isTokenValid()) {
        fetchFoodData();
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const handleLogout = () => {
    auth.logOut();
    setUsername('');
    setPassword('');
    setFoodData([]);
  };

  const updateAvailability = async (id, newAvailability) => {
    try {
      const response = await fetch('http://localhost:3001/food/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ id, available: newAvailability }),
      });

      if (response.ok) {
        fetchFoodData(); // Refresh the food data
      } else {
        console.error('Error updating availability');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  return (
    <div className="App">
      {!auth?.isTokenValid() ? (
        <div>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>

          {/* Registration Form */}
          <h2>Registration</h2>
          <RegistrationForm />
        </div>
      ) : (
        <div>
          <LogoutButton onLogout={handleLogout} />
          <h2>Food Menu</h2>
          <ul>
            {foodData.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} - Available: {item.available}
                <div>
                  <button onClick={() => updateAvailability(item.id, item.available + 1)}>Increase</button>
                  <button onClick={() => updateAvailability(item.id, item.available - 1)} disabled={item.available === 0}>Decrease</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
