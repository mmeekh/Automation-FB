import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  className = '',
  ...props
}: SkeletonProps) {
  const baseClasses = 'bg-neutral-200';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
    none: '',
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : undefined),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      {...props}
    />
  );
}

// Predefined skeleton layouts
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={12}
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={16} width="60%" />
          <Skeleton variant="text" height={12} width="40%" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex gap-2">
        <Skeleton width={80} height={32} />
        <Skeleton width={80} height={32} />
      </div>
    </div>
  );
}

export function SkeletonAutomationCard() {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 space-y-4">
      <div className="flex justify-center">
        <Skeleton variant="rectangular" width={100} height={24} className="rounded-full" />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Skeleton variant="rectangular" width={80} height={80} />
        <Skeleton variant="text" width={20} height={20} />
        <Skeleton variant="rectangular" width={80} height={80} />
        <Skeleton variant="text" width={20} height={20} />
        <Skeleton variant="rectangular" width={80} height={80} />
      </div>
      <div className="text-center space-y-2">
        <Skeleton variant="text" height={20} width="80%" className="mx-auto" />
        <Skeleton variant="text" height={14} width="60%" className="mx-auto" />
      </div>
      <div className="flex justify-center">
        <Skeleton width={120} height={36} />
      </div>
    </div>
  );
}
