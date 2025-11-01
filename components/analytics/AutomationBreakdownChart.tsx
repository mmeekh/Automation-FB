'use client';

import { Card, Title, Text, BarChart } from '@tremor/react';

import type { AutomationBreakdownDatum } from './types';

interface AutomationBreakdownChartProps {
  data: AutomationBreakdownDatum[];
  categories: string[];
  valueFormatter: (value: number) => string;
}

export function AutomationBreakdownChart({
  data,
  categories,
  valueFormatter,
}: AutomationBreakdownChartProps) {
  const hasData =
    data.length > 0 &&
    categories.some((category) =>
      data.some((datum) => (datum[category] as number) > 0)
    );

  return (
    <Card className="border border-neutral-200 bg-white shadow-sm">
      <Title>Otomasyon bazlı üretim</Title>
      <Text className="text-xs text-neutral-500">
        Seçili hesapların 30 günlük üretiminin otomasyon bazında dağılımı.
      </Text>

      {!hasData ? (
        <div className="py-8 text-center text-sm text-neutral-500">
          Veriyi görmek için en az bir otomasyon üretimi olan hesap seçin.
        </div>
      ) : (
        <BarChart
          data={data}
          index="otomasyon"
          categories={categories}
          valueFormatter={valueFormatter}
          colors={['emerald', 'indigo', 'cyan', 'amber', 'rose', 'violet']}
          className="mt-4 h-80"
          yAxisWidth={56}
          barCategoryGap="35%"
          showAnimation={false}
          showLegend
          showTooltip={false}
        />
      )}
    </Card>
  );
}

export default AutomationBreakdownChart;
