'use client';

import { useEffect, useState } from 'react';
import type { AnalyticsOverview } from '@/lib/types/analytics';
import { Card, CardHeader, CardTitle, CardBadge } from '@/components';
import { AnalyticsMetricCard } from '@/components/analytics/AnalyticsMetricCard';
import { RealtimeHighlights } from '@/components/analytics/RealtimeHighlights';
import { TrendingUp, Users, Percent } from 'lucide-react';

export function BuilderAnalyticsView() {
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/analytics', { cache: 'no-store' });
        if (!res.ok) throw new Error('status ' + res.status);
        const json = (await res.json()) as AnalyticsOverview;
        if (mounted) setData(json);
      } catch {
        if (mounted) setData(getFallbackAnalytics());
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const metrics = data?.metrics;

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
        <p className="text-sm text-neutral-600">Flow performans metrikleri</p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-28 rounded-2xl bg-neutral-100 animate-pulse" />
          <div className="h-28 rounded-2xl bg-neutral-100 animate-pulse" />
          <div className="h-28 rounded-2xl bg-neutral-100 animate-pulse" />
        </div>
      ) : (
        <>
          {metrics && (
            <div className="grid gap-4 md:grid-cols-3">
              <AnalyticsMetricCard title="Transformasyon" value={fmt(metrics.totalTransformations)} change={metrics.changeTransformations} icon={TrendingUp} />
              <AnalyticsMetricCard title="Dönüşüm" value={fmt(metrics.conversionRate)} change={metrics.changeConversion} icon={Percent} />
              <AnalyticsMetricCard title="Aktif Kullanıcı" value={fmt(metrics.activeUsers)} change={metrics.changeUsers} icon={Users} />
            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <RealtimeHighlights />
            <Card className="border border-white/70 bg-white">
              <CardHeader className="items-start pb-4">
                <div>
                  <CardTitle>Özet</CardTitle>
                  <p className="mt-1 text-sm text-neutral-500">Son 7 gün performans özeti.</p>
                </div>
                <CardBadge className="bg-gradient-to-r from-indigo-400/20 to-purple-400/20 text-primary-600">Mock</CardBadge>
              </CardHeader>
              <div className="px-6 pb-6 text-sm text-neutral-600">
                {data?.metrics?.mostRequestedStyle ? (
                  <p>En popüler stil: <span className="font-semibold text-primary-600">{data.metrics.mostRequestedStyle}</span></p>
                ) : (
                  <p>Veri yüklenemedi.</p>
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

function fmt(v: number | string) {
  return typeof v === 'number' ? new Intl.NumberFormat('tr-TR').format(v) : v;
}

function getFallbackAnalytics(): AnalyticsOverview {
  return {
    metrics: {
      totalTransformations: 5200,
      conversionRate: '5.1%',
      activeUsers: 1280,
      mostRequestedStyle: 'Long Blonde Bob',
      changeTransformations: '+12.4%',
      changeConversion: '+0.8%',
      changeUsers: '+6.3%',
    },
    revenue: {
      totalRevenue: '18000 TRY',
      appointmentCount: 132,
      averageBookingValue: '102.50 TRY',
      conversionRate: '4.8%',
      peakHours: ['18:00', '19:00', '20:00'],
      growthRate: '+18%',
      revenueHistory: [
        { date: '2025-10-23', revenue: 12000, appointments: 110 },
        { date: '2025-10-24', revenue: 14000, appointments: 124 },
      ],
    },
    userBehavior: {
      ctaDistribution: [
        { label: 'Try Again', value: 45, color: 'from-pink-400 to-rose-500' },
        { label: 'Plan New Style', value: 32, color: 'from-teal-400 to-cyan-500' },
        { label: 'Book Appointment', value: 23, color: 'from-amber-400 to-orange-500' },
      ],
      quickStats: [
        { title: 'Avg Response Time', value: '18s', description: 'AI replies across flows' },
        { title: 'Returning Users', value: '36%', description: 'Users completing flows' },
        { title: 'Avg Selfies per User', value: '2.6', description: 'Inputs collected per journey' },
      ],
    },
    socialContent: [],
  };
}

