'use client';

import Image from 'next/image';
import { Button } from '@/components';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AutomationTemplate } from '@/lib/automations/types';

interface CollapsedViewProps {
  template: AutomationTemplate;
  onToggle: () => void;
  onUse: () => void;
  isUsing: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function CollapsedView({
  template,
  onToggle,
  onUse,
  isUsing,
  isHovered,
  onMouseEnter,
  onMouseLeave
}: CollapsedViewProps) {
  // Get images based on category
  const hasImages = template.category === 'Hair Restoration';
  const getPlaceholderEmoji = (type: 'before' | 'style' | 'result') => {
    if (template.category === 'Aesthetic AI') {
      if (type === 'before') return '👤';
      if (type === 'style') return '💅';
      return '💎';
    }
    if (template.category === 'Nail Transformation') {
      if (type === 'before') return '✋';
      if (type === 'style') return '💅';
      return '💖';
    }
    if (template.category === 'Car Color Changer') {
      if (type === 'before') return '🚗';
      if (type === 'style') return '🎨';
      return '✨';
    }
    return '📸';
  };

  return (
    <div
      className={`group relative rounded-3xl bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500 ${
        isHovered === false ? 'blur-sm scale-[0.98] opacity-60' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-6">
        {/* Category badge at top */}
        <div className="flex items-center justify-center mb-5">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 shadow-lg">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              ✨ {template.category}
            </span>
          </div>
        </div>
        {/* Mini transformation preview: 1 + 2 = 3 */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2">
            {/* Before image */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-neutral-200 shadow-md transform hover:scale-105 transition-transform duration-300">
              {hasImages ? (
                <Image src="/media/hairchange1.webp" alt="Before" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                  <span className="text-2xl">{getPlaceholderEmoji('before')}</span>
                </div>
              )}
              <div className="absolute bottom-1 left-1 right-1 text-center">
                <span className="text-[8px] font-semibold bg-white/90 px-1.5 py-0.5 rounded">Before</span>
              </div>
            </div>

            {/* Plus symbol */}
            <span className="text-2xl font-bold text-primary-600 transform group-hover:rotate-180 transition-transform duration-500">+</span>

            {/* Style image */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-neutral-200 shadow-md transform hover:scale-105 transition-transform duration-300">
              {hasImages ? (
                <Image src="/media/hairchange2.webp" alt="Style" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                  <span className="text-2xl">{getPlaceholderEmoji('style')}</span>
                </div>
              )}
              <div className="absolute bottom-1 left-1 right-1 text-center">
                <span className="text-[8px] font-semibold bg-white/90 px-1.5 py-0.5 rounded">Style</span>
              </div>
            </div>

            {/* Equals symbol */}
            <span className="text-2xl font-bold text-accent-600 transform group-hover:scale-110 transition-transform duration-500">=</span>

            {/* After image */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-accent-300 shadow-lg transform hover:scale-105 transition-transform duration-300">
              {hasImages ? (
                <Image src="/media/hairchange3.webp" alt="Result" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent-100 via-primary-100 to-accent-200 flex items-center justify-center">
                  <span className="text-2xl">{getPlaceholderEmoji('result')}</span>
                </div>
              )}
              <div className="absolute bottom-1 left-1 right-1 text-center">
                <span className="text-[8px] font-semibold bg-white/90 px-1.5 py-0.5 rounded">Result</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title and description */}
        <div className="mb-5 text-center">
          <h3 className="text-lg font-bold text-neutral-900 mb-1.5 leading-tight">
            {template.name}
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
            {template.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="flex-1 border-2 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
          >
            <span className="flex items-center gap-1.5 text-xs">
              Details
              <ChevronDownIcon className="w-3.5 h-3.5" />
            </span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onUse}
            loading={isUsing}
            className="flex-1 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-lg hover:shadow-xl text-xs"
          >
            Use
          </Button>
        </div>
      </div>
    </div>
  );
}
