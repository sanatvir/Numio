import React from "react";
import { motion } from "framer-motion";
import { Delete } from "lucide-react";

const buttons = [
  { label: 'C', type: 'function', color: 'secondary' },
  { label: '+/-', type: 'function', color: 'secondary' },
  { label: '%', type: 'operator', color: 'secondary' },
  { label: '÷', type: 'operator', color: 'accent' },
  { label: '7', type: 'number', color: 'default' },
  { label: '8', type: 'number', color: 'default' },
  { label: '9', type: 'number', color: 'default' },
  { label: '×', type: 'operator', color: 'accent' },
  { label: '4', type: 'number', color: 'default' },
  { label: '5', type: 'number', color: 'default' },
  { label: '6', type: 'number', color: 'default' },
  { label: '−', type: 'operator', color: 'accent' },
  { label: '1', type: 'number', color: 'default' },
  { label: '2', type: 'number', color: 'default' },
  { label: '3', type: 'number', color: 'default' },
  { label: '+', type: 'operator', color: 'accent' },
  { label: 'DEL', type: 'function', color: 'default', icon: true },
  { label: '0', type: 'number', color: 'default' },
  { label: '.', type: 'number', color: 'default' },
  { label: '=', type: 'equals', color: 'accent' },
];

export default function ButtonGrid({ onButtonPress }) {
  const getButtonStyle = (color) => {
    switch (color) {
      case 'accent':
        return {
          background: 'var(--accent-gradient)',
          color: '#FFFFFF',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
        };
      default:
        return {
          backgroundColor: 'var(--button-bg)',
          color: 'var(--text-primary)',
        };
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {buttons.map((btn) => (
        <motion.button
          key={btn.label}
          onClick={() => onButtonPress(btn)}
          className={`aspect-square rounded-2xl font-medium flex items-center justify-center active:scale-95 transition-transform ${btn.label === '+/-' ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'}`}
          style={{
            ...getButtonStyle(btn.color),
            boxShadow: 'var(--button-shadow)',
          }}
          whileTap={{ scale: 0.92 }}
        >
          {btn.icon ? <Delete className="w-6 h-6" /> : btn.label}
        </motion.button>
      ))}
    </div>
  );
}