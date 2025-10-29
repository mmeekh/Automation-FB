'use client';

import { ChangeEvent } from 'react';
import { ImageRequestFlowNode } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
import { EmojiPicker } from './EmojiPicker';

interface ImageRequestEditorProps {
  node: ImageRequestFlowNode;
}

export function ImageRequestEditor({ node }: ImageRequestEditorProps) {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(node.id, { label: event.target.value });
  };

  const handleRequestChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(node.id, { requestMessage: event.target.value });
  };

  const handleErrorChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(node.id, { errorMessage: event.target.value });
  };

  const handleRetryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(event.target.value) || 1);
    updateNodeData(node.id, { retryCount: value });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Meta */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Node appearance
        </h3>
        <div className="flex items-center gap-4">
          <EmojiPicker
            value={node.data.icon}
            onSelect={(emoji) => updateNodeData(node.id, { icon: emoji })}
          />
          <div className="flex-1">
            <label className="text-xs font-semibold uppercase text-neutral-500">
              Node Title
              <input
                type="text"
                value={node.data.label}
                onChange={handleLabelChange}
                className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Fotoğraf İsteği"
              />
            </label>
            <p className="mt-1 text-xs text-neutral-500">
              Appears at the top of the node in the canvas.
            </p>
          </div>
        </div>
      </section>

      {/* Request message */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-neutral-800">Request Message</h3>
          <p className="text-xs text-neutral-500">
            This is the prompt asking the user to upload their image.
          </p>
        </div>
        <textarea
          value={node.data.requestMessage}
          onChange={handleRequestChange}
          className="h-32 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 shadow-inner focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="Lütfen mevcut fotoğrafınızı yükleyin..."
        />
      </section>

      {/* Error handling */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-neutral-800">Error Message</h3>
          <p className="text-xs text-neutral-500">
            Used when the user sends something other than an image.
          </p>
        </div>
        <textarea
          value={node.data.errorMessage}
          onChange={handleErrorChange}
          className="h-28 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 shadow-inner focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
          placeholder="Oops! Lütfen fotoğraf gönderin."
        />

        <div className="mt-4">
          <label className="text-xs font-semibold uppercase text-neutral-500">
            Retry Attempts
            <input
              type="number"
              min={1}
              max={5}
              value={node.data.retryCount}
              onChange={handleRetryChange}
              className="mt-1 w-24 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </label>
          <p className="mt-1 text-xs text-neutral-500">
            After this number of attempts the flow will stop.
          </p>
        </div>
      </section>
    </div>
  );
}
