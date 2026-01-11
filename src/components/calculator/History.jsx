import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Clock } from "lucide-react";

export default function History({ isOpen, onClose, history, onSelectHistory, onClearHistory }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* History Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 z-50 flex flex-col"
            style={{ backgroundColor: 'var(--bg-primary)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: 'var(--bg-tertiary)' }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  History
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <X className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              </button>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto p-4">
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--text-secondary)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    No calculations yet
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        onSelectHistory(item);
                        onClose();
                      }}
                      className="w-full text-left p-4 rounded-xl"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                        {item.expression}
                      </div>
                      <div className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                        = {item.result}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Button */}
            {history.length > 0 && (
              <div className="p-4 border-t" style={{ borderColor: 'var(--bg-tertiary)' }}>
                <button
                  onClick={onClearHistory}
                  className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
                  style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}