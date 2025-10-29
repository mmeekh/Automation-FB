'use client';

import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Connection,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowStore } from '@/lib/store/flowStore';
import { FlowEdge } from '@/lib/types/flow';

// Import custom nodes
import { TriggerNode } from './nodes/TriggerNode';
import { MessageNode } from './nodes/MessageNode';
import { ImageRequestNode } from './nodes/ImageRequestNode';
import { ResultNode } from './nodes/ResultNode';

// Register custom node types
const nodeTypes = {
  trigger: TriggerNode,
  message: MessageNode,
  image_request: ImageRequestNode,
  result: ResultNode,
};

export function FlowCanvas() {
  const { currentFlow, onNodesChange, onEdgesChange, isEditMode } = useFlowStore();

  if (!currentFlow) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-100">
        <p className="text-neutral-500">No flow loaded</p>
      </div>
    );
  }

  /**
   * Handle new connections (edges)
   */
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isEditMode) return; // Only allow connections in edit mode

      const newEdge: FlowEdge = {
        id: `e-${connection.source}-${connection.target}`,
        source: connection.source!,
        target: connection.target!,
        type: 'default',
      };

      const updatedEdges = addEdge(newEdge, currentFlow.edges);
      onEdgesChange([
        {
          type: 'add',
          item: newEdge,
        },
      ]);
    },
    [currentFlow.edges, onEdgesChange, isEditMode]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={currentFlow.nodes}
        edges={currentFlow.edges}
        onNodesChange={isEditMode ? onNodesChange : undefined} // Only allow changes in edit mode
        onEdgesChange={isEditMode ? onEdgesChange : undefined}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        nodesDraggable={isEditMode} // Only draggable in edit mode
        nodesConnectable={isEditMode}
        elementsSelectable={isEditMode}
        // Clean edge styling
        defaultEdgeOptions={{
          type: 'default',
          animated: false,
          style: { stroke: '#8b5cf6', strokeWidth: 2 },
        }}
      >
        {/* Background grid */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#e5e5e5"
        />

        {/* Controls (zoom, fit view) */}
        <Controls
          showInteractive={false}
          className="bg-white border border-neutral-200 rounded-xl shadow-lg"
        />
      </ReactFlow>

      {/* Edit Mode Indicator */}
      {!isEditMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-lg">
            View mode - click "Edit Automation" to make changes
          </div>
        </div>
      )}

      {isEditMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg animate-pulse">
            Edit mode - drag nodes or click a card to update content
          </div>
        </div>
      )}
    </div>
  );
}

