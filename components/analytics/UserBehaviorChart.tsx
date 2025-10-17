'use client';

import { Card, CardHeader, CardTitle, PlaceholderChart } from '@/components';
import { cn } from '@/lib/utils';
import { Activity, BarChart3, Clock3 } from 'lucide-react';

const gradientAccent = 'bg-gradient-to-r from-[#e9d5ff] via-[#f3d9ff] to-[#fce7f3]';

const ctaDistribution = [
  { label: 'Try Again ✨', value: 45, color: 'from-pink-400 to-rose-500' },
  { label: 'Plan New Style 📅', value: 32, color: 'from-teal-400 to-cyan-500' },
  { label: 'Book Appointment 💬', value: 23, color: 'from-amber-400 to-orange-500' },
];

const quickStats = [
  {
    title: 'Avg Response Time',
    value: '12s',
    description: 'AI replies across flows',
    icon: Clock3,
  },
  {
    title: 'Returning Users',
    value: '36%',
    description: 'Users completing ≥2 flows',
    icon: Activity,
  },
  {
    title: 'Avg Selfies per User',
    value: '2.3',
    description: 'Inputs collected per journey',
    icon: BarChart3,
  },
];

export function UserBehaviorChart() {
  return (
    <Card className="border border-white/70 bg-white">
      <CardHeader className="items-start pb-0">
        <div>
          <CardTitle>User Behavior & CTA Engagement</CardTitle>
          <p className="mt-1 text-sm text-neutral-500">
            Distribution of AI CTA follow-ups across key flows.
          </p>
        </div>
      </CardHeader>
      <div className="flex flex-col gap-6 px-6 pb-6 lg:flex-row">
        <div className="flex-1">
          <div className="rounded-3xl border border-white/80 bg-gradient-to-br from-white via-[#fef7ff] to-[#fdf2f8] p-6 shadow-inner">
            <PlaceholderChart type="pie" height="h-48" />
            <div className="mt-6 space-y-3">
              {ctaDistribution.map((segment) => (
                <div key={segment.label} className="flex items-center gap-3">
                  <span
                    className={cn(
                      'h-3 w-3 rounded-full bg-gradient-to-r',
                      segment.color
                    )}
                  />
                  <div className="flex-1 text-sm text-neutral-600">{segment.label}</div>
                  <span className="text-sm font-semibold text-neutral-700">{segment.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {quickStats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className={cn('rounded-xl p-2 text-primary-600 shadow', gradientAccent)}>
                  <stat.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    {stat.title}
                  </p>
                  <p className="text-lg font-semibold text-neutral-800">{stat.value}</p>
                </div>
              </div>
              {stat.description && (
                <p className="mt-3 text-xs text-neutral-500">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
