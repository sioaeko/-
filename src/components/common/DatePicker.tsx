import React from 'react';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max?: string;
  min?: string;
}

export function DatePicker({ label, value, onChange, max, min }: DatePickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 sm:mb-2 text-slate-300">{label}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        max={max}
        min={min}
        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-slate-700/50 border border-slate-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 outline-none transition duration-200 text-slate-200
          [&::-webkit-calendar-picker-indicator]:bg-white/10
          [&::-webkit-calendar-picker-indicator]:hover:bg-white/20
          [&::-webkit-calendar-picker-indicator]:rounded
          [&::-webkit-calendar-picker-indicator]:cursor-pointer
          [&::-webkit-calendar-picker-indicator]:p-1
          [&::-webkit-calendar-picker-indicator]:transition-colors
          appearance-none"
      />
    </div>
  );
}