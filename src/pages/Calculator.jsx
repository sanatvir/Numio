import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { ChevronLeft, Clock } from "lucide-react";
import Display from "../components/calculator/Display";
import ButtonGrid from "../components/calculator/ButtonGrid";
import ThemeToggle from "../components/calculator/ThemeToggle";
import History from "../components/calculator/History";

export default function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [showResult, setShowResult] = useState(false);
  const [lastWasEquals, setLastWasEquals] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('numio-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);

  const calculate = useCallback((expr) => {
    try {
      if (!expr || expr.trim() === '') return '0';
      
      let processed = expr;
      
      // First, normalize all operators to standard format
      processed = processed
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');
      
      // Handle percentage cases: find patterns like "number operator number%"
      const percentRegex = /([\d.]+)\s*([+\-*/])\s*([\d.]+)%/g;
      
      processed = processed.replace(percentRegex, (match, num1, operator, num2) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        
        if (isNaN(a) || isNaN(b)) return match;
        
        let result;
        if (operator === '+') {
          // 100 + 20% = 100 + (100 * 0.20) = 120
          result = a + (a * b / 100);
        } else if (operator === '-') {
          // 100 - 20% = 100 - (100 * 0.20) = 80
          result = a - (a * b / 100);
        } else if (operator === '*') {
          // 100 * 20% = 100 * 0.20 = 20
          result = a * (b / 100);
        } else if (operator === '/') {
          // 100 / 20% = 100 / 0.20 = 500
          if (b === 0) return 'Error';
          result = a / (b / 100);
        }
        
        return result.toString();
      });
      
      // Check for division by zero
      if (/\/\s*0(?!\d)/.test(processed)) {
        return 'Error';
      }
      
      // Evaluate the expression
      const evalResult = Function('"use strict"; return (' + processed + ')')();
      
      // Check if result is valid
      if (isNaN(evalResult) || !isFinite(evalResult)) {
        return 'Error';
      }
      
      // Format the result
      let formatted;
      if (Math.abs(evalResult) < 1e-10 && evalResult !== 0) {
        // Very small numbers round to 0
        formatted = 0;
      } else if (Math.abs(evalResult) > 1e15) {
        // Very large numbers use scientific notation
        formatted = evalResult.toExponential(6);
      } else {
        // Round to avoid floating point errors
        formatted = Math.round(evalResult * 1e10) / 1e10;
      }
      
      return formatted.toString();
    } catch (error) {
      return 'Error';
    }
  }, []);

  const handleButtonPress = useCallback((btn) => {
    const { label, type } = btn;

    if (type === 'number') {
      if (lastWasEquals) {
        setExpression(label);
        setShowResult(false);
        setLastWasEquals(false);
      } else {
        // Prevent multiple decimals in one number
        if (label === '.') {
          const parts = expression.split(/[+\-×÷]/);
          const currentNumber = parts[parts.length - 1];
          if (currentNumber.includes('.')) return;
        }
        setExpression(prev => prev + label);
        setShowResult(false);
      }
    }

    if (type === 'operator') {
      setLastWasEquals(false);
      if (showResult && result !== 'Error') {
        setExpression(result + label);
        setShowResult(false);
      } else {
        // Replace last operator if exists
        const lastChar = expression.slice(-1);
        if (['+', '−', '×', '÷'].includes(lastChar)) {
          setExpression(prev => prev.slice(0, -1) + label);
        } else if (expression) {
          setExpression(prev => prev + label);
        }
      }
    }

    if (type === 'equals') {
      if (expression) {
        const calcResult = calculate(expression);
        setResult(calcResult);
        setShowResult(true);
        setLastWasEquals(true);
        
        // Add to history if valid result
        if (calcResult !== 'Error') {
          const newHistory = [{ expression, result: calcResult }, ...history].slice(0, 50);
          setHistory(newHistory);
          localStorage.setItem('numio-history', JSON.stringify(newHistory));
        }
      }
    }

    if (type === 'function') {
      if (label === 'C') {
        setExpression('');
        setResult('0');
        setShowResult(false);
        setLastWasEquals(false);
      }
      
      if (label === 'DEL') {
        if (lastWasEquals) {
          setExpression('');
          setShowResult(false);
          setLastWasEquals(false);
        } else {
          setExpression(prev => prev.slice(0, -1));
        }
      }
      
      if (label === '+/-') {
        if (showResult && result !== 'Error') {
          const negated = result.startsWith('-') ? result.slice(1) : '-' + result;
          setResult(negated);
          setExpression(negated);
        } else if (expression) {
          // Toggle negative on the last number
          const match = expression.match(/(-?\d+\.?\d*)$/);
          if (match) {
            const lastNum = match[0];
            const newNum = lastNum.startsWith('-') ? lastNum.slice(1) : '-' + lastNum;
            setExpression(prev => prev.slice(0, -lastNum.length) + newNum);
          }
        }
      }
    }
    }, [expression, result, showResult, lastWasEquals, calculate]);

    // Keyboard support
    useEffect(() => {
    const handleKeyDown = (e) => {
    // Prevent default for calculator keys
    const calculatorKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','%','.','Enter','Escape','Backspace','Delete','='];
    if (calculatorKeys.includes(e.key)) {
      e.preventDefault();
    }

    // Map keyboard keys to calculator buttons
    const keyMap = {
      '0': { label: '0', type: 'number', color: 'default' },
      '1': { label: '1', type: 'number', color: 'default' },
      '2': { label: '2', type: 'number', color: 'default' },
      '3': { label: '3', type: 'number', color: 'default' },
      '4': { label: '4', type: 'number', color: 'default' },
      '5': { label: '5', type: 'number', color: 'default' },
      '6': { label: '6', type: 'number', color: 'default' },
      '7': { label: '7', type: 'number', color: 'default' },
      '8': { label: '8', type: 'number', color: 'default' },
      '9': { label: '9', type: 'number', color: 'default' },
      '.': { label: '.', type: 'number', color: 'default' },
      '+': { label: '+', type: 'operator', color: 'accent' },
      '-': { label: '−', type: 'operator', color: 'accent' },
      '*': { label: '×', type: 'operator', color: 'accent' },
      '/': { label: '÷', type: 'operator', color: 'accent' },
      '%': { label: '%', type: 'operator', color: 'secondary' },
      'Enter': { label: '=', type: 'equals', color: 'accent' },
      '=': { label: '=', type: 'equals', color: 'accent' },
      'Escape': { label: 'C', type: 'function', color: 'secondary' },
      'c': { label: 'C', type: 'function', color: 'secondary' },
      'C': { label: 'C', type: 'function', color: 'secondary' },
      'Backspace': { label: 'DEL', type: 'function', color: 'default', icon: true },
      'Delete': { label: 'DEL', type: 'function', color: 'default', icon: true },
    };

    const button = keyMap[e.key];
    if (button) {
      handleButtonPress(button);
    }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleButtonPress]);

    const handleSelectHistory = useCallback((item) => {
    setExpression(item.expression);
    setResult(item.result);
    setShowResult(false);
    setLastWasEquals(false);
    }, []);

    const handleClearHistory = useCallback(() => {
      setHistory([]);
      localStorage.removeItem('numio-history');
    }, []);

    return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between p-4 md:p-6"
      >
        <Link to="/">
          <motion.button
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </motion.button>
        </Link>
        
        <h1 
          className="text-xl font-semibold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Numio
        </h1>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setShowHistory(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center relative"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Clock className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            {history.length > 0 && (
              <span 
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-semibold"
                style={{ background: 'var(--accent-gradient)' }}
              >
                {history.length > 9 ? '9+' : history.length}
              </span>
            )}
          </motion.button>
          <ThemeToggle />
        </div>
      </header>

      {/* Calculator Body */}
      <div className="flex-1 flex flex-col justify-end p-4 md:p-6 max-w-lg mx-auto w-full">
        <Display 
          expression={expression} 
          result={result}
          showResult={showResult}
        />
        
        <ButtonGrid onButtonPress={handleButtonPress} />
        
        {/* Safe Area Spacing */}
        <div className="h-6" />
        </div>

        {/* History Panel */}
        <History
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onSelectHistory={handleSelectHistory}
        onClearHistory={handleClearHistory}
        />
        </div>
        );
        }