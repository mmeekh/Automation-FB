'use client';

import { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { useFlowStore } from '@/lib/store/flowStore';
import { useUIStore } from '@/lib/store/uiStore';
import type {
  FlowNode,
  MessageFlowNode,
  ImageRequestFlowNode,
  TriggerFlowNode,
  ResultFlowNode,
} from '@/lib/types/flow';
import { MessageEditor } from './MessageEditor';
import { ImageRequestEditor } from './ImageRequestEditor';
import { TriggerEditor } from './TriggerEditor';
import { ResultEditor } from './ResultEditor';

export function NodeEditorPanel() {
  const { isNodeEditorOpen, editingNodeId, closeNodeEditor } = useUIStore();
  const { currentFlow, isEditMode } = useFlowStore();

  // Close editor automatically if leaving edit mode
  useEffect(() => {
    if (!isEditMode && isNodeEditorOpen) {
      closeNodeEditor();
    }
  }, [isEditMode, isNodeEditorOpen, closeNodeEditor]);

  const node = useMemo<FlowNode | null>(() => {
    if (!currentFlow || !editingNodeId) return null;
    return currentFlow.nodes.find((n) => n.id === editingNodeId) ?? null;
  }, [currentFlow, editingNodeId]);

  // Prevent rendering when editor is closed or node missing
  if (!isNodeEditorOpen || !node || !isEditMode) {
    return null;
  }

  const renderEditor = () => {
    switch (node.type) {
      case 'message':
        return <MessageEditor node={node as MessageFlowNode} />;
      case 'image_request':
        return <ImageRequestEditor node={node as ImageRequestFlowNode} />;
      case 'trigger':
        return <TriggerEditor node={node as TriggerFlowNode} />;
      case 'result':
        return <ResultEditor node={node as ResultFlowNode} />;
      default:
        return (
          <div className="p-6">
            <p className="text-sm text-neutral-600">
              Editing for this node type is not yet supported.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={closeNodeEditor}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={clsx(
          'fixed top-0 right-0 z-50 h-full w-full max-w-[420px] transform bg-white shadow-2xl transition-transform duration-300',
          isNodeEditorOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="node-editor-title"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-neutral-200 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                Editing {node.type.replace('_', ' ')}
              </p>
              <h2
                id="node-editor-title"
                className="mt-1 text-xl font-bold text-neutral-900"
              >
                {node.data.label || 'Untitled Node'}
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Update the content and behavior of this node. Changes are saved locally until you
                click &quot;Save Changes&quot; in the toolbar.
              </p>
            </div>

            <button
              onClick={closeNodeEditor}
              className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close node editor"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Editor body */}
          <div className="flex-1 overflow-y-auto">
            {renderEditor()}
          </div>
        </div>
      </aside>
    </>
  );
}
