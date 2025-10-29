'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export function TopControls() {
  const router = useRouter();
  const { currentFlow, isEditMode, hasUnsavedChanges, undo, redo, canUndo, canRedo, saveFlow, enterEditMode, exitEditMode } = useFlowStore();
  const { getCurrentAccount } = useAccountStore();
  const { isSavingFlow, setIsSavingFlow, showNotification } = useUIStore();

  const currentAccount = getCurrentAccount();
  const [flowStatus, setFlowStatus] = useState<FlowStatus>(currentFlow?.status || 'inactive');

  if (!currentFlow || !currentAccount) return null;

  const quotaPercentage = (currentAccount.usedQuota / currentAccount.totalQuota) * 100;

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
    router.push('/automations');
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
          {/* Progress Bar */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-600">Total Quota</span>
              <span className="text-xs font-semibold text-neutral-700">
                {currentAccount.totalQuota}
              </span>
            </div>

            <div className="h-2.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  quotaPercentage > 90
                    ? 'bg-red-500'
                    : quotaPercentage > 70
                    ? 'bg-yellow-500'
                    : 'bg-gradient-to-r from-primary-500 to-accent-500'
                }`}
                style={{ width: `${Math.min(quotaPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Status Switcher & Edit Button */}
          <div className="flex items-center gap-4 ml-8">
            {/* 3-Way Status Switch */}
            <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-xl">
              <button
                onClick={() => setFlowStatus('inactive')}
                disabled={isEditMode}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  flowStatus === 'inactive'
                    ? 'bg-neutral-700 text-white shadow-lg'
                    : 'text-neutral-600 hover:text-neutral-900'
                } ${isEditMode ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ○ Inactive
              </button>

              <button
                onClick={() => setFlowStatus('test')}
                disabled={isEditMode}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  flowStatus === 'test'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-neutral-600 hover:text-neutral-900'
                } ${isEditMode ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ● Test
              </button>

              <button
                onClick={() => setFlowStatus('active')}
                disabled={isEditMode}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  flowStatus === 'active'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'text-neutral-600 hover:text-neutral-900'
                } ${isEditMode ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                ● Active
              </button>
            </div>

            {/* Edit/Save Button */}
            {!isEditMode ? (
              <Button
                variant="outline"
                size="lg"
                onClick={enterEditMode}
                className="border-2"
              >
                Edit Automation
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleSave}
                loading={isSavingFlow}
                disabled={!hasUnsavedChanges}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
              >
                {isSavingFlow ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
