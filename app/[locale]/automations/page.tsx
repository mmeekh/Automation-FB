import { getTranslations } from 'next-intl/server';
import { ArrowUpRightIcon, BoltIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import { Header, Button, Card, CardHeader, CardTitle, CardBadge } from '@/components';
import { fetchAutomationsOverview } from '@/lib/api';
import { formatNumber } from '@/lib/utils';

export default async function AutomationsPage() {
  const t = await getTranslations('automationsPage');
  const { summary, automations, activity, recommendations } = await fetchAutomationsOverview();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="grid lg:grid-cols-[1.6fr,1fr] gap-10 items-start">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-neu-lg p-10 relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-br from-primary-500/10 via-accent-400/10 to-primary-600/10 blur-3xl pointer-events-none" />
            <h1 className="text-4xl font-bold leading-tight text-neutral-900 mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                <BoltIcon className="w-5 h-5" />
                {t('hero.primaryCta')}
              </Button>
              <Button variant="secondary" size="lg">
                <PlayIcon className="w-5 h-5" />
                {t('hero.secondaryCta')}
              </Button>
            </div>
            <div className="mt-10 grid sm:grid-cols-3 gap-5">
              <div className="rounded-2xl bg-white/80 border border-white/60 shadow-neu-sm p-4">
                <p className="text-sm text-neutral-500">{t('hero.metrics.throughput')}</p>
                <p className="text-2xl font-semibold text-neutral-900 mt-2">2.4M</p>
                <p className="text-xs text-neutral-500 mt-1">{t('hero.metrics.throughputHelp')}</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-white/60 shadow-neu-sm p-4">
                <p className="text-sm text-neutral-500">{t('hero.metrics.satisfaction')}</p>
                <p className="text-2xl font-semibold text-neutral-900 mt-2">94%</p>
                <p className="text-xs text-neutral-500 mt-1">{t('hero.metrics.satisfactionHelp')}</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-white/60 shadow-neu-sm p-4">
                <p className="text-sm text-neutral-500">{t('hero.metrics.guardrails')}</p>
                <p className="text-2xl font-semibold text-neutral-900 mt-2">12</p>
                <p className="text-xs text-neutral-500 mt-1">{t('hero.metrics.guardrailsHelp')}</p>
              </div>
            </div>
          </div>

          <Card className="h-full">
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('assistant.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('assistant.subtitle')}</p>
              </div>
              <CardBadge className="bg-gradient-to-r from-accent-500 to-primary-500">
                {t('assistant.badge')}
              </CardBadge>
            </CardHeader>
            <ul className="space-y-4">
              {activity.slice(0, 3).map((item) => (
                <li key={item.id} className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary-500 uppercase tracking-wide">{item.time}</span>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        item.type === 'warning'
                          ? 'bg-red-50 text-red-600'
                          : item.type === 'success'
                          ? 'bg-emerald-50 text-emerald-600'
                          : item.type === 'ai'
                          ? 'bg-accent-50 text-accent-600'
                          : 'bg-primary-50 text-primary-600'
                      }`}
                    >
                      {t(`assistant.activity.${item.type}`)}
                    </span>
                  </div>
                  <p className="font-semibold text-neutral-800">{item.title}</p>
                  <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="w-full mt-4">
              {t('assistant.cta')}
            </Button>
          </Card>
        </section>

        <section className="grid md:grid-cols-4 gap-6">
          {summary.map((metric) => (
            <Card key={metric.key} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-primary-50 opacity-80" />
              <div className="relative">
                <p className="text-sm text-neutral-500">{t(`summary.${metric.key}.label`)}</p>
                <p className="text-3xl font-semibold text-neutral-900 mt-3">
                  {typeof metric.value === 'number' && metric.key !== 'avgResponseTime'
                    ? formatNumber(metric.value)
                    : metric.value}
                </p>
                <div
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  <ArrowUpRightIcon
                    className={`w-4 h-4 ${metric.trend === 'up' ? '' : 'rotate-90'}`}
                  />
                  <span>{Math.abs(metric.change).toFixed(1)}%</span>
                  <span className="text-xs text-neutral-500 ml-2">{t('summary.vsLastWeek')}</span>
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section className="grid lg:grid-cols-[2fr,1fr] gap-10">
          <div className="space-y-6">
            {automations.map((automation) => (
              <Card key={automation.id} className="border border-white/50 shadow-neu-md">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <CardBadge className="bg-gradient-to-r from-primary-500 to-accent-500">
                        {automation.status === 'running' ? t('list.running') : t('list.paused')}
                      </CardBadge>
                      <span className="text-xs text-neutral-400">{automation.lastRun}</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-neutral-900 mt-3">{automation.name}</h2>
                    <p className="text-neutral-600 mt-2">{automation.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {automation.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-primary-50 text-primary-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <Button size="sm">
                      <BoltIcon className="w-4 h-4" />
                      {t('list.optimize')}
                    </Button>
                    <Button size="sm" variant="secondary">
                      {automation.status === 'running' ? (
                        <>
                          <PauseIcon className="w-4 h-4" />
                          {t('list.pause')}
                        </>
                      ) : (
                        <>
                          <PlayIcon className="w-4 h-4" />
                          {t('list.resume')}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-400">{t('list.metrics.conversion')}</p>
                    <p className="text-lg font-semibold text-neutral-900 mt-1">{automation.conversionRate.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-400">{t('list.metrics.steps')}</p>
                    <p className="text-lg font-semibold text-neutral-900 mt-1">{automation.tasks}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-400">{t('list.metrics.sent')}</p>
                    <p className="text-lg font-semibold text-neutral-900 mt-1">
                      {formatNumber(automation.performance.sent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-400">{t('list.metrics.completed')}</p>
                    <p className="text-lg font-semibold text-neutral-900 mt-1">
                      {formatNumber(automation.performance.completed)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="h-full">
            <CardHeader>
              <div>
                <CardTitle>{t('activity.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('activity.subtitle')}</p>
              </div>
            </CardHeader>
            <div className="relative ml-3 mt-4">
              <div className="absolute top-0 bottom-0 left-3 w-px bg-gradient-to-b from-primary-200 via-neutral-200 to-transparent" />
              <ul className="space-y-6">
                {activity.map((item) => (
                  <li key={item.id} className="relative pl-10">
                    <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-primary-300 flex items-center justify-center shadow-neu-sm">
                      <span className="w-2 h-2 rounded-full bg-primary-500" />
                    </span>
                    <p className="text-xs text-neutral-400 uppercase tracking-wide">{item.time}</p>
                    <p className="font-semibold text-neutral-800 mt-1">{item.title}</p>
                    <p className="text-sm text-neutral-500">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </section>

        <section>
          <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-100 border border-neutral-700">
            <CardHeader className="flex-col items-start gap-4">
              <CardBadge className="bg-white text-neutral-900">
                {t('recommendations.badge')}
              </CardBadge>
              <CardTitle className="text-neutral-50 text-3xl">{t('recommendations.title')}</CardTitle>
              <p className="text-neutral-300 max-w-2xl">{t('recommendations.subtitle')}</p>
            </CardHeader>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map((playbook) => (
                <div key={playbook.id} className="rounded-2xl bg-white/10 p-6 border border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{playbook.name}</h3>
                      <p className="text-sm text-neutral-300 mt-2">{playbook.description}</p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent-300">
                      {t(`recommendations.complexity.${playbook.complexity}`)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {playbook.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-white/15 text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-neutral-300">
                      {t('recommendations.impact', { value: playbook.estimatedLift })}
                    </p>
                    <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                      {t('recommendations.cta')}
                    </Button>
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
