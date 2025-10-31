'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button, Header } from '@/components';
import { FlipWords } from '@/components/ui/FlipWords';
import { useStore } from '@/lib/store';
import {
  RocketLaunchIcon,
  PlayIcon,
  SparklesIcon as SparklesSolidIcon,
  BoltIcon,
  FaceSmileIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';

const featureCards = [
  {
    title: 'Launch proven flows',
    description: 'Pick from Instagram DM funnels for lead capture, appointment booking, and AI-powered concierge experiences.',
    icon: SparklesSolidIcon,
    accent: 'from-primary-500 to-accent-500',
  },
  {
    title: 'Automate every response',
    description: 'Trigger AI replies, follow-ups, and media drops automatically—no engineering tickets or Zapier chain needed.',
    icon: BoltIcon,
    accent: 'from-orange-500 to-pink-500',
  },
  {
    title: 'Keep it personal',
    description: 'Layer account-level personalization so every prospect gets human-sounding guidance tailored to their goal.',
    icon: FaceSmileIcon,
    accent: 'from-emerald-500 to-teal-500',
  },
];

const workflowSteps = [
  {
    title: 'Pick a template',
    description: 'Choose an automation playbook crafted for Instagram—from inbound lead capture to post-purchase upsell.',
  },
  {
    title: 'Drag, drop, customize',
    description: 'Edit copy, AI actions, and wait steps visually. Add paths for every intent without touching code.',
  },
  {
    title: 'Launch and iterate',
    description: 'Activate with one click, then monitor replies and conversions from the same workspace.',
  },
];

const automationStats = [
  { value: '120+', label: 'prebuilt automation steps' },
  { value: '45s', label: 'average launch time' },
  { value: '24/7', label: 'always-on follow up' },
];

const automationOutcomes = [
  'Capture every DM lead with tailored flows',
  'Route VIPs to human reps while AI nurtures the rest',
  'Measure replies, bookings, and revenue in real time',
];

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const { user, openAuthModal } = useStore();

  const handleGetStarted = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    router.push('/automations');
  };

  const handleWatchDemo = () => {
    router.push('/automations');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-primary-50/20">
      <Header />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="block text-neutral-900">Automate your social media</span>
            <span className="block text-neutral-900">
              <span className="inline-flex items-baseline justify-center gap-2 flex-wrap sm:flex-nowrap">
                <FlipWords
                  words={['workflows', 'engagement', 'growth', 'automation']}
                  className="font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
                  duration={2000}
                />
                <span className="descender-safe">effortlessly.</span>
              </span>
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 mb-8 sm:mb-10 max-w-3xl mx-auto">
            Choose ready-made flows, connect your account, and launch automations in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
            <Button size="lg" className="hover-glow hover-lift text-lg px-8 py-6" onClick={handleGetStarted}>
              <RocketLaunchIcon className="w-6 h-6" />
              {t('hero.getStarted')}
            </Button>
            <Button variant="secondary" size="lg" className="hover-lift text-lg px-8 py-6" onClick={handleWatchDemo}>
              <PlayIcon className="w-6 h-6" />
              {t('hero.watchDemo')}
            </Button>
          </div>
        </div>

        <main className="space-y-16 sm:space-y-20">
          <section className="grid gap-6 lg:grid-cols-3">
            {featureCards.map(({ title, description, icon: Icon, accent }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] transition-shadow"
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/60 px-4 py-1 text-sm font-semibold text-primary-700">
                <SparklesSolidIcon className="w-4 h-4" />
                Visual Builder, Real Results
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                All your Instagram automations in one canvas
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                Map customer journeys, drop AI responses, and orchestrate follow-up sequences without jumping between tools.
                Every block is designed for Instagram so you can launch campaigns that feel personal and timely.
              </p>
              <ul className="space-y-3 text-sm text-neutral-700">
                {automationOutcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ArrowRightIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-dashed border-primary-200 bg-white/70 p-6 sm:p-8 shadow-inner">
              <h3 className="text-lg font-semibold text-neutral-900 mb-6">Go-live in three guided steps</h3>
              <ol className="space-y-4">
                {workflowSteps.map(({ title, description }, index) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900">{title}</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="rounded-3xl bg-neutral-900 text-white px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="space-y-3 max-w-lg">
              <p className="text-sm uppercase tracking-widest text-white/60">Numbers that compound</p>
              <h3 className="text-2xl font-semibold leading-snug">
                Automations that answer instantly, nurture non-stop, and hand warm leads to sales while you sleep.
              </h3>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {automationStats.map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-3xl font-bold text-white">{value}</span>
                  <span className="text-sm text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-primary-200/60 bg-white/80 px-6 py-10 sm:px-10 sm:py-12 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <h3 className="text-2xl font-semibold text-neutral-900">Bring your automations to life today</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Spin up flows for outreach, lead nurture, and customer support in a single afternoon. LookLab handles the AI,
                  routing, and analytics so you can focus on the conversations that close deals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8" onClick={handleGetStarted}>
                  <RocketLaunchIcon className="w-5 h-5" />
                  {t('hero.getStarted')}
                </Button>
                <Button variant="outline" size="lg" className="px-8" onClick={handleWatchDemo}>
                  See Automations
                </Button>
              </div>
            </div>
          </section>
        </main>
      </section>
    </div>
  );
}

