import { ReactNode } from 'react';

/**
 * Automation flow step type
 */
export type FlowStepType = 'message' | 'image_request' | 'ai_processing' | 'result' | 'cta';

/**
 * Single step in an automation flow
 */
export interface FlowStep {
  id: string;
  type: FlowStepType;
  content: string;
  delay?: number; // milliseconds
  requiresInput?: boolean;
  metadata?: Record<string, any>;
}

/**
 * Automation template configuration
 */
export interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  gradient: string;
  accentColor: string;
  installs: number;
  thumbnail?: ReactNode;
  icon?: ReactNode;

  // Flow configuration
  flow: {
    steps: FlowStep[];
    setupInstructions?: string[];
    requiredVariables?: string[];
  };

  // Metadata
  metadata?: {
    version?: string;
    author?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
  };
}

/**
 * Template registry interface
 */
export interface TemplateRegistry {
  getTemplate(id: string): AutomationTemplate | undefined;
  getAllTemplates(): AutomationTemplate[];
  getTemplatesByCategory(category: string): AutomationTemplate[];
  registerTemplate(template: AutomationTemplate): void;
}

/**
 * Template installation status
 */
export interface TemplateInstallation {
  templateId: string;
  installedAt: string;
  configuration: Record<string, any>;
  status: 'active' | 'inactive' | 'error';
}
