import { useToastStore } from '@/lib/store/toastStore';
import type { ToastOptions } from '@/lib/types/toast';

/**
 * Hook for showing toast notifications
 *
 * @example
 * const toast = useToast();
 *
 * // Simple usage
 * toast.success('Changes saved successfully!');
 * toast.error('Failed to save changes');
 *
 * // With title and custom duration
 * toast.warning('Low credits', {
 *   title: 'Warning',
 *   duration: 8000
 * });
 *
 * // With action button
 * toast.info('New update available', {
 *   title: 'Update',
 *   duration: 0, // Don't auto-dismiss
 *   action: {
 *     label: 'View',
 *     onClick: () => router.push('/updates')
 *   }
 * });
 */
export function useToast() {
  const { success, error, warning, info } = useToastStore();

  return {
    success: (message: string, options?: ToastOptions) => success(message, options),
    error: (message: string, options?: ToastOptions) => error(message, options),
    warning: (message: string, options?: ToastOptions) => warning(message, options),
    info: (message: string, options?: ToastOptions) => info(message, options),
  };
}
