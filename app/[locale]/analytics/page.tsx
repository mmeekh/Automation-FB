import { getTranslations } from 'next-intl/server';
import {
  ChartBarIcon,
  CursorArrowRaysIcon,
  GlobeAltIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { Header, Card, CardHeader, CardTitle, CardBadge } from '@/components';
import { fetchAnalyticsOverview } from '@/lib/api';
import { formatNumber, formatPercentage } from '@/lib/utils';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default async function AnalyticsPage() {
  const t = await getTranslations('analyticsPage');
  const { metrics, trend, audience, topPosts } = await fetchAnalyticsOverview();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="grid lg:grid-cols-[1.2fr,1fr] gap-10">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 text-white border-none shadow-neu-lg">
            <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <CardHeader className="flex flex-col items-start gap-6">
              <CardBadge className="bg-white text-primary-600 uppercase tracking-wide text-xs font-bold">
                {t('hero.badge')}
              </CardBadge>
              <CardTitle className="text-4xl text-white leading-tight">
                {t('hero.title')}
              </CardTitle>
              <p className="text-white/80 max-w-xl text-lg">
                {t('hero.subtitle')}
              </p>
            </CardHeader>
            <div className="grid md:grid-cols-2 gap-6 px-8 pb-8">
              <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
                <p className="text-sm text-white/70">{t('hero.atAGlance.reach')}</p>
                <p className="text-3xl font-semibold mt-2">{formatNumber(metrics.reach)}</p>
                <p className="text-xs text-emerald-200 mt-2">
                  +{metrics.change.reach.toFixed(1)}% {t('hero.atAGlance.vsLastWeek')}
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
                <p className="text-sm text-white/70">{t('hero.atAGlance.revenue')}</p>
                <p className="text-3xl font-semibold mt-2">{currencyFormatter.format(metrics.revenue)}</p>
                <p className="text-xs text-emerald-200 mt-2">
                  +{metrics.change.revenue.toFixed(1)}% {t('hero.atAGlance.vsLastWeek')}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('spotlight.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('spotlight.subtitle')}</p>
              </div>
              <CardBadge>{t('spotlight.badge')}</CardBadge>
            </CardHeader>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4">
                <div className="flex items-center gap-3">
                  <SparklesIcon className="w-8 h-8 text-primary-500" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-400">{t('spotlight.metrics.engagement')}</p>
                    <p className="text-xl font-semibold text-neutral-800 mt-1">{metrics.engagement.toFixed(1)}%</p>
                    <p className="text-xs text-emerald-500 mt-1">
                      +{metrics.change.engagement.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4">
                <div className="flex items-center gap-3">
                  <CursorArrowRaysIcon className="w-8 h-8 text-primary-500" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-400">{t('spotlight.metrics.conversions')}</p>
                    <p className="text-xl font-semibold text-neutral-800 mt-1">{formatNumber(metrics.conversions)}</p>
                    <p className="text-xs text-emerald-500 mt-1">
                      +{metrics.change.conversions.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-neutral-100 p-4">
              <p className="text-xs uppercase tracking-wide text-neutral-400">{t('spotlight.bestPerformer.title')}</p>
              <p className="text-lg font-semibold text-neutral-800 mt-1">{t('spotlight.bestPerformer.caption')}</p>
              <p className="text-sm text-neutral-500 mt-2">
                {t('spotlight.bestPerformer.description')}
              </p>
            </div>
          </Card>
        </section>

        <section className="grid lg:grid-cols-[1.4fr,1fr] gap-10">
          <Card>
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('trend.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('trend.subtitle')}</p>
              </div>
              <CardBadge>{t('trend.badge')}</CardBadge>
            </CardHeader>
            <div className="grid gap-4">
              <div className="grid grid-cols-[1fr,max-content] gap-4 items-end">
                <div className="flex items-end gap-4">
                  {trend.map((point) => (
                    <div key={point.label} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-primary-500 to-primary-300"
                        style={{ height: `${Math.max(point.followers / 40, 20)}px` }}
                      />
                      <span className="text-xs text-neutral-400 mt-2">{point.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 text-right text-sm text-neutral-500">
                  <span>{t('trend.legend.followers')}</span>
                  <span>{t('trend.legend.engagement')}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-neutral-500 px-1">
                {trend.map((point) => (
                  <div key={point.label} className="flex flex-col items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
                      <ChartBarIcon className="w-4 h-4 text-primary-500" />
                      {formatNumber(point.followers)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-accent-500">
                      <SparklesIcon className="w-4 h-4" />
                      {formatPercentage(point.engagement)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('audience.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('audience.subtitle')}</p>
              </div>
              <CardBadge>{t('audience.badge')}</CardBadge>
            </CardHeader>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-400">{t('audience.locations')}</p>
                <ul className="space-y-2 mt-2">
                  {audience.locations.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <div className="h-2 w-16 rounded-full bg-primary-100">
                        <div
                          className="h-full rounded-full bg-primary-500"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-sm text-neutral-500 flex-1">{item.label}</span>
                      <span className="text-sm font-semibold text-neutral-800">{item.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-400">{t('audience.age')}</p>
                <ul className="space-y-2 mt-2">
                  {audience.ageGroups.map((item) => (
                    <li key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500">{item.label}</span>
                      <span className="font-semibold text-neutral-800">{item.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-400">{t('audience.activity')}</p>
                <ul className="space-y-2 mt-2">
                  {audience.activeHours.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full bg-accent-500"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-neutral-600 w-16 text-right">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('topPosts.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('topPosts.subtitle')}</p>
              </div>
              <CardBadge>{t('topPosts.badge')}</CardBadge>
            </CardHeader>
            <div className="grid md:grid-cols-3 gap-6">
              {topPosts.map((post) => (
                <div key={post.id} className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                    {post.type}
                  </span>
                  <h3 className="text-lg font-semibold text-neutral-900 mt-2">{post.title}</h3>
                  <div className="mt-4 space-y-2 text-sm text-neutral-500">
                    <p className="flex items-center justify-between">
                      <span>{t('topPosts.metrics.reach')}</span>
                      <span className="font-semibold text-neutral-800">{formatNumber(post.reach)}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>{t('topPosts.metrics.saves')}</span>
                      <span className="font-semibold text-neutral-800">{formatNumber(post.saves)}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>{t('topPosts.metrics.engagement')}</span>
                      <span className="font-semibold text-neutral-800">{post.engagementRate.toFixed(1)}%</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
