import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import Scoreboard from './Scoreboard';

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [winsX, setWinsX] = useState(0);
  const [winsO, setWinsO] = useState(0);
  const [resetKey, setResetKey] = useState(0); // Key to trigger Board reset

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    setWinsX(0); // Reset wins when switching modes
    setWinsO(0);
    setResetKey(prevKey => prevKey + 1); // Trigger Board reset
  };

  const handleWinner = (winner) => {
    if (winner === 'X') {
      setWinsX(prevWins => prevWins + 1);
    } else if (winner === 'O') {
      setWinsO(prevWins => prevWins + 1);
    }
  };

  useEffect(() => {
    // Place any side effects here that need to run when gameMode changes
    // This useEffect runs only once on initial render, as the dependency array is empty
  }, [gameMode]);

  const handleResetGame = () => {
    // Update resetKey to trigger Board reset
    setResetKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
        {!gameMode && (
          <div>
            <button onClick={() => handleModeSelect('1Player')}>1 Player</button>
            <button onClick={() => handleModeSelect('2Players')}>2 Players</button>
          </div>
        )}
      </header>
      {gameMode && (
        <main>
          <Scoreboard gameMode={gameMode} winsX={winsX} winsO={winsO} />
          <Board key={resetKey} gameMode={gameMode} onWinner={handleWinner} />
          <button onClick={handleResetGame}>Play Again</button>
        </main>
      )}
    </div>
  );
}

export default App;
