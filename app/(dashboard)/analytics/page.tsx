import ProductionInsights from '@/components/analytics/ProductionInsights';

export default function AnalyticsPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <ProductionInsights />
    </main>
  );
}
