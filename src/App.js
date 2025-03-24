import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PlayerInput from "./components/PlayerInput"; // Player name input component
 f

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after full animation (4 seconds total)
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Animation for letters appearing one by one
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="app">
      {showSplash ? (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 2.5 }} // Hold for 2 seconds
        >
          <motion.div className="title-container" initial="hidden" animate="visible">
            {"Tic Tac Toe".split("").map((letter, index) => (
              <motion.span key={index} variants={letterAnimation} transition={{ delay: index * 0.2 }}>
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <PlayerInput />
      )}
    </div>
  );
};

export default App;