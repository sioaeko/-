import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
}