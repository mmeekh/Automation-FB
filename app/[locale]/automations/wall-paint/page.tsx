'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PhoneMockup } from '@/components/automation-landing/PhoneMockup';
import { HeroSection } from '@/components/automation-landing/HeroSection';
import { FeatureGrid } from '@/components/automation-landing/FeatureGrid';
import { UseCaseSection } from '@/components/automation-landing/UseCaseSection';
import { FAQSection } from '@/components/automation-landing/FAQSection';
import { wallPaintContent } from '@/lib/automation-content';
import { Button } from '@/components/ui/Button';

export default function WallPaintPage() {
  const router = useRouter();

  const handleLaunch = () => {
    router.push('/automations/builder/wall-paint');
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
              <PhoneMockup chatPreview={wallPaintContent.chatPreview} />
            </div>

            {/* Right: Content */}
            <div className="space-y-16 lg:order-2">
              <HeroSection
                hero={wallPaintContent.hero}
                title={wallPaintContent.title}
                onLaunch={handleLaunch}
              />

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 py-8 border-y border-neutral-200">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-600">5 sn</p>
                  <p className="text-sm text-neutral-600 mt-1">Ortalama işlem</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent-600">%95</p>
                  <p className="text-sm text-neutral-600 mt-1">Müşteri memnuniyeti</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-600">24/7</p>
                  <p className="text-sm text-neutral-600 mt-1">Kesintisiz aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeatureGrid features={wallPaintContent.features} />
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UseCaseSection useCases={wallPaintContent.useCases} />
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Nasıl Çalışır?</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                3 basit adımda müşterilerinize AI deneyimi sunun
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Instagram Hesabını Bağla',
                  description: 'Hesabınızı güvenli şekilde bağlayın. Tek tık ile kurulum tamamlanır.',
                  icon: '📱',
                },
                {
                  step: '2',
                  title: 'Otomasyonu Özelleştir',
                  description: 'Tetikleyici kelimeleri, mesajları ve AI modelini ayarlayın.',
                  icon: '⚙️',
                },
                {
                  step: '3',
                  title: 'Yayına Al',
                  description: 'Otomasyonu aktif edin. Artık müşterileriniz 7/24 AI deneyimi yaşayabilir.',
                  icon: '🚀',
                },
              ].map((item) => (
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

        {/* FAQ Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection faq={wallPaintContent.faq} />
          </div>
        </div>
      </main>
    </>
  );
}
