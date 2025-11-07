interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'neutral';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
};

const colorClasses = {
  primary: 'border-primary-200 border-t-primary-600',
  white: 'border-white/30 border-t-white',
  neutral: 'border-neutral-200 border-t-neutral-600',
};

export function Spinner({ size = 'md', color = 'primary', className = '' }: SpinnerProps) {
  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingOverlay({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm">
      <div className="rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="xl" />
          {message && (
            <p className="text-sm font-medium text-neutral-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <Spinner />
      {message && (
        <p className="text-sm text-neutral-600">{message}</p>
      )}
    </div>
  );
}
