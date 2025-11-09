/**
 * Application-wide constants
 * Centralized configuration values to avoid magic numbers
 */

// ============================================
// FLOW BUILDER - Node Positioning
// ============================================

/** Horizontal spacing between nodes in the flow builder */
export const NODE_HORIZONTAL_GAP = 350;

/** Vertical spacing between nodes (when applicable) */
export const NODE_VERTICAL_GAP = 320;

/** Minimum vertical gap for follower mode nodes */
export const MIN_VERTICAL_GAP = 320;

// ============================================
// QUOTA SYSTEM
// ============================================

/** Value representing unlimited quota */
export const UNLIMITED_QUOTA = 999999;

/** Minimum quota value for pool limits */
export const MIN_POOL_QUOTA = 100;

/** Maximum quota value for pool limits */
export const MAX_POOL_QUOTA = 10000;

/** Quota slider step increment */
export const QUOTA_STEP = 100;

/** Minimum per-user generation limit */
export const MIN_PER_USER_LIMIT = 1;

/** Maximum per-user generation limit */
export const MAX_PER_USER_LIMIT = 10;

/** Required total allocation percentage for pool */
export const REQUIRED_POOL_ALLOCATION = 100;

// ============================================
// RESET INTERVALS
// ============================================

/** Available reset interval options */
export const RESET_INTERVALS = {
  '12h': '12 Saat',
  '24h': '24 Saat',
  '7d': '7 Gün',
  '30d': '30 Gün',
} as const;

export type ResetIntervalKey = keyof typeof RESET_INTERVALS;

/** Default reset interval */
export const DEFAULT_RESET_INTERVAL: ResetIntervalKey = '24h';

/** Time unit options for custom intervals */
export const TIME_UNITS = {
  m: 'Dakika',
  h: 'Saat',
  d: 'Gün',
  M: 'Ay',
} as const;

export type TimeUnit = keyof typeof TIME_UNITS;

/** Maximum number for interval duration */
export const MAX_INTERVAL_DURATION = 30;

// ============================================
// UI/UX
// ============================================

/** Menu hover delay in milliseconds */
export const MENU_HOVER_DELAY = 120;

/** Toast auto-dismiss duration in milliseconds */
export const TOAST_DURATION = 5000;

/** Debounce delay for form inputs */
export const INPUT_DEBOUNCE_DELAY = 300;

/** Animation duration for transitions */
export const ANIMATION_DURATION = 300;

// ============================================
// AUTOMATION
// ============================================

/** Default maximum retries for automation steps */
export const DEFAULT_MAX_RETRIES = 3;

/** Fallback account ID */
export const FALLBACK_ACCOUNT_ID = 'fallback';

// ============================================
// FILE SIZE LIMITS
// ============================================

/** Maximum image file size in bytes (5MB) */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

/** Maximum video file size in bytes (50MB) */
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

// ============================================
// PAGINATION
// ============================================

/** Default items per page */
export const DEFAULT_PAGE_SIZE = 20;

/** Maximum items per page */
export const MAX_PAGE_SIZE = 100;

// ============================================
// API
// ============================================

/** API request timeout in milliseconds */
export const API_TIMEOUT = 30000;

/** Maximum retry attempts for failed API calls */
export const MAX_API_RETRIES = 3;

/** Retry delay in milliseconds */
export const API_RETRY_DELAY = 1000;

// ============================================
// STORAGE KEYS
// ============================================

/** LocalStorage keys */
export const STORAGE_KEYS = {
  ACCOUNT: 'account-storage',
  FLOW: 'flow-storage',
  ACTIVE_AUTOMATION: 'active-automation-storage',
  UI: 'ui-storage',
  USER: 'user-storage',
} as const;

// ============================================
// EMOJI MAP
// ============================================

/** Emoji mapping for automation templates */
export const AUTOMATION_EMOJIS: Record<string, string> = {
  'instagram-bald-to-haired': '👧',
  'instagram-aesthetic-bald': '👨‍🦲',
  'instagram-car-color-changer': '🚗',
  'car-wheels': '⚙️',
  'pet-products': '🐾',
  'wall-paint': '🎨',
  'furniture-placement': '🛋️',
  'clothes-tryon': '👗',
  jewelry: '💍',
};

// ============================================
// VALIDATION
// ============================================

/** Email regex pattern */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Phone number regex pattern (international) */
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

/** URL regex pattern */
export const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  GENERIC: 'Bir hata oluştu. Lütfen tekrar deneyin.',
  NETWORK: 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
  UNAUTHORIZED: 'Bu işlem için yetkiniz yok.',
  NOT_FOUND: 'İstenen kaynak bulunamadı.',
  VALIDATION: 'Lütfen tüm alanları doğru şekilde doldurun.',
  QUOTA_EXCEEDED: 'Quota limitiniz aşıldı.',
  POOL_ALLOCATION: 'Havuz paylaşımı toplamı %100 olmalıdır.',
} as const;

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  SAVED: 'Başarıyla kaydedildi!',
  UPDATED: 'Başarıyla güncellendi!',
  DELETED: 'Başarıyla silindi!',
  CREATED: 'Başarıyla oluşturuldu!',
} as const;
