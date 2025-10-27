'use client';

import { useState } from 'react';
import { AutomationTemplate } from '@/lib/automations/types';
import { CustomizationData } from '@/lib/types/customization';
import { Input } from '@/components';
import {
  Cog6ToothIcon,
  LockClosedIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface CustomizationSidebarProps {
  template: AutomationTemplate;
  data: CustomizationData;
  onChange: (updates: Partial<CustomizationData>) => void;
}

export function CustomizationSidebar({ template, data, onChange }: CustomizationSidebarProps) {
  const [activeSection, setActiveSection] = useState<'vip' | 'limits'>('vip');

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

  const handleLimitChange = (
    count: number,
    period: 'minute' | 'hour' | 'day' | 'week' | 'month'
  ) => {
    onChange({
      settings: {
        ...data.settings,
        generationLimit: { count, period },
      },
    });
  };

  const handleQuotaResetChange = (quotaReset: 'hourly' | 'daily' | 'weekly' | 'monthly') => {
    onChange({
      settings: {
        ...data.settings,
        quotaReset,
      },
    });
  };

  return (
    <div className="space-y-4 h-fit sticky top-24">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100">
            <Cog6ToothIcon className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900">Automation Settings</h2>
        </div>
        <p className="text-sm text-neutral-600">Configure access control and usage limits</p>
      </div>

      {/* Section Tabs */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 border-b border-neutral-200">
          <button
            onClick={() => setActiveSection('vip')}
            className={`px-4 py-3 text-sm font-semibold transition-all ${
              activeSection === 'vip'
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <LockClosedIcon className="w-4 h-4 inline mr-2" />
            VIP Access
          </button>
          <button
            onClick={() => setActiveSection('limits')}
            className={`px-4 py-3 text-sm font-semibold transition-all ${
              activeSection === 'limits'
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <ClockIcon className="w-4 h-4 inline mr-2" />
            Limits
          </button>
        </div>

        <div className="p-6">
          {activeSection === 'vip' && (
            <div className="space-y-4">
              <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                🔐 Who can use this automation?
              </h3>

              <div className="space-y-3">
                {/* Option 1: All Users */}
                <label className="flex items-start gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="vipMode"
                    checked={data.settings.vipAccess.mode === 'all'}
                    onChange={() => handleVIPModeChange('all')}
                    className="mt-1 accent-primary-500"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900">All Followers</p>
                    <p className="text-xs text-neutral-600">
                      Anyone who follows you can use this automation
                    </p>
                  </div>
                </label>

                {/* Option 2: Tagged Users */}
                <label className="flex items-start gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="vipMode"
                    checked={data.settings.vipAccess.mode === 'tagged'}
                    onChange={() => handleVIPModeChange('tagged')}
                    className="mt-1 accent-primary-500"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900">Tagged Users Only</p>
                    <p className="text-xs text-neutral-600">Only users with specific tag</p>
                  </div>
                </label>

                {/* Option 3: VIP List */}
                <label className="flex items-start gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="vipMode"
                    checked={data.settings.vipAccess.mode === 'vip_list'}
                    onChange={() => handleVIPModeChange('vip_list')}
                    className="mt-1 accent-primary-500"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900">VIP List</p>
                    <p className="text-xs text-neutral-600 mb-3">Specific usernames only</p>

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
          )}

          {activeSection === 'limits' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  ⏱️ Generation Limits
                </h3>

                <div className="space-y-4">
                  {/* Count */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Generations per user
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="1000"
                      value={data.settings.generationLimit.count}
                      onChange={(e) =>
                        handleLimitChange(
                          parseInt(e.target.value) || 5,
                          data.settings.generationLimit.period
                        )
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
                      onChange={(e) =>
                        handleLimitChange(data.settings.generationLimit.count, e.target.value as any)
                      }
                      className="w-full px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                      <option value="minute">Per Minute</option>
                      <option value="hour">Per Hour</option>
                      <option value="day">Per Day</option>
                      <option value="week">Per Week</option>
                      <option value="month">Per Month</option>
                    </select>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <p className="text-xs text-blue-800">
                      <span className="font-semibold">Current setting:</span> Each user can generate{' '}
                      {data.settings.generationLimit.count} transformations per{' '}
                      {data.settings.generationLimit.period}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quota Reset */}
              <div>
                <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <ArrowPathIcon className="w-5 h-5 text-accent-600" />
                  Quota Reset Schedule
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {(['hourly', 'daily', 'weekly', 'monthly'] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => handleQuotaResetChange(option)}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        data.settings.quotaReset === option
                          ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
        <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
          📊 Configuration Summary
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-green-700">Access Mode:</span>
            <span className="font-semibold text-green-900">
              {data.settings.vipAccess.mode === 'all'
                ? 'All Followers'
                : data.settings.vipAccess.mode === 'tagged'
                ? 'Tagged Only'
                : `${data.settings.vipAccess.vipUsernames.length} VIPs`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Generation Limit:</span>
            <span className="font-semibold text-green-900">
              {data.settings.generationLimit.count}/{data.settings.generationLimit.period}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-700">Reset Schedule:</span>
            <span className="font-semibold text-green-900 capitalize">
              {data.settings.quotaReset}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
