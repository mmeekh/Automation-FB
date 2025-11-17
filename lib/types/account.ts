/**
 * Instagram Account connected to LookLab
 */
export interface InstagramAccount {
  id: string;
  username: string; // @username
  displayName: string; // full name
  profilePicture: string; // avatar URL

  // Connection status
  isConnected: boolean;
  connectedAt?: string;
  lastSync?: string;

  // Account stats
  followerCount: number;
  followingCount: number;

  // Automation stats
  activeFlowsCount: number; // how many flows are active
  totalInteractions: number; // all-time

  // Generation tracking
  totalGenerations: number; // all-time generation count for this account
  totalGenerationLimit?: number; // total generation limit for this account (max generations it can do)
  perUserLimit: number; // per-user generation limit (1-10 or 999999 for unlimited)
  perUserResetInterval?: string; // how often per-user quota resets (e.g., "1m", "24h", "7d", "1M")
  lastResetAt?: string; // when quota was last reset

  // Account preferences
  isActive?: boolean;
  includedInCreditPool?: boolean;
  creditAllocationPercent?: number;

  // Settings
  settings: {
    timezone: string; // 'Europe/Istanbul'
    language: 'en';
    notifications: {
      quotaWarning: boolean; // warn at 80%
      errorAlerts: boolean;
      dailySummary: boolean;
    };
  };
}

/**
 * Account connection request
 */
export interface AccountConnectionRequest {
  instagramUsername: string;
  accessToken?: string; // from Instagram OAuth
  profilePicture?: string;
}

/**
 * Account generation tracking
 */
export interface GenerationRecord {
  accountId: string;
  totalGenerations: number;
  timestamp: string;
}
