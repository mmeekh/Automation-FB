import { AutomationContent } from '@/lib/automation-content/types';

interface UseCaseSectionProps {
  useCases: AutomationContent['useCases'];
}

export function UseCaseSection({ useCases }: UseCaseSectionProps) {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Kimler Kullanabilir?</h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Farklı sektörlerden profesyoneller için özelleştirilmiş çözümler
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {useCases.map((useCase, idx) => (
          <div
            key={idx}
            className="relative bg-gradient-to-br from-white to-neutral-50 rounded-3xl border-2 border-neutral-200 p-8 hover:border-primary-300 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-3xl shadow-lg">
                {useCase.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-neutral-900">{useCase.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{useCase.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
