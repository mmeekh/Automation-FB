import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-neutral-800">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-5 py-3 rounded-xl bg-gradient-to-br from-white to-neutral-100',
            'shadow-neu-inset focus:shadow-neu-md',
            'border-none outline-none transition-all duration-300',
            'text-neutral-800 placeholder:text-neutral-400',
            'focus:ring-2 focus:ring-primary-500/20',
            error && 'ring-2 ring-accent-500/50',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-accent-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
