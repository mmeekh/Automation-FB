'use client';

import { useState, useCallback } from 'react';
import { AutomationTemplate } from '@/lib/automations/types';
import { CustomizationData } from '@/lib/types/customization';

export function useCustomizationWizard(
  template: AutomationTemplate,
  existingData?: CustomizationData
) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<CustomizationData>(
    existingData || {
      messages: getDefaultMessages(template),
      images: {},
      settings: {
        vipAccess: {
          mode: 'all',
          vipUsernames: [],
        },
        generationLimit: {
          count: 5,
          period: 'day',
        },
        quotaReset: 'daily',
      },
      buttons: {},
    }
  );

  const updateData = useCallback((updates: Partial<CustomizationData>) => {
    setData((prev) => ({
      ...prev,
      ...updates,
      messages: { ...prev.messages, ...updates.messages },
      images: { ...prev.images, ...updates.images },
      settings: { ...prev.settings, ...updates.settings },
      buttons: { ...prev.buttons, ...updates.buttons },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 5)); // 6 steps total (0-5)
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, 5)));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setData({
      messages: getDefaultMessages(template),
      images: {},
      settings: {
        vipAccess: { mode: 'all', vipUsernames: [] },
        generationLimit: { count: 5, period: 'day' },
        quotaReset: 'daily',
      },
      buttons: {},
    });
  }, [template]);

  return {
    currentStep,
    data,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    reset,
    totalSteps: 6,
    progress: ((currentStep + 1) / 6) * 100,
  };
}

// Helper to extract default messages from template
function getDefaultMessages(template: AutomationTemplate): Record<string, string> {
  const messages: Record<string, string> = {};

  template.flow.steps.forEach((step) => {
    if (step.type === 'message' && step.content) {
      messages[step.id] = step.content;
    }
  });

  return messages;
}
