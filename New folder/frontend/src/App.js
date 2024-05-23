import React, { useEffect, useState } from 'react';
import { useAuth } from './components/auth/AuthProvider';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import OrderFood from './components/OrderFood';
import { LogoutButton } from "./components/auth/LogoutButton";

function App() {
  const [elevId, setElevId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orderPageVisible, setOrderPageVisible] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isTokenValid()) {
      setElevId(auth.user.id);
    }
  }, [auth]);

  const handleLogin = async () => {
    try {
      await auth.loginAction({username: username, password: password});
      if (auth.isTokenValid()) {
        setElevId(auth.user.id);
      }
      else {
        setElevId(null);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const handleLogout = () => {
    auth.logOut();
    setElevId(null);
    setPassword("");
    setUsername("");
    setOrderPageVisible(false);
  };

  const toggleOrderPage = () => {
    setOrderPageVisible(!orderPageVisible);
  };

  return (
    <div className="App">
      {!auth?.isTokenValid() ? (
        <div>
          <h1>Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>

          <h2>Registration</h2>
          <RegistrationForm />
        </div>
      ) : (
        <div>
          <LogoutButton onLogout={handleLogout} />
          {orderPageVisible ? (
            <OrderFood elevId={elevId} />
          ) : (
            <h2>Choose your food</h2>
          )}

          <button onClick={toggleOrderPage}>
            {orderPageVisible ? 'Hide Food Order' : 'Order Food'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
