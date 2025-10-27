'use client';

import { useState } from 'react';
import { AutomationTemplate, FlowStep } from '@/lib/automations/types';
import { CustomizationData } from '@/lib/types/customization';
import { FlowStepEditor } from './FlowStepEditor';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface AutomationFlowVisualizerProps {
  template: AutomationTemplate;
  data: CustomizationData;
  onChange: (updates: Partial<CustomizationData>) => void;
}

export function AutomationFlowVisualizer({
  template,
  data,
  onChange,
}: AutomationFlowVisualizerProps) {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(
    template.flow.steps[0]?.id || null
  );

  const handleStepClick = (stepId: string) => {
    setExpandedStepId(expandedStepId === stepId ? null : stepId);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-accent-100 to-primary-100">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-accent-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Automation Flow</h2>
            <p className="text-sm text-neutral-600">
              Customize messages and images for each step
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-sm text-blue-800">
            💡 <span className="font-semibold">Tip:</span> Click on any step to expand and edit. You
            can customize both messages and images for each interaction.
          </p>
        </div>
      </div>

      {/* Flow Steps */}
      <div className="space-y-4">
        {template.flow.steps.map((step, index) => (
          <FlowStepEditor
            key={step.id}
            step={step}
            stepNumber={index + 1}
            totalSteps={template.flow.steps.length}
            isExpanded={expandedStepId === step.id}
            onToggle={() => handleStepClick(step.id)}
            data={data}
            onChange={onChange}
            template={template}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <div className="flex items-start gap-3 text-sm text-neutral-600">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
            <span className="text-lg">✨</span>
          </div>
          <div>
            <p className="font-semibold text-neutral-900 mb-1">How it works</p>
            <p className="text-neutral-600 leading-relaxed">
              Your automation will follow this exact flow when users interact with it. Messages and
              images will be sent in the order shown above. The logic and conditions are fixed, but
              all content is fully customizable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
