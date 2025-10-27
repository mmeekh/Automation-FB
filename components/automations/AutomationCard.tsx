'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AutomationTemplate } from '@/lib/automations/types';
import { CollapsedView } from './CollapsedView';
import { DetailView } from './DetailView';
import { useAutomationStore } from '@/lib/store/automationStore';

type ViewMode = 'collapsed' | 'detail';

interface AutomationCardProps {
  template: AutomationTemplate;
  onUse?: () => void;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function AutomationCard({ template, onUse, isHovered, onMouseEnter, onMouseLeave }: AutomationCardProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('collapsed');

  const { isActivated } = useAutomationStore();
  const isActive = isActivated(template.id);

  const handleUseClick = () => {
    // Map template ID to flow ID (for now using template.id as flow ID)
    const flowId = `flow-${template.id}`;
    router.push(`/automations/builder/${flowId}`);
  };

  const toggleDetail = () => {
    setViewMode(viewMode === 'collapsed' ? 'detail' : 'collapsed');
  };

  return (
    <>
      {viewMode === 'collapsed' ? (
        <CollapsedView
          template={template}
          onToggle={toggleDetail}
          onUse={handleUseClick}
          isUsing={false}
          isActivated={isActive}
          isHovered={isHovered}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ) : (
        <DetailView
          template={template}
          onToggle={toggleDetail}
          onUse={handleUseClick}
          isUsing={false}
          isActivated={isActive}
        />
      )}

    </>
  );
}
