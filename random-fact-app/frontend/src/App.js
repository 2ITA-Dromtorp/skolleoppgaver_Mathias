import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [joke, setJoke] = useState({});
  const [error, setError] = useState('');

  const getRandomJoke = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jokes/${type}`);
      console.log('Fetched joke:', response.data.joke);
      setJoke(response.data.joke);
      setError('');
    } catch (error) {
      console.error('Error fetching random joke:', error);
      setError('Failed to fetch a joke. Please try again later.');
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Joke/Meme Website</h1>
      </div>

      <div className="navbar">
        <button onClick={() => getRandomJoke('dark')}>Dark Humor</button>
        <button onClick={() => getRandomJoke('mixed')}>Mixed</button>
        <button onClick={() => getRandomJoke('programming')}>Programming</button>
        <button onClick={() => getRandomJoke('general')}>General</button>
        {/* Add more buttons for other joke types if needed */}
      </div>

      <div className="container">
        <div className="content">
          <div className="card">
            {error && <p className="error">{error}</p>}
            {!error && (
              <>
                <h2>{joke.type ? joke.type.charAt(0).toUpperCase() + joke.type.slice(1) : 'Joke'}</h2>
                <p>{joke.setup}</p>
                <p>{joke.punchline}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 Joke/Meme Website</p>
      </div>
    </div>
  );
}

export default App;
