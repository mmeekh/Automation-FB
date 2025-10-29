'use client';

import { useState } from 'react';
import { AutomationSidebar } from '@/components/layout/AutomationSidebar';
import {
  BoltIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function AutomationSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [quotaLimit, setQuotaLimit] = useState(1000);
  const [resetInterval, setResetInterval] = useState('24h');
  const [errorHandling, setErrorHandling] = useState('retry');
  const [maxRetries, setMaxRetries] = useState(3);

  const tabs = [
    { id: 'general', name: 'General', icon: BoltIcon },
    { id: 'quota', name: 'Quota & Limits', icon: ChartBarIcon },
    { id: 'testing', name: 'Testing', icon: UserGroupIcon },
    { id: 'errors', name: 'Error Handling', icon: ExclamationTriangleIcon },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      <AutomationSidebar />

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900">Automation Settings</h1>
            <p className="text-neutral-600 mt-2">
              Configure automation-specific settings and behavior
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar Tabs */}
            <div className="col-span-3">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                          : 'text-neutral-700 hover:bg-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="col-span-9">
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
                {activeTab === 'general' && <GeneralSettings />}
                {activeTab === 'quota' && (
                  <QuotaSettings
                    quotaLimit={quotaLimit}
                    setQuotaLimit={setQuotaLimit}
                    resetInterval={resetInterval}
                    setResetInterval={setResetInterval}
                  />
                )}
                {activeTab === 'testing' && <TestingSettings />}
                {activeTab === 'errors' && (
                  <ErrorHandlingSettings
                    errorHandling={errorHandling}
                    setErrorHandling={setErrorHandling}
                    maxRetries={maxRetries}
                    setMaxRetries={setMaxRetries}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900">General Settings</h2>
        <p className="text-neutral-600 mt-1">Basic automation configuration</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Automation Name
          </label>
          <input
            type="text"
            defaultValue="Hair Restoration AI"
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Description
          </label>
          <textarea
            rows={3}
            defaultValue="AI-powered hair transformation automation for Instagram DMs"
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-200">
          <div>
            <h3 className="font-semibold text-neutral-900">Follower Only Mode</h3>
            <p className="text-sm text-neutral-600">Only respond to followers</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>

        <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function QuotaSettings({
  quotaLimit,
  setQuotaLimit,
  resetInterval,
  setResetInterval,
}: {
  quotaLimit: number;
  setQuotaLimit: (value: number) => void;
  resetInterval: string;
  setResetInterval: (value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900">Quota & Limits</h2>
        <p className="text-neutral-600 mt-1">Manage automation usage limits</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-4">
            Daily Quota Limit
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={quotaLimit}
              onChange={(e) => setQuotaLimit(Number(e.target.value))}
              className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <span className="text-2xl font-bold text-primary-600 w-24 text-right">
              {quotaLimit}
            </span>
          </div>
          <div className="flex justify-between text-xs text-neutral-400 mt-2">
            <span>100</span>
            <span>10,000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Reset Interval
          </label>
          <div className="grid grid-cols-4 gap-3">
            {['12h', '24h', '7d', '30d'].map((interval) => (
              <button
                key={interval}
                onClick={() => setResetInterval(interval)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  resetInterval === interval
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {interval}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Current Usage:</strong> Quota resets every {resetInterval}. Current limit:{' '}
            {quotaLimit} automations.
          </p>
        </div>

        <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
          Save Quota Settings
        </button>
      </div>
    </div>
  );
}

function TestingSettings() {
  const [testUsers, setTestUsers] = useState(['@test_user1', '@john_doe']);
  const [newUser, setNewUser] = useState('');

  const addTestUser = () => {
    if (newUser.trim() && !testUsers.includes(newUser.trim())) {
      setTestUsers([...testUsers, newUser.trim()]);
      setNewUser('');
    }
  };

  const removeTestUser = (user: string) => {
    setTestUsers(testUsers.filter((u) => u !== user));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900">Testing Settings</h2>
        <p className="text-neutral-600 mt-1">Configure test mode and test users</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
          <h3 className="font-semibold text-yellow-900 mb-2">What is Test Mode?</h3>
          <p className="text-sm text-yellow-800">
            Test Mode allows you to run the automation only for specific Instagram usernames.
            This is perfect for verifying your flow works correctly before activating it for all
            followers.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Test Users
          </label>
          <div className="space-y-2 mb-3">
            {testUsers.map((user) => (
              <div
                key={user}
                className="flex items-center justify-between px-4 py-2 rounded-lg border border-neutral-200 bg-white"
              >
                <span className="text-neutral-900">{user}</span>
                <button
                  onClick={() => removeTestUser(user)}
                  className="text-red-500 hover:text-red-600 font-semibold text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="@username"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTestUser()}
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
            <button
              onClick={addTestUser}
              className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all"
            >
              Add User
            </button>
          </div>
        </div>

        <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
          Save Test Settings
        </button>
      </div>
    </div>
  );
}

function ErrorHandlingSettings({
  errorHandling,
  setErrorHandling,
  maxRetries,
  setMaxRetries,
}: {
  errorHandling: string;
  setErrorHandling: (value: string) => void;
  maxRetries: number;
  setMaxRetries: (value: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-900">Error Handling</h2>
        <p className="text-neutral-600 mt-1">Configure how errors are handled</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Error Strategy
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'retry', label: 'Retry' },
              { value: 'skip', label: 'Skip' },
              { value: 'notify', label: 'Notify' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setErrorHandling(option.value)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  errorHandling === option.value
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {errorHandling === 'retry' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Max Retry Attempts
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={10}
                value={maxRetries}
                onChange={(e) => setMaxRetries(Number(e.target.value))}
                className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <span className="text-2xl font-bold text-primary-600 w-16 text-right">
                {maxRetries}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-semibold text-neutral-900">Error Notifications</h3>
          {[
            { label: 'API Failures', desc: 'Notify when API calls fail' },
            { label: 'Quota Exceeded', desc: 'Alert when daily limits are reached' },
            { label: 'Invalid Images', desc: 'Notify when users send invalid images' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-4 rounded-xl border border-neutral-200"
            >
              <div>
                <h4 className="font-semibold text-neutral-900">{item.label}</h4>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          ))}
        </div>

        <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
          Save Error Settings
        </button>
      </div>
    </div>
  );
}
