import React, { useEffect, useState } from 'react';
import { useAuth } from './components/auth/AuthProvider';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import BorrowEquipment from './components/BorrowEquipment';
import ReturnEquipment from './components/ReturnEquipment'; // Import the ReturnEquipment component

function App() {
  const [elevId, setElevId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [returnPageVisible, setReturnPageVisible] = useState(false); // State to manage visibility of the return page
const auth = useAuth();

  useEffect(() => {
    if (auth?.isTokenValid?.(auth.token)) {
      setElevId(auth.user.id);
      setLoggedIn(true);
      }
  }, [auth]);

  const handleLogin = async () => {
    try {
      await auth.loginAction({username: username, password: password});
      setElevId(auth.user.id);
      setLoggedIn(true);

    } catch (error) {
      console.error('Error during login:', error.message);
      setMessage('Failed to log in');
    }
  };

  // Function to toggle visibility of the return page
  const toggleReturnPage = () => {
    setReturnPageVisible(!returnPageVisible);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div>
          <h1>Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>{message}</p>

          {/* Registration Form */}
          <h2>Registration</h2>
          <RegistrationForm />
        </div>
      ) : (
        <div>
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
