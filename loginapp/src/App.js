import React from 'react';
import Quiz from './Quiz';
import Leaderboard from './Leaderboard';
import FeedbackForm from './FeedbackForm';
import './App.css';

function App() {
  const apiUrl = 'http://localhost:3001';

  return (
    <div className="app-container">
      <h1>Quiz</h1>
      <Quiz apiUrl={apiUrl} />
      <Leaderboard apiUrl={apiUrl} />
      <FeedbackForm apiUrl={apiUrl} />
    </div>
  );
}

export default App;
