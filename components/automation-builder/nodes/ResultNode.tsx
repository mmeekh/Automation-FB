'use client';

import { memo } from 'react';
import Image from 'next/image';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { ResultNodeData } from '@/lib/types/flow';
import { PhoneIcon } from '@heroicons/react/24/solid';

export const ResultNode = memo(function ResultNode({ data }: NodeProps<ResultNodeData>) {
  return (
    <BaseNode
      icon="🎨"
      title="Show Result"
      color="from-green-500 to-emerald-500"
      hasOutput={false}
      statistics={data.statistics}
    >
      <div className="space-y-3">
        {/* Output Message */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 mb-2">Result Message:</p>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-sm text-green-700 whitespace-pre-wrap line-clamp-3">
              {data.outputTemplate}
            </p>
          </div>
        </div>

        {/* Result Image */}
        {data.imageUrl && (
          <div>
            <p className="text-xs font-semibold text-neutral-500 mb-2">AI Generated Image:</p>
            <div className="relative h-40 rounded-lg overflow-hidden border border-neutral-200">
              <Image
                src={data.imageUrl}
                alt="Result preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Appointment Button */}
        {data.appointmentButton && (
          <div>
            <p className="text-xs font-semibold text-neutral-500 mb-2">Appointment Button:</p>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-md">
              <PhoneIcon className="w-4 h-4" />
              <span className="text-sm font-semibold">{data.appointmentButton.text}</span>
            </div>
            <p className="text-[10px] text-neutral-500 mt-1 italic">
              📱 Opens WhatsApp: {data.appointmentButton.phoneNumber}
            </p>
          </div>
        )}

        {/* Delayed Messages */}
        {data.delayedMessages && data.delayedMessages.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-neutral-500 mb-2">
              Follow-up Messages ({data.delayedMessages.length}):
            </p>
            <div className="space-y-1.5">
              {data.delayedMessages.map((msg, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 bg-neutral-50 rounded-lg p-2 border border-neutral-200"
                >
                  <span className="text-[10px] font-semibold text-neutral-500 mt-0.5">
                    +{msg.delay}s
                  </span>
                  <p className="text-xs text-neutral-700 flex-1 line-clamp-2">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <p className="text-xs text-neutral-500 italic flex items-center gap-1">
          <span>✅</span>
          <span>Final step - automation completes here</span>
        </p>
      </div>
    </BaseNode>
  );
});
