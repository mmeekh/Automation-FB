'use client';

import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { CheckIcon } from '@heroicons/react/24/solid';

const tiers = [
  {
    id: 'stylist',
    name: 'Stylist',
    price: '$399',
    period: '/month',
    limit: '1,000 transformations/month',
    highlight: 'Perfect for individual stylists',
    features: [
      'DM automation (single trigger)',
      'AI hair transformation',
      'Selfie-based secure process',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    id: 'salon',
    name: 'Salon',
    price: '$799',
    period: '/month',
    limit: '2,500 transformations/month',
    highlight: 'Most popular for salons',
    features: [
      'DM automation (multiple triggers)',
      'AI hair transformation',
      'Chat customization',
      'Monthly performance report',
      'Priority support',
      'Custom branding',
    ],
    recommended: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$1,299',
    period: '/month',
    limit: '5,000 transformations/month',
    highlight: 'For established salons',
    features: [
      'DM automation (segment-based flows)',
      'AI hair transformation',
      'Chat customization',
      'Advanced flow management',
      'Monthly report & CRM integration',
      'Dedicated account manager',
      'API access',
    ],
    premium: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$2,199',
    period: '/month',
    limit: '10,000+ transformations/month',
    highlight: 'For franchises & chains',
    features: [
      'DM automation (multi-brand management)',
      'AI hair transformation',
      'Chat customization',
      'Advanced flow management',
      'Monthly report & CRM integration',
      'White-label delivery',
      'Priority support (24/7)',
      'Custom SLA',
      'Advanced security features',
    ],
    premium: true,
    eclipse: true,
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          <header className="space-y-6 text-center">
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
              Pricing
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent sm:text-5xl">
                Scale your salon automation with flexible plans
              </h1>
              <p className="mx-auto max-w-2xl text-base text-neutral-600 sm:text-lg">
                All plans include DM flows, image requests, and appointment automations. Upgrade or downgrade anytime.
              </p>
            </div>
          </header>

          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <article
                key={tier.id}
                className={`relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  tier.recommended
                    ? 'border-2 border-primary-500 ring-4 ring-primary-100'
                    : tier.eclipse
                    ? 'border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                    : tier.premium
                    ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50'
                    : 'border-2 border-neutral-200'
                }`}
              >
                {/* Recommended Badge */}
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                      <CheckIcon className="w-3.5 h-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Eclipse Badge */}
                {tier.eclipse && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                      ✨ Enterprise
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-3">
                    <h2 className={`text-2xl font-bold ${
                      tier.eclipse
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                        : tier.premium
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
                        : 'text-neutral-900'
                    }`}>
                      {tier.name}
                    </h2>
                    <p className="text-sm text-neutral-600">{tier.highlight}</p>
                    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      tier.eclipse
                        ? 'bg-purple-100 text-purple-700'
                        : tier.premium
                        ? 'bg-blue-100 text-blue-700'
                        : tier.recommended
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {tier.limit}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-bold ${
                        tier.eclipse
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                          : tier.premium
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
                          : 'text-neutral-900'
                      }`}>
                        {tier.price}
                      </span>
                      <span className="text-sm font-semibold text-neutral-500">
                        {tier.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 text-sm text-neutral-700">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckIcon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                          tier.eclipse
                            ? 'text-purple-500'
                            : tier.premium
                            ? 'text-blue-500'
                            : tier.recommended
                            ? 'text-primary-500'
                            : 'text-neutral-400'
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button
                      className={`w-full ${
                        tier.eclipse
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                          : tier.premium
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
                          : tier.recommended
                          ? 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 shadow-lg hover:shadow-xl'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                      }`}
                    >
                      {tier.id === 'enterprise' ? 'Contact Sales' : 'Choose Plan'}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Additional Info */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-200 bg-white px-6 py-3 shadow-sm">
              <span className="text-sm font-semibold text-neutral-700">
                ⚡ Average setup time: 3 business days
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              All plans can be upgraded or downgraded at any time. No long-term contracts.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
