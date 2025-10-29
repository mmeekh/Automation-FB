'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter((p) => {
    if (p === 1 || p === totalPages) return true;
    if (p >= currentPage - 1 && p <= currentPage + 1) return true;
    return false;
  });

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {showPages.map((page, idx) => {
        const prevPage = showPages[idx - 1];
        const showDots = prevPage && page - prevPage > 1;

        return (
          <div key={page} className="flex items-center gap-2">
            {showDots && <span className="text-neutral-400">...</span>}
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                page === currentPage
                  ? 'bg-primary-500 text-white'
                  : 'border border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {page}
            </button>
          </div>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
