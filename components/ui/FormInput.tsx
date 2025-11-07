'use client';

import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { ValidationRule, validateField } from '@/lib/utils/validation';
import { cn } from '@/lib/utils';

export interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  validationRules?: ValidationRule<string>[];
  onChange?: (value: string, isValid: boolean) => void;
  onBlur?: () => void;
  containerClassName?: string;
}

export function FormInput({
  label,
  error: externalError,
  helperText,
  validationRules = [],
  onChange,
  onBlur,
  className,
  containerClassName,
  value,
  ...props
}: FormInputProps) {
  const [internalError, setInternalError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  const error = externalError || (touched ? internalError : undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        <input
          {...props}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            'w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-400 focus:ring-red-100'
              : 'border-neutral-200 bg-white text-neutral-800 focus:border-primary-400 focus:ring-primary-100',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
        />

        {error && (
          <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
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
        <p className="text-xs text-neutral-500">{helperText}</p>
      )}
    </div>
  );
}
