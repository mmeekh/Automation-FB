'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: { id: string; title: string }[];
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden mb-6">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-start">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                index < currentStep
                  ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white scale-110'
                  : index === currentStep
                  ? 'bg-white border-2 border-primary-500 text-primary-600 scale-125 shadow-lg'
                  : 'bg-neutral-200 text-neutral-400'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>

            {/* Label */}
            <span
              className={`text-xs mt-2 text-center transition-all duration-300 ${
                index === currentStep
                  ? 'text-neutral-900 font-semibold'
                  : index < currentStep
                  ? 'text-neutral-600'
                  : 'text-neutral-400'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
