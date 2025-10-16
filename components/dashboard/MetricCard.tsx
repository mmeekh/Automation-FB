interface MetricCardProps {
  value: string;
  label: string;
  change: string;
  positive?: boolean;
}

export function MetricCard({ value, label, change, positive }: MetricCardProps) {
  return (
    <div className="p-5 rounded-xl bg-gradient-to-br from-white to-neutral-100 shadow-neu-sm text-center">
      <div className="text-2xl font-bold text-neutral-800 mb-1">{value}</div>
      <div className="text-xs text-neutral-600 uppercase tracking-wide mb-2">{label}</div>
      <div className={`text-xs font-semibold ${positive ? 'text-green-600' : 'text-neutral-400'}`}>
        {change}
      </div>
    </div>
  );
}
