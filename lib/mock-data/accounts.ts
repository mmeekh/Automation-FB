import { InstagramAccount } from '../types/account';

/**
 * Mock Instagram accounts for development
 */
export const mockAccounts: InstagramAccount[] = [
  {
    id: 'acc-1',
    username: 'swordnest.salon',
    displayName: 'SwordNest Hair Salon',
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    isConnected: true,
    connectedAt: '2024-01-15T10:30:00Z',
    lastSync: new Date().toISOString(),
    followerCount: 12500,
    followingCount: 450,
    activeFlowsCount: 2,
    totalInteractions: 3420,
    totalQuota: 1000,
    usedQuota: 750,
    quotaResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    includedInCreditPool: true,
    settings: {
      timezone: 'Europe/Istanbul',
      language: 'tr',
      notifications: {
        quotaWarning: true,
        errorAlerts: true,
        dailySummary: true,
      },
    },
  },
  {
    id: 'acc-2',
    username: 'hairai.istanbul',
    displayName: 'Hair AI Istanbul',
    profilePicture: 'https://i.pravatar.cc/150?img=2',
    isConnected: true,
    connectedAt: '2024-02-01T14:20:00Z',
    lastSync: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    followerCount: 8900,
    followingCount: 320,
    activeFlowsCount: 1,
    totalInteractions: 1850,
    totalQuota: 500,
    usedQuota: 320,
    quotaResetAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    includedInCreditPool: false,
    settings: {
      timezone: 'Europe/Istanbul',
      language: 'tr',
      notifications: {
        quotaWarning: true,
        errorAlerts: false,
        dailySummary: true,
      },
    },
  },
  {
    id: 'acc-3',
    username: 'looklab.ai',
    displayName: 'LookLab AI Beauty',
    profilePicture: 'https://i.pravatar.cc/150?img=3',
    isConnected: true,
    connectedAt: '2024-01-20T09:15:00Z',
    lastSync: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    followerCount: 15200,
    followingCount: 580,
    activeFlowsCount: 3,
    totalInteractions: 5120,
    totalQuota: 1500,
    usedQuota: 1240,
    quotaResetAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    includedInCreditPool: true,
    settings: {
      timezone: 'Europe/Istanbul',
      language: 'en',
      notifications: {
        quotaWarning: true,
        errorAlerts: true,
        dailySummary: false,
      },
    },
  },
  {
    id: 'acc-4',
    username: 'beauty.transform',
    displayName: 'Beauty Transform',
    profilePicture: 'https://i.pravatar.cc/150?img=4',
    isConnected: false,
    followerCount: 0,
    followingCount: 0,
    activeFlowsCount: 0,
    totalInteractions: 0,
    totalQuota: 1000,
    usedQuota: 0,
    quotaResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    isActive: false,
    includedInCreditPool: false,
    settings: {
      timezone: 'Europe/Istanbul',
      language: 'tr',
      notifications: {
        quotaWarning: true,
        errorAlerts: true,
        dailySummary: true,
      },
    },
  },
];

/**
 * Get account by ID
 */
export function getMockAccountById(id: string): InstagramAccount | undefined {
  return mockAccounts.find((acc) => acc.id === id);
}

/**
 * Get connected accounts only
 */
export function getConnectedAccounts(): InstagramAccount[] {
  return mockAccounts.filter((acc) => acc.isConnected);
}

/**
 * Get default/primary account
 */
export function getDefaultAccount(): InstagramAccount {
  return mockAccounts[0];
}
