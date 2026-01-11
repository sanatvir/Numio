import React from "react";

export default function Display({ expression, result, showResult }) {
  return (
    <div 
      className="w-full rounded-3xl p-6 mb-6"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="min-h-[120px] flex flex-col justify-end items-end">
        {!showResult && (
          <p
            className="text-right text-4xl md:text-5xl font-bold tracking-tight break-all leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {expression || '0'}
          </p>
        )}
        {showResult && (
          <>
            <p
              className="text-right text-lg font-light tracking-wide break-all"
              style={{ color: 'var(--text-secondary)' }}
            >
              {expression}
            </p>
            <p
              className="text-right text-5xl md:text-6xl font-bold mt-2 tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {result}
            </p>
          </>
        )}
      </div>
    </div>
  );
}