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
import { RocketLaunchIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/solid';

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
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold mb-4 shadow-lg">
              <span className="text-lg">✨</span>
              <span>AI Powered</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4">
              Ready-to-Use Instagram Automations
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Transform your Instagram engagement with AI-powered automations. Install in seconds, customize to your needs.
            </p>
          </div>

          {/* Template Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {/* Hair Transformation */}
            <AITemplateCard
              id="hair-transformation"
              name="Hair Transformation Automation"
              description="Automatically replaces user's hair in selfies with chosen hairstyles using AI. Ideal for hair salons and beauty studios."
              icon="💇"
              gradient="bg-gradient-to-br from-pink-400 to-rose-500"
              accentColor="text-pink-600"
              installs={3247}
              category="Beauty & Style"
            />

            {/* Nose Refinement */}
            <AITemplateCard
              id="nose-refinement"
              name="Nose Refinement Automation"
              description="AI-powered nose reshaping demo via DM trigger. Designed for aesthetic clinics and cosmetic consultants."
              icon="👃"
              gradient="bg-gradient-to-br from-teal-400 to-cyan-500"
              accentColor="text-teal-600"
              installs={2156}
              category="Medical Beauty"
            />

            {/* Bald to Hair */}
            <AITemplateCard
              id="bald-to-hair"
              name="Bald-to-Haired Transformation"
              description="Converts bald or thinning hair selfies into realistic full-hair previews. Perfect for barbers and hair transplant centers."
              icon="🧔"
              gradient="bg-gradient-to-br from-amber-400 to-orange-500"
              accentColor="text-amber-600"
              installs={4892}
              category="Hair Restoration"
            />
          </div>

          {/* Browse All Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="hover-glow shadow-2xl bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 hover:from-primary-600 hover:via-accent-600 hover:to-primary-700"
            >
              <span className="text-xl">🚀</span>
              <span>Browse All Templates</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">120+</span>
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
}

