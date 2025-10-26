'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@/components';
import { CardSpotlight } from '@/components/ui/CardSpotlight';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface AITemplateCardProps {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  accentColor: string;
  thumbnail?: ReactNode;
  category?: string;
}

export function AITemplateCard({
  name,
  description,
  icon,
  gradient,
  accentColor,
  thumbnail,
  category = 'AI Powered',
}: AITemplateCardProps) {
  const [isUsing, setIsUsing] = useState(false);

  const handleUse = async () => {
    setIsUsing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsUsing(false);
    console.log('Using automation:', name);
  };

  return (
    <CardSpotlight
      radius={400}
      color={gradient.includes('amber') ? '#f59e0b' : gradient.includes('teal') ? '#14b8a6' : '#ec4899'}
      className="group"
    >
      <div className="relative glass rounded-[22px] shadow-neu-md hover:shadow-neu-lg transition-all duration-300 hover-lift overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

        <div className="relative p-4">
        <div className="flex items-start justify-end mb-5">
          <div className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <SparklesIcon className="w-3 h-3" />
            {category}
          </div>
        </div>

        <div className="relative mb-5">
          <div className="relative z-10 rounded-xl border border-white/60 bg-white shadow-neu-sm overflow-hidden">
            {thumbnail}
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900 leading-tight">
            {name}
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {description}
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleUse}
          loading={isUsing}
          className="w-full"
        >
          Use
        </Button>
        </div>
      </div>
    </CardSpotlight>
  );
}
