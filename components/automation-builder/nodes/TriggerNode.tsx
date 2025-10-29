'use client';

import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { TriggerNodeData } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
import { useUIStore } from '@/lib/store/uiStore';

export const TriggerNode = memo(function TriggerNode({ id, data }: NodeProps<TriggerNodeData>) {
  const isEditMode = useFlowStore((state) => state.isEditMode);
  const openNodeEditor = useUIStore((state) => state.openNodeEditor);

  const handleEdit = () => {
    if (!isEditMode) return;
    openNodeEditor(id);
  };

  return (
    <BaseNode
      icon={data.icon ?? 'TR'}
      title={data.label || 'Trigger'}
      color="from-amber-500 to-orange-500"
      hasInput={false}
      statistics={data.statistics}
      onEdit={handleEdit}
      isEditable={isEditMode}
    >
      <div className="space-y-3">
        {/* Keywords */}
        <div>
          <p className="mb-2 text-xs font-semibold text-neutral-500">Trigger Keywords:</p>
          <div className="flex flex-wrap gap-1.5">
            {data.keywords.map((keyword, index) => (
              <span
                key={index}
                className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Exact Match Info */}
        <div className="flex items-center gap-2 rounded-lg bg-neutral-50 p-2 text-xs text-neutral-600">
          <span className="font-semibold text-neutral-700">{data.exactMatch ? 'Exact' : 'Partial'}</span>
          <span>
            {data.exactMatch
              ? 'Exact match only (word must be standalone)'
              : 'Matches anywhere in message'}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs italic text-neutral-500">
          Automation starts when user sends any of these keywords
        </p>
      </div>
    </BaseNode>
  );
});
