'use client';

import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { BaseNode } from './BaseNode';
import { ImageRequestNodeData } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
import { useUIStore } from '@/lib/store/uiStore';

export const ImageRequestNode = memo(function ImageRequestNode({
  id,
  data,
}: NodeProps<ImageRequestNodeData>) {
  const isEditMode = useFlowStore((state) => state.isEditMode);
  const openNodeEditor = useUIStore((state) => state.openNodeEditor);

  const handleEdit = () => {
    if (!isEditMode) return;
    openNodeEditor(id);
  };

  return (
    <BaseNode
      icon={data.icon ?? 'CAM'}
      title={data.label || 'Request Image'}
      color="from-purple-500 to-pink-500"
      statistics={data.statistics}
      onEdit={handleEdit}
      isEditable={isEditMode}
    >
      <div className="space-y-3">
        {/* Request Message */}
        <div>
          <p className="mb-2 text-xs font-semibold text-neutral-500">Request Message:</p>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
            <div className="flex items-start gap-2">
              <PhotoIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-600" />
              <p className="flex-1 text-sm text-purple-700">{data.requestMessage}</p>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        <div>
          <p className="mb-2 text-xs font-semibold text-neutral-500">
            If user sends text instead:
          </p>
          <div className="rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-xs text-red-700">{data.errorMessage}</p>
          </div>
        </div>

        {/* Retry Count */}
        <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3">
          <span className="text-xs font-semibold text-neutral-600">Max retries:</span>
          <span className="text-sm font-bold text-neutral-900">{data.retryCount}</span>
        </div>

        {/* Info */}
        <p className="text-xs italic text-neutral-500">
          Note: Waits for the user to send a photo before continuing.
        </p>
      </div>
    </BaseNode>
  );
});
