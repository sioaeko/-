import React from 'react';

interface ProgressBarProps {
  progress: number;
  label: string;
  realTime?: string;
}

export function ProgressBar({ progress, label, realTime }: ProgressBarProps) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex justify-between text-xs sm:text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono text-slate-300">{realTime || progress.toFixed(1)}%</span>
      </div>
      <div className="w-full h-2 sm:h-2.5 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 transition-all duration-100 rounded-full shadow-lg"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}