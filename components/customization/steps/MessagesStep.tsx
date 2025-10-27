'use client';

import { useState } from 'react';
import { Button } from '@/components';
import { StepProps } from '@/lib/types/customization';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export function MessagesStep({ template, data, onChange, onNext, onBack }: StepProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const messageSteps = template.flow.steps.filter((step) => step.type === 'message');

  const handleMessageChange = (stepId: string, newText: string) => {
    onChange({
      messages: {
        ...data.messages,
        [stepId]: newText,
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 mb-4">
          <ChatBubbleLeftIcon className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Customize Messages</h2>
        <p className="text-neutral-600 mt-2">
          Edit the messages your customers will receive. Click on any message to edit.
        </p>
      </div>

      {/* Message List */}
      <div className="space-y-4">
        {messageSteps.map((step, index) => {
          const currentText = data.messages[step.id] || step.content || '';
          const isEditing = editingId === step.id;

          return (
            <div
              key={step.id}
              className="bg-gradient-to-br from-white to-neutral-50 rounded-2xl border border-neutral-200 p-6 hover:border-primary-300 transition-all duration-300"
            >
              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  Message #{index + 1}
                </span>
                {step.metadata?.type && (
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                    {step.metadata.type}
                  </span>
                )}
              </div>

              {/* Message Content */}
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={currentText}
                    onChange={(e) => handleMessageChange(step.id, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-primary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-medium text-neutral-900"
                    rows={3}
                    placeholder="Enter your message..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        handleMessageChange(step.id, step.content || '');
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 font-medium text-sm"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setEditingId(step.id)}
                  className="cursor-pointer group"
                >
                  <p className="text-neutral-900 font-medium leading-relaxed group-hover:text-primary-600 transition-colors">
                    {currentText}
                  </p>
                  <span className="text-xs text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity mt-2 inline-block">
                    Click to edit
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">💡 Tip:</span> You can use emojis to make messages more friendly!
          Try: 📸 💇 ✨ 🎉 ❤️
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
          Next: Upload Images →
        </Button>
      </div>
    </div>
  );
}
