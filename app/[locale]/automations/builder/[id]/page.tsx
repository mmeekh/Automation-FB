'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useFlowStore } from '@/lib/store/flowStore';
import { AutomationSidebar } from '@/components/layout/AutomationSidebar';
import { FlowCanvas } from '@/components/automation-builder/FlowCanvas';
import { TopControls } from '@/components/automation-builder/TopControls';
import { NodeEditorPanel } from '@/components/automation-builder/editors';
import { Button } from '@/components/ui/Button';

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
        <div className="max-w-md w-full text-center bg-white border border-neutral-200/80 rounded-3xl shadow-xl p-10 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white text-2xl shadow-lg">
            ⚙️
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Otomasyon stüdyosuna erişmek için giriş yapın
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Hazırladığınız akışları düzenleyebilmek için Google veya Instagram hesabınızla oturum açmanız
            gerekiyor. Giriş yaptıktan sonra seçtiğiniz akış otomatik olarak yüklenir.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              onClick={openAuthModal}
              className="w-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              Giriş Yap
            </Button>
            <p className="text-xs text-neutral-500">
              Yetkili bir hesapla giriş yaptıktan sonra aynı bağlantıyı tekrar kullanabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    );
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
        <div className="flex-1 overflow-hidden">
          <FlowCanvas />
        </div>

        <NodeEditorPanel />
      </div>
    </div>
  );
}
