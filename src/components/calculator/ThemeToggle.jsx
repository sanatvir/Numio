import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../Layout";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full p-1 flex items-center cursor-pointer"
      style={{ 
        backgroundColor: 'var(--bg-tertiary)',
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{ 
          background: 'var(--accent-gradient)',
        }}
        animate={{ x: theme === 'dark' ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === 'light' ? (
          <Sun className="w-4 h-4 text-white" />
        ) : (
          <Moon className="w-4 h-4 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
}