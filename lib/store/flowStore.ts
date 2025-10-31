'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AutomationFlow, FlowNode, FlowEdge, FlowNodeData } from '../types/flow';
import { getMockFlowById } from '../mock-data/flows';
import {  applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';

function cloneNode(node: FlowNode): FlowNode {
  return {
    ...node,
    position: { ...node.position },
    data: JSON.parse(JSON.stringify(node.data)),
  };
}

function cloneEdge(edge: FlowEdge): FlowEdge {
  return { ...edge };
}

function cloneNodes(nodes: FlowNode[]): FlowNode[] {
  return nodes.map((node) => cloneNode(node));
}

function cloneEdges(edges: FlowEdge[]): FlowEdge[] {
  return edges.map((edge) => cloneEdge(edge));
}

function cloneFlow(flow: AutomationFlow): AutomationFlow {
  return {
    ...flow,
    nodes: cloneNodes(flow.nodes),
    edges: cloneEdges(flow.edges),
  };
}

/**
 * History state for undo/redo
 */
interface HistoryState {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

interface FlowStore {
  // Current flow being edited
  currentFlow: AutomationFlow | null;

  // Undo/redo history
  history: HistoryState[];
  historyIndex: number;
  maxHistorySize: number;

  // Edit mode tracking
  isEditMode: boolean;
  hasUnsavedChanges: boolean;

  // Actions
  loadFlow: (flowId: string) => void;
  clearFlow: () => void;

  // Node & Edge updates (React Flow integration)
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;

  // Node CRUD
  updateNodeData: (nodeId: string, data: Partial<FlowNodeData>) => void;
  addNode: (node: FlowNode) => void;
  deleteNode: (nodeId: string) => void;

  // Edge CRUD
  addEdge: (edge: FlowEdge) => void;
  deleteEdge: (edgeId: string) => void;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Save changes
  saveFlow: () => Promise<void>;
  discardChanges: () => void;

  // Edit mode
  enterEditMode: () => void;
  exitEditMode: () => void;

  // History management
  addToHistory: () => void;
}

export const useFlowStore = create<FlowStore>()(
  persist(
    (set, get) => ({
      currentFlow: null,
      history: [],
      historyIndex: -1,
      maxHistorySize: 50,
      isEditMode: false,
      hasUnsavedChanges: false,

      /**
       * Load a flow by ID
       */
      loadFlow: (flowId) => {
        const sourceFlow = getMockFlowById(flowId);
        if (!sourceFlow) return;

        const flow = cloneFlow(sourceFlow);

        if (flow) {
          set({
            currentFlow: flow,
            history: [{ nodes: cloneNodes(flow.nodes), edges: cloneEdges(flow.edges) }],
            historyIndex: 0,
            isEditMode: false,
            hasUnsavedChanges: false,
          });
        }
      },

      /**
       * Clear current flow
       */
      clearFlow: () => {
        set({
          currentFlow: null,
          history: [],
          historyIndex: -1,
          isEditMode: false,
          hasUnsavedChanges: false,
        });
      },

      /**
       * Handle React Flow node changes
       */
      onNodesChange: (changes) => {
        const { currentFlow } = get();
        if (!currentFlow) return;

        const newNodes = applyNodeChanges(changes, currentFlow.nodes) as FlowNode[];

        set({
          currentFlow: {
            ...currentFlow,
            nodes: newNodes,
          },
          hasUnsavedChanges: true,
        });

        // Add to history after position changes
        if (changes.some((c) => c.type === 'position' && !c.dragging)) {
          get().addToHistory();
        }
      },

      /**
       * Handle React Flow edge changes
       */
      onEdgesChange: (changes) => {
        const { currentFlow } = get();
        if (!currentFlow) return;

        const newEdges = applyEdgeChanges(changes, currentFlow.edges) as FlowEdge[];

        set({
          currentFlow: {
            ...currentFlow,
            edges: newEdges,
          },
          hasUnsavedChanges: true,
        });

        get().addToHistory();
      },

      /**
       * Update node data
       */
      updateNodeData: (nodeId, data) => {
        const { currentFlow } = get();
        if (!currentFlow) return;

        const newNodes = currentFlow.nodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...data,
                },
              }
            : node
        );

        set({
          currentFlow: {
            ...currentFlow,
            nodes: newNodes,
          },
          hasUnsavedChanges: true,
        });

        get().addToHistory();
      },

      /**
       * Add new node
       */
      addNode: (node) => {
        const { currentFlow } = get();
        if (!currentFlow) return;

        set({
          currentFlow: {
            ...currentFlow,
            nodes: [...currentFlow.nodes, node],
          },
          hasUnsavedChanges: true,
        });

        get().addToHistory();
      },

      /**
       * Delete node
       */
      deleteNode: (nodeId) => {
        const { currentFlow } = get();
        if (!currentFlow) return;

        // Also remove connected edges
        const newNodes = currentFlow.nodes.filter((n) => n.id !== nodeId);
        const newEdges = currentFlow.edges.filter(
          (e) => e.source !== nodeId && e.target !== nodeId
        );

        set({
          currentFlow: {
            ...currentFlow,
            nodes: newNodes,
            edges: newEdges,
          },
          hasUnsavedChanges: true,
        });

        get().addToHistory();
      },

      /**
       * Add edge
       */
      addEdge: (edge) => {
        const { currentFlow } = get();
        if (!currentFlow) return;

        set({
          currentFlow: {
            ...currentFlow,
            edges: [...currentFlow.edges, edge],
          },
          hasUnsavedChanges: true,
        });

        get().addToHistory();
      },

      /**
       * Delete edge
       */
      deleteEdge: (edgeId) => {
        const { currentFlow } = get();
        if (!currentFlow) return;

        set({
          currentFlow: {
            ...currentFlow,
            edges: currentFlow.edges.filter((e) => e.id !== edgeId),
          },
          hasUnsavedChanges: true,
        });

        get().addToHistory();
      },

      /**
       * Add current state to history
       */
      addToHistory: () => {
        const { currentFlow, history, historyIndex, maxHistorySize } = get();
        if (!currentFlow) return;

        const newHistoryState: HistoryState = {
          nodes: cloneNodes(currentFlow.nodes),
          edges: cloneEdges(currentFlow.edges),
        };

        // Remove future history if we're not at the end
        const newHistory = history.slice(0, historyIndex + 1);

        // Add new state
        newHistory.push(newHistoryState);

        // Limit history size
        if (newHistory.length > maxHistorySize) {
          newHistory.shift();
        }

        set({
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      /**
       * Undo last change
       */
      undo: () => {
        const { currentFlow, history, historyIndex } = get();
        if (!currentFlow || historyIndex <= 0) return;

        const newIndex = historyIndex - 1;
        const previousState = history[newIndex];

        set({
          currentFlow: {
            ...currentFlow,
            nodes: cloneNodes(previousState.nodes),
            edges: cloneEdges(previousState.edges),
          },
          historyIndex: newIndex,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Redo change
       */
      redo: () => {
        const { currentFlow, history, historyIndex } = get();
        if (!currentFlow || historyIndex >= history.length - 1) return;

        const newIndex = historyIndex + 1;
        const nextState = history[newIndex];

        set({
          currentFlow: {
            ...currentFlow,
            nodes: cloneNodes(nextState.nodes),
            edges: cloneEdges(nextState.edges),
          },
          historyIndex: newIndex,
          hasUnsavedChanges: true,
        });
      },

      /**
       * Check if can undo
       */
      canUndo: () => {
        const { historyIndex } = get();
        return historyIndex > 0;
      },

      /**
       * Check if can redo
       */
      canRedo: () => {
        const { history, historyIndex } = get();
        return historyIndex < history.length - 1;
      },

      /**
       * Save flow changes
       */
      saveFlow: async () => {
        const { currentFlow } = get();
        if (!currentFlow) return;

        // TODO: Send to backend API
        console.log('Saving flow:', currentFlow);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        set({
          hasUnsavedChanges: false,
        });
      },

      /**
       * Discard unsaved changes
       */
      discardChanges: () => {
        const { currentFlow } = get();
        if (!currentFlow) return;

        // Reload from original
        get().loadFlow(currentFlow.id);
      },

      /**
       * Enter edit mode
       */
      enterEditMode: () => {
        set({ isEditMode: true });
      },

      /**
       * Exit edit mode (discard changes if any)
       */
      exitEditMode: () => {
        const { hasUnsavedChanges } = get();

        if (hasUnsavedChanges) {
          const confirmed = confirm(
            'You have unsaved changes. Are you sure you want to exit edit mode?'
          );
          if (!confirmed) return;

          get().discardChanges();
        }

        set({ isEditMode: false });
      },
    }),
    {
      name: 'flow-storage',
      // Don't persist history (too large)
      partialize: () => ({}),
    }
  )
);
