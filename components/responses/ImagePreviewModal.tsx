'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface ImagePreviewModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImagePreviewModal({ imageUrl, onClose }: ImagePreviewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `image-${Date.now()}.jpg`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
          <button
            onClick={handleDownload}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition text-white"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Image */}
        <div className="relative w-full h-full min-h-[400px]">
          <Image src={imageUrl} alt="Preview" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
