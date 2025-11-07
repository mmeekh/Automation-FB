'use client';

import { memo } from 'react';
import Image from 'next/image';
import { NodeProps } from 'reactflow';
import { PhotoIcon } from '@heroicons/react/24/outline';
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

  const isArtNode = (data.icon ?? '').toUpperCase() === 'ART';
  const nodeColor = isArtNode ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-cyan-500';

  return (
    <BaseNode
      icon={data.icon ?? 'MSG'}
      title={data.label || 'Send Message'}
      color={nodeColor}
      statistics={data.statistics}
      onEdit={handleEdit}
      isEditable={isEditMode}
    >
      {isArtNode ? (
        <ArtStyleNodeContent data={data} />
      ) : (
        <DefaultMessageNodeContent data={data} />
      )}
    </BaseNode>
  );
});

function DefaultMessageNodeContent({ data }: { data: MessageNodeData }) {
  return (
    <div className="space-y-3">
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
  );
}

function ArtStyleNodeContent({ data }: { data: MessageNodeData }) {
  const maxRetries = data.maxRetries ?? 2;

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-semibold text-neutral-500">Stil isteği</p>
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
          <div className="flex items-start gap-2">
            <PhotoIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-600" />
            <p className="flex-1 text-sm text-purple-700 whitespace-pre-wrap">
              {data.messageText}
            </p>
          </div>
        </div>
      </div>

      {data.secondaryText && (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-600">
          {data.secondaryText}
        </div>
      )}

      {data.imageUrl && (
        <div>
          <p className="mb-2 text-xs font-semibold text-neutral-500">Örnek görsel</p>
          <div className="relative h-28 overflow-hidden rounded-lg border border-neutral-200">
            <Image
              src={data.imageUrl}
              alt="Style reference"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Max retries
        </span>
        <span className="text-sm font-bold text-primary-600">{maxRetries}</span>
      </div>

      {data.statusText && (
        <div className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-xs text-purple-700">
          {data.statusText}
        </div>
      )}
    </div>
  );
}
