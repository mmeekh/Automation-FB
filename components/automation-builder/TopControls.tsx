'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useFlowStore } from '@/lib/store/flowStore';
import { useAccountStore } from '@/lib/store/accountStore';
import { useUIStore } from '@/lib/store/uiStore';
import { Button } from '@/components';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

type FlowStatus = 'inactive' | 'test' | 'active';

const getQuotaStyle = (percentage: number) => {
  if (percentage >= 90) {
    return { bar: 'bg-red-500', text: 'text-red-600' };
  }
  if (percentage >= 75) {
    return { bar: 'bg-orange-500', text: 'text-orange-500' };
  }
  if (percentage >= 50) {
    return { bar: 'bg-yellow-500', text: 'text-yellow-500' };
  }
  return { bar: 'bg-green-500', text: 'text-green-600' };
};

export function TopControls() {
  const router = useRouter();
  const locale = useLocale();
  const { currentFlow, isEditMode, hasUnsavedChanges, undo, redo, canUndo, canRedo, saveFlow, enterEditMode, exitEditMode } = useFlowStore();
  const { getCurrentAccount, accounts } = useAccountStore();
  const { isSavingFlow, setIsSavingFlow, showNotification, builderView } = useUIStore();

  const currentAccount = getCurrentAccount();
  const [flowStatus, setFlowStatus] = useState<FlowStatus>(currentFlow?.status || 'inactive');
  const [showTooltip, setShowTooltip] = useState(false);

  if (!currentFlow || !currentAccount) return null;

  // Calculate global total generations across all accounts
  const globalTotalGenerations = accounts.reduce((sum, acc) => sum + (acc.totalGenerations || 0), 0);
  const globalTotalLimit = accounts.reduce((sum, acc) => sum + (acc.totalGenerationLimit || 0), 0);

  // Filter only connected accounts for tooltip
  const connectedAccounts = accounts.filter(acc => acc.isConnected);

  const handleSave = async () => {
    setIsSavingFlow(true);

    try {
      await saveFlow();
      showNotification('Flow saved successfully!', 'success');
      exitEditMode();
    } catch (error) {
      showNotification('Failed to save flow', 'error');
    } finally {
      setIsSavingFlow(false);
    }
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmed = confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmed) return;
    }
    router.push(`/${locale}/automations`);
  };

  return (
    <div className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-full mx-auto px-6 py-4">
        {/* Top Row - Back button & Flow name */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="border-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </Button>

            <div>
              <h1 className="text-lg font-bold text-neutral-900">{currentFlow.name}</h1>
              <p className="text-sm text-neutral-600">{currentFlow.description}</p>
            </div>
          </div>

          {/* Undo/Redo - Only in edit mode */}
          {isEditMode && (
            <div className="flex items-center gap-2">
              <button
                onClick={undo}
                disabled={!canUndo()}
                className="p-2 rounded-lg hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Undo (Ctrl+Z)"
              >
                <ArrowUturnLeftIcon className="w-5 h-5 text-neutral-600" />
              </button>

              <button
                onClick={redo}
                disabled={!canRedo()}
                className="p-2 rounded-lg hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Redo (Ctrl+Y)"
              >
                <ArrowUturnRightIcon className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Row - Progress & Controls */}
        <div className="flex items-center justify-between">
          {/* Generation Stats with Progress Bar */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-700">Toplam Üretim</span>
              <span className="text-xs font-bold text-primary-600">
                {globalTotalGenerations.toLocaleString('tr-TR')} / {globalTotalLimit.toLocaleString('tr-TR')}
              </span>
            </div>
            <div className="relative">
              <div
                className="relative h-2.5 bg-neutral-200 rounded-full overflow-hidden cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
                  style={{
                    width: `${Math.min((globalTotalGenerations / globalTotalLimit) * 100, 100)}%`
                  }}
                />
              </div>

              {/* Tooltip */}
              {showTooltip && connectedAccounts.length > 0 && (
                <div className="absolute bottom-full left-0 mb-2 bg-neutral-900 text-white text-xs rounded-lg p-3 shadow-xl z-50 min-w-[280px]">
                  <div className="space-y-2">
                    <div className="text-neutral-400 font-semibold mb-2 pb-2 border-b border-neutral-700">
                      Hesap Bazlı Üretimler
                    </div>
                    {connectedAccounts.map(acc => (
                      <div key={acc.id} className="flex justify-between items-center">
                        <span className="text-neutral-300">@{acc.username}</span>
                        <span className="font-semibold text-white">
                          {(acc.totalGenerations || 0).toLocaleString('tr-TR')} / {(acc.totalGenerationLimit || 0).toLocaleString('tr-TR')}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900"></div>
                </div>
              )}
            </div>
            <p className="mt-1.5 text-[10px] text-neutral-500">
              Kalan: {(globalTotalLimit - globalTotalGenerations).toLocaleString('tr-TR')} üretim
            </p>
          </div>

          {/* Status Switcher & Edit Button */}
          {builderView === 'flow' && (
            <div className="flex items-center gap-3 ml-4">
              {/* 3-Way Status Switch */}
              <div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white/90 p-0.5 shadow-sm">
                <button
                  onClick={() => setFlowStatus('inactive')}
                  disabled={isEditMode}
                  className={`px-3 py-1.5 text-xs font-semibold transition-all rounded-md ${
                    flowStatus === 'inactive'
                      ? 'bg-neutral-700 text-white shadow-md'
                      : 'text-neutral-600 hover:text-neutral-900'
                  } ${isEditMode ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  ○ Inactive
                </button>

                <button
                  onClick={() => setFlowStatus('test')}
                  disabled={isEditMode}
                  className={`px-3 py-1.5 text-xs font-semibold transition-all rounded-md ${
                    flowStatus === 'test'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md'
                      : 'text-neutral-600 hover:text-neutral-900'
                  } ${isEditMode ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  ● Test
                </button>

                <button
                  onClick={() => setFlowStatus('active')}
                  disabled={isEditMode}
                  className={`px-3 py-1.5 text-xs font-semibold transition-all rounded-md ${
                    flowStatus === 'active'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                      : 'text-neutral-600 hover:text-neutral-900'
                  } ${isEditMode ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  ● Active
                </button>
              </div>

              {/* Edit/Save Button */}
              {!isEditMode ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={enterEditMode}
                  className="border border-primary-500"
                >
                  Edit Automation
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSave}
                  loading={isSavingFlow}
                  disabled={!hasUnsavedChanges}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
                >
                  {isSavingFlow ? 'Saving...' : 'Save Changes'}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
