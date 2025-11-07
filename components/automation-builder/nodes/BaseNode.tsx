'use client';

import { memo, ReactNode, MouseEvent } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeStatistics } from '@/lib/types/flow';

interface BaseNodeProps {
  icon: string;
  title: string;
  color: string; // gradient color class
  children: ReactNode;
  statistics?: NodeStatistics;
  hasInput?: boolean;
  hasOutput?: boolean;
  onEdit?: () => void;
  isEditable?: boolean;
}

export const BaseNode = memo(function BaseNode({
  icon,
  title,
  color,
  children,
  statistics,
  hasInput = true,
  hasOutput = true,
  onEdit,
  isEditable = false,
}: BaseNodeProps) {
  const handleNodeClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isEditable || !onEdit) return;

    const target = event.target as HTMLElement;
    if (target.closest('.react-flow__handle')) {
      return;
    }

    onEdit();
  };

  return (
    <div
      className={`group relative ${isEditable ? 'cursor-pointer' : ''}`}
      onClick={handleNodeClick}
    >
      {/* Input Handle - Left */}
      {hasInput && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-primary-500 border-2 border-white hover:!bg-primary-600 transition-colors"
        />
      )}

      {/* Node Content */}
      <div className={`min-w-[280px] max-w-[320px] rounded-2xl bg-white border-2 border-neutral-200 shadow-lg hover:shadow-xl transition-all ${color}`}>
        {/* Header */}
        <div className={`px-4 py-3 bg-gradient-to-r ${color} rounded-t-xl`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="font-bold text-white text-sm">{title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {children}
        </div>

        {/* Statistics */}
        {statistics && (
          <div className="px-4 pb-4 pt-2 border-t border-neutral-100">
            <div className="grid grid-cols-3 gap-2 text-xs">
              {/* Sent */}
              <div className="text-center">
                <p className="font-semibold text-neutral-900">{statistics.sent}</p>
                <p className="text-neutral-500">Sent</p>
              </div>

              {/* Delivered */}
              <div className="text-center group/stat relative">
                <p className="font-semibold text-neutral-900">
                  {statistics.deliveredRate}%
                </p>
                <p className="text-neutral-500">Delivered</p>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover/stat:opacity-100 transition-opacity whitespace-nowrap">
                  {statistics.delivered} delivered
                </div>
              </div>

              {/* Opened */}
              <div className="text-center group/stat relative">
                <p className="font-semibold text-neutral-900">
                  {statistics.openedRate}%
                </p>
                <p className="text-neutral-500">Opened</p>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover/stat:opacity-100 transition-opacity whitespace-nowrap">
                  {statistics.opened} opened
                </div>
              </div>
            </div>

            {/* Clicked stat for buttons */}
            {statistics.clicked !== undefined && (
              <div className="mt-3 pt-3 border-t border-neutral-100">
                <div className="text-center group/stat relative">
                  <p className="font-semibold text-primary-600">
                    {statistics.clickRate}% Click Rate
                  </p>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover/stat:opacity-100 transition-opacity whitespace-nowrap">
                    {statistics.clicked} clicks
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Output Handle - Right */}
      {hasOutput && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-accent-500 border-2 border-white hover:!bg-accent-600 transition-colors"
        />
      )}

      {/* Edit button (shown on hover in edit mode) */}
      {isEditable && onEdit && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onEdit();
          }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-white rounded-lg shadow-md text-xs font-semibold text-primary-600 hover:bg-primary-50"
        >
          Edit
        </button>
      )}
    </div>
  );
});
