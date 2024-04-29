import React, { useEffect, useState } from 'react';
import { useAuth } from './components/auth/AuthProvider';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import BorrowEquipment from './components/BorrowEquipment';
import ReturnEquipment from './components/ReturnEquipment'; // Import the ReturnEquipment component
import { LogoutButton } from "./components/auth/LogoutButton";

function App() {
  const [elevId, setElevId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [returnPageVisible, setReturnPageVisible] = useState(false); // State to manage visibility of the return page
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
    setReturnPageVisible(false);
  }

  // Function to toggle visibility of the return page
  const toggleReturnPage = () => {
    setReturnPageVisible(!returnPageVisible);
  };

  return (
    <div className="App">
      {!auth?.isTokenValid() ? (
        <div>
          <h1>Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>

          {/* Registration Form */}
          <h2>Registration</h2>
          <RegistrationForm />
        </div>
      ) : (
        <div>
          <LogoutButton onLogout={handleLogout} />
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
