'use client';

import { memo } from 'react';
import Image from 'next/image';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { MessageNodeData } from '@/lib/types/flow';

export const MessageNode = memo(function MessageNode({ data }: NodeProps<MessageNodeData>) {
  return (
    <BaseNode
      icon="💬"
      title="Send Message"
      color="from-blue-500 to-cyan-500"
      statistics={data.statistics}
    >
      <div className="space-y-3">
        {/* Message Text */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 mb-2">Message:</p>
          <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
            <p className="text-sm text-neutral-700 whitespace-pre-wrap line-clamp-3">
              {data.messageText || <span className="italic text-neutral-400">No message</span>}
            </p>
          </div>
        </div>

        {/* Image Preview */}
        {data.imageUrl && (
          <div>
            <p className="text-xs font-semibold text-neutral-500 mb-2">Image:</p>
            <div className="relative h-32 rounded-lg overflow-hidden border border-neutral-200">
              <Image
                src={data.imageUrl}
                alt="Message image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        {data.buttons.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-neutral-500 mb-2">
              Buttons ({data.buttons.length}):
            </p>
            <div className="space-y-1.5">
              {data.buttons.map((button) => (
                <div
                  key={button.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                    button.type === 'whatsapp'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
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
