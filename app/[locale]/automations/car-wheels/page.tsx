'use client';

import { Header } from '@/components/layout/Header';
import { PhoneMockup } from '@/components/automation-landing/PhoneMockup';
import { HeroSection } from '@/components/automation-landing/HeroSection';
import { FeatureGrid } from '@/components/automation-landing/FeatureGrid';
import { UseCaseSection } from '@/components/automation-landing/UseCaseSection';
import { FAQSection } from '@/components/automation-landing/FAQSection';
import { getCarWheelsContent } from '@/lib/automation-content';
import { useAutomationLauncher } from '@/lib/hooks/useAutomationLauncher';
import type { Locale } from '@/i18n/config';

type CarWheelsPageProps = {
  params: { locale: Locale };
};

export default function CarWheelsPage({ params }: CarWheelsPageProps) {
  const launchAutomation = useAutomationLauncher();
  const content = getCarWheelsContent(params.locale);
  const stats = content.stats ?? [];
  const howItWorks = content.howItWorks;

  const handleLaunch = () => {
    launchAutomation('car-wheels');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        {/* Hero Section with Phone */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Sticky Phone Mockup */}
            <div className="lg:order-1">
              <PhoneMockup chatPreview={content.chatPreview} />
            </div>

            {/* Right: Content */}
            <div className="space-y-16 lg:order-2">
              <HeroSection hero={content.hero} title={content.title} onLaunch={handleLaunch} />

              {/* Stats Bar */}
              {stats.length > 0 && (
                <div className="grid grid-cols-3 gap-6 py-8 border-y border-neutral-200">
                  {stats.map((item) => (
                    <div className="text-center" key={item.label}>
                      <p className="text-3xl font-bold text-primary-600">{item.value}</p>
                      <p className="text-sm text-neutral-600 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeatureGrid features={content.features} />
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UseCaseSection useCases={content.useCases} />
          </div>
        </div>

        {/* How It Works */}
        {howItWorks && (
          <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">{howItWorks.title}</h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{howItWorks.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {howItWorks.steps.map((item) => (
                  <div key={item.step} className="relative">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-neutral-100 hover:border-primary-200 transition-all h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl">
                          {item.step}
                        </div>
                        <span className="text-4xl">{item.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection faq={content.faq} />
          </div>
        </div>
      </main>
    </>
  );
}
