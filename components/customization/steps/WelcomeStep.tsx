'use client';

import { Button } from '@/components';
import { StepProps } from '@/lib/types/customization';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export function WelcomeStep({ template, onNext }: StepProps) {
  const features = [
    { icon: '💬', title: 'Customize Messages', desc: 'Edit all text and add emojis' },
    { icon: '🖼️', title: 'Upload Images', desc: 'Add your own example photos' },
    { icon: '⚙️', title: 'Configure Settings', desc: 'Set VIP access and limits' },
    { icon: '👁️', title: 'Preview & Test', desc: 'Try before you activate' },
  ];

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 mb-4">
          <span className="text-4xl">🎨</span>
        </div>

        <h2 className="text-3xl font-bold text-neutral-900">
          Customize Your Automation
        </h2>

        <p className="text-lg text-neutral-600 max-w-lg mx-auto">
          You selected <span className="font-semibold text-primary-600">{template.name}</span>
          . Let&apos;s personalize it for your business!
        </p>
      </div>

      {/* What you can customize */}
      <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl p-8 border border-neutral-100">
        <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center justify-center gap-2">
          <CheckCircleIcon className="w-6 h-6 text-green-500" />
          What You Can Customize
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-3 p-4 rounded-xl bg-white border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all duration-300"
            >
              <span className="text-3xl">{feature.icon}</span>
              <div className="text-left">
                <h4 className="font-semibold text-neutral-900 text-sm">{feature.title}</h4>
                <p className="text-xs text-neutral-600 mt-0.5">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What you cannot change */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Note:</span> The automation flow and logic are fixed.
          You can only customize content, not structure. This ensures everything works perfectly!
        </p>
      </div>

      {/* CTA */}
      <Button
        variant="primary"
        size="lg"
        onClick={onNext}
        className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-lg hover:shadow-xl px-8"
      >
        Start Customizing →
      </Button>
    </div>
  );
}
