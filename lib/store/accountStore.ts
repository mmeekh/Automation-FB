'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InstagramAccount } from '../types/account';
import { mockAccounts, getConnectedAccounts } from '../mock-data/accounts';

interface AccountStore {
  // All accounts
  accounts: InstagramAccount[];

  // Currently selected account
  currentAccountId: string | null;

  // Actions
  loadAccounts: () => void;
  selectAccount: (accountId: string) => void;
  getCurrentAccount: () => InstagramAccount | null;
  getConnectedAccounts: () => InstagramAccount[];

  // Account management
  addAccount: (account: InstagramAccount) => void;
  removeAccount: (accountId: string) => void;
  updateAccount: (accountId: string, updates: Partial<InstagramAccount>) => void;

  // Quota management
  updateQuota: (accountId: string, usedQuota: number) => void;
  resetQuota: (accountId: string) => void;

  // Account actions
  toggleAccountActive: (accountId: string) => void;
  toggleAccountCreditPool: (accountId: string) => void;
}

export const useAccountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
      accounts: [],
      currentAccountId: null,

      /**
       * Load mock accounts
       */
      loadAccounts: () => {
        const normalizedAccounts = mockAccounts.map((account) => ({
          ...account,
          isActive: account.isActive ?? true,
          includedInCreditPool: account.includedInCreditPool ?? false,
        }));

        set({
          accounts: normalizedAccounts,
          currentAccountId: normalizedAccounts[0]?.id || null,
        });
      },

      /**
       * Select an account
       */
      selectAccount: (accountId) => {
        set({ currentAccountId: accountId });
      },

      /**
       * Get current account
       */
      getCurrentAccount: () => {
        const { accounts, currentAccountId } = get();
        return accounts.find((acc) => acc.id === currentAccountId) || null;
      },

      /**
       * Get only connected accounts
       */
      getConnectedAccounts: () => {
        const { accounts } = get();
        return accounts.filter((acc) => acc.isConnected);
      },

      /**
       * Add new account
       */
      addAccount: (account) => {
        set((state) => ({
          accounts: [
            ...state.accounts,
            {
              ...account,
              isActive: account.isActive ?? true,
              includedInCreditPool: account.includedInCreditPool ?? false,
            },
          ],
        }));

        // Auto-select if first account
        if (get().currentAccountId === null) {
          set({ currentAccountId: account.id });
        }
      },

      /**
       * Remove account
       */
      removeAccount: (accountId) => {
        const { accounts, currentAccountId } = get();

        set({
          accounts: accounts.filter((acc) => acc.id !== accountId),
        });

        // Select another account if current was removed
        if (currentAccountId === accountId) {
          const remaining = accounts.filter((acc) => acc.id !== accountId);
          set({ currentAccountId: remaining[0]?.id || null });
        }
      },

      /**
       * Update account details
       */
      updateAccount: (accountId, updates) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId ? { ...acc, ...updates } : acc
          ),
        }));
      },

      /**
       * Update quota usage
       */
      updateQuota: (accountId, usedQuota) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId ? { ...acc, usedQuota } : acc
          ),
        }));
      },

      /**
       * Reset quota (called daily)
       */
      resetQuota: (accountId) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? {
                  ...acc,
                  usedQuota: 0,
                  quotaResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                }
              : acc
          ),
        }));
      },

      toggleAccountActive: (accountId) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? {
                  ...acc,
                  isActive: !(acc.isActive ?? true),
                }
              : acc
          ),
        }));
      },

      toggleAccountCreditPool: (accountId) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? {
                  ...acc,
                  includedInCreditPool: !(acc.includedInCreditPool ?? false),
                }
              : acc
          ),
        }));
      },
    }),
    {
      name: 'account-storage',
    }
  )
);
