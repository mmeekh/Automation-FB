'use client';

import { ReactNode } from 'react';

interface ChatMessageProps {
  children: ReactNode;
  align: 'left' | 'right';
  time: string;
}

export function ChatMessage({ children, align, time }: ChatMessageProps) {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[85%] px-4 py-2 rounded-2xl ${
          align === 'right'
            ? 'bg-primary-500 text-white rounded-tr-sm'
            : 'bg-neutral-100 text-neutral-900 rounded-tl-sm'
        }`}
      >
        <p className="text-xs leading-relaxed">{children}</p>
      </div>
      <span className="text-[9px] text-neutral-400 mt-1">{time}</span>
    </div>
  );
}
