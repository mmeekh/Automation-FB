'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useUIStore } from '@/lib/store/uiStore';
import type { AnalyticsOverview } from '@/lib/types/analytics';
import { RealtimeHighlights } from '@/components/analytics/RealtimeHighlights';

export function AnalyticsPanel() {
  const { isAnalyticsPanelOpen, closeAnalyticsPanel } = useUIStore();
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analytics', { cache: 'no-store' });
      if (!res.ok) throw new Error('Status ' + res.status);
      const json = (await res.json()) as AnalyticsOverview;
      setData(json);
    } catch (e) {
      setError('Analytics verisi yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAnalyticsPanelOpen) {
      fetchAnalytics();
    }
  }, [isAnalyticsPanelOpen]);

  // Metrics grid kaldırıldı

  if (!isAnalyticsPanelOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={closeAnalyticsPanel}
        aria-hidden="true"
      />

      <aside
        className={clsx(
          'fixed top-0 right-0 z-50 h-full w-full max-w-[520px] transform bg-white shadow-2xl transition-transform duration-300',
          isAnalyticsPanelOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="analytics-panel-title"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between border-b border-neutral-200 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                Analytics
              </p>
              <h2 id="analytics-panel-title" className="mt-1 text-xl font-bold text-neutral-900">
                Akış Performansı
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Builder içinden çıkmadan metrikleri inceleyin ve güncelleyin.
              </p>
            </div>

            <button
              onClick={closeAnalyticsPanel}
              className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close analytics panel"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {loading && (
              <div className="space-y-3">
                <div className="h-24 rounded-2xl bg-neutral-100 animate-pulse" />
                <div className="h-24 rounded-2xl bg-neutral-100 animate-pulse" />
                <div className="h-24 rounded-2xl bg-neutral-100 animate-pulse" />
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50/80 px-3 py-3 text-sm text-rose-600">
                {error}
              </div>
            )}

            {/* Metrics grid kaldırıldı */}

            {!loading && !error && (
              <RealtimeHighlights />
            )}

            <div className="flex justify-end">
              <button
                onClick={fetchAnalytics}
                className="text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                Yenile
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function clean(v?: string) {
  return typeof v === 'string' ? v.replace(/\uFFFD/g, '').trim() : undefined;
}

function formatMetric(v: number | string) {
  if (typeof v === 'number') return new Intl.NumberFormat('tr-TR').format(v);
  return clean(v) || '-';
}
