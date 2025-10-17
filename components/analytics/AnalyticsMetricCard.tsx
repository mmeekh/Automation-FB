import { cn } from '@/lib/utils';
import { TrendingUp, LucideIcon } from 'lucide-react';
import { Card } from '@/components';

const gradientAccent = 'bg-gradient-to-r from-[#e9d5ff] via-[#f3d9ff] to-[#fce7f3]';

type AnalyticsMetricCardProps = {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  accent?: string;
  description?: string;
};

export function AnalyticsMetricCard({
  title,
  value,
  change,
  icon: Icon,
  accent,
  description
}: AnalyticsMetricCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
        'border border-white/60 bg-white/90 backdrop-blur-lg'
      )}
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-white to-transparent opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-200/40 to-transparent" />
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {title}
          </span>
          <span
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-2xl text-primary-600 shadow-md',
              accent ?? gradientAccent
            )}
          >
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <div className="mt-6 text-2xl font-semibold text-neutral-900">{value}</div>
        {change && (
          <div className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            {change}
          </div>
        )}
        {description && (
          <p className="mt-3 text-xs text-neutral-500">{description}</p>
        )}
      </div>
    </Card>
  );
}
