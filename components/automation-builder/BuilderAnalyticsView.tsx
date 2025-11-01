'use client';

import ProductionInsights from '@/components/analytics/ProductionInsights';

export function BuilderAnalyticsView() {
  return (
    <div className="h-full overflow-y-auto bg-neutral-50 px-6 py-6">
      <ProductionInsights />
    </div>
  );
}
