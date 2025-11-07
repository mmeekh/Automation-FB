import { create } from 'zustand';
import type { Toast, ToastOptions, ToastType } from '@/lib/types/toast';

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, options?: ToastOptions) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;

  // Convenience methods
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
}

const DEFAULT_DURATION = 5000;

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (type, message, options = {}) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const duration = options.duration ?? DEFAULT_DURATION;

    const toast: Toast = {
      id,
      type,
      message,
      title: options.title,
      duration,
      action: options.action,
    };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearAll: () => {
    set({ toasts: [] });
  },

  // Convenience methods
  success: (message, options) => get().addToast('success', message, options),
  error: (message, options) => get().addToast('error', message, options),
  warning: (message, options) => get().addToast('warning', message, options),
  info: (message, options) => get().addToast('info', message, options),
}));
