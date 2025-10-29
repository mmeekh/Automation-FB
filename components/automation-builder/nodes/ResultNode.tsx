'use client';

import { memo } from 'react';
import Image from 'next/image';
import { NodeProps } from 'reactflow';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { BaseNode } from './BaseNode';
import { ResultNodeData } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
import { useUIStore } from '@/lib/store/uiStore';

export const ResultNode = memo(function ResultNode({ id, data }: NodeProps<ResultNodeData>) {
  const isEditMode = useFlowStore((state) => state.isEditMode);
  const openNodeEditor = useUIStore((state) => state.openNodeEditor);

  const handleEdit = () => {
    if (!isEditMode) return;
    openNodeEditor(id);
  };

  return (
    <BaseNode
      icon={data.icon ?? 'FIN'}
      title={data.label || 'Show Result'}
      color="from-green-500 to-emerald-500"
      hasOutput={false}
      statistics={data.statistics}
      onEdit={handleEdit}
      isEditable={isEditMode}
    >
      <div className="space-y-3">
        {/* Output Message */}
        <div>
          <p className="mb-2 text-xs font-semibold text-neutral-500">Result Message:</p>
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="line-clamp-4 whitespace-pre-wrap text-sm text-green-700">
              {data.outputTemplate}
            </p>
          </div>
        </div>

        {/* Result Image */}
        {data.imageUrl && (
          <div>
            <p className="mb-2 text-xs font-semibold text-neutral-500">AI Generated Image:</p>
            <div className="relative h-40 overflow-hidden rounded-lg border border-neutral-200">
              <Image
                src={data.imageUrl}
                alt="Result preview"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Appointment Button */}
        {data.appointmentButton && (
          <div>
            <p className="mb-2 text-xs font-semibold text-neutral-500">Appointment Button:</p>
            <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-2.5 text-white shadow-md">
              <PhoneIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">{data.appointmentButton.text}</span>
            </div>
            <p className="mt-1 text-[10px] italic text-neutral-500">
              Opens WhatsApp: {data.appointmentButton.phoneNumber}
            </p>
          </div>
        )}

        {/* Delayed Messages */}
        {data.delayedMessages && data.delayedMessages.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold text-neutral-500">
              Follow-up Messages ({data.delayedMessages.length}):
            </p>
            <div className="space-y-1.5">
              {data.delayedMessages.map((msg, index) => (
                <div
                  key={`${msg.delay}-${index}`}
                  className="flex items-start gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2"
                >
                  <span className="mt-0.5 text-[10px] font-semibold text-neutral-500">
                    +{msg.delay}s
                  </span>
                  <p className="flex-1 text-xs text-neutral-700">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <p className="text-xs italic text-neutral-500">
          Final step - automation completes here
        </p>
      </div>
    </BaseNode>
  );
});
