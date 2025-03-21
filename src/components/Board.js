import React, { useState } from "react";
import Square from "./Square";


const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]  
    ];
    
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    
    return squares.includes(null) ? null : "Draw"; // If no winner and board full, return "Draw"
 };

  const handleClick = (index) => {
    if (squares[index] || winner) return; // Prevent overwriting

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newSquares);
    setWinner(gameWinner);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

 
  

  return (
      <div>
        <div className="board">
          {squares.map((square, index) => (
            <Square key={index} value={square} onClick={() => handleClick(index)} />
          ))}
        </div>
        {winner && <h2>{winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}</h2>}
        <button className="reset" onClick={resetGame}>Restart</button>
      </div>

  );

};




export default Board;
