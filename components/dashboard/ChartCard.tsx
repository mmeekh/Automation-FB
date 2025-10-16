'use client';

import { Card, CardHeader, CardTitle, CardBadge } from '@/components';

interface ChartCardProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function ChartCard({ title, badge, children, action }: ChartCardProps) {
  return (
    <Card className="hover-lift">
      <CardHeader className="items-start">
        <div className="flex-1">
          <CardTitle>{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {badge && <CardBadge>{badge}</CardBadge>}
          {action}
        </div>
      </CardHeader>
      <div className="mt-6">
        {children}
      </div>
    </Card>
  );
}

// Placeholder Chart Component
export function PlaceholderChart({ type = 'area', height = 'h-64', gradient = 'from-primary-500 to-accent-500' }: { type?: 'area' | 'bar' | 'pie' | 'line'; height?: string; gradient?: string }) {
  if (type === 'pie') {
    return (
      <div className={`${height} flex items-center justify-center`}>
        <div className="relative w-48 h-48">
          {/* Pie segments */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 opacity-80" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 40%)' }} />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 opacity-80" style={{ clipPath: 'polygon(50% 50%, 100% 40%, 100% 100%, 80% 100%)' }} />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-80" style={{ clipPath: 'polygon(50% 50%, 80% 100%, 0% 100%, 0% 0%, 50% 0%)' }} />
          {/* Center */}
          <div className="absolute inset-8 rounded-full glass flex items-center justify-center">
            <span className="text-sm font-semibold text-neutral-600">100%</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'bar') {
    return (
      <div className={`${height} flex items-end justify-between gap-2 px-4`}>
        {[65, 45, 80, 55, 70, 85, 60, 75].map((height, i) => (
          <div key={i} className="flex-1 relative group">
            <div
              className={`w-full bg-gradient-to-t ${gradient} rounded-t-lg transition-all duration-300 group-hover:opacity-80`}
              style={{ height: `${height}%` }}
            />
            <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-neutral-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'][i]}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Area/Line chart
  return (
    <div className={`${height} relative bg-gradient-to-br from-neutral-50 to-white rounded-xl p-4`}>
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-rows-4 opacity-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-b border-neutral-300" />
        ))}
      </div>

      {/* Chart area */}
      <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="text-primary-500" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" className="text-accent-500" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Area */}
        <path
          d="M 0 150 L 50 120 L 100 140 L 150 100 L 200 90 L 250 110 L 300 80 L 350 70 L 400 85 L 400 200 L 0 200 Z"
          fill={`url(#gradient-${type})`}
          className="transition-all duration-500"
        />

        {/* Line */}
        <path
          d="M 0 150 L 50 120 L 100 140 L 150 100 L 200 90 L 250 110 L 300 80 L 350 70 L 400 85"
          fill="none"
          stroke="url(#gradient-line)"
          strokeWidth="3"
          className="transition-all duration-500"
        />

        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="text-primary-500" stopColor="currentColor" />
            <stop offset="100%" className="text-accent-500" stopColor="currentColor" />
          </linearGradient>
        </defs>

        {/* Data points */}
        {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x, i) => {
          const y = [150, 120, 140, 100, 90, 110, 80, 70, 85][i];
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              className="fill-white stroke-primary-500 stroke-2 hover:r-6 transition-all cursor-pointer"
            />
          );
        })}
      </svg>
    </div>
  );
}
