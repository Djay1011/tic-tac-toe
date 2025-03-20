import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (squares[index]) return; // Prevent overwriting

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
};

export default Board;
