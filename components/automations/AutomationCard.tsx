'use client';

import { useState } from 'react';
import { AutomationTemplate } from '@/lib/automations/types';
import { CollapsedView } from './CollapsedView';
import { DetailView } from './DetailView';

type ViewMode = 'collapsed' | 'detail';

interface AutomationCardProps {
  template: AutomationTemplate;
  onUse?: () => void;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function AutomationCard({ template, onUse, isHovered, onMouseEnter, onMouseLeave }: AutomationCardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('collapsed');
  const [isUsing, setIsUsing] = useState(false);

  const handleUse = async () => {
    setIsUsing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsUsing(false);
    onUse?.();
  };

  const toggleDetail = () => {
    setViewMode(viewMode === 'collapsed' ? 'detail' : 'collapsed');
  };

  if (viewMode === 'collapsed') {
    return (
      <CollapsedView
        template={template}
        onToggle={toggleDetail}
        onUse={handleUse}
        isUsing={isUsing}
        isHovered={isHovered}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }

  return <DetailView template={template} onToggle={toggleDetail} onUse={handleUse} isUsing={isUsing} />;
}
