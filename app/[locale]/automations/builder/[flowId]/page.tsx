'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useFlowStore } from '@/lib/store/flowStore';
import { AutomationSidebar } from '@/components/layout/AutomationSidebar';
import { FlowCanvas } from '@/components/automation-builder/FlowCanvas';
import { TopControls } from '@/components/automation-builder/TopControls';

export default function FlowBuilderPage() {
  const params = useParams();
  const flowId = params.flowId as string;

  const { currentFlow, loadFlow } = useFlowStore();

  // Load flow on mount
  useEffect(() => {
    if (flowId) {
      loadFlow(flowId);
    }
  }, [flowId, loadFlow]);

  if (!currentFlow) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-neutral-600">Loading automation flow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Left Sidebar */}
      <AutomationSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Controls */}
        <TopControls />

        {/* Flow Canvas */}
        <div className="flex-1 overflow-hidden">
          <FlowCanvas />
        </div>
      </div>
    </div>
  );
}
