import React, { useState } from "react";
import Board from "./components/Board";

function App() {
  const [playerX, setPlayerX] = useState("Player X");
  const [playerO, setPlayerO] = useState("Player O");
  const [gameStarted, setGameStarted] = useState(false);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);


  return (
    <div className="game">
      {!gameStarted ? (
        <div className="player-input">
          <h2>Enter Player Names</h2>
          <input
            type="text"
            placeholder="Player X Name"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player O Name"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
          />
          <button onClick={() => setGameStarted(true)}>Start Game</button>
        </div>
      ) : (
        <Board playerX={playerX} playerO={playerO} scoreX={scoreX} scoreO={scoreO} setScoreX={setScoreX} setScoreO={setScoreO} />
      )}
    </div>
  );
}

export default App;
