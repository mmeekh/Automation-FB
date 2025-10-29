'use client';

import { ChangeEvent } from 'react';
import clsx from 'clsx';

import { TriggerFlowNode } from '@/lib/types/flow';
import { useFlowStore } from '@/lib/store/flowStore';
import { EmojiPicker } from './EmojiPicker';

interface TriggerEditorProps {
  node: TriggerFlowNode;
}

export function TriggerEditor({ node }: TriggerEditorProps) {
  const updateNodeData = useFlowStore((state) => state.updateNodeData);

  const handleKeywordsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const keywords = event.target.value
      .split('\n')
      .map((keyword) => keyword.trim())
      .filter(Boolean);

    updateNodeData(node.id, { keywords });
  };

  const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(node.id, { label: event.target.value });
  };

  const toggleExactMatch = () => {
    updateNodeData(node.id, { exactMatch: !node.data.exactMatch });
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
                placeholder="Trigger Keywords"
              />
            </label>
            <p className="mt-1 text-xs text-neutral-500">
              Shown inside the trigger node header.
            </p>
          </div>
        </div>
      </section>

      {/* Keywords */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-neutral-800">Trigger Keywords</h3>
            <p className="text-xs text-neutral-500">
              One keyword per line. Accents and case are ignored automatically.
            </p>
          </div>
        </div>

        <textarea
          value={node.data.keywords.join('\n')}
          onChange={handleKeywordsChange}
          className="h-36 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 shadow-inner focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder={'saç\nsac\nhair'}
        />
      </section>

      {/* Matching behaviour */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-800">Matching Behaviour</h3>
        <p className="mt-1 text-xs text-neutral-500">
          Decide whether the keyword must match the entire message or can appear anywhere.
        </p>

        <button
          type="button"
          onClick={toggleExactMatch}
          className={clsx(
            'mt-4 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition',
            node.data.exactMatch
              ? 'border-primary-300 bg-primary-50 text-primary-600'
              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-primary-200 hover:bg-primary-50/50'
          )}
        >
          <div>
            <p className="text-sm font-semibold">
              {node.data.exactMatch ? 'Exact Match' : 'Contains Keyword'}
            </p>
            <p className="text-xs text-neutral-500">
              {node.data.exactMatch
                ? 'Keyword must be the only word sent by the user.'
                : 'Keyword can appear anywhere inside the message.'}
            </p>
          </div>
          <span className="text-sm font-semibold text-neutral-600">{node.data.exactMatch ? 'Exact' : 'Partial'}</span>
        </button>
      </section>
    </div>
  );
}

