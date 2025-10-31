'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  FALLBACK_ACCOUNT_ID,
  useActiveAutomationStore,
} from '@/lib/store/activeAutomationStore';
import { useAccountStore } from '@/lib/store/accountStore';
import { useUIStore } from '@/lib/store/uiStore';

type LaunchOptions = {
  view?: 'analytics' | 'flow';
  mode?: 'push' | 'replace';
};

export function useAutomationLauncher() {
  const router = useRouter();
  const addAutomation = useActiveAutomationStore((state) => state.addAutomation);
  const setCurrentAutomation = useActiveAutomationStore(
    (state) => state.setCurrentAutomation
  );

  return useCallback(
    (templateId: string, options?: LaunchOptions) => {
      let accountState = useAccountStore.getState();

      if (accountState.accounts.length === 0) {
        accountState.loadAccounts();
        accountState = useAccountStore.getState();
      }

      let accountId = accountState.currentAccountId;

      if (!accountId) {
        accountId = accountState.accounts[0]?.id ?? FALLBACK_ACCOUNT_ID;

        if (accountState.accounts[0]?.id) {
          accountState.selectAccount(accountState.accounts[0].id);
        }
      }

      addAutomation(accountId, templateId);
      setCurrentAutomation(accountId, templateId);

      const uiState = useUIStore.getState();
      if (options?.view === 'analytics') {
        uiState.showBuilderAnalytics();
      } else {
        uiState.showBuilderFlow();
      }

      const target =
        options?.view === 'analytics'
          ? '/automations/builder?view=analytics'
          : '/automations/builder';

      if (options?.mode === 'replace') {
        router.replace(target);
      } else {
        router.push(target);
      }
    },
    [router, addAutomation, setCurrentAutomation]
  );
}
