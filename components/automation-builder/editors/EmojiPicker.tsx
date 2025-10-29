'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const EMOJI_OPTIONS = [
  '🟠',
  '💬',
  '📸',
  '🎯',
  '✨',
  '✅',
  '🚀',
  '🧠',
  '💡',
  '😊',
  '🔥',
  '🌟',
  '❤️',
  '👍',
  '😍',
  '🙌',
  '🤖',
  '🛰️',
  '📞',
  '💼',
];

interface EmojiPickerProps {
  value?: string | null;
  onSelect: (emoji: string) => void;
  className?: string;
}

export function EmojiPicker({ value, onSelect, className }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleEmojiClick = (emoji: string) => {
    onSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-xl shadow-sm transition hover:border-primary-300 hover:text-primary-500"
        aria-label="Choose emoji"
      >
        <span>{value || '😊'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-10 w-48 rounded-xl border border-neutral-200 bg-white p-3 shadow-xl">
          <div className="grid grid-cols-4 gap-2">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleEmojiClick(emoji)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-xl transition hover:border-primary-200 hover:bg-primary-50"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
