'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AutomationTemplate } from '@/lib/automations/types';
import { getAutomationLandingUrl } from '@/lib/utils/automation-slugs';

interface CollapsedViewProps {
  template: AutomationTemplate;
  isActivated?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function CollapsedView({
  template,
  isActivated,
  isHovered,
  onMouseEnter,
  onMouseLeave
}: CollapsedViewProps) {
  const router = useRouter();

  // Map template ID to image filenames
  const getImagePath = (type: 'before' | 'style' | 'result'): string | null => {
    const imageMap: Record<string, { before: string; style: string; result: string }> = {
      'instagram-bald-to-haired': { before: 'hairchange1', style: 'hairchange2', result: 'hairchange3' },
      'instagram-aesthetic-bald': { before: 'kel1', style: 'kel2', result: 'kel3' },
      'instagram-car-color-changer': { before: 'carcolor1', style: 'carcolor2', result: 'carcolor3' },
      'pet-products': { before: 'pet1', style: 'pet2', result: 'pet3' },
      'car-wheels': { before: 'rim1', style: 'rim2', result: 'rim3' },
      'wall-paint': { before: 'wall1', style: 'wall2', result: 'wall3' },
      'furniture-placement': { before: 'furniture1', style: 'furniture2', result: 'furniture3' },
      'clothes-tryon': { before: 'dress1', style: 'dress2', result: 'dress3' },
      'jewelry': { before: 'jewel1', style: 'jewel2', result: 'jewel3' },
    };

    const images = imageMap[template.id];
    return images ? `/media/${images[type]}.webp` : null;
  };

  const getPlaceholderEmoji = (type: 'before' | 'style' | 'result') => {
    if (template.category === 'Aesthetic AI') {
      if (type === 'before') return '👤';
      if (type === 'style') return '💅';
      return '💎';
    }
    return '📸';
  };

  return (
    <div
      className={`group relative rounded-3xl bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500 cursor-pointer ${
        isHovered === false ? 'blur-sm scale-[0.98] opacity-60' : ''
      }`}
      onClick={() => router.push(getAutomationLandingUrl(template.id))}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="p-6">
        {/* Category badge and Active status at top */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 shadow-lg">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              ✨ {template.category}
            </span>
          </div>
          {isActivated && (
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                ✓ Active
              </span>
            </div>
          )}
        </div>
        {/* Mini transformation preview: 1 + 2 = 3 */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2">
            {/* Before image */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-neutral-200 shadow-md transform hover:scale-105 transition-transform duration-300">
                {getImagePath('before') ? (
                  <Image src={getImagePath('before')!} alt="Before" fill className="object-cover" priority />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                    <span className="text-2xl">{getPlaceholderEmoji('before')}</span>
                  </div>
                )}
              </div>
              <span className="text-[9px] font-semibold text-neutral-600">Before</span>
            </div>

            {/* Plus symbol */}
            <span className="text-2xl font-bold text-primary-600 transform group-hover:rotate-180 transition-transform duration-500 mb-3">+</span>

            {/* Style image */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-neutral-200 shadow-md transform hover:scale-105 transition-transform duration-300">
                {getImagePath('style') ? (
                  <Image src={getImagePath('style')!} alt="Style" fill className="object-cover" priority />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                    <span className="text-2xl">{getPlaceholderEmoji('style')}</span>
                  </div>
                )}
              </div>
              <span className="text-[9px] font-semibold text-neutral-600">Style</span>
            </div>

            {/* Equals symbol */}
            <span className="text-2xl font-bold text-accent-600 transform group-hover:scale-110 transition-transform duration-500 mb-3">=</span>

            {/* After image */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-accent-300 shadow-lg transform hover:scale-105 transition-transform duration-300">
                {getImagePath('result') ? (
                  <Image src={getImagePath('result')!} alt="Result" fill className="object-cover" priority />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-100 via-primary-100 to-accent-200 flex items-center justify-center">
                    <span className="text-2xl">{getPlaceholderEmoji('result')}</span>
                  </div>
                )}
              </div>
              <span className="text-[9px] font-semibold text-neutral-600">Result</span>
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

        {/* Action button */}
        <div className="text-center">
          <button className="px-4 py-2 text-sm font-medium text-neutral-900 border border-neutral-900 rounded-lg hover:bg-neutral-900 hover:text-white transition-all">
            İncele →
          </button>
        </div>
      </div>
    </div>
  );
}




