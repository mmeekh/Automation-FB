'use client';

import { memo } from 'react';
import Image from 'next/image';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { MessageNodeData } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
import { useUIStore } from '@/lib/store/uiStore';

export const MessageNode = memo(function MessageNode({ id, data }: NodeProps<MessageNodeData>) {
  const isEditMode = useFlowStore((state) => state.isEditMode);
  const openNodeEditor = useUIStore((state) => state.openNodeEditor);

  const handleEdit = () => {
    if (!isEditMode) return;
    openNodeEditor(id);
  };

  return (
    <BaseNode
      icon={data.icon ?? 'MSG'}
      title={data.label || 'Send Message'}
      color="from-blue-500 to-cyan-500"
      statistics={data.statistics}
      onEdit={handleEdit}
      isEditable={isEditMode}
    >
      <div className="space-y-3">
        {/* Message Text */}
        <div>
          <p className="mb-2 text-xs font-semibold text-neutral-500">Message:</p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            {data.messageText ? (
              <p className="line-clamp-4 whitespace-pre-wrap text-sm text-neutral-700">
                {data.messageText}
              </p>
            ) : (
              <span className="text-sm italic text-neutral-400">No message configured</span>
            )}
          </div>
        </div>

        {/* Image Preview */}
        {data.imageUrl && (
          <div>
            <p className="mb-2 text-xs font-semibold text-neutral-500">Image:</p>
            <div className="relative h-32 overflow-hidden rounded-lg border border-neutral-200">
              <Image
                src={data.imageUrl}
                alt="Message image"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        {data.buttons.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold text-neutral-500">
              Buttons ({data.buttons.length})
            </p>
            <div className="space-y-1.5">
              {data.buttons.map((button) => (
                <div
                  key={button.id}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium ${
                    button.type === 'whatsapp'
                      ? 'border border-green-200 bg-green-50 text-green-700'
                      : 'border border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  <span>{button.text}</span>
                  {button.statistics && (
                    <span className="text-[10px] opacity-70">
                      {button.statistics.clickRate}% clicks
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  );
});
