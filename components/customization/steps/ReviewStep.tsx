'use client';

import { useState } from 'react';
import { Button } from '@/components';
import { StepProps } from '@/lib/types/customization';
import { CheckCircleIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

interface ReviewStepProps extends StepProps {
  onActivate: () => void;
  isUpdate?: boolean;
}

export function ReviewStep({ template, data, onBack, onActivate, isUpdate }: ReviewStepProps) {
  const [isActivating, setIsActivating] = useState(false);

  const messageCount = Object.keys(data.messages).length;
  const imageCount = Object.values(data.images).filter(Boolean).length;

  const handleActivate = async () => {
    setIsActivating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    onActivate();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 mb-4">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">
          {isUpdate ? 'Review & Update' : 'Review & Activate'}
        </h2>
        <p className="text-neutral-600 mt-2">
          {isUpdate
            ? 'Review your changes and update your automation.'
            : 'Almost done! Review your customizations and activate your automation.'}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4">
        {/* Automation Info */}
        <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl border border-neutral-200 p-6">
          <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <span className="text-xl">🤖</span>
            Automation Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Name</p>
              <p className="font-semibold text-neutral-900">{template.name}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Category</p>
              <p className="font-semibold text-neutral-900">{template.category}</p>
            </div>
          </div>
        </div>

        {/* Customizations Summary */}
        <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl border border-neutral-200 p-6">
          <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <span className="text-xl">📝</span>
            Your Customizations
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-100">
              <span className="text-neutral-700">Messages Customized</span>
              <span className="font-bold text-primary-600">{messageCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-100">
              <span className="text-neutral-700">Images Uploaded</span>
              <span className="font-bold text-primary-600">{imageCount}</span>
            </div>
          </div>
        </div>

        {/* Settings Summary */}
        <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl border border-neutral-200 p-6">
          <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            Settings
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-100">
              <span className="text-neutral-700">Access Mode</span>
              <span className="font-semibold text-neutral-900 capitalize">
                {data.settings.vipAccess.mode === 'all'
                  ? 'All Followers'
                  : data.settings.vipAccess.mode === 'tagged'
                  ? 'Tagged Users'
                  : 'VIP List'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-100">
              <span className="text-neutral-700">Generation Limit</span>
              <span className="font-semibold text-neutral-900">
                {data.settings.generationLimit.count} per {data.settings.generationLimit.period}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Preview */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <RocketLaunchIcon className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h4 className="font-bold text-green-900 mb-2">
              {isUpdate ? 'Ready to Update! 🎉' : 'Ready to Launch! 🎉'}
            </h4>
            <p className="text-sm text-green-800 leading-relaxed">
              {isUpdate
                ? 'Your changes will be saved and the automation will continue running with the new settings.'
                : 'Once activated, your automation will start responding to Instagram DMs automatically. You can pause, edit, or delete it anytime from your dashboard.'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" size="lg" onClick={onBack} className="border-2" disabled={isActivating}>
          ← Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleActivate}
          loading={isActivating}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl px-8"
        >
          {isActivating
            ? isUpdate
              ? 'Updating...'
              : 'Activating...'
            : isUpdate
            ? 'Update Automation ✨'
            : 'Activate Automation 🚀'}
        </Button>
      </div>
    </div>
  );
}
