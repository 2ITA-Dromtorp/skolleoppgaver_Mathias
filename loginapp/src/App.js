// App.js
import React from 'react';
import Quiz from './Quiz';

function App() {
  return (
    <div className="app-container">
      <h1>Quiz</h1>
      <Quiz apiUrl="http://localhost:3001" /> {/* Pass the API URL as a prop */}
    </div>
  );
}

export default App;
