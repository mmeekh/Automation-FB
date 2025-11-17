'use client';

import { useMemo, useState } from 'react';
import { Card, Title, Text, Flex, Metric, Grid, LineChart, ProgressBar } from '@tremor/react';
import clsx from 'clsx';
import dayjs from 'dayjs';

import type { AutomationBreakdownDatum } from './types';
import { AutomationBreakdownChart } from './AutomationBreakdownChart';
type Granularity = 'daily' | 'weekly' | 'monthly';

interface UsageEntry {
  date: string;
  usage: number;
}

interface AutomationBreakdownEntry {
  automationId: string;
  automationName: string;
  totalUsage: number;
}

export interface AccountUsage {
  accountId: string;
  username: string;
  maxCredits: number;
  remainingCredits: number;
  daily: UsageEntry[];
  automationBreakdown: AutomationBreakdownEntry[];
}

interface ChartDatum {
  period: string;
  rawStart: string;
  [username: string]: string | number;
}

const AUTOMATION_TEMPLATES = [
  { id: 'auto-restoration', name: 'Hair Restoration AI' },
  { id: 'auto-style-advisor', name: 'Style Advisor Flow' },
  { id: 'auto-reminder', name: 'Appointment Reminder' },
] as const;

const mockUsageData: AccountUsage[] = generateMockUsageData();

const numberFormatter = new Intl.NumberFormat('en-US');

export function groupByGranularity(data: AccountUsage[], mode: Granularity): ChartDatum[] {
  if (data.length === 0) return [];

  const sortedAccounts = data.map((account) => ({
    ...account,
    daily: [...account.daily].sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()),
  }));

  const usernames = sortedAccounts.map((account) => account.username);
  const allDates = sortedAccounts.flatMap((account) => account.daily.map((entry) => entry.date));
  const uniqueDates = Array.from(new Set(allDates)).sort(
    (a, b) => dayjs(a).valueOf() - dayjs(b).valueOf()
  );

  const firstDate = dayjs(uniqueDates[0]);
  const lastDate = dayjs(uniqueDates[uniqueDates.length - 1]);

  if (mode === 'daily') {
    return uniqueDates.map((isoDate) => {
      const period = dayjs(isoDate).format('DD MMM');
      const datum: ChartDatum = { period, rawStart: isoDate };
      sortedAccounts.forEach((account) => {
        const entry = account.daily.find((item) => item.date === isoDate);
        datum[account.username] = entry?.usage ?? 0;
      });
      return datum;
    });
  }

  if (mode === 'weekly') {
    const bucketMap = new Map<
      number,
      {
        start: dayjs.Dayjs;
        end: dayjs.Dayjs;
        totals: Record<string, number>;
      }
    >();

    sortedAccounts.forEach((account) => {
      account.daily.forEach((entry) => {
        const diff = dayjs(entry.date).diff(firstDate, 'day');
        const bucketIndex = Math.floor(diff / 7);
        const bucket =
          bucketMap.get(bucketIndex) ??
          (() => {
            const weekStart = firstDate.add(bucketIndex * 7, 'day');
            const tentativeEnd = weekStart.add(6, 'day');
            const weekEnd = tentativeEnd.isAfter(lastDate) ? lastDate : tentativeEnd;
            const initialBucket = {
              start: weekStart,
              end: weekEnd,
              totals: Object.fromEntries(usernames.map((username) => [username, 0])),
            };
            bucketMap.set(bucketIndex, initialBucket);
            return initialBucket;
          })();
        bucket.totals[account.username] += entry.usage;
      });
    });

    return Array.from(bucketMap.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, bucket]) => {
        const period = `${bucket.start.format('DD MMM')} - ${bucket.end.format('DD MMM')}`;
        const datum: ChartDatum = { period, rawStart: bucket.start.toISOString() };
        usernames.forEach((username) => {
          datum[username] = bucket.totals[username] ?? 0;
        });
        return datum;
      });
  }

  // Monthly fallback: single aggregated point covering the full 30-day span
  const monthlyDatum: ChartDatum = {
    period: 'Last 30 Days',
    rawStart: firstDate.toISOString(),
  };
  usernames.forEach((username) => {
    const account = sortedAccounts.find((item) => item.username === username);
    const sum = account
      ? account.daily.reduce((acc, entry) => acc + entry.usage, 0)
      : 0;
    monthlyDatum[username] = sum;
  });
  return [monthlyDatum];
}

export function sum30dSelected(accounts: AccountUsage[]): number {
  return accounts.reduce(
    (total, account) =>
      total + account.daily.reduce((accountTotal, entry) => accountTotal + entry.usage, 0),
    0
  );
}

export function avg7d(account: AccountUsage): number {
  const sortedDaily = [...account.daily].sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
  );
  const lastSeven = sortedDaily.slice(-7);
  if (lastSeven.length === 0) return 0;
  const total = lastSeven.reduce((sum, entry) => sum + entry.usage, 0);
  return total / lastSeven.length;
}

function buildAutomationBreakdownData(accounts: AccountUsage[]): AutomationBreakdownDatum[] {
  if (accounts.length === 0) {
    return [];
  }

  const usernames = accounts.map((account) => account.username);
  const automationMap = new Map<
    string,
    { name: string; totals: Record<string, number>; sum: number }
  >();

  accounts.forEach((account) => {
    account.automationBreakdown.forEach((entry) => {
      const existing =
        automationMap.get(entry.automationId) ??
        (() => {
          const initial = {
            name: entry.automationName,
            totals: Object.fromEntries(usernames.map((username) => [username, 0])),
            sum: 0,
          };
          automationMap.set(entry.automationId, initial);
          return initial;
        })();

      existing.totals[account.username] = entry.totalUsage;
      existing.sum += entry.totalUsage;
    });
  });

  return AUTOMATION_TEMPLATES.map((template) => {
    const entry = automationMap.get(template.id);
    if (!entry) {
      return {
        otomasyon: template.name,
        ...Object.fromEntries(usernames.map((username) => [username, 0])),
      } as AutomationBreakdownDatum;
    }

    return {
      otomasyon: entry.name,
      ...Object.fromEntries(
        usernames.map((username) => [username, entry.totals[username] ?? 0])
      ),
    } as AutomationBreakdownDatum;
  }).filter((row) =>
    usernames.some((username) => (row[username] as number) > 0)
  );
}

const granularityOptions: { value: Granularity; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export function ProductionInsights(): JSX.Element {
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>(
    () => mockUsageData.map((account) => account.accountId)
  );
  const [granularity, setGranularity] = useState<Granularity>('daily');

  const selectedAccounts = useMemo(
    () => mockUsageData.filter((account) => selectedAccountIds.includes(account.accountId)),
    [selectedAccountIds]
  );

  const chartData = useMemo(
    () => groupByGranularity(selectedAccounts, granularity),
    [selectedAccounts, granularity]
  );

  const automationChartData = useMemo(
    () => buildAutomationBreakdownData(selectedAccounts),
    [selectedAccounts]
  );

  const totalProduction = useMemo(() => sum30dSelected(selectedAccounts), [selectedAccounts]);

  const mostActiveAccount = useMemo(() => {
    if (selectedAccounts.length === 0) return null;
    return selectedAccounts
      .map((account) => ({
        id: account.accountId,
        username: account.username,
        total: account.daily.reduce((sum, entry) => sum + entry.usage, 0),
      }))
      .sort((a, b) => b.total - a.total)[0];
  }, [selectedAccounts]);

  const averageDailyProduction = useMemo(() => {
    if (selectedAccounts.length === 0) return 0;
    return Math.round(totalProduction / 30);
  }, [selectedAccounts.length, totalProduction]);

  const handleAccountToggle = (accountId: string) => {
    setSelectedAccountIds((prev) =>
      prev.includes(accountId) ? prev.filter((id) => id !== accountId) : [...prev, accountId]
    );
  };

  const handleGranularityChange = (value: Granularity) => {
    setGranularity(value);
  };

  const categories = selectedAccounts.map((account) => account.username);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <Title className="text-2xl font-semibold text-neutral-900">📊 Production Insights</Title>
        <Text className="text-sm text-neutral-500">
          Track production performance for the last 30 days and plan your credits with confidence.
        </Text>
      </header>

      <Filters
        accounts={mockUsageData}
        selectedAccountIds={selectedAccountIds}
        onSelectionChange={handleAccountToggle}
        granularity={granularity}
        onGranularityChange={handleGranularityChange}
      />

      <LineUsageChart
        data={chartData}
        categories={categories}
        granularity={granularity}
        hasSelection={selectedAccounts.length > 0}
      />

      <AutomationBreakdownChart
        data={automationChartData}
        categories={categories}
        valueFormatter={(value) => numberFormatter.format(value)}
      />

      <KPICards
        totalProduction={totalProduction}
        mostActiveUsername={mostActiveAccount?.username ?? '—'}
        averageDailyProduction={averageDailyProduction}
      />

      <DepletionForecastList accounts={selectedAccounts} />
    </div>
  );
}

interface FiltersProps {
  accounts: AccountUsage[];
  selectedAccountIds: string[];
  onSelectionChange: (accountId: string) => void;
  granularity: Granularity;
  onGranularityChange: (mode: Granularity) => void;
}

function Filters({
  accounts,
  selectedAccountIds,
  onSelectionChange,
  granularity,
  onGranularityChange,
}: FiltersProps) {
  return (
    <Card className="border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Text className="text-xs font-semibold uppercase text-neutral-500">Accounts</Text>
          <div className="mt-2 flex flex-wrap gap-2">
            {accounts.map((account) => {
              const selected = selectedAccountIds.includes(account.accountId);
              return (
                <label
                  key={account.accountId}
                  className={clsx(
                    'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all',
                    selected
                      ? 'border-primary-300 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary-200 hover:text-primary-600'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onSelectionChange(account.accountId)}
                    className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-400"
                  />
                  <span>{account.username}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 md:items-end">
          <Text className="text-xs font-semibold uppercase text-neutral-500">Granülerlik</Text>
          <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-1">
            {granularityOptions.map((option) => {
              const isActive = granularity === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onGranularityChange(option.value)}
                  className={clsx(
                    'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary-600'
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

interface LineUsageChartProps {
  data: ChartDatum[];
  categories: string[];
  granularity: Granularity;
  hasSelection: boolean;
}

function LineUsageChart({ data, categories, granularity, hasSelection }: LineUsageChartProps) {
  const usageFormatter = (value: number) => numberFormatter.format(value);

  return (
    <Card className="border border-neutral-200 bg-white shadow-sm">
      <Flex justifyContent="between" alignItems="center" className="mb-4">
        <div>
          <Title>Production over the last 30 days</Title>
          <Text className="text-xs text-neutral-500">
            {granularity === 'daily' && 'Daily usage trend'}
            {granularity === 'weekly' && '7-day totals'}
            {granularity === 'monthly' && '30-day total production'}
          </Text>
        </div>
        <span className="rounded-full border border-neutral-200 bg-transparent px-3 py-1 text-xs font-semibold text-neutral-600">
          {granularityOptions.find((option) => option.value === granularity)?.label ?? ''}
        </span>
      </Flex>

      {!hasSelection ? (
        <div className="py-8 text-center text-sm text-neutral-500">
          Select at least one account to view the chart.
        </div>
      ) : (
        <LineChart
          data={data}
          index="period"
          categories={categories}
          valueFormatter={usageFormatter}
          colors={['emerald', 'indigo', 'cyan', 'amber', 'rose', 'violet']}
          autoMinValue
          showLegend
          showGridLines
          className="h-80"
          yAxisLabel="Production"
          customTooltip={({ payload, active, label }) => {
            if (!active || !payload) return null;
            return (
              <Card className="border border-neutral-200 bg-white/90 p-3 shadow-lg">
                <Text className="text-xs font-semibold text-neutral-500">{label}</Text>
                <div className="mt-2 space-y-1">
                  {payload.map((entry) => (
                    <div key={entry.dataKey} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-neutral-700">{entry.dataKey}</span>
                      <span className="text-sm font-semibold text-neutral-900">
                        {`${numberFormatter.format(entry.value as number)} outputs`}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          }}
        />
      )}
    </Card>
  );
}

interface KPICardsProps {
  totalProduction: number;
  mostActiveUsername: string;
  averageDailyProduction: number;
}

function KPICards({ totalProduction, mostActiveUsername, averageDailyProduction }: KPICardsProps) {
  return (
    <Grid numItemsMd={3} className="gap-4">
      <Card className="border border-neutral-200 bg-white shadow-sm">
        <Text className="text-sm text-neutral-500">Total production (30 days)</Text>
        <Metric className="mt-2 text-neutral-900">{numberFormatter.format(totalProduction)}</Metric>
      </Card>
      <Card className="border border-neutral-200 bg-white shadow-sm">
        <Text className="text-sm text-neutral-500">Most active account</Text>
        <Metric className="mt-2 text-neutral-900">{mostActiveUsername}</Metric>
      </Card>
      <Card className="border border-neutral-200 bg-white shadow-sm">
        <Text className="text-sm text-neutral-500">Average daily production</Text>
        <Metric className="mt-2 text-neutral-900">
          {numberFormatter.format(averageDailyProduction)}
        </Metric>
      </Card>
    </Grid>
  );
}

interface DepletionForecastListProps {
  accounts: AccountUsage[];
}

function DepletionForecastList({ accounts }: DepletionForecastListProps) {
  return (
    <Card className="border border-neutral-200 bg-white shadow-sm">
      <Title>Remaining credit forecast</Title>
      <Text className="text-xs text-neutral-500">
        Estimates remaining days based on the last 7 days of usage.
      </Text>

      {accounts.length === 0 ? (
        <div className="py-6 text-center text-sm text-neutral-500">
          Select at least one account to see the forecast.
        </div>
      ) : (
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => {
            const averageLast7 = avg7d(account);
            const remainingDays = account.remainingCredits / Math.max(1, averageLast7);
            const formattedRemaining = Number.isFinite(remainingDays)
              ? remainingDays.toFixed(1)
              : '0.0';
            const usageShare = Math.min(
              100,
              (account.remainingCredits / Math.max(1, account.maxCredits)) * 100
            );
            const color = getProgressBarColor(account.remainingCredits, account.maxCredits);

            return (
              <Card
                key={account.accountId}
                className="border border-neutral-200 bg-neutral-50/80 shadow-sm"
              >
                <Flex justifyContent="between" alignItems="start">
                  <div>
                    <Text className="text-sm font-semibold text-neutral-800">
                      {account.username}
                    </Text>
                    <Text className="text-xs text-neutral-500">
                      Estimated remaining: {formattedRemaining} days
                    </Text>
                  </div>
                  <span className="rounded-full border border-neutral-200 bg-transparent px-2.5 py-1 text-xs font-semibold text-neutral-600">
                    {numberFormatter.format(account.remainingCredits)}/
                    {numberFormatter.format(account.maxCredits)}
                  </span>
                </Flex>
                <ProgressBar
                  value={usageShare}
                  color={color}
                  className="mt-3"
                  showAnimation
                />
                <Text className="mt-1 text-xs text-neutral-500">
                  7-day average: {numberFormatter.format(Math.round(averageLast7))} per day
                </Text>
              </Card>
            );
          })}
        </div>
      )}
    </Card>
  );
}

function getProgressBarColor(remainingCredits: number, maxCredits: number) {
  const ratio = maxCredits > 0 ? remainingCredits / maxCredits : 0;
  if (ratio >= 0.6) return 'emerald';
  if (ratio >= 0.35) return 'yellow';
  if (ratio >= 0.15) return 'orange';
  return 'red';
}

interface MockSource {
  accountId: string;
  username: string;
  maxCredits: number;
  remainingCredits: number;
  base: number;
  variance: number;
}

function generateMockUsageData(): AccountUsage[] {
  const today = dayjs().startOf('day');
  const accounts: MockSource[] = [
    {
      accountId: 'acc-1',
      username: '@swonest.hq',
      maxCredits: 1000,
      remainingCredits: 320,
      base: 42,
      variance: 18,
    },
    {
      accountId: 'acc-2',
      username: '@hairai.istanbul',
      maxCredits: 500,
      remainingCredits: 180,
      base: 27,
      variance: 12,
    },
    {
      accountId: 'acc-3',
      username: '@looklab.ai',
      maxCredits: 1500,
      remainingCredits: 540,
      base: 58,
      variance: 24,
    },
  ];

  return accounts.map((account, accountIndex) => {
    const daily: UsageEntry[] = Array.from({ length: 30 }).map((_, index) => {
      const day = today.subtract(29 - index, 'day');
      const noise =
        Math.sin((index + 1) * 0.9 + accountIndex) * account.variance * 0.6 +
        Math.cos((index + 1) * 0.45 + accountIndex) * account.variance * 0.4;
      const usage = Math.max(8, Math.round(account.base + noise));
      return {
        date: day.format('YYYY-MM-DD'),
        usage,
      };
    });

    const totalUsage30 = daily.reduce((sum, entry) => sum + entry.usage, 0);
    const weightFactors = AUTOMATION_TEMPLATES.map((_, idx) =>
      Math.abs(Math.sin((accountIndex + 1) * (idx + 1) * 0.8)) + 0.35
    );
    const weightSum = weightFactors.reduce((sum, factor) => sum + factor, 0);

    let allocated = 0;
    const automationBreakdown = AUTOMATION_TEMPLATES.map((template, idx) => {
      const isLast = idx === AUTOMATION_TEMPLATES.length - 1;
      const rawValue = Math.round((totalUsage30 * weightFactors[idx]) / weightSum);
      const value = isLast ? Math.max(totalUsage30 - allocated, 0) : rawValue;
      allocated += value;
      return {
        automationId: template.id,
        automationName: template.name,
        totalUsage: value,
      };
    });

    return {
      accountId: account.accountId,
      username: account.username,
      maxCredits: account.maxCredits,
      remainingCredits: Math.min(account.remainingCredits, account.maxCredits),
      daily,
      automationBreakdown,
    };
  });
}

export default ProductionInsights;
