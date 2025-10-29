'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useFlowStore } from '@/lib/store/flowStore';
import { AutomationSidebar } from '@/components/layout/AutomationSidebar';
import { FlowCanvas } from '@/components/automation-builder/FlowCanvas';
import { TopControls } from '@/components/automation-builder/TopControls';
import { NodeEditorPanel } from '@/components/automation-builder/editors';
import { BuilderAnalyticsView } from '@/components/automation-builder/BuilderAnalyticsView';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/lib/store/uiStore';

export default function FlowBuilderPage() {
  const params = useParams();
  const flowId = params.id as string;

  const user = useStore((state) => state.user);
  const openAuthModal = useStore((state) => state.openAuthModal);

  const { currentFlow, loadFlow } = useFlowStore();
  const hasPromptedAuth = useRef(false);

  useEffect(() => {
    if (!user && !hasPromptedAuth.current) {
      openAuthModal();
      hasPromptedAuth.current = true;
    }
  }, [user, openAuthModal]);

  useEffect(() => {
    if (user && flowId) {
      loadFlow(flowId);
    }
  }, [user, flowId, loadFlow]);

  if (!user) {
    return null;
  }

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
        <MainArea />

        <NodeEditorPanel />
      </div>
    </div>
  );
}

function MainArea() {
  const view = useUIStore((s) => s.builderView);
  return (
    <div className="flex-1 overflow-hidden">
      {view === 'analytics' ? <BuilderAnalyticsView /> : <FlowCanvas />}
    </div>
  );
}
