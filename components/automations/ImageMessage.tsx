'use client';

import Image from 'next/image';

interface ImageMessageProps {
  align: 'left' | 'right';
  time: string;
  imageSrc?: string;
  label: string;
}

export function ImageMessage({ align, time, imageSrc, label }: ImageMessageProps) {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
      <div className="relative w-32 h-32 rounded-2xl border-2 border-primary-400 overflow-hidden shadow-md">
        {imageSrc ? (
          <Image src={imageSrc} alt={label} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
            <span className="text-xs text-neutral-400">{label}</span>
          </div>
        )}
      </div>
      <span className="text-[9px] text-neutral-400 mt-1">{time}</span>
    </div>
  );
}
