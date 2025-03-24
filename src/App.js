import React, { useState } from "react";
import Board from "./components/Board";

function App() {
  const [playerX, setPlayerX] = useState();
  const [playerO, setPlayerO] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);

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
          <select onChange={(e) => setIsSinglePlayer(e.target.value === "AI")}>
            <option value="2P">Two Players</option>
            <option value="AI">Play Against AI</option>
          </select>
          <button onClick={() => setGameStarted(true)}>Start Game</button>
        </div>
      ) : (
        <Board playerX={playerX} playerO={isSinglePlayer ? "AI" : playerO} isSinglePlayer={isSinglePlayer} />
      )}
    </div>
  );
}

export default App;
