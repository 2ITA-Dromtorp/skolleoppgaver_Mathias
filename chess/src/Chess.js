import React, { useState } from "react";
import "./Chess.css";

const pieces = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟', 
  '': ''
};

const initialBoardState = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"]
];

const Chess = () => {
  const [board] = useState(initialBoardState); 

  return (
    <div className="chess-board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((piece, colIndex) => (
            <div className="cell" key={`${rowIndex}-${colIndex}`}>
              <span className="piece" role="img" aria-label={pieces[piece]}>
                {pieces[piece]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Chess;
