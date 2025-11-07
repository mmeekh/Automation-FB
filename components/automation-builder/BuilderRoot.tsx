'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useStore } from '@/lib/store';
import { useFlowStore } from '@/lib/store/flowStore';
import { useAccountStore } from '@/lib/store/accountStore';
import {
  FALLBACK_ACCOUNT_ID,
  useActiveAutomationStore,
} from '@/lib/store/activeAutomationStore';
import { useUIStore } from '@/lib/store/uiStore';
import { AutomationSidebar } from '@/components/layout/AutomationSidebar';
import { FlowCanvas } from '@/components/automation-builder/FlowCanvas';
import { TopControls } from '@/components/automation-builder/TopControls';
import { NodeEditorPanel } from '@/components/automation-builder/editors';
import { BuilderAnalyticsView } from '@/components/automation-builder/BuilderAnalyticsView';

type BuilderRootProps = {
  initialTemplateId?: string;
  initialView?: 'flow' | 'analytics';
};

export function BuilderRoot({ initialTemplateId, initialView }: BuilderRootProps) {
  const user = useStore((state) => state.user);
  const openAuthModal = useStore((state) => state.openAuthModal);

  const { currentFlow, loadFlow, clearFlow, isEditMode, applyFollowerMode } = useFlowStore((state) => ({
    currentFlow: state.currentFlow,
    loadFlow: state.loadFlow,
    clearFlow: state.clearFlow,
    isEditMode: state.isEditMode,
    applyFollowerMode: state.applyFollowerMode,
  }));

  const {
    accounts,
    currentAccountId,
    loadAccounts,
    selectAccount,
  } = useAccountStore();

  const accountId = useMemo(() => {
    if (currentAccountId) return currentAccountId;
    if (accounts[0]?.id) return accounts[0].id;
    return FALLBACK_ACCOUNT_ID;
  }, [currentAccountId, accounts]);

  const activeAutomations = useActiveAutomationStore(
    (state) => state.activeByAccount[accountId] ?? []
  );
  const currentTemplateId = useActiveAutomationStore(
    (state) => state.currentByAccount[accountId] ?? null
  );
  const currentAutomation = useMemo(
    () => activeAutomations.find((automation) => automation.templateId === currentTemplateId) ?? null,
    [activeAutomations, currentTemplateId]
  );
  const addAutomation = useActiveAutomationStore((state) => state.addAutomation);
  const setCurrentAutomation = useActiveAutomationStore(
    (state) => state.setCurrentAutomation
  );
  const clearAutomations = useActiveAutomationStore(
    (state) => state.clearAutomations
  );

  const builderView = useUIStore((state) => state.builderView);
  const showBuilderFlow = useUIStore((state) => state.showBuilderFlow);
  const showBuilderAnalytics = useUIStore((state) => state.showBuilderAnalytics);

  const authPromptedRef = useRef(false);
  const initialFlowRef = useRef<string | null>(null);
  const initialViewSyncedRef = useRef(false);

  // Ensure accounts are loaded
  useEffect(() => {
    if (accounts.length === 0) {
      loadAccounts();
    }
  }, [accounts.length, loadAccounts]);

  // Auto-select first account if none chosen
  useEffect(() => {
    if (!currentAccountId && accounts[0]?.id) {
      selectAccount(accounts[0].id);
    }
  }, [currentAccountId, accounts, selectAccount]);

  useEffect(() => {
    if (accountId !== FALLBACK_ACCOUNT_ID) {
      clearAutomations(FALLBACK_ACCOUNT_ID);
    }
  }, [accountId, clearAutomations]);

  // Handle authentication prompt
  useEffect(() => {
    if (!user && !authPromptedRef.current) {
      openAuthModal();
      authPromptedRef.current = true;
    }
  }, [user, openAuthModal]);

  // Apply initial view (only once)
  useEffect(() => {
    if (initialViewSyncedRef.current) return;

    if (initialView === 'analytics') {
      showBuilderAnalytics();
    } else {
      showBuilderFlow();
    }

    initialViewSyncedRef.current = true;
  }, [initialView, showBuilderAnalytics, showBuilderFlow]);

  // Add automation if template provided via URL (once per account/template pair)
  useEffect(() => {
    if (!initialTemplateId) return;
    if (initialFlowRef.current === `${accountId}:${initialTemplateId}`) return;

    addAutomation(accountId, initialTemplateId);
    setCurrentAutomation(accountId, initialTemplateId);
    initialFlowRef.current = `${accountId}:${initialTemplateId}`;
  }, [initialTemplateId, accountId, addAutomation, setCurrentAutomation]);

  // Ensure there is a current automation when list is non-empty
  useEffect(() => {
    if (activeAutomations.length === 0) {
      return;
    }

    if (!currentTemplateId) {
      setCurrentAutomation(accountId, activeAutomations[0].templateId);
    }
  }, [activeAutomations, currentTemplateId, accountId, setCurrentAutomation]);

  // Load flow data when selection changes
  useEffect(() => {
    if (!user) {
      clearFlow();
      return;
    }

    if (currentAutomation) {
      // Only load if it's a different flow or no flow is loaded
      if (!currentFlow || currentFlow.id !== currentAutomation.flowId) {
        loadFlow(currentAutomation.flowId);
      }
      if (builderView !== 'analytics') {
        showBuilderFlow();
      }
    } else {
      clearFlow();
    }
  }, [
    user,
    currentAutomation,
    currentFlow,
    loadFlow,
    clearFlow,
    builderView,
    showBuilderFlow,
  ]);

  useEffect(() => {
    if (!currentAutomation || !currentFlow) {
      return;
    }

    applyFollowerMode(currentAutomation.followerModeEnabled ?? false);
  }, [applyFollowerMode, currentAutomation, currentFlow]);

  if (!user) {
    return null;
  }

  const hasActiveFlow = Boolean(currentFlow && currentAutomation);
  const isAnalyticsView = builderView === 'analytics';

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      <AutomationSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopControls />

        <div className="flex-1 overflow-hidden">
          {hasActiveFlow ? (
            isAnalyticsView ? (
              <BuilderAnalyticsView />
            ) : (
              <div className="flex h-full flex-col">
                <FlowModeBanner isEditMode={isEditMode} />
                <div className="flex-1">
                  <FlowCanvas />
                </div>
              </div>
            )
          ) : (
            <EmptyState />
          )}
        </div>

        <NodeEditorPanel />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-neutral-50 text-center text-neutral-600">
      <div className="rounded-full bg-gradient-to-br from-primary-100 to-accent-100 p-6 shadow-inner">
        <span className="text-3xl">✨</span>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          Henüz aktif otomasyon yok
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-500">
          Soldaki “Active Automations” bölümünden + butonuna tıklayarak yeni bir
          otomasyon ekleyin ve düzenlemeye başlayın.
        </p>
      </div>
    </div>
  );
}

function FlowModeBanner({ isEditMode }: { isEditMode: boolean }) {
  return (
    <div className="border-b border-neutral-200 bg-neutral-100 px-6 py-3">
      <p
        className={`text-sm font-semibold ${
          isEditMode ? 'text-emerald-700' : 'text-neutral-700'
        }`}
      >
        {isEditMode
          ? 'Edit mode - drag nodes or click a card to update content'
          : 'View mode - click "Edit Automation" to make changes'}
      </p>
    </div>
  );
}
