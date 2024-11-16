import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, type, ...props }: InputProps) {
  // date 타입인 경우 브라우저 기본 달력 UI 스타일링을 위한 클래스 추가
  const dateInputClasses = type === 'date' ? '[&::-webkit-calendar-picker-indicator]:bg-white/10 [&::-webkit-calendar-picker-indicator]:hover:bg-white/20 [&::-webkit-calendar-picker-indicator]:rounded [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:p-1' : '';

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 sm:mb-2 text-slate-300">{label}</label>
      <input
        type={type}
        {...props}
        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-slate-700/50 border border-slate-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 outline-none transition duration-200 placeholder:text-slate-500 text-slate-200 ${dateInputClasses}`}
      />
    </div>
  );
}