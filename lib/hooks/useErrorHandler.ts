import { useState, useCallback } from 'react';
import { AppError, createAppError, logError, getUserFriendlyMessage } from '../utils/errorHandler';

export function useErrorHandler() {
  const [error, setError] = useState<AppError | null>(null);

  const handleError = useCallback((err: unknown, context?: string) => {
    const appError = typeof err === 'object' && err !== null && 'type' in err
      ? err as AppError
      : createAppError('generic', undefined, err);

    logError(appError, context);
    setError(appError);

    return appError;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getUserMessage = useCallback(() => {
    return error ? getUserFriendlyMessage(error.originalError || error.message) : '';
  }, [error]);

  return {
    error,
    handleError,
    clearError,
    getUserMessage,
    hasError: error !== null,
  };
}
