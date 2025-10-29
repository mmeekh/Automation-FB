'use client';

import { AutomationTemplate } from '@/lib/automations/types';
import { CollapsedView } from './CollapsedView';
import { useAutomationStore } from '@/lib/store/automationStore';

interface AutomationCardProps {
  template: AutomationTemplate;
  onUse?: () => void;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function AutomationCard({ template, isHovered, onMouseEnter, onMouseLeave }: AutomationCardProps) {
  const { isActivated } = useAutomationStore();
  const isActive = isActivated(template.id);

  return (
    <CollapsedView
      template={template}
      isActivated={isActive}
      isHovered={isHovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
