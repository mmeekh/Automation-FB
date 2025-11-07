'use client';

import { Button, Input } from '@/components';
import { StepProps } from '@/lib/types/customization';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export function SettingsStep({ data, onChange, onNext, onBack }: StepProps) {
  const handleVIPModeChange = (mode: 'all' | 'tagged' | 'vip_list') => {
    onChange({
      settings: {
        ...data.settings,
        vipAccess: {
          ...data.settings.vipAccess,
          mode,
        },
      },
    });
  };

  const handleVIPUsernamesChange = (usernames: string) => {
    onChange({
      settings: {
        ...data.settings,
        vipAccess: {
          ...data.settings.vipAccess,
          vipUsernames: usernames.split(',').map((u) => u.trim()).filter(Boolean),
        },
      },
    });
  };

  type PeriodType = 'minute' | 'hour' | 'day' | 'week' | 'month';

  const isPeriodType = (value: string): value is PeriodType => {
    return ['minute', 'hour', 'day', 'week', 'month'].includes(value);
  };

  const handleLimitChange = (count: number, period: PeriodType) => {
    onChange({
      settings: {
        ...data.settings,
        generationLimit: { count, period },
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 mb-4">
          <Cog6ToothIcon className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Configure Settings</h2>
        <p className="text-neutral-600 mt-2">
          Control who can use your automation and set generation limits.
        </p>
      </div>

      {/* VIP Access */}
      <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl border border-neutral-200 p-6">
        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <span className="text-xl">🔐</span>
          VIP Access Control
        </h3>

        <div className="space-y-3">
          {/* Option 1: All Users */}
          <label className="flex items-start gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 cursor-pointer transition-all">
            <input
              type="radio"
              name="vipMode"
              checked={data.settings.vipAccess.mode === 'all'}
              onChange={() => handleVIPModeChange('all')}
              className="mt-1"
            />
            <div>
              <p className="font-semibold text-neutral-900">All Followers</p>
              <p className="text-sm text-neutral-600">Anyone who follows you can use this automation</p>
            </div>
          </label>

          {/* Option 2: Tagged Users */}
          <label className="flex items-start gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 cursor-pointer transition-all">
            <input
              type="radio"
              name="vipMode"
              checked={data.settings.vipAccess.mode === 'tagged'}
              onChange={() => handleVIPModeChange('tagged')}
              className="mt-1"
            />
            <div>
              <p className="font-semibold text-neutral-900">Tagged Users Only</p>
              <p className="text-sm text-neutral-600">Only users with specific tag can access</p>
            </div>
          </label>

          {/* Option 3: VIP List */}
          <label className="flex items-start gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 cursor-pointer transition-all">
            <input
              type="radio"
              name="vipMode"
              checked={data.settings.vipAccess.mode === 'vip_list'}
              onChange={() => handleVIPModeChange('vip_list')}
              className="mt-1"
            />
            <div className="flex-1">
              <p className="font-semibold text-neutral-900">VIP List</p>
              <p className="text-sm text-neutral-600 mb-3">Specific usernames only</p>

              {data.settings.vipAccess.mode === 'vip_list' && (
                <Input
                  placeholder="username1, username2, username3"
                  value={data.settings.vipAccess.vipUsernames.join(', ')}
                  onChange={(e) => handleVIPUsernamesChange(e.target.value)}
                  className="text-sm"
                />
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Generation Limits */}
      <div className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl border border-neutral-200 p-6">
        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <span className="text-xl">⏱️</span>
          Generation Limits
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Count */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Generations per user
            </label>
            <Input
              type="number"
              min="1"
              max="100"
              value={data.settings.generationLimit.count}
              onChange={(e) =>
                handleLimitChange(parseInt(e.target.value) || 5, data.settings.generationLimit.period)
              }
              className="w-full"
            />
          </div>

          {/* Period */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Time Period
            </label>
            <select
              value={data.settings.generationLimit.period}
              onChange={(e) => {
                const value = e.target.value;
                if (isPeriodType(value)) {
                  handleLimitChange(data.settings.generationLimit.count, value);
                }
              }}
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="minute">Per Minute</option>
              <option value="hour">Per Hour</option>
              <option value="day">Per Day</option>
              <option value="week">Per Week</option>
              <option value="month">Per Month</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-neutral-600 mt-4 bg-blue-50 rounded-lg p-3 border border-blue-100">
          <span className="font-semibold">Current setting:</span> Each user can generate{' '}
          {data.settings.generationLimit.count} transformations per {data.settings.generationLimit.period}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" size="lg" onClick={onBack} className="border-2">
          ← Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600"
        >
          Next: Preview Flow →
        </Button>
      </div>
    </div>
  );
}
