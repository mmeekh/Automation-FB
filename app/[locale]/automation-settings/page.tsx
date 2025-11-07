'use client';

import { useEffect, useMemo, useState } from 'react';
import { AutomationSidebar } from '@/components/layout/AutomationSidebar';
import {
  BoltIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useAccountStore } from '@/lib/store/accountStore';
import type { InstagramAccount } from '@/lib/types/account';
import {
  UNLIMITED_QUOTA,
  REQUIRED_POOL_ALLOCATION,
} from '@/lib/constants';

export default function AutomationSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [errorHandling, setErrorHandling] = useState('retry');
  const [maxRetries, setMaxRetries] = useState(3);
  const accounts = useAccountStore((state) => state.accounts);
  const loadAccounts = useAccountStore((state) => state.loadAccounts);
  const toggleAccountCreditPool = useAccountStore((state) => state.toggleAccountCreditPool);
  const setAccountAllocation = useAccountStore((state) => state.setAccountAllocation);
  const setAccountQuotaLimit = useAccountStore((state) => state.setAccountQuotaLimit);
  const setAccountTotalGenerationLimit = useAccountStore((state) => state.setAccountTotalGenerationLimit);
  const setAccountQuotaResetInterval = useAccountStore((state) => state.setAccountQuotaResetInterval);

  useEffect(() => {
    if (accounts.length === 0) {
      loadAccounts();
    }
  }, [accounts.length, loadAccounts]);

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
                    accounts={accounts}
                    onToggleAccountCreditPool={toggleAccountCreditPool}
                    onAllocationChange={setAccountAllocation}
                    onQuotaLimitChange={setAccountQuotaLimit}
                    onTotalGenerationLimitChange={setAccountTotalGenerationLimit}
                    onResetIntervalChange={setAccountQuotaResetInterval}
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

type QuotaSettingsProps = {
  accounts: InstagramAccount[];
  onToggleAccountCreditPool: (accountId: string) => void;
  onAllocationChange: (accountId: string, percent: number) => void;
  onQuotaLimitChange: (accountId: string, limit: number) => void;
  onTotalGenerationLimitChange: (accountId: string, limit: number) => void;
  onResetIntervalChange: (accountId: string, interval: string) => void;
};

function QuotaSettings({
  accounts,
  onToggleAccountCreditPool,
  onAllocationChange,
  onQuotaLimitChange,
  onTotalGenerationLimitChange,
  onResetIntervalChange,
}: QuotaSettingsProps) {
  const locale = useLocale();
  const translate = (trText: string, enText: string) => (locale === 'tr' ? trText : enText);
  // Collapse state for accounts - kredi havuzu kapalı olanlar collapsed başlar
  const [collapsedAccounts, setCollapsedAccounts] = useState<Set<string>>(() => {
    const initialCollapsed = new Set<string>();
    accounts.forEach(account => {
      if (!account.includedInCreditPool) {
        initialCollapsed.add(account.id);
      }
    });
    return initialCollapsed;
  });

  const toggleAccountCollapse = (accountId: string) => {
    setCollapsedAccounts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(accountId)) {
        newSet.delete(accountId);
      } else {
        newSet.add(accountId);
      }
      return newSet;
    });
  };

  const connectedAccounts = useMemo(
    () => accounts.filter((account) => account.isConnected && (account.isActive ?? true)),
    [accounts]
  );

  const totalPoolPercent = useMemo(
    () =>
      connectedAccounts.reduce((sum, account) => {
        if (!(account.includedInCreditPool ?? false)) return sum;
        return sum + (account.creditAllocationPercent ?? 0);
      }, 0),
    [connectedAccounts]
  );

  const handleAllocationChange = (accountId: string, value: number | string) => {
    const parsed =
      typeof value === 'number'
        ? value
        : Number(value);
    onAllocationChange(accountId, Number.isFinite(parsed) ? parsed : 0);
  };

  const formatNumber = (value: number) => value.toLocaleString('tr-TR');
  const poolIsBalanced = totalPoolPercent === REQUIRED_POOL_ALLOCATION;

  // Mock package quota data (will be replaced with real data later)
  const packageTotalQuota = 10000;
  const packageUsedQuota = 2450;
  const packageUsagePercent = (packageUsedQuota / packageTotalQuota) * 100;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-500/10 via-white to-accent-500/10 p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
              Paket Quota
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-neutral-900">
                {formatNumber(packageUsedQuota)}
              </p>
              <span className="text-lg font-semibold text-neutral-400">/</span>
              <p className="text-xl font-semibold text-neutral-600">
                {formatNumber(packageTotalQuota)} kredi
              </p>
            </div>
            <div className="mt-3 relative h-2 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all"
                style={{ width: `${packageUsagePercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-neutral-600">
              {formatNumber(packageTotalQuota - packageUsedQuota)}{' '}
              {translate('kredi kaldı', 'credits remaining')}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="rounded-xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-inner">
              <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Aktif hesap
              </span>
              <span className="block mt-1 text-2xl font-bold text-neutral-900">
                {connectedAccounts.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {translate('Instagram hesapları', 'Instagram accounts')}
            </h3>
            <p className="text-sm text-neutral-600">
              {translate(
                'Kredi havuzuna dahil edeceğiniz hesapları seçin ve paylaşımlarını belirleyin.',
                'Choose which accounts join the credit pool and set their allocation.'
              )}
            </p>
          </div>
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold ${
              poolIsBalanced ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            Havuz %{totalPoolPercent}
            {!poolIsBalanced && <span className="text-xs font-medium">Hedef: %100</span>}
          </div>
        </div>

        {connectedAccounts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-500">
            {translate(
              'Henüz bağlanmış Instagram hesabınız yok. Önce bir hesap bağlayın.',
              'No Instagram accounts are connected yet. Connect an account to get started.'
            )}
          </div>
        ) : (
          connectedAccounts.map((account) => {
            const included = account.includedInCreditPool ?? false;
            const allocation = account.creditAllocationPercent ?? 0;
            const isCollapsed = collapsedAccounts.has(account.id);

            return (
              <div
                key={account.id}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-primary-200/60 hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleAccountCollapse(account.id)}
                      className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                      aria-label={
                        isCollapsed
                          ? translate('Genişlet', 'Expand')
                          : translate('Daralt', 'Collapse')
                      }
                    >
                      <ChevronDownIcon
                        className={`w-5 h-5 text-neutral-600 transition-transform ${
                          isCollapsed ? '-rotate-90' : ''
                        }`}
                      />
                    </button>
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200">
                      <Image
                        src={account.profilePicture}
                        alt={account.displayName}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">@{account.username}</p>
                      <p className="text-xs text-neutral-500">{account.displayName}</p>
                    </div>
                  </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          included ? 'bg-green-500' : 'bg-neutral-300'
                        }`}
                        aria-hidden
                      />
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Kredi havuzu
                      </span>
                      <label className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={included}
                          onChange={() => onToggleAccountCreditPool(account.id)}
                          className="peer sr-only"
                        />
                        <span className="h-full w-full rounded-full bg-neutral-300 transition-colors peer-checked:bg-primary-500" />
                        <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                      </label>
                    </div>
                </div>

                {!isCollapsed && (
                <>
                <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      <span>{translate('Toplam Üretim', 'Total production')}</span>
                      <span className="text-primary-600">
                        {account.totalGenerations.toLocaleString('tr-TR')}{' '}
                        {translate('üretim', 'runs')}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-neutral-400">
                      {translate('Kişi başı limit', 'Per-user limit')}:{' '}
                      {account.perUserLimit === UNLIMITED_QUOTA
                        ? translate('Sınırsız', 'Unlimited')
                        : `${account.perUserLimit} ${translate('üretim', 'runs')}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      {translate('Paylaşım', 'Allocation')}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={allocation}
                      onChange={(event) =>
                        handleAllocationChange(account.id, event.target.value)
                      }
                      disabled={!included}
                      className="w-16 rounded-lg border border-neutral-200 bg-white px-2 py-1 text-sm text-neutral-700 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-neutral-100"
                    />
                    <span className="text-sm font-semibold text-neutral-700">%</span>
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={allocation}
                    onChange={(event) => handleAllocationChange(account.id, event.target.value)}
                    disabled={!included}
                    className="h-2 w-full appearance-none rounded-full bg-neutral-200 accent-primary-500 disabled:cursor-not-allowed"
                  />
                  {!included && (
                    <p className="mt-2 text-xs text-neutral-400">
                      {translate(
                        'Hesabı havuza ekledikten sonra oran belirleyebilirsiniz.',
                        'Add the account to the pool before assigning an allocation.'
                      )}
                    </p>
                  )}
                </div>

                {/* Account-specific quota settings */}
                <div className="mt-5 border-t border-neutral-200 pt-4">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-3">
                    Hesap limitleri
                  </h4>

                  {/* Total generation limit for account */}
                  <div className="mb-3">
                    <label className="flex items-center justify-between text-xs font-medium text-neutral-600 mb-2">
                      <span>
                        {translate(
                          'Toplam üretim limiti (hesap bazlı)',
                          'Total production limit (per account)'
                        )}
                      </span>
                      <span className="text-primary-600 font-semibold">
                        {account.totalGenerations.toLocaleString('tr-TR')} /{' '}
                        {(account.totalGenerationLimit ?? 1000).toLocaleString('tr-TR')}
                      </span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={10}
                      value={account.totalGenerationLimit ?? 1000}
                      onChange={(e) => onTotalGenerationLimitChange(account.id, Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg bg-white focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      placeholder={translate('Toplam üretim limiti', 'Total production limit')}
                    />
                    <p className="mt-1 text-[10px] text-neutral-400">
                      {translate(
                        'Bu hesabın maksimum kaç üretim yapabileceğini belirler',
                        'Defines the maximum runs allowed for this account'
                      )}
                    </p>
                  </div>

                  {/* Per-user generation limit */}
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-neutral-600 mb-2">
                      {translate(
                        'Maksimum kişi başı üretim limiti',
                        'Maximum runs per user'
                      )}
                    </label>
                    <select
                      value={account.perUserLimit}
                      onChange={(e) => onQuotaLimitChange(account.id, Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg bg-white focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {translate('üretim', 'runs')}
                        </option>
                      ))}
                      <option value={UNLIMITED_QUOTA}>{translate('Sınırsız', 'Unlimited')}</option>
                    </select>
                  </div>

                  {/* Reset Interval */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-2">
                      {translate('Sıfırlama aralığı', 'Reset interval')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={parseInt((account.perUserResetInterval ?? '24h').match(/\d+/)?.[0] ?? '24')}
                        onChange={(e) => {
                          const number = e.target.value;
                          const unit = (account.perUserResetInterval ?? '24h').replace(/\d+/, '');
                          onResetIntervalChange(account.id, `${number}${unit}`);
                        }}
                        className="px-3 py-2 text-xs border border-neutral-200 rounded-lg bg-white focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      >
                        {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <select
                        value={(account.perUserResetInterval ?? '24h').replace(/\d+/, '')}
                        onChange={(e) => {
                          const number = parseInt((account.perUserResetInterval ?? '24h').match(/\d+/)?.[0] ?? '24');
                          const unit = e.target.value;
                          onResetIntervalChange(account.id, `${number}${unit}`);
                        }}
                        className="px-3 py-2 text-xs border border-neutral-200 rounded-lg bg-white focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      >
                        <option value="m">{translate('Dakika', 'Minutes')}</option>
                        <option value="h">{translate('Saat', 'Hours')}</option>
                        <option value="d">{translate('Gün', 'Days')}</option>
                        <option value="M">{translate('Ay', 'Months')}</option>
                      </select>
                    </div>
                  </div>
                </div>
                </>
                )}
              </div>
            );
          })
        )}
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!poolIsBalanced}
          className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition ${
            poolIsBalanced
              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg'
              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
          }`}
          title={!poolIsBalanced ? translate('Havuz %100 olmalıdır', 'Pool allocation must equal 100%') : ''}
        >
          {translate('Ayarları kaydet', 'Save settings')}
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
