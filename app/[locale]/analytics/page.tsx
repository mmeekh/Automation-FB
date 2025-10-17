import { Header } from '@/components';
import {
  AnalyticsMetricCard,
  RevenueInsights,
  UserBehaviorChart,
  SocialImpactSection,
  RealtimeHighlights,
} from '@/components/analytics';
import { Scissors, Sparkles, TrendingUp, Users } from 'lucide-react';

const aiMetrics = [
  {
    title: 'Total AI Transformations',
    value: '4,823 this week',
    change: '+14.2%',
    icon: Sparkles,
  },
  {
    title: 'Conversion Rate to Booking',
    value: '4.7%',
    change: '+1.2%',
    icon: TrendingUp,
  },
  {
    title: 'Active Users',
    value: '1.2K daily',
    change: '+8.5%',
    icon: Users,
  },
  {
    title: 'Most Requested Style',
    value: 'Long Blonde Bob 💇‍♀️',
    icon: Scissors,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf5ff] via-[#fdf2f8] to-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 space-y-12">
        <header className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold text-primary-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Live analytics synced every 60 seconds
          </span>
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Automation Analytics
          </h1>
          <p className="max-w-2xl text-sm text-neutral-500 sm:text-base">
            Track AI-led transformations, revenue impact, and engagement patterns across every Instagram automation flow.
          </p>
        </header>

        <section>
          <div className="grid gap-5 sm:grid-cols-2">
            {aiMetrics.map((metric) => (
              <AnalyticsMetricCard key={metric.title} {...metric} />
            ))}
          </div>
        </section>

        <section>
          <RevenueInsights />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
          <UserBehaviorChart />
          <RealtimeHighlights />
        </section>

        <section>
          <SocialImpactSection />
        </section>
      </main>
    </div>
  );
}
