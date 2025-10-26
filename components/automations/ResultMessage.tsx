'use client';

import Image from 'next/image';

interface ResultMessageProps {
  align: 'left' | 'right';
  time: string;
  imageSrc?: string;
  color: string;
  buttonText: string;
}

export function ResultMessage({ align, time, imageSrc, color, buttonText }: ResultMessageProps) {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
      <div className="text-xs font-semibold text-neutral-700 mb-2">
        ✨ Your Transformation is Ready!
      </div>
      <div className="w-40 space-y-2">
        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-primary-300">
          {imageSrc ? (
            <Image src={imageSrc} alt="Transformation Result" fill className="object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center`}>
              <span className="text-2xl">✨</span>
            </div>
          )}
        </div>
        <button
          className={`w-full py-2 px-3 rounded-xl bg-gradient-to-r ${color} text-white text-[10px] font-bold shadow-md hover:shadow-lg transition-shadow`}
        >
          {buttonText}
        </button>
      </div>
      <span className="text-[9px] text-neutral-400 mt-1">{time}</span>
    </div>
  );
}
