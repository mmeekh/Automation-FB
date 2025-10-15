'use client';

import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface TwoFactorInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export function TwoFactorInput({ length = 6, onComplete }: TwoFactorInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newValues.every(v => v !== '')) {
      onComplete(newValues.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, length);

    const newValues = Array(length).fill('');
    digits.split('').forEach((digit, i) => {
      newValues[i] = digit;
    });

    setValues(newValues);
    const lastIndex = Math.min(digits.length, length - 1);
    inputRefs.current[lastIndex]?.focus();

    if (newValues.every(v => v !== '')) {
      onComplete(newValues.join(''));
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          className={cn(
            'w-12 h-12 text-center text-lg font-semibold',
            'rounded-xl bg-gradient-to-br from-white to-neutral-100',
            'shadow-neu-inset focus:shadow-neu-md',
            'border-none outline-none transition-all duration-300',
            'focus:ring-2 focus:ring-primary-500/20'
          )}
        />
      ))}
    </div>
  );
}
