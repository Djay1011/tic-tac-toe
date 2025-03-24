import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PlayerInput from "./components/PlayerInput"; // Player name input component


const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setTextStage(1), 1000), // Show "Tic"
      setTimeout(() => setTextStage(2), 2000), // Show "Tac"
      setTimeout(() => setTextStage(3), 3000), // Show "Toe"
      setTimeout(() => setTextStage(4), 4000), // Show "Tic Tac Toe"
      setTimeout(() => setShowSplash(false), 6000), // Transition to player input
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="app">
      {showSplash ? (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 5 }} // Fade out after 5 sec
        >
          <motion.h1 key={textStage} className="splash-text">
            {textStage === 1 && "Tic"}
            {textStage === 2 && "Tac"}
            {textStage === 3 && "Toe"}
            {textStage === 4 && "Tic Tac Toe"}
          </motion.h1>
        </motion.div>
      ) : (
        <PlayerInput />
      )}
    </div>
  );
};

export default App;
