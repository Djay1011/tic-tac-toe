import React, { useState } from "react";
import Square from "./Square";


const Board = ({ playerX, playerO }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const checkWinner = (squares) => {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];
    
    for (let combo of winningCombos) { // Check each winning combination
        const [a, b, c] = combo; // Destructure the combo
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // If all 3 squares in a combo are the same
            return squares[a]; // Return the winner
        }
    }
    
    return squares.includes(null) ? null : "Draw"; // If no winner and board full, return "Draw"
 };

  const handleClick = (index) => {
    if (squares[index] || winner) return; // If square is already filled or game is over, return

    const newSquares = squares.slice(); 
    newSquares[index] = isXNext ? "X" : "O"; // 
    setSquares(newSquares); // Update squares
    setIsXNext(!isXNext); // Toggle player

    const gameWinner = checkWinner(newSquares); // check for winner
    setWinner(gameWinner);

    if (gameWinner) { // If there is a winner
      setWinner(gameWinner); // Set winner
      setIsRunning(false); // Stop timer
      if (gameWinner === "X") setScoreX((prev) => prev + 1); // Update score
      if (gameWinner === "O") setScoreO((prev) => prev + 1); // Update score
    }    
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setTime(0);
    setIsRunning(true);
  };


  React.useEffect(() => {
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
        <p>Score: {playerX} ({scoreX}) - {playerO} ({scoreO})</p>
      </div>

  );
};

export default Board;
