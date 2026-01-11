import React, { useState } from "react";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Sparkles, ArrowRight, Info, X, Heart } from "lucide-react";
import ThemeToggle from "../components/calculator/ThemeToggle";

export default function Start() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Theme Toggle and Info */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <motion.button
          onClick={() => setShowInfo(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Info className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
        </motion.button>
        <ThemeToggle />
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInfo(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <motion.div
                className="max-w-md w-full rounded-t-3xl sm:rounded-3xl relative flex flex-col"
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  maxHeight: '85vh',
                  height: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header - Fixed */}
                <div className="flex items-center gap-3 p-5 sm:p-6 pb-4 border-b flex-shrink-0" style={{ borderColor: 'var(--bg-tertiary)' }}>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-gradient)' }}
                  >
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold flex-1" style={{ color: 'var(--text-primary)' }}>
                    About Numio
                  </h2>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <X className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div 
                  className="overflow-y-auto flex-1 p-5 sm:p-6 pt-4 pb-6 overscroll-contain"
                  style={{ 
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth'
                  }}
                >
                  <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <p>
                      Numio is a modern calculator application designed to provide reliable, consistent, and maintainable calculation tools. Its development emphasizes functional integrity, structured design, and responsible software practices.
                    </p>
                    <p>
                      The application is developed and maintained by Lumora Studios as part of an ongoing software initiative. All development efforts focus on delivering accurate, dependable, and user-friendly functionality.
                    </p>
                    <p>
                      This application is intended for general calculation purposes. While reasonable care has been exercised in its development, the software is provided without any representations or warranties, express or implied, regarding accuracy, completeness, or suitability for any particular purpose. Users remain responsible for verifying calculations where precision is required.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ 
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            top: '-20%',
            right: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{ 
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            bottom: '-10%',
            left: '-10%',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          className="w-28 h-28 mx-auto mb-8 rounded-3xl flex items-center justify-center"
          style={{ 
            background: 'var(--accent-gradient)',
            boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Calculator className="w-14 h-14 text-white" />
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" style={{ color: '#8B5CF6' }} />
            <span 
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: 'var(--text-secondary)' }}
            >
              Introducing
            </span>
          </div>
          <h1 
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Numio
          </h1>
          <p 
            className="text-lg md:text-xl font-light leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Your everyday calculator, reimagined with elegance and simplicity.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Link to="/calculator">
            <motion.button
              className="group px-8 py-4 rounded-2xl text-white font-semibold text-lg flex items-center gap-3 mx-auto"
              style={{ 
                background: 'var(--accent-gradient)',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(99, 102, 241, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Version Badge */}
        <motion.p
          className="mt-16 text-sm flex items-center justify-center gap-1"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Developed by Lumora Studios <span className="font-bold mx-1">•</span> Made with <Heart className="w-3.5 h-3.5 inline" style={{ fill: 'var(--text-primary)', color: 'var(--text-primary)' }} />
        </motion.p>
      </motion.div>
    </div>
  );
}