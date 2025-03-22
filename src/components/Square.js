import React from "react";
import { motion } from "framer-motion"

const Square = ({ value, onClick }) => {
  return (
    <motion.button className="square"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      animate={{ opacity: value ? 1 : 0.5, scale: value ? 1.1 : 1 }}
      transition={{ duration: 0.3 }}>
      {value}
    </motion.button>
  );
};

export default Square;
