'use client';

import { MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

interface Filters {
  status: string;
  username: string;
}

interface ResponseFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  totalCount: number;
}

export function ResponseFilters({ filters, onFiltersChange, totalCount }: ResponseFiltersProps) {
  const handleExport = () => {
    // Simple CSV export
    const csv = 'Kullanıcı,Durum,Tarih\n'; // Placeholder
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `responses-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Username Search */}
        <div className="relative flex-1 min-w-[200px]">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Kullanıcı ara..."
            value={filters.username}
            onChange={(e) => onFiltersChange({ ...filters, username: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm min-w-[150px]"
        >
          <option value="">Tüm Durumlar</option>
          <option value="completed">Tamamlandı</option>
          <option value="in_progress">Devam Ediyor</option>
          <option value="failed">Başarısız</option>
          <option value="abandoned">Terk Edildi</option>
        </select>

        {/* Results Count */}
        <div className="text-sm text-neutral-600">
          <span className="font-semibold text-neutral-900">{totalCount}</span> sonuç
        </div>

        {/* Export Button */}
        <Button onClick={handleExport} variant="outline" size="sm" className="ml-auto">
          <ArrowDownTrayIcon className="w-4 h-4" />
          CSV İndir
        </Button>
      </div>
    </div>
  );
}
