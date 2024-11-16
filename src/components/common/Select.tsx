import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function Select({ label, children, ...props }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 sm:mb-2 text-slate-300">{label}</label>
      <select
        {...props}
        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-slate-700/50 border border-slate-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 outline-none transition duration-200 text-slate-200"
      >
        {children}
      </select>
    </div>
  );
}