'use client';

import { useState, useEffect } from 'react';
import { useAccountStore } from '@/lib/store/accountStore';
import { mockFlows } from '@/lib/mock-data/flows';
import { AutomationFlow } from '@/lib/types/flow';
import { PlusIcon, SparklesIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface AutomationSwitcherProps {
  collapsed: boolean;
}

export function AutomationSwitcher({ collapsed }: AutomationSwitcherProps) {
  const { currentAccountId } = useAccountStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Server-side and initial client render: show placeholder
    return (
      <div className="flex flex-col items-center gap-3">
        <Link
          href="/automations"
          className="w-10 h-10 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
          title="Browse Automations"
        >
          <PlusIcon className="w-5 h-5 text-neutral-400 group-hover:text-primary-500" />
        </Link>
      </div>
    );
  }

  // Filter flows for current account
  const accountFlows = mockFlows.filter((flow: AutomationFlow) => flow.instagramAccountId === currentAccountId);
  const activeFlows = accountFlows.filter((flow: AutomationFlow) => flow.status === 'active');

  if (collapsed) {
    // Collapsed: Show count and add button
    return (
      <div className="flex flex-col items-center gap-3">
        {/* Active Flows Count */}
        {activeFlows.length > 0 && (
          <div className="relative group" title={`${activeFlows.length} Active Automations`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            {/* Count indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{activeFlows.length}</span>
            </div>
          </div>
        )}

        {/* Add Automation Button */}
        <Link
          href="/automations"
          className="w-10 h-10 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
          title="Browse Automations"
        >
          <PlusIcon className="w-5 h-5 text-neutral-400 group-hover:text-primary-500" />
        </Link>
      </div>
    );
  }

  // Expanded: Show automation list
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Active Automations
        </span>
        <Link
          href="/automations"
          className="w-6 h-6 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
          title="Add Automation"
        >
          <PlusIcon className="w-3 h-3 text-neutral-400 group-hover:text-primary-500" />
        </Link>
      </div>

      {/* Automation List */}
      <div className="space-y-2">
        {activeFlows.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-xs text-neutral-500">No active automations</p>
            <Link
              href="/automations"
              className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block"
            >
              Browse Templates
            </Link>
          </div>
        ) : (
          activeFlows.map((flow) => {
            // Get emoji based on template type
            const getFlowEmoji = (templateId: string) => {
              const emojiMap: Record<string, string> = {
                'instagram-bald-to-haired': '💇',
                'car-color-changer': '🚗',
                'instagram-aesthetic-bald': '✨',
                'pet-products': '🐾',
                'car-wheels': '⚙️',
                'wall-paint': '🎨',
                'furniture-placement': '🛋️',
                'clothes-tryon': '👗',
                jewelry: '💍',
              };
              return emojiMap[templateId] || '⚡';
            };

            return (
              <Link
                key={flow.id}
                href={`/automations/builder/${flow.id}`}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 border-2 border-transparent hover:border-primary-200 group"
              >
                {/* Flow Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center group-hover:from-primary-200 group-hover:to-accent-200 transition-all">
                    <span className="text-xl">{getFlowEmoji(flow.templateId)}</span>
                  </div>
                </div>

                {/* Flow Info */}
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-semibold truncate text-neutral-800 group-hover:text-primary-700 transition-colors">
                    {flow.name}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">{flow.description}</p>
                </div>

                {/* Status indicator */}
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Show all inactive flows */}
      {accountFlows.filter((f) => f.status === 'inactive').length > 0 && (
        <div className="pt-4 border-t border-neutral-100">
          <Link
            href="/automations"
            className="text-xs text-center text-primary-600 hover:text-primary-700 font-medium block"
          >
            + {accountFlows.filter((f) => f.status === 'inactive').length} more available
          </Link>
        </div>
      )}
    </div>
  );
}


