'use client';

import { Button } from '@/components';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { AutomationTemplate } from '@/lib/automations/types';
import { ChatMessage } from './ChatMessage';
import { ImageMessage } from './ImageMessage';
import { ResultMessage } from './ResultMessage';

interface DetailViewProps {
  template: AutomationTemplate;
  onToggle: () => void;
  onUse: () => void;
  isUsing: boolean;
  isActivated?: boolean;
}

export function DetailView({ template, onToggle, onUse, isUsing, isActivated }: DetailViewProps) {
  // Get gradient based on category
  const getGradient = () => {
    if (template.category === 'Hair Restoration') return 'from-amber-400 to-orange-500';
    if (template.category === 'Aesthetic AI') return 'from-teal-400 to-cyan-500';
    if (template.category === 'Car Color Changer') return 'from-blue-400 to-purple-500';
    return 'from-primary-400 to-accent-500';
  };

  const getInitials = () => {
    if (template.category === 'Hair Restoration') return 'HT';
    if (template.category === 'Aesthetic AI') return 'AC';
    if (template.category === 'Car Color Changer') return 'CC';
    return 'AI';
  };

  const getTitle = () => {
    if (template.category === 'Hair Restoration') return 'Hair Transplant Center';
    if (template.category === 'Aesthetic AI') return 'Aesthetic Clinic';
    if (template.category === 'Car Color Changer') return 'Auto Customization Shop';
    return 'AI Assistant';
  };

  const gradient = getGradient();
  const initials = getInitials();
  const title = getTitle();

  return (
    <div className="relative rounded-3xl bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Category badge and Active status */}
      <div className="absolute top-6 right-6 z-10 flex gap-2">
        <div className="px-3 py-1.5 rounded-full bg-neutral-900/90 backdrop-blur-sm">
          <span className="text-xs font-semibold text-white">✨ {template.category}</span>
        </div>
        {isActivated && (
          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
            <span className="text-xs font-semibold text-white">✓ Active</span>
          </div>
        )}
      </div>

      {/* Collapse button */}
      <button
        onClick={onToggle}
        className="absolute top-6 left-6 z-10 text-neutral-600 hover:text-neutral-900 transition-colors"
      >
        <ChevronUpIcon className="w-6 h-6" />
      </button>

      <div className="p-8 pt-16">
        {/* Single column chat simulation */}
        <div className="max-w-md mx-auto mb-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
            >
              {initials}
            </div>
            <div>
              <h4 className="font-semibold text-sm text-neutral-900">{title}</h4>
            </div>
          </div>

          {/* Chat flow */}
          <div className="space-y-4 bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-6 border border-neutral-100">
            <ChatMessage align="left" time="4:18 PM">
              Please send your selfie photo 📸
            </ChatMessage>

            <ImageMessage align="right" time="4:19 PM" imageSrc="/media/hairchange1.webp" label="My Selfie" />

            <ChatMessage align="left" time="4:19 PM">
              Great! Now please send the hair style you want 💇‍♂️
            </ChatMessage>

            <ImageMessage align="right" time="4:20 PM" imageSrc="/media/hairchange2.webp" label="Desired Hair" />

            <ChatMessage align="left" time="4:20 PM">
              Your hair is being prepared... ✨
            </ChatMessage>

            <ResultMessage
              align="left"
              time="4:21 PM"
              imageSrc="/media/hairchange3.webp"
              color={gradient}
              buttonText="📅 Randevu Al"
            />

            <ChatMessage align="left" time="4:21 PM">
              Looks much better, doesn&apos;t it? 😊
            </ChatMessage>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">{template.name}</h3>
          <p className="text-neutral-600 mb-6 leading-relaxed">{template.description}</p>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onToggle} className="border-2 text-xs">
              Close Details
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onUse}
              loading={isUsing}
              className={`flex-1 shadow-lg hover:shadow-xl text-xs ${
                isActivated
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  : 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600'
              }`}
            >
              {isActivated ? 'Update' : 'Use'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

