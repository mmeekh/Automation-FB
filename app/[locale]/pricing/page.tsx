'use client';

import { useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { CheckIcon } from '@heroicons/react/24/solid';

type SupportedLocale = 'en';

type PricingTier = {
  id: string;
  name: string;
  price: string;
  period: string;
  limit: string;
  highlight: string;
  features: string[];
  starter?: boolean;
  recommended?: boolean;
  premium?: boolean;
  eclipse?: boolean;
  action: 'choosePlan' | 'contactSales';
};

type PricingCopy = {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  labels: {
    recommended: string;
    enterprise: string;
    choosePlan: string;
    contactSales: string;
  };
  tiers: PricingTier[];
};

const PRICING_COPY: Record<SupportedLocale, PricingCopy> = {
  en: {
    header: {
      badge: 'Pricing',
      title: 'Scale your salon automation with flexible plans',
      subtitle:
        'All plans include DM flows, image requests, and appointment automations. Upgrade or downgrade anytime.'
    },
    labels: {
      recommended: 'Most Popular',
      enterprise: '✨ Enterprise',
      choosePlan: 'Choose Plan',
      contactSales: 'Contact Sales'
    },
    tiers: [
      {
        id: 'starter-100',
        name: 'Starter 100',
        price: '$49',
        period: '/month',
        limit: 'Up to 100 productions',
        highlight: 'Launch with LookLab automations in under an hour',
        features: [
          'DM automation (1 template)',
          '100 AI transformations included',
          'Shared automation credits',
          'Standard support'
        ],
        starter: true,
        action: 'choosePlan'
      },
      {
        id: 'growth-500',
        name: 'Growth 500',
        price: '$179',
        period: '/month',
        limit: 'Up to 500 productions',
        highlight: 'Scale DM conversions with multi-step flows',
        features: [
          'DM automation (3 templates)',
          '500 AI transformations included',
          'Segmented quick replies',
          'Analytics snapshots',
          'Priority email support'
        ],
        recommended: true,
        action: 'choosePlan'
      },
      {
        id: 'studio-1000',
        name: 'Studio 1000',
        price: '$349',
        period: '/month',
        limit: 'Up to 1,000 productions',
        highlight: 'For studios replacing manual consultations',
        features: [
          'DM automation (5+ templates)',
          '1,000 AI transformations included',
          'Custom branding & chat copy',
          'Performance dashboards',
          'CRM & calendar integration',
          'Dedicated success manager'
        ],
        premium: true,
        action: 'choosePlan'
      },
      {
        id: 'contact-sales',
        name: 'Contact Sales',
        price: 'Let’s talk',
        period: '',
        limit: 'Over 1,000 productions',
        highlight: 'Franchises & scale-ups with bespoke workflows',
        features: [
          'Unlimited LookLab automations',
          'Custom AI guardrails & approvals',
          'Advanced analytics warehouse sync',
          'SLA-backed support (24/7)',
          'White-label delivery',
          'Bespoke security reviews'
        ],
        premium: true,
        eclipse: true,
        action: 'contactSales'
      }
    ]
  }
};

export default function PricingPage() {
  const locale = (useLocale() as SupportedLocale) ?? 'en';
  const copy = PRICING_COPY[locale] ?? PRICING_COPY.en;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <header className="space-y-6 text-center">
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
              {copy.header.badge}
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent sm:text-5xl">
                {copy.header.title}
              </h1>
              <p className="mx-auto max-w-2xl text-base text-neutral-600 sm:text-lg">
                {copy.header.subtitle}
              </p>
            </div>
          </header>

          <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {copy.tiers.map((tier) => {
              const isStarter = Boolean(tier.starter);
              const isRecommended = Boolean(tier.recommended);
              const isPremium = Boolean(tier.premium);
              const isEnterprise = Boolean(tier.eclipse);
              const buttonLabel = tier.action === 'contactSales' ? copy.labels.contactSales : copy.labels.choosePlan;

              return (
                <article
                  key={tier.id}
                  className={`relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    isRecommended
                      ? 'border-2 border-primary-500 ring-4 ring-primary-100'
                      : isEnterprise
                      ? 'border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                      : isPremium
                      ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50'
                      : isStarter
                      ? 'border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50'
                      : 'border-2 border-neutral-200'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                        <CheckIcon className="w-3.5 h-3.5" />
                        {copy.labels.recommended}
                      </span>
                    </div>
                  )}

                  {isEnterprise && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                        {copy.labels.enterprise}
                      </span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h2
                        className={`text-2xl font-bold ${
                          isEnterprise
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                            : isPremium
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
                            : isStarter
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'
                            : 'text-neutral-900'
                        }`}
                      >
                        {tier.name}
                      </h2>
                      <p className="text-sm text-neutral-600">{tier.highlight}</p>
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          isEnterprise
                            ? 'bg-purple-100 text-purple-700'
                            : isPremium
                            ? 'bg-blue-100 text-blue-700'
                            : isRecommended
                            ? 'bg-primary-100 text-primary-700'
                            : isStarter
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {tier.limit}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-4xl font-bold ${
                            isEnterprise
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                              : isPremium
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
                              : isStarter
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'
                              : 'text-neutral-900'
                          }`}
                        >
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-sm font-semibold text-neutral-500">{tier.period}</span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 text-sm text-neutral-700">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <CheckIcon
                            className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                              isEnterprise
                                ? 'text-purple-500'
                                : isPremium
                                ? 'text-blue-500'
                                : isRecommended
                                ? 'text-primary-500'
                                : isStarter
                                ? 'text-emerald-500'
                                : 'text-neutral-400'
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      <Button
                        className={`w-full ${
                          isEnterprise
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                            : isPremium
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
                            : isRecommended
                            ? 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg hover:shadow-xl'
                            : isStarter
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                        }`}
                      >
                        {buttonLabel}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
}
