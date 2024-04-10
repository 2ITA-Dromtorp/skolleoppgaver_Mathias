// Board.js
import React, { useState, useEffect } from 'react';
import './Board.css';
import Square from './Square';
import calculateWinner from './calculateWinner';

const Board = ({ gameMode, onWinner }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;

  const isBoardFull = squares.every(square => square !== null);

  useEffect(() => {
    if (winner || isBoardFull) {
      if (winner) {
        onWinner(winner);
      } else {
        onWinner('Tie');
      }
    }
  }, [winner, isBoardFull, onWinner]);

  const handleClick = (i) => {
    if (winner || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

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
      {isBoardFull && !winner && <div className="status">It's a tie!</div>}
    </div>
  );
};

export default Board;
