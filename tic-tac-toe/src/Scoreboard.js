// Scoreboard.js
import React from 'react';

const Scoreboard = ({ gameMode, winsX, winsO }) => {
  return (
    <div className="scoreboard">
      {gameMode === '2Players' ? (
        <div>
          <div>Player X wins: {winsX}</div>
          <div>Player O wins: {winsO}</div>
        </div>
      ) : (
        <div>
          <div>You: {winsX}</div>
          <div>Computer: {winsO}</div>
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
