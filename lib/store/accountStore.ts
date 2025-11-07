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

  // Generation tracking
  incrementGenerations: (accountId: string, count?: number) => void;
  resetGenerations: (accountId: string) => void;

  // Account actions
  toggleAccountActive: (accountId: string) => void;
  toggleAccountCreditPool: (accountId: string) => void;
  setAccountAllocation: (accountId: string, percent: number) => void;
  setAccountQuotaLimit: (accountId: string, limit: number) => void;
  setAccountTotalGenerationLimit: (accountId: string, limit: number) => void;
  setAccountQuotaResetInterval: (accountId: string, interval: string) => void;
  reorderAccounts: (sourceAccountId: string, targetAccountId: string) => void;
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
          creditAllocationPercent: account.creditAllocationPercent ?? 0,
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
              creditAllocationPercent: account.creditAllocationPercent ?? 0,
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
       * Increment generation count
       */
      incrementGenerations: (accountId, count = 1) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? { ...acc, totalGenerations: acc.totalGenerations + count }
              : acc
          ),
        }));
      },

      /**
       * Reset generation count (if needed for testing)
       */
      resetGenerations: (accountId) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? {
                  ...acc,
                  totalGenerations: 0,
                  lastResetAt: new Date().toISOString(),
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

      setAccountAllocation: (accountId, percent) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? {
                  ...acc,
                  creditAllocationPercent: Math.max(0, Math.min(100, Math.round(percent))),
                }
              : acc
          ),
        }));
      },

      setAccountQuotaLimit: (accountId, limit) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? {
                  ...acc,
                  perUserLimit: Math.max(0, limit),
                }
              : acc
          ),
        }));
      },

      setAccountTotalGenerationLimit: (accountId, limit) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? {
                  ...acc,
                  totalGenerationLimit: Math.max(0, limit),
                }
              : acc
          ),
        }));
      },

      setAccountQuotaResetInterval: (accountId, interval) => {
        set((state) => ({
          accounts: state.accounts.map((acc) =>
            acc.id === accountId
              ? {
                  ...acc,
                  perUserResetInterval: interval,
                }
              : acc
          ),
        }));
      },

      reorderAccounts: (sourceAccountId, targetAccountId) => {
        set((state) => {
          if (sourceAccountId === targetAccountId) {
            return {};
          }

          const accountsCopy = [...state.accounts];
          const fromIndex = accountsCopy.findIndex((acc) => acc.id === sourceAccountId);
          const toIndex = accountsCopy.findIndex((acc) => acc.id === targetAccountId);

          if (fromIndex === -1 || toIndex === -1) {
            return {};
          }

          const [moved] = accountsCopy.splice(fromIndex, 1);
          accountsCopy.splice(toIndex, 0, moved);

          return {
            accounts: accountsCopy,
          };
        });
      },
    }),
    {
      name: 'account-storage',
    }
  )
);
