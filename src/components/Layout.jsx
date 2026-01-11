import React, { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../lib/utils"
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default function Layout({ children, currentPageName }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('numio-theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('numio-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <style>{`
        :root {
          --bg-primary: #FFFFFF;
          --bg-secondary: #F5F5F7;
          --bg-tertiary: #E5E5EA;
          --text-primary: #1C1C1E;
          --text-secondary: #8E8E93;
          --accent-gradient: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
          --button-bg: #FFFFFF;
          --button-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
        }

        .dark {
          --bg-primary: #000000;
          --bg-secondary: #1C1C1E;
          --bg-tertiary: #2C2C2E;
          --text-primary: #FFFFFF;
          --text-secondary: #8E8E93;
          --button-bg: #2C2C2E;
          --button-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }

        body {
          transition: background-color 0.3s ease;
          overscroll-behavior: none;
          -webkit-overflow-scrolling: touch;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div 
        className="min-h-screen w-full transition-colors duration-300"
        style={{ 
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}