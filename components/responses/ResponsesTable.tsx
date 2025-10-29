'use client';

import { useState, useMemo } from 'react';
import { AutomationResponse } from '@/lib/types/response';
import { ResponseFilters } from './ResponseFilters';
import { ResponseRow } from './ResponseRow';
import { Pagination } from './Pagination';

interface ResponsesTableProps {
  responses: AutomationResponse[];
  flowId: string;
}

export function ResponsesTable({ responses, flowId }: ResponsesTableProps) {
  const [filters, setFilters] = useState({ status: '', username: '' });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filter responses
  const filteredResponses = useMemo(() => {
    return responses.filter((resp) => {
      if (filters.status && resp.status !== filters.status) return false;
      if (filters.username && !resp.username.toLowerCase().includes(filters.username.toLowerCase()))
        return false;
      return true;
    });
  }, [responses, filters]);

  // Paginate
  const paginatedResponses = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredResponses.slice(start, start + pageSize);
  }, [filteredResponses, page]);

  const totalPages = Math.ceil(filteredResponses.length / pageSize);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <ResponseFilters filters={filters} onFiltersChange={setFilters} totalCount={filteredResponses.length} />

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-neutral-50 border-b border-neutral-200">
          <div className="text-sm font-semibold text-neutral-700">Kullanıcı</div>
          <div className="text-sm font-semibold text-neutral-700 text-center">Input 1</div>
          <div className="text-sm font-semibold text-neutral-700 text-center">Input 2</div>
          <div className="text-sm font-semibold text-neutral-700 text-center">Output</div>
        </div>

        {/* Table Body */}
        {paginatedResponses.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-neutral-500">Hiç yanıt bulunamadı</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {paginatedResponses.map((response) => (
              <ResponseRow key={response.id} response={response} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
