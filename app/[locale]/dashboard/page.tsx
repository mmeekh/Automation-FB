'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Button,
  Card,
  CardBadge,
  CardHeader,
  CardTitle,
  FloatingFeatureCard,
  Header,
  MetricCard,
  QuickAction,
  AITemplateCard,
} from '@/components';
import { useStore } from '@/lib/store';
import { fetchDashboardData, mockUser } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import {
  RocketLaunchIcon,
  PlayIcon,
  PlusIcon,
  SparklesIcon as SparklesSolidIcon,
  FaceSmileIcon,
  BoltIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { user, accounts, workflows, setUser, setAccounts, setWorkflows, toggleWorkflow } = useStore();

  useEffect(() => {
    setUser(mockUser);
    fetchDashboardData().then(data => {
      setAccounts(data.accounts);
      setWorkflows(data.workflows);
    });
  }, [setUser, setAccounts, setWorkflows]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 gradient-text leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 mb-6 sm:mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Button size="lg" className="hover-glow hover-lift">
                <RocketLaunchIcon className="w-5 h-5" />
                {t('hero.getStarted')}
              </Button>
              <Button variant="secondary" size="lg" className="hover-lift">
                <PlayIcon className="w-5 h-5" />
                {t('hero.watchDemo')}
              </Button>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="relative h-64 sm:h-80 md:h-96 hidden md:block">
            <div className="absolute top-10 left-10 animate-float hover-lift">
              <FloatingFeatureCard icon="🤖" title="Auto-Reply Bot" />
            </div>
            <div className="absolute top-20 right-0 animate-float hover-lift" style={{ animationDelay: '1s' }}>
              <FloatingFeatureCard icon="📅" title="Post Scheduler" />
            </div>
            <div className="absolute bottom-20 left-0 animate-float hover-lift" style={{ animationDelay: '2s' }}>
              <FloatingFeatureCard icon="❤️" title="Like & Follow" />
            </div>
            <div className="absolute bottom-10 right-10 animate-float hover-lift" style={{ animationDelay: '3s' }}>
              <FloatingFeatureCard icon="📊" title="Analytics" />
            </div>
          </div>

          {/* Mobile Feature Icons */}
          <div className="flex md:hidden justify-center gap-4 flex-wrap">
            <div className="bounce-soft">
              <FloatingFeatureCard icon="🤖" title="Auto-Reply Bot" />
            </div>
            <div className="bounce-soft" style={{ animationDelay: '0.3s' }}>
              <FloatingFeatureCard icon="📅" title="Post Scheduler" />
            </div>
            <div className="bounce-soft" style={{ animationDelay: '0.6s' }}>
              <FloatingFeatureCard icon="❤️" title="Like & Follow" />
            </div>
            <div className="bounce-soft" style={{ animationDelay: '0.9s' }}>
              <FloatingFeatureCard icon="📊" title="Analytics" />
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Connected Accounts */}
          <Card className="card-enter hover-lift">
            <CardHeader>
              <CardTitle>{t('accounts.title')}</CardTitle>
              <CardBadge>{accounts.length} {t('accounts.badge')}</CardBadge>
            </CardHeader>
            <div className="space-y-3 sm:space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-neutral-100 shadow-neu-sm hover:shadow-neu-md transition-all hover-lift cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {account.username.charAt(1).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-neutral-800 truncate">{account.username}</div>
                    <div className="text-xs sm:text-sm text-neutral-600">
                      {formatNumber(account.followers)} {t('accounts.followers')} • {account.posts} {t('accounts.posts')}
                    </div>
                  </div>
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-600 flex-shrink-0">
                    {t('accounts.badge')}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Workflows */}
          <Card className="card-enter hover-lift" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>{t('workflows.title')}</CardTitle>
              <CardBadge>{workflows.filter(w => w.status === 'active').length} {t('workflows.badge')}</CardBadge>
            </CardHeader>
            <div className="space-y-3 sm:space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-white to-neutral-100 shadow-neu-sm hover:shadow-neu-md transition-all hover-lift">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="font-semibold text-neutral-800 text-sm sm:text-base">{workflow.name}</div>
                    <span className={`text-xs font-semibold flex items-center gap-1 flex-shrink-0 ${workflow.status === 'active' ? 'text-green-600' : 'text-neutral-400'}`}>
                      <span className={`w-2 h-2 rounded-full bg-current ${workflow.status === 'active' ? 'animate-pulse' : ''}`} />
                      {workflow.status === 'active' ? t('workflows.active') : t('workflows.inactive')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 mb-3 sm:mb-4">{workflow.description}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="sm"
                      variant={workflow.status === 'active' ? 'secondary' : 'primary'}
                      onClick={() => toggleWorkflow(workflow.id)}
                      className="w-full sm:w-auto hover-glow"
                    >
                      {workflow.status === 'active' ? t('workflows.stop') : t('workflows.start')}
                    </Button>
                    <Button size="sm" variant="secondary" className="w-full sm:w-auto">
                      {t('workflows.edit')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Analytics */}
          <Card className="card-enter hover-lift" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle>{t('analytics.title')}</CardTitle>
              <CardBadge>{t('analytics.badge')}</CardBadge>
            </CardHeader>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <MetricCard value="2,847" label={t('analytics.newFollowers')} change="+12.5%" positive />
              <MetricCard value="89.2%" label={t('analytics.engagementRate')} change="+5.3%" positive />
              <MetricCard value="156" label={t('analytics.postsPublished')} change="-2.1%" />
              <MetricCard value="4.2K" label={t('analytics.comments')} change="+18.7%" positive />
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="card-enter hover-lift" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle>{t('quickActions.title')}</CardTitle>
              <CardBadge>{t('quickActions.badge')}</CardBadge>
            </CardHeader>
            <div className="space-y-3">
              <QuickAction icon={<PlusIcon className="w-5 h-5" />} title={t('quickActions.createAutomation')} action={t('quickActions.create')} />
              <QuickAction icon="📄" title={t('quickActions.useTemplate')} action={t('quickActions.browse')} />
              <QuickAction icon="🔗" title={t('quickActions.connectAccount')} action={t('quickActions.connect')} />
            </div>
          </Card>
        </div>

        {/* AI Automation Templates Section */}
        <section className="mt-12 sm:mt-16 lg:mt-20">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold shadow-lg">
              <SparklesSolidIcon className="w-5 h-5" />
              <span>AI Powered</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">
              Ready-to-Use Instagram Automations
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Transform your Instagram engagement with immersive AI-driven templates your team can plug in instantly.
            </p>
          </div>

          {/* Template Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <AITemplateCard
              id="instagram-hair-transformation"
              name="Instagram Hair Transformation Automation"
              description="Automatically replaces user selfies with salon-ready hairstyles using AI. Ideal for hair salons and beauty studios deploying viral DM flows."
              icon={<SparklesSolidIcon className="w-7 h-7" />}
              gradient="bg-gradient-to-br from-rose-400 via-fuchsia-500 to-rose-500"
              accentColor="text-rose-600"
              installs={4827}
              category="Beauty AI"
              thumbnail={(
                <div className="p-5 bg-gradient-to-br from-rose-50 via-white to-white space-y-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-rose-400 font-semibold">
                    <span>DM Workflow / Style Match</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-500 font-semibold normal-case">Live</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 text-xs font-semibold text-white">
                        AI
                      </div>
                      <div className="flex-1 rounded-2xl border border-rose-100 bg-white/95 p-3 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-rose-400">AutoFlow Stylist</p>
                        <p className="mt-1 text-sm text-neutral-600">Upload your selfie and choose a look. We render three hair swaps in 20 seconds.</p>
                      </div>
                    </div>
                    <div className="ml-12 space-y-3">
                      <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-3">
                        <p className="text-xs font-semibold text-rose-500">Suggested style: Soft Fringe</p>
                        <p className="mt-1 text-xs text-neutral-500">Send the before and after carousel straight into the chat.</p>
                        <div className="mt-3 flex gap-2">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-200 to-rose-400 shadow-inner" />
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-200 to-rose-300 shadow-inner" />
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-200 to-rose-300 shadow-inner" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 rounded-2xl border border-rose-100 bg-white/90 p-3 text-[11px] text-neutral-500">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Smart follow-up scheduled
                          </div>
                          <p className="mt-1 text-[10px] uppercase tracking-wide text-rose-300">Voucher DM sends five minutes later</p>
                        </div>
                        <div className="flex w-16 flex-col gap-2 rounded-2xl border border-rose-100 bg-white/70 p-2">
                          <div className="h-10 rounded-lg bg-gradient-to-br from-rose-200/70 to-rose-100" />
                          <div className="h-10 rounded-lg bg-gradient-to-br from-rose-300/70 to-fuchsia-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />

            <AITemplateCard
              id="instagram-nose-refinement"
              name="Instagram Nose Refinement Automation"
              description="AI-powered nose reshaping demo triggered directly from Instagram DMs. Built for aesthetic clinics and cosmetic consultants."
              icon={<FaceSmileIcon className="w-7 h-7" />}
              gradient="bg-gradient-to-br from-teal-400 via-cyan-500 to-teal-500"
              accentColor="text-teal-600"
              installs={3614}
              category="Aesthetic AI"
              thumbnail={(
                <div className="p-5 bg-gradient-to-br from-teal-50 via-white to-white space-y-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-teal-400 font-semibold">
                    <span>DM Trigger / Selfie Received</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-500 font-semibold normal-case">A/B Running</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-xs font-semibold text-white">
                        AI
                      </div>
                      <div className="flex-1 rounded-2xl border border-teal-100 bg-white/95 p-3 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-400">Contour Concierge</p>
                        <p className="mt-1 text-sm text-neutral-600">Hi Leyla! Here is a natural refinement preview with balanced bridge and tip adjustments.</p>
                      </div>
                    </div>
                    <div className="ml-12 space-y-3">
                      <div className="rounded-2xl border border-teal-100 bg-teal-50/80 p-3">
                        <div className="flex items-center justify-between text-xs font-medium text-teal-500">
                          <span>Before and after canvas</span>
                          <span className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] text-neutral-500">0.6s render</span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="h-16 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-300" />
                          <div className="h-16 rounded-xl border border-teal-200 bg-gradient-to-br from-white to-teal-50 shadow-inner" />
                        </div>
                      </div>
                      <div className="flex w-fit items-center gap-2 rounded-full border border-teal-100 bg-white/90 px-3 py-2 text-[11px] text-neutral-500">
                        <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                        Sends clinic call-to-action when reaction includes thumbs-up or higher
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />

            <AITemplateCard
              id="instagram-bald-to-haired"
              name="Instagram Bald-to-Haired Transformation Automation"
              description="Converts bald or thinning hair selfies into realistic full-hair previews. Built for barbers and transplant centers wanting instant DM wow-factor."
              icon={<BoltIcon className="w-7 h-7" />}
              gradient="bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500"
              accentColor="text-amber-600"
              installs={5293}
              category="Hair Restoration"
              thumbnail={(
                <div className="p-5 bg-gradient-to-br from-amber-50 via-white to-white space-y-4">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-amber-500 font-semibold">
                    <span>Story Reply / Hair Density Demo</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-600 font-semibold normal-case">Preview Ready</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-xs font-semibold text-white">
                        AI
                      </div>
                      <div className="flex-1 rounded-2xl border border-amber-100 bg-white/95 p-3 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-500">Regrowth Studio</p>
                        <p className="mt-1 text-sm text-neutral-600">Your reconstructed hairline is live. Swipe through three density levels below.</p>
                      </div>
                    </div>
                    <div className="ml-12 space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-neutral-900/80 via-neutral-800/80 to-neutral-700/80 p-2">
                          <div className="h-20 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-700" />
                          <p className="mt-2 text-[11px] text-amber-100">Natural</p>
                        </div>
                        <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-200 to-amber-100 p-2 shadow-lg">
                          <div className="h-20 rounded-xl bg-gradient-to-br from-amber-200 to-orange-200" />
                          <p className="mt-2 text-[11px] font-semibold text-amber-600">Full Density</p>
                        </div>
                        <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-100 to-orange-100 p-2">
                          <div className="h-20 rounded-xl bg-gradient-to-br from-orange-200 to-rose-200" />
                          <p className="mt-2 text-[11px] text-amber-500">Fade</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl border border-amber-100 bg-white/90 px-4 py-2 text-[11px] text-neutral-500">
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          92% request consult after interactive preview
                        </span>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-600 font-semibold">
                          CTA: Book visit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Browse All Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 shadow-[0_18px_38px_-18px_rgba(124,58,237,0.55)] hover:from-primary-600 hover:via-accent-600 hover:to-primary-700 hover:shadow-[0_20px_44px_-16px_rgba(124,58,237,0.7)]"
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
              <span className="pointer-events-none absolute -inset-x-12 -top-24 h-32 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-70" />
              <span className="relative flex items-center gap-3">
                <ArrowRightIcon className="w-5 h-5" />
                Browse All Templates
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">120+</span>
              </span>
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
}


