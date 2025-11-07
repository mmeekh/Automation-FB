export interface ValidationRule<T = string> {
  validate: (value: T) => boolean;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validate: (value: string) => value.trim().length > 0,
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    validate: (value: string) => value.length >= min,
    message: message || `Minimum ${min} characters required`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    validate: (value: string) => value.length <= max,
    message: message || `Maximum ${max} characters allowed`,
  }),

  email: (message = 'Invalid email address'): ValidationRule => ({
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  url: (message = 'Invalid URL'): ValidationRule => ({
    validate: (value: string) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message,
  }),

  number: (message = 'Must be a valid number'): ValidationRule<string | number> => ({
    validate: (value: string | number) => {
      const num = typeof value === 'string' ? Number(value) : value;
      return !isNaN(num) && isFinite(num);
    },
    message,
  }),

  range: (
    min: number,
    max: number,
    message?: string
  ): ValidationRule<string | number> => ({
    validate: (value: string | number) => {
      const num = typeof value === 'string' ? Number(value) : value;
      return !isNaN(num) && num >= min && num <= max;
    },
    message: message || `Value must be between ${min} and ${max}`,
  }),

  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => ({
    validate: (value: string) => regex.test(value),
    message,
  }),

  custom: <T = string>(
    validator: (value: T) => boolean,
    message: string
  ): ValidationRule<T> => ({
    validate: validator,
    message,
  }),
};

/**
 * Validates a value against multiple rules
 */
export function validateField<T = string>(
  value: T,
  rules: ValidationRule<T>[]
): ValidationResult {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return {
        isValid: false,
        error: rule.message,
      };
    }
  }

  return { isValid: true };
}

/**
 * Validates multiple fields at once
 */
export function validateForm<T extends Record<string, unknown>>(
  values: T,
  rules: {
    [K in keyof T]?: ValidationRule<T[K]>[];
  }
): {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
} {
  const errors: Partial<Record<keyof T, string>> = {};
  let isValid = true;

  for (const field in rules) {
    const fieldRules = rules[field];
    if (!fieldRules) continue;

    const result = validateField(values[field], fieldRules);
    if (!result.isValid) {
      errors[field] = result.error;
      isValid = false;
    }
  }

  return { isValid, errors };
}

/**
 * Hook-like validator for real-time validation
 */
export class FormValidator<T extends Record<string, unknown>> {
  private rules: { [K in keyof T]?: ValidationRule<T[K]>[] };
  private errors: Partial<Record<keyof T, string>> = {};
  private touched: Partial<Record<keyof T, boolean>> = {};

  constructor(rules: { [K in keyof T]?: ValidationRule<T[K]>[] }) {
    this.rules = rules;
  }

  validate(field: keyof T, value: T[keyof T]): ValidationResult {
    const fieldRules = this.rules[field];
    if (!fieldRules) return { isValid: true };

    const result = validateField(value, fieldRules);

    if (!result.isValid) {
      this.errors[field] = result.error;
    } else {
      delete this.errors[field];
    }

    return result;
  }

  validateAll(values: T): boolean {
    const { isValid, errors } = validateForm(values, this.rules);
    this.errors = errors;
    return isValid;
  }

  touch(field: keyof T): void {
    this.touched[field] = true;
  }

  getError(field: keyof T): string | undefined {
    return this.touched[field] ? this.errors[field] : undefined;
  }

  hasError(field: keyof T): boolean {
    return !!this.getError(field);
  }

  getErrors(): Partial<Record<keyof T, string>> {
    return this.errors;
  }

  reset(): void {
    this.errors = {};
    this.touched = {};
  }
}
