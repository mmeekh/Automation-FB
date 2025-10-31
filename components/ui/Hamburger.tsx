'use client';
import React from 'react';

type Props = {
  open: boolean;
  onToggle: () => void;
  className?: string;
};

export default function Hamburger({ open, onToggle, className }: Props) {
  return (
    <button
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary-200 ${className ?? ''}`.trim()}
    >
      <span
        className={`absolute block h-0.5 w-6 rounded bg-current transition-transform duration-300 ease-in-out ${
          open ? 'translate-y-0 rotate-45' : '-translate-y-2'
        }`}
      />
      <span
        className={`absolute block h-0.5 w-6 rounded bg-current transition-all duration-300 ease-in-out ${
          open ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      />
      <span
        className={`absolute block h-0.5 w-6 rounded bg-current transition-transform duration-300 ease-in-out ${
          open ? 'translate-y-0 -rotate-45' : 'translate-y-2'
        }`}
      />
    </button>
  );
}
