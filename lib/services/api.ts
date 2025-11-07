/**
 * Base API service with common configuration and error handling
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestConfig extends RequestInit {
  timeout?: number;
}

/**
 * Base fetch wrapper with timeout and error handling
 */
async function fetchWithTimeout(
  url: string,
  config: RequestConfig = {}
): Promise<Response> {
  const { timeout = 30000, ...fetchConfig } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Debug log
    if (typeof window !== 'undefined') {
      console.log('[Fetch]', fetchConfig.method || 'GET', url);
    }

    const response = await fetch(url, {
      ...fetchConfig,
      signal: controller.signal,
      credentials: 'same-origin', // Include cookies
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new ApiError(
        data?.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        data
      );
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408);
      }
      throw new ApiError(error.message, 0);
    }

    throw new ApiError('Unknown error occurred', 0);
  }
}

/**
 * API client configuration
 */
function getBaseURL(): string {
  // In browser, use relative URL
  if (typeof window !== 'undefined') {
    return '/api';
  }
  // In server, use environment variable
  return process.env.NEXT_PUBLIC_API_URL || '/api';
}

/**
 * Generic API request helper
 */
export async function apiRequest<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const baseURL = getBaseURL();
  const url = `${baseURL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const response = await fetchWithTimeout(url, {
    ...config,
    headers: {
      ...defaultHeaders,
      ...config.headers,
    },
  });

  return response.json();
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) =>
    apiRequest<T>(endpoint, { ...config, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data?: unknown, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data?: unknown, config?: RequestConfig) =>
    apiRequest<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, config?: RequestConfig) =>
    apiRequest<T>(endpoint, { ...config, method: 'DELETE' }),
};

/**
 * Example usage:
 *
 * // GET request
 * const data = await api.get<User>('/users/123');
 *
 * // POST request
 * const newUser = await api.post<User>('/users', { name: 'John' });
 *
 * // With custom config
 * const data = await api.get<User>('/users/123', {
 *   timeout: 5000,
 *   headers: { 'Authorization': 'Bearer token' }
 * });
 *
 * // Error handling
 * try {
 *   const data = await api.get<User>('/users/123');
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     console.error(`API Error ${error.status}:`, error.message);
 *   }
 * }
 */
