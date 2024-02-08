import React, { useState } from 'react';
import Chess from 'react-chess';
import { isValidMove } from './chessUtils'; // Import a function to validate moves

const ChessBoard = () => {
  const [gameState, setGameState] = useState({
    pieces: Chess.getDefaultLineup(),
    currentPlayer: 'white', // Initialize with white as the starting player
  });

  // Function to handle move logic
  const handleMovePiece = (piece, fromPosition, toPosition) => {
    if (isValidMove(piece, fromPosition, toPosition, gameState)) {
      const newPieces = gameState.pieces.map(p =>
        p.position === fromPosition ? { ...p, position: toPosition } : p
      );
      setGameState({
        ...gameState,
        pieces: newPieces,
        currentPlayer: gameState.currentPlayer === 'white' ? 'black' : 'white',
      });
    }
  };

  return (
    <Chess
      pieces={gameState.pieces}
      allowMoves={true}
      onMovePiece={handleMovePiece}
      currentPlayer={gameState.currentPlayer}
    />
  );
};

export default ChessBoard;
