'use client';

import { ChangeEvent } from 'react';
import { ImageRequestFlowNode } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
import { validationRules } from '@/lib/utils/validation';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextarea } from '@/components/ui/FormTextarea';
import { EmojiPicker } from './EmojiPicker';

interface ImageRequestEditorProps {
  node: ImageRequestFlowNode;
}

export function ImageRequestEditor({ node }: ImageRequestEditorProps) {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleLabelChange = (value: string, isValid: boolean) => {
    if (isValid) {
      updateNodeData(node.id, { label: value });
    }
  };

  const handleRequestChange = (value: string, isValid: boolean) => {
    if (isValid) {
      updateNodeData(node.id, { requestMessage: value });
    }
  };

  const handleErrorChange = (value: string, isValid: boolean) => {
    if (isValid) {
      updateNodeData(node.id, { errorMessage: value });
    }
  };

  const handleRetryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(10, Number(event.target.value) || 1));
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
            <FormInput
              label="Node Title"
              value={node.data.label}
              onChange={handleLabelChange}
              placeholder="Fotoğraf İsteği"
              helperText="Appears at the top of the node in the canvas."
              validationRules={[
                validationRules.required('Node title is required'),
                validationRules.minLength(3, 'Node title must be at least 3 characters'),
                validationRules.maxLength(50, 'Node title cannot exceed 50 characters'),
              ]}
            />
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
        <FormTextarea
          value={node.data.requestMessage}
          onChange={handleRequestChange}
          placeholder="Lütfen mevcut fotoğrafınızı yükleyin..."
          rows={5}
          showCharCount
          maxCharCount={500}
          validationRules={[
            validationRules.required('Request message is required'),
            validationRules.minLength(10, 'Request message must be at least 10 characters'),
            validationRules.maxLength(500, 'Request message cannot exceed 500 characters'),
          ]}
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
        <FormTextarea
          value={node.data.errorMessage}
          onChange={handleErrorChange}
          placeholder="Oops! Lütfen fotoğraf gönderin."
          rows={4}
          showCharCount
          maxCharCount={300}
          validationRules={[
            validationRules.required('Error message is required'),
            validationRules.minLength(5, 'Error message must be at least 5 characters'),
            validationRules.maxLength(300, 'Error message cannot exceed 300 characters'),
          ]}
        />

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-neutral-800">Retry Attempts</h4>
          <p className="text-xs text-neutral-500">
            Kullanici yanlis tipte mesaj gonderirse kac kez tekrar isteyecegini belirleyin.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={node.data.retryCount}
              onChange={handleRetryChange}
              className="flex-1 h-2 rounded-full bg-neutral-200 accent-primary-500"
            />
            <span className="w-10 text-right text-lg font-bold text-primary-600">
              {node.data.retryCount}
            </span>
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            Bu limitten sonra otomasyon beklemeyi birakir.
          </p>
        </div>
      </section>
    </div>
  );
}
