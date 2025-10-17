import { Card, CardBadge, CardHeader, CardTitle, Button, PlaceholderChart } from '@/components';
import { cn } from '@/lib/utils';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Clock3,
  Download,
  PieChart,
  RefreshCcw,
  Scissors,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';

const gradientAccent = 'bg-gradient-to-r from-[#e9d5ff] via-[#f3d9ff] to-[#fce7f3]';

type Metric = {
  title: string;
  value: string;
  change?: string;
  icon: React.ElementType;
  accent?: string;
  description?: string;
};

const aiMetrics: Metric[] = [
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

const ctaDistribution = [
  { label: 'Try Again ✨', value: 45, color: 'from-pink-400 to-rose-500' },
  { label: 'Plan New Style 📅', value: 32, color: 'from-teal-400 to-cyan-500' },
  { label: 'Book Appointment 💬', value: 23, color: 'from-amber-400 to-orange-500' },
];

const quickStats: Metric[] = [
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

const socialPosts = [
  {
    id: 'post-1',
    title: 'Transformation Reveal',
    type: 'Reel',
    reach: '128K',
    saves: '3.2K',
    engagement: '9.6%',
    growth: '+28%',
    thumbnailColor: 'bg-gradient-to-br from-[#f5d0fe] to-[#fce7f3]',
  },
  {
    id: 'post-2',
    title: 'Book with AI Stylist',
    type: 'Carousel',
    reach: '86K',
    saves: '2.1K',
    engagement: '7.4%',
    growth: '+18%',
    thumbnailColor: 'bg-gradient-to-br from-[#bae6fd] to-[#e0f2fe]',
  },
  {
    id: 'post-3',
    title: 'Live Consultation Recap',
    type: 'Live',
    reach: '74K',
    saves: '—',
    engagement: '11.1%',
    growth: '+35%',
    thumbnailColor: 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a]',
  },
];

function AnalyticsMetricCard({ title, value, change, icon: Icon, accent }: Metric) {
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
      </div>
    </Card>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf5ff] via-[#fdf2f8] to-white">
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
          <Card className="overflow-hidden border border-white/70 bg-white/95 backdrop-blur-md shadow-lg">
            <CardHeader className="items-start pb-4">
              <div className="space-y-1">
                <CardTitle>Revenue &amp; Appointment Insights</CardTitle>
                <p className="text-sm text-neutral-500">
                  Compare automation workload with direct revenue estimates and peak conversion windows.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <CardBadge className="bg-white text-primary-600 shadow-sm">Realtime Sync</CardBadge>
                <CardBadge className="bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 text-emerald-600">
                  Growth +22%
                </CardBadge>
              </div>
            </CardHeader>

            <div className="px-6 pb-6">
              <PlaceholderChart height="h-64" />
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-dashed border-primary-200/60 bg-primary-50/40 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Clock3 className="h-4 w-4 text-primary-500" />
                  Peak Hours
                </div>
                <div className="flex flex-1 items-center gap-4">
                  {['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map((slot, index) => (
                    <div key={slot} className="flex-1">
                      <div
                        className={cn(
                          'h-2 rounded-full bg-neutral-200',
                          index >= 3 ? 'bg-gradient-to-r from-primary-400 to-accent-400' : ''
                        )}
                      />
                      <p className="mt-2 text-xs font-medium text-neutral-500 text-center">{slot}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
          <Card className="border border-white/70 bg-white">
            <CardHeader className="items-start pb-0">
              <div>
                <CardTitle>User Behavior &amp; CTA Engagement</CardTitle>
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

          <Card className="border border-white/70 bg-white">
            <CardHeader className="items-start pb-4">
              <div>
                <CardTitle>Realtime Impact Highlights</CardTitle>
                <p className="mt-1 text-sm text-neutral-500">
                  AI flows responding to spikes in trending content.
                </p>
              </div>
              <CardBadge className="bg-gradient-to-r from-indigo-400/20 to-purple-400/20 text-primary-600">
                Auto-curated
              </CardBadge>
            </CardHeader>
            <div className="space-y-4 px-6 pb-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-dashed border-primary-200 bg-primary-50/30 p-4 text-sm text-neutral-600"
                >
                  <strong className="font-semibold text-primary-600">
                    #{item} — Stylistic Upsell
                  </strong>{' '}
                  AutoFlow sent 214 dynamic product carousels in the past hour for high-intent users.
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section>
          <Card className="border border-white/70 bg-white">
            <CardHeader className="items-start pb-2">
              <div className="space-y-1">
                <CardTitle>Social Content Impact</CardTitle>
                <p className="text-sm text-neutral-500">
                  Performance of AI-assisted Instagram content over the past week.
                </p>
              </div>
            </CardHeader>

            <div className="grid gap-5 px-6 pb-6 md:grid-cols-3">
              {socialPosts.map((post) => (
                <div
                  key={post.id}
                  className="group rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={cn(
                      'relative mb-4 aspect-video w-full overflow-hidden rounded-xl border border-white/80',
                      post.thumbnailColor
                    )}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
                      <PieChart className="h-12 w-12" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-neutral-400">
                    <span>{post.type}</span>
                    <span className="font-semibold text-primary-500">{post.growth}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-neutral-800">{post.title}</h3>
                  <dl className="mt-4 space-y-2 text-sm text-neutral-600">
                    <div className="flex items-center justify-between">
                      <dt className="text-neutral-500">Reach</dt>
                      <dd className="font-medium text-neutral-800">{post.reach}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-neutral-500">Saves</dt>
                      <dd className="font-medium text-neutral-800">{post.saves}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-neutral-500">Engagement</dt>
                      <dd className="font-medium text-neutral-800">{post.engagement}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-neutral-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-neutral-500">
                Export a shareable snapshot or compare growth week-over-week.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" className="hover-lift">
                  <Download className="h-4 w-4" />
                  Export Report (PDF)
                </Button>
                <Button className="hover-lift">
                  <RefreshCcw className="h-4 w-4" />
                  Compare Weeks
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
