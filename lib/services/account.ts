import { api } from './api';
import type { InstagramAccount } from '@/lib/types/account';

export interface UpdateAccountRequest {
  accountId: string;
  updates: Partial<InstagramAccount>;
}

export interface UpdateAccountResponse {
  success: boolean;
  account: InstagramAccount;
}

/**
 * Account management API service
 */
export const accountService = {
  /**
   * Get all Instagram accounts
   */
  getAccounts: async (): Promise<InstagramAccount[]> => {
    return api.get<InstagramAccount[]>('/accounts');
  },

  /**
   * Get single account by ID
   */
  getAccount: async (accountId: string): Promise<InstagramAccount> => {
    return api.get<InstagramAccount>(`/accounts/${accountId}`);
  },

  /**
   * Update account settings
   */
  updateAccount: async (
    accountId: string,
    updates: Partial<InstagramAccount>
  ): Promise<UpdateAccountResponse> => {
    return api.patch<UpdateAccountResponse>(`/accounts/${accountId}`, updates);
  },

  /**
   * Toggle credit pool for account
   */
  toggleCreditPool: async (accountId: string, enabled: boolean) => {
    return api.post(`/accounts/${accountId}/credit-pool`, { enabled });
  },

  /**
   * Update account quota allocation
   */
  updateQuotaAllocation: async (accountId: string, allocation: number) => {
    return api.patch(`/accounts/${accountId}/quota`, { allocation });
  },

  /**
   * Update account quota limit
   */
  updateQuotaLimit: async (accountId: string, limit: number | null) => {
    return api.patch(`/accounts/${accountId}/quota-limit`, { limit });
  },

  /**
   * Update account reset interval
   */
  updateResetInterval: async (accountId: string, interval: string) => {
    return api.patch(`/accounts/${accountId}/reset-interval`, { interval });
  },

  /**
   * Connect new Instagram account
   */
  connectAccount: async (accessToken: string) => {
    return api.post('/accounts/connect', { accessToken });
  },

  /**
   * Disconnect Instagram account
   */
  disconnectAccount: async (accountId: string) => {
    return api.delete(`/accounts/${accountId}`);
  },
};
