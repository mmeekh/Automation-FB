'use client';

import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { TriggerNodeData } from '@/lib/types/flow';

export const TriggerNode = memo(function TriggerNode({ data }: NodeProps<TriggerNodeData>) {
  return (
    <BaseNode
      icon="⚡"
      title="Trigger"
      color="from-amber-500 to-orange-500"
      hasInput={false}
      statistics={data.statistics}
    >
      <div className="space-y-3">
        {/* Keywords */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 mb-2">Trigger Keywords:</p>
          <div className="flex flex-wrap gap-1.5">
            {data.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-amber-50 border border-amber-200 rounded-md text-xs font-medium text-amber-700"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Exact Match Info */}
        <div className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 rounded-lg p-2">
          <span>{data.exactMatch ? '🎯' : '🔍'}</span>
          <span>
            {data.exactMatch
              ? 'Exact match only (word must be standalone)'
              : 'Matches anywhere in message'}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-neutral-500 italic">
          Automation starts when user sends any of these keywords
        </p>
      </div>
    </BaseNode>
  );
});
