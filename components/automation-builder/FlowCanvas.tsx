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

  /**
   * Handle new connections (edges)
   */
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!currentFlow || !isEditMode) return; // Only allow connections in edit mode

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
    [currentFlow, onEdgesChange, isEditMode]
  );

  if (!currentFlow) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-100">
        <p className="text-neutral-500">No flow loaded</p>
      </div>
    );
  }

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

    </div>
  );
}

