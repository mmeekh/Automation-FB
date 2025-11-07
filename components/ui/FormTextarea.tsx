'use client';

import { ChangeEvent, TextareaHTMLAttributes, useState, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { ValidationRule, validateField } from '@/lib/utils/validation';
import { cn } from '@/lib/utils';

export interface FormTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  validationRules?: ValidationRule<string>[];
  onChange?: (value: string, isValid: boolean) => void;
  onBlur?: () => void;
  containerClassName?: string;
  showCharCount?: boolean;
  maxCharCount?: number;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  function FormTextarea(
    {
      label,
      error: externalError,
      helperText,
      validationRules = [],
      onChange,
      onBlur,
      className,
      containerClassName,
      value,
      showCharCount = false,
      maxCharCount,
      ...props
    },
    ref
  ) {
    const [internalError, setInternalError] = useState<string | undefined>();
    const [touched, setTouched] = useState(false);

    const error = externalError || (touched ? internalError : undefined);
    const charCount = typeof value === 'string' ? value.length : 0;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      // Validate if rules are provided
      if (validationRules.length > 0) {
        const result = validateField(newValue, validationRules);
        setInternalError(result.error);

        if (onChange) {
          onChange(newValue, result.isValid);
        }
      } else {
        if (onChange) {
          onChange(newValue, true);
        }
      }
    };

    const handleBlur = () => {
      setTouched(true);
      if (onBlur) {
        onBlur();
      }
    };

    return (
      <div className={cn('space-y-1', containerClassName)}>
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            {...props}
            ref={ref}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={cn(
              'w-full rounded-2xl border px-4 py-3 text-sm shadow-inner transition-colors',
              'focus:outline-none focus:ring-2',
              error
                ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-400 focus:ring-red-100'
                : 'border-neutral-200 bg-neutral-50 text-neutral-800 focus:border-primary-400 focus:ring-primary-100',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
            }
          />

          {error && (
            <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
          )}
        </div>

        {error && (
          <p
            id={`${props.id}-error`}
            className="flex items-center gap-1 text-xs text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${props.id}-helper`} className="text-xs text-neutral-500">
            {helperText}
          </p>
        )}

        {showCharCount && (
          <p
            className={cn(
              'text-xs',
              maxCharCount && charCount > maxCharCount
                ? 'text-red-600 font-semibold'
                : 'text-neutral-500'
            )}
          >
            {charCount}
            {maxCharCount && ` / ${maxCharCount}`} characters
          </p>
        )}
      </div>
    );
  }
);
