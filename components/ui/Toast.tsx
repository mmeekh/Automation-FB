'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore } from '@/lib/store/toastStore';
import type { Toast as ToastType, ToastType as ToastVariant } from '@/lib/types/toast';

const ICON_MAP: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-600" />,
  error: <XCircle className="h-5 w-5 text-red-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-600" />,
  info: <Info className="h-5 w-5 text-blue-600" />,
};

const STYLE_MAP: Record<ToastVariant, string> = {
  success: 'border-green-200 bg-green-50',
  error: 'border-red-200 bg-red-50',
  warning: 'border-amber-200 bg-amber-50',
  info: 'border-blue-200 bg-blue-50',
};

interface ToastItemProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg ${STYLE_MAP[toast.type]}`}
    >
      <div className="flex-shrink-0 pt-0.5">{ICON_MAP[toast.type]}</div>

      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-semibold text-sm text-neutral-900 mb-1">{toast.title}</p>
        )}
        <p className="text-sm text-neutral-700 leading-relaxed">{toast.message}</p>

        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick();
              onRemove(toast.id);
            }}
            className="mt-2 text-sm font-medium text-neutral-900 hover:text-neutral-700 underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 rounded-lg p-1 text-neutral-500 hover:bg-white/50 hover:text-neutral-700 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

/**
 * Toast container component - should be placed at the root level of the app
 */
export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-end justify-start gap-2 p-4 sm:p-6">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
