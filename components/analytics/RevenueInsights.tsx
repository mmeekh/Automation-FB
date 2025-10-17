'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardBadge, PlaceholderChart } from '@/components';
import { Clock3, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

type RevenueData = {
  totalRevenue: string;
  appointmentCount: number;
  averageBookingValue: string;
  conversionRate: string;
  peakHours: string[];
  growthRate: string;
};

const mockData: RevenueData = {
  totalRevenue: '€12,847',
  appointmentCount: 127,
  averageBookingValue: '€101.16',
  conversionRate: '4.7%',
  peakHours: ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
  growthRate: '+22%'
};

export function RevenueInsights() {
  const [data, setData] = useState<RevenueData>(mockData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        totalRevenue: `€${(Math.random() * 5000 + 10000).toFixed(0)}`,
        appointmentCount: Math.floor(Math.random() * 50 + 100),
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const fetchLatestData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden border border-white/70 bg-white/95 backdrop-blur-md shadow-lg">
      <CardHeader className="items-start pb-4">
        <div className="space-y-1">
          <CardTitle>Revenue & Appointment Insights</CardTitle>
          <p className="text-sm text-neutral-500">
            Compare automation workload with direct revenue estimates and peak conversion windows.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CardBadge className="bg-white text-primary-600 shadow-sm">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Realtime Sync
          </CardBadge>
          <CardBadge className="bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 text-emerald-600">
            Growth {data.growthRate}
          </CardBadge>
        </div>
      </CardHeader>

      <div className="px-6 pb-6">
        {/* Revenue Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50/50 to-white">
            <div className="flex items-center gap-2 text-primary-600 mb-2">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Total Revenue</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900">{data.totalRevenue}</div>
            <div className="text-xs text-emerald-600 mt-1 font-medium">↗ +18% vs last week</div>
          </div>

          <div className="p-4 rounded-2xl border border-accent-100 bg-gradient-to-br from-accent-50/50 to-white">
            <div className="flex items-center gap-2 text-accent-600 mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Appointments</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900">{data.appointmentCount}</div>
            <div className="text-xs text-emerald-600 mt-1 font-medium">↗ +12% vs last week</div>
          </div>

          <div className="p-4 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Avg. Value</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900">{data.averageBookingValue}</div>
            <div className="text-xs text-emerald-600 mt-1 font-medium">↗ +5% vs last week</div>
          </div>

          <div className="p-4 rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/50 to-white">
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Conversion</span>
            </div>
            <div className="text-2xl font-bold text-neutral-900">{data.conversionRate}</div>
            <div className="text-xs text-emerald-600 mt-1 font-medium">↗ +1.2% vs last week</div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="mb-6">
          <PlaceholderChart height="h-64" />
        </div>

        {/* Peak Hours Section */}
        <div className="rounded-2xl border border-dashed border-primary-200/60 bg-primary-50/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold text-neutral-700">
              <Clock3 className="h-5 w-5 text-primary-500" />
              Peak Booking Hours
            </div>
            <div className="flex flex-1 items-center gap-3 max-w-2xl">
              {data.peakHours.map((slot, index) => {
                const isPeak = index >= 3;
                const height = isPeak ? 'h-8' : 'h-4';
                return (
                  <div key={slot} className="flex-1">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={cn(
                          'w-full rounded-full transition-all duration-300',
                          height,
                          isPeak
                            ? 'bg-gradient-to-t from-primary-500 to-accent-400 shadow-lg'
                            : 'bg-neutral-200'
                        )}
                      />
                      <p className={cn(
                        'text-xs font-medium text-center',
                        isPeak ? 'text-primary-600 font-bold' : 'text-neutral-500'
                      )}>{slot}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={fetchLatestData}
            disabled={isLoading}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⟳</span>
                Syncing...
              </>
            ) : (
              <>
                <span>↻</span>
                Refresh Data
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
}
