/**
 * Error Handling Utilities
 * Centralized error handling, logging, and user feedback
 */

import { ERROR_MESSAGES } from '../constants';

export type ErrorType = 'network' | 'validation' | 'unauthorized' | 'not_found' | 'generic';

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  timestamp: string;
}

/**
 * Create a standardized app error
 */
export function createAppError(
  type: ErrorType,
  message?: string,
  originalError?: unknown
): AppError {
  return {
    type,
    message: message || ERROR_MESSAGES.GENERIC,
    originalError,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: unknown): string {
  if (error instanceof Error) {
    // Check for network errors
    if (error.message.toLowerCase().includes('network') ||
        error.message.toLowerCase().includes('fetch')) {
      return ERROR_MESSAGES.NETWORK;
    }

    // Check for authorization errors
    if (error.message.toLowerCase().includes('unauthorized') ||
        error.message.toLowerCase().includes('forbidden')) {
      return ERROR_MESSAGES.UNAUTHORIZED;
    }

    // Return original message if it's user-friendly
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return ERROR_MESSAGES.GENERIC;
}

/**
 * Log error to console in development, service in production
 */
export function logError(error: unknown, context?: string) {
  const appError = typeof error === 'object' && error !== null && 'type' in error
    ? error as AppError
    : createAppError('generic', undefined, error);

  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error${context ? ` - ${context}` : ''}]:`, appError);
  } else {
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // sendToErrorService(appError, context);
  }
}

/**
 * Handle async operation with error handling
 */
export async function handleAsyncOperation<T>(
  operation: () => Promise<T>,
  onError?: (error: AppError) => void
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    const appError = createAppError('generic', undefined, error);
    logError(appError);

    if (onError) {
      onError(appError);
    }

    return null;
  }
}

/**
 * Retry async operation with exponential backoff
 */
export async function retryAsync<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries - 1) {
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
      }
    }
  }

  throw createAppError('generic', 'Operation failed after retries', lastError);
}

/**
 * Parse API error response
 */
export function parseAPIError(error: unknown): AppError {
  if (error instanceof Response) {
    switch (error.status) {
      case 401:
      case 403:
        return createAppError('unauthorized', ERROR_MESSAGES.UNAUTHORIZED, error);
      case 404:
        return createAppError('not_found', ERROR_MESSAGES.NOT_FOUND, error);
      case 500:
      case 502:
      case 503:
        return createAppError('network', ERROR_MESSAGES.NETWORK, error);
      default:
        return createAppError('generic', ERROR_MESSAGES.GENERIC, error);
    }
  }

  if (error instanceof Error) {
    if (error.name === 'NetworkError' || error.message.includes('fetch')) {
      return createAppError('network', ERROR_MESSAGES.NETWORK, error);
    }
  }

  return createAppError('generic', ERROR_MESSAGES.GENERIC, error);
}

/**
 * Safe JSON parse with error handling
 */
export function safeJSONParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    logError(error, 'JSON Parse');
    return fallback;
  }
}

/**
 * Safe localStorage operations
 */
export const safeStorage = {
  get: <T>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? safeJSONParse(item, fallback) : fallback;
    } catch (error) {
      logError(error, `Storage Get: ${key}`);
      return fallback;
    }
  },

  set: (key: string, value: unknown): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      logError(error, `Storage Set: ${key}`);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logError(error, `Storage Remove: ${key}`);
      return false;
    }
  },
};
