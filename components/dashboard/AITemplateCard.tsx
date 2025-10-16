'use client';

import { useState } from 'react';
import { Button } from '@/components';
import { EyeIcon, CloudArrowDownIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface AITemplateCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  accentColor: string;
  installs: number;
  thumbnail?: string;
  category?: string;
}

export function AITemplateCard({
  name,
  description,
  icon,
  gradient,
  accentColor,
  installs,
  thumbnail,
  category = 'AI Powered',
}: AITemplateCardProps) {
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    // TODO: Backend API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsInstalled(true);
    setIsInstalling(false);
  };

  const handlePreview = () => {
    // TODO: Open preview modal
    console.log('Preview:', name);
  };

  return (
    <div className="group relative glass rounded-2xl overflow-hidden shadow-neu-md hover:shadow-neu-lg transition-all duration-300 hover-lift">
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />

      {/* Card Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon Badge */}
          <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center shadow-lg`}>
            <span className="text-3xl">{icon}</span>
          </div>

          {/* Category Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${accentColor} flex items-center gap-1`}>
            <SparklesIcon className="w-3 h-3" />
            {category}
          </div>
        </div>

        {/* Thumbnail Preview */}
        {thumbnail ? (
          <div className="relative mb-4 rounded-xl overflow-hidden bg-neutral-100 aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-full h-full ${gradient} opacity-20`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-30">{icon}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={`relative mb-4 rounded-xl overflow-hidden aspect-video ${gradient} opacity-10`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-50">{icon}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-neutral-800 mb-2 line-clamp-1">
            {name}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <CloudArrowDownIcon className="w-4 h-4" />
            <span className="font-medium">{installs.toLocaleString()} installs</span>
          </div>
          <div className={`px-2 py-1 rounded-full ${accentColor.replace('text', 'bg').replace('600', '100')} ${accentColor} font-semibold`}>
            Popular
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePreview}
            className="flex-1"
          >
            <EyeIcon className="w-4 h-4" />
            Preview
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleInstall}
            loading={isInstalling}
            disabled={isInstalled}
            className={`flex-1 ${isInstalled ? 'bg-green-500 hover:bg-green-600' : ''}`}
          >
            {isInstalled ? (
              <>
                <span>✓</span>
                Installed
              </>
            ) : (
              <>
                <CloudArrowDownIcon className="w-4 h-4" />
                Install
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 pointer-events-none`} />
    </div>
  );
}
