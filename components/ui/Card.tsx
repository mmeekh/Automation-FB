import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass rounded-2xl p-5 sm:p-6 lg:p-8',
          'shadow-neu-md border border-white/30',
          hover && 'transition-all duration-300 hover:shadow-neu-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-between mb-5 sm:mb-6', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-lg sm:text-xl font-bold gradient-text descender-safe', className)} {...props} />
);

export const CardBadge = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'px-2 sm:px-3 py-1 rounded-full text-xs font-semibold',
      'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg',
      'animate-pulse',
      className
    )}
    {...props}
  />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props} />
);
