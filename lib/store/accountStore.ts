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
        set({
          accounts: mockAccounts,
          currentAccountId: mockAccounts[0]?.id || null,
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
          accounts: [...state.accounts, account],
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
    }),
    {
      name: 'account-storage',
    }
  )
);
