'use client';

import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useUIStore } from '@/lib/store/uiStore';

type BuilderAnalyticsWidgetProps = {
  collapsed: boolean;
};

export function BuilderAnalyticsWidget({ collapsed }: BuilderAnalyticsWidgetProps) {
  const open = () => {
    const show = useUIStore.getState().showBuilderAnalytics;
    show();
  };

  return (
    <div className="px-3 pb-4">
      <button
        type="button"
        onClick={open}
        className="relative w-full text-left overflow-hidden rounded-2xl border border-primary-100/60 bg-gradient-to-br from-white to-primary-50/40 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
        title="Analytics detaylarını aç"
      >
        <div className="absolute -top-10 right-4 h-20 w-20 rounded-full bg-primary-200/30 blur-2xl" />
        <div className="p-4">
          <header className="flex items-center gap-3">
            <div className="rounded-xl bg-white/80 p-2">
              <ChartBarIcon className="h-5 w-5 text-primary-600" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Analytics</p>
                <p className="text-sm text-neutral-600">Akış performansını görün</p>
              </div>
            )}
          </header>
          {!collapsed && (
            <p className="mt-4 text-xs text-neutral-500">Detayları görmek için tıklayın</p>
          )}
        </div>
      </button>
    </div>
  );
}

