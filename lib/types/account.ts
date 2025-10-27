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

  // Quota management
  totalQuota: number; // daily limit
  usedQuota: number; // how much used today
  quotaResetAt: string; // when quota resets

  // Settings
  settings: {
    timezone: string; // 'Europe/Istanbul'
    language: 'tr' | 'en';
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
 * Account quota update
 */
export interface QuotaUpdate {
  accountId: string;
  usedQuota: number;
  timestamp: string;
}
