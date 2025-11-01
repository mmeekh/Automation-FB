'use client';
import React from 'react';

type Props = {
  onToggle: () => void;
  className?: string;
};

export default function Hamburger({ onToggle, className }: Props) {
  // Çizgi ortak stil (mutlak konumlu, currentColor)
  const base: React.CSSProperties = {
    position: 'absolute',
    width: '24px',
    height: '2px',
    backgroundColor: 'currentColor',
    borderRadius: '9999px',
    left: '50%',
  };

  const topStyle: React.CSSProperties = {
    ...base,
    top: '50%',
    transform: 'translate(-50%, -8px)',
  };

  const midStyle: React.CSSProperties = {
    ...base,
    top: '50%',
    transform: 'translate(-50%, 0)',
  };

  const botStyle: React.CSSProperties = {
    ...base,
    top: '50%',
    transform: 'translate(-50%, 8px)',
  };

  return (
    <button
      type="button"
      aria-label="Toggle menu"
      onClick={onToggle}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary-200 ${className ?? ''}`}
    >
      <span style={topStyle} />
      <span style={midStyle} />
      <span style={botStyle} />
    </button>
  );
}
