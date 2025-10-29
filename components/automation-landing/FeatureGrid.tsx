import { AutomationContent } from '@/lib/automation-content/types';

interface FeatureGridProps {
  features: AutomationContent['features'];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Öne Çıkan Özellikler</h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Profesyonel AI teknolojisi ile müşteri deneyimini bir üst seviyeye taşıyın
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group relative bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-xl hover:border-primary-200 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
