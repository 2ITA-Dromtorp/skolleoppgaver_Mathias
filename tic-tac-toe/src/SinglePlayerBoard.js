import React, { useState } from 'react';
import './Board.css';
import Square from './Square';
import calculateWinner from './calculateWinner';

const SinglePlayerBoard = ({ setWinsX, setWinsO }) => {
  // State for the squares, current player, and winner
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Function to handle a square click
  const handleClick = (i) => {
    if (winner || squares[i]) return; // If there's a winner or the square is already filled, do nothing
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O'; // Fill the square with 'X' or 'O'
    setSquares(newSquares); // Update the squares state
    setXIsNext(!xIsNext); // Toggle the player
  };

  // Check for a winner
  const checkWinner = () => {
    const winnerInfo = calculateWinner(squares);
    if (winnerInfo) {
      setWinner(winnerInfo.winner); // Set the winner if there is one
      // Update the wins count based on the winner
      if (winnerInfo.winner === 'X') {
        setWinsX((prevWins) => prevWins + 1);
      } else if (winnerInfo.winner === 'O') {
        setWinsO((prevWins) => prevWins + 1);
      }
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setSquares(Array(9).fill(null)); // Reset squares
    setXIsNext(true); // Set next player to X
    setWinner(null); // Reset winner
  };

  // Render function for squares
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div className="board-container">
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      {winner && <div className="status">Winner: {winner}</div>}
      {winner && <button onClick={resetGame}>Play Again</button>}
    </div>
  );
};

export default SinglePlayerBoard;
