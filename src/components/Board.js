import React, { useState, useEffect } from "react";
import Square from "./Square";

const Board = ({ playerX, playerO, isSinglePlayer }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const checkWinner = (squares) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return winner (X or O)
      }
    }
    return squares.includes(null) ? null : "Draw"; // If full board, return Draw
  };

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = "X";
    setSquares(newSquares);
    setIsXNext(false);

    const gameWinner = checkWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
      setIsRunning(false);
      return;
    }

    if (isSinglePlayer) {
      setTimeout(() => {
        setSquares((currentSquares) => {
          const emptySquares = currentSquares
            .map((sq, i) => (sq === null ? i : null))
            .filter((i) => i !== null);

          if (emptySquares.length === 0) return currentSquares;

          const aiMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          const updatedSquares = [...currentSquares];
          updatedSquares[aiMove] = "O";

          const aiWinner = checkWinner(updatedSquares);
          if (aiWinner) {
            setWinner(aiWinner);
            setIsRunning(false);
          }

          setIsXNext(true);
          return updatedSquares;
        });
      }, 500);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setTime(0);
    setIsRunning(true);
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div>
      <div className="board">
        {squares.map((square, index) => (
          <Square key={index} value={square} onClick={() => handleClick(index)} />
        ))}
      </div>
      {winner && <h2>{winner === "Draw" ? "It's a Draw!" : `Winner: ${winner === "X" ? playerX : playerO}`}</h2>}
      <p>Time Elapsed: {time} seconds</p>
      <button className="reset" onClick={resetGame}>Restart</button>
    </div>
  );
};

export default Board;
