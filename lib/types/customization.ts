import React from 'react';
import { AutomationTemplate } from '../automations/types';

export interface CustomizationData {
  messages: Record<string, string>;
  images: Record<string, string | null>;
  settings: {
    vipAccess: {
      mode: 'all' | 'tagged' | 'vip_list';
      vipUsernames: string[];
    };
    generationLimit: {
      count: number;
      period: 'minute' | 'hour' | 'day' | 'week' | 'month';
    };
    quotaReset: 'hourly' | 'daily' | 'weekly' | 'monthly';
  };
  buttons: Record<string, { text: string; url: string }>;
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<StepProps>;
  isValid: (data: CustomizationData) => boolean;
}

export interface StepProps {
  template: AutomationTemplate;
  data: CustomizationData;
  onChange: (updates: Partial<CustomizationData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: AutomationTemplate;
  onActivate: (data: CustomizationData) => void;
  existingData?: CustomizationData;
}
