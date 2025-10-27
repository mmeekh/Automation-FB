'use client';

import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { ImageRequestNodeData } from '@/lib/types/flow';
import { PhotoIcon } from '@heroicons/react/24/outline';

export const ImageRequestNode = memo(function ImageRequestNode({
  data,
}: NodeProps<ImageRequestNodeData>) {
  return (
    <BaseNode
      icon="🖼️"
      title="Request Image"
      color="from-purple-500 to-pink-500"
      statistics={data.statistics}
    >
      <div className="space-y-3">
        {/* Request Message */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 mb-2">Request Message:</p>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <div className="flex items-start gap-2">
              <PhotoIcon className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-purple-700 flex-1">{data.requestMessage}</p>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 mb-2">If user sends text instead:</p>
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="text-xs text-red-700">{data.errorMessage}</p>
          </div>
        </div>

        {/* Retry Count */}
        <div className="flex items-center justify-between bg-neutral-50 rounded-lg p-3 border border-neutral-200">
          <span className="text-xs font-semibold text-neutral-600">Max retries:</span>
          <span className="text-sm font-bold text-neutral-900">{data.retryCount}</span>
        </div>

        {/* Info */}
        <p className="text-xs text-neutral-500 italic flex items-center gap-1">
          <span>⏳</span>
          <span>Waits for user to send an image</span>
        </p>
      </div>
    </BaseNode>
  );
});
