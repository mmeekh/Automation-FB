'use client';

import { Button } from '@/components';
import { StepProps } from '@/lib/types/customization';
import { EyeIcon } from '@heroicons/react/24/outline';

export function PreviewStep({ template, data, onNext, onBack }: StepProps) {
  const messageSteps = template.flow.steps.filter((step) => step.type === 'message');

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 mb-4">
          <EyeIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Preview Your Flow</h2>
        <p className="text-neutral-600 mt-2">
          See how your automation will look to customers.
        </p>
      </div>

      {/* Chat Simulation */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-6 shadow-2xl">
        {/* Phone Header */}
        <div className="bg-neutral-800 rounded-2xl px-4 py-3 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{template.name}</p>
            <p className="text-neutral-400 text-xs">Automation Bot</p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {messageSteps.map((step, index) => {
            const messageText = data.messages[step.id] || step.content || '';

            return (
              <div key={step.id} className="flex flex-col items-start">
                {/* Bot message (left) */}
                <div className="bg-neutral-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-white text-sm leading-relaxed">{messageText}</p>
                </div>
                <span className="text-neutral-500 text-xs mt-1 ml-2">
                  {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>

                {/* User response simulation (right) */}
                {index < messageSteps.length - 1 && (
                  <div className="flex flex-col items-end self-end mt-3">
                    <div className="bg-primary-600 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                      <p className="text-white text-sm">
                        {index === 0 ? '📸 [Photo sent]' : index === 1 ? '💇 [Style photo sent]' : '✅ Sounds good!'}
                      </p>
                    </div>
                    <span className="text-neutral-500 text-xs mt-1 mr-2">
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Final result simulation */}
          <div className="flex flex-col items-start">
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl px-4 py-4 max-w-[85%]">
              <p className="text-white text-sm font-semibold mb-2">✨ Your transformation is ready!</p>
              <div className="bg-white/20 rounded-lg p-2 mb-3">
                <div className="aspect-video bg-white/30 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Result Image</span>
                </div>
              </div>
              <button className="w-full py-2 bg-white text-primary-600 rounded-lg font-semibold text-sm">
                📅 Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-green-50 rounded-xl p-4 border border-green-100">
        <p className="text-sm text-green-900">
          <span className="font-semibold">✅ Looking good!</span> This is how your automation will appear to customers in Instagram DMs.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" size="lg" onClick={onBack} className="border-2">
          ← Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600"
        >
          Next: Review & Activate →
        </Button>
      </div>
    </div>
  );
}
