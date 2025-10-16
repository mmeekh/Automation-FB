'use client';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  current,
  max,
  label,
  showPercentage = true,
  gradient = 'bg-gradient-to-r from-primary-500 to-accent-500',
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-medium text-neutral-700">{label}</span>}
          {showPercentage && (
            <span className="text-xs font-semibold text-neutral-600">
              {current.toLocaleString()} / {max.toLocaleString()} ({percentage.toFixed(1)}%)
            </span>
          )}
        </div>
      )}

      <div className={`w-full ${heights[size]} bg-neutral-200 rounded-full overflow-hidden relative`}>
        <div
          className={`${heights[size]} ${gradient} rounded-full transition-all duration-500 ease-out shadow-lg relative`}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 shimmer" />
        </div>
      </div>
    </div>
  );
}
