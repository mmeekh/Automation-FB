'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { DragEvent as ReactDragEvent, MouseEvent as ReactMouseEvent } from 'react';
import Link from 'next/link';
import { PlusIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { AutomationRegistry } from '@/lib/automations';
import type { AutomationTemplate } from '@/lib/automations/types';
import { useAccountStore } from '@/lib/store/accountStore';
import {
  FALLBACK_ACCOUNT_ID,
  useActiveAutomationStore,
} from '@/lib/store/activeAutomationStore';
import { useFlowStore } from '@/lib/store/flowStore';
import { useUIStore } from '@/lib/store/uiStore';
import { getMockFlowByTemplateId } from '@/lib/mock-data/flows';

interface AutomationSwitcherProps {
  collapsed: boolean;
  onMenuStateChange?: (isOpen: boolean) => void;
}

const emojiMap: Record<string, string> = {
  'instagram-bald-to-haired': '💇',
  'instagram-aesthetic-bald': '✨',
  'instagram-car-color-changer': '🚗',
  'car-wheels': '⚙️',
  'pet-products': '🐾',
  'wall-paint': '🎨',
  'furniture-placement': '🛋️',
  'clothes-tryon': '👗',
  jewelry: '💍',
};

export function AutomationSwitcher({ collapsed, onMenuStateChange }: AutomationSwitcherProps) {
  const { accounts, currentAccountId, loadAccounts } = useAccountStore();
  const accountId = currentAccountId ?? accounts[0]?.id ?? FALLBACK_ACCOUNT_ID;

  const activeAutomations = useActiveAutomationStore(
    (state) => state.activeByAccount[accountId] ?? []
  );
  const currentTemplateId = useActiveAutomationStore(
    (state) => state.currentByAccount[accountId] ?? null
  );

  const addAutomation = useActiveAutomationStore((state) => state.addAutomation);
  const setCurrentAutomation = useActiveAutomationStore(
    (state) => state.setCurrentAutomation
  );
  const removeAutomation = useActiveAutomationStore((state) => state.removeAutomation);
  const toggleAutomationActive = useActiveAutomationStore(
    (state) => state.toggleAutomationActive
  );
  const reorderAutomations = useActiveAutomationStore(
    (state) => state.reorderAutomations
  );

  const loadFlow = useFlowStore((state) => state.loadFlow);
  const showBuilderFlow = useUIStore((state) => state.showBuilderFlow);

  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setMenuRef = useCallback((templateId: string) => (node: HTMLDivElement | null) => {
    if (node) {
      menuRefs.current[templateId] = node;
    } else {
      delete menuRefs.current[templateId];
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (accounts.length === 0) {
      loadAccounts();
    }
  }, [accounts.length, loadAccounts]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (event: MouseEvent) => {
      const container = menuRefs.current[openMenuId];
      if (container && container.contains(event.target as Node)) {
        return;
      }
      setOpenMenuId(null);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openMenuId]);

  useEffect(() => {
    onMenuStateChange?.(Boolean(openMenuId));
  }, [openMenuId, onMenuStateChange]);

  useEffect(() => {
    setOpenMenuId(null);
  }, [accountId]);

  const sanitizedAutomations = useMemo(
    () =>
      activeAutomations.map((automation) => ({
        ...automation,
        isActive: automation.isActive ?? true,
      })),
    [activeAutomations]
  );

  const handleDragStart = useCallback(
    (event: ReactDragEvent, templateId: string) => {
      event.stopPropagation();
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', templateId);
      setOpenMenuId(null);
      setDraggingId(templateId);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
  }, []);

  const handleDragOver = useCallback(
    (event: ReactDragEvent) => {
      if (!draggingId) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    [draggingId]
  );

  const handleDrop = useCallback(
    (event: ReactDragEvent, targetTemplateId: string) => {
      if (!draggingId) return;
      event.preventDefault();
      event.stopPropagation();
      if (draggingId === targetTemplateId) {
        setDraggingId(null);
        return;
      }
      reorderAutomations(accountId, draggingId, targetTemplateId);
      setDraggingId(null);
    },
    [draggingId, reorderAutomations, accountId]
  );

  const templates = useMemo(
    () => AutomationRegistry.getAllTemplates(),
    []
  );

  const availableTemplates = useMemo(
    () =>
      templates.filter(
        (template) =>
          !sanitizedAutomations.some(
            (automation) => automation.templateId === template.id
          )
      ),
    [templates, sanitizedAutomations]
  );

  const handleAutomationSelect = (templateId: string) => {
    const existing = sanitizedAutomations.find((automation) => automation.templateId === templateId);

    if (!existing) {
      addAutomation(accountId, templateId);
      setCurrentAutomation(accountId, templateId);
      const flow = getMockFlowByTemplateId(templateId);
      if (flow) {
        loadFlow(flow.id);
      }
    } else {
      setCurrentAutomation(accountId, templateId);
      loadFlow(existing.flowId);
    }

    showBuilderFlow();
    setIsDropdownOpen(false);
  };

  const handleOpenDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 animate-pulse rounded-full border-2 border-dashed border-neutral-200" />
      </div>
    );
  }

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-3">
        {sanitizedAutomations.length > 0 && (
          <div
            className="relative group"
            title={`${sanitizedAutomations.length} Active Automations`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">
                {sanitizedAutomations.length}
              </span>
            </div>
          </div>
        )}

        <div className="relative z-50" ref={containerRef}>
          <button
            type="button"
            onClick={handleOpenDropdown}
            className="w-10 h-10 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
            title="Add Automation"
          >
            <PlusIcon className="w-5 h-5 text-neutral-400 group-hover:text-primary-500" />
          </button>
          {isDropdownOpen && (
            <Dropdown templates={availableTemplates} onSelect={handleAutomationSelect} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Active Automations
        </span>
        <div className="relative z-50" ref={containerRef}>
          <button
            type="button"
            onClick={handleOpenDropdown}
            className="w-6 h-6 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
            title="Add Automation"
          >
            <PlusIcon className="w-3 h-3 text-neutral-400 group-hover:text-primary-500" />
          </button>
          {isDropdownOpen && (
            <Dropdown
              templates={availableTemplates}
              onSelect={handleAutomationSelect}
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        {sanitizedAutomations.length === 0 ? (
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
          sanitizedAutomations.map((automation) => {
            const template = AutomationRegistry.getTemplate(automation.templateId);
            const flow = getMockFlowByTemplateId(automation.templateId);
            const label = flow?.name ?? template?.name ?? automation.templateId;
            const description = flow?.description ?? template?.description ?? '';
            const emoji =
              emojiMap[automation.templateId] ??
              emojiMap[automation.templateId.replace('instagram-', '')] ??
              '⚡';
            const isCurrent = currentTemplateId === automation.templateId;
            const isActive = automation.isActive;
            const isDragging = draggingId === automation.templateId;
            const isDropTarget =
              Boolean(draggingId) && draggingId !== automation.templateId && !isDragging;
            const isMenuOpen = openMenuId === automation.templateId;

            const menuToggle = (event: ReactMouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              setOpenMenuId((prev) => (prev === automation.templateId ? null : automation.templateId));
            };

            const handleDeactivateClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              toggleAutomationActive(accountId, automation.templateId);
              // 不再关闭菜单，保持打开状态
            };

            const handleRemoveAutomation = (event: ReactMouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              removeAutomation(accountId, automation.templateId);
              setOpenMenuId(null); // 只有移除自动化时才关闭菜单
            };

            return (
              <div key={automation.templateId} className="relative">
                <button
                  type="button"
                  onClick={() => handleAutomationSelect(automation.templateId)}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, automation.templateId)}
                  className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border-2 text-left ${
                    isCurrent
                      ? 'border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50 shadow-sm'
                      : 'border-transparent hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:border-primary-200'
                  } ${
                    !isActive ? 'opacity-80' : ''
                  } ${
                    isDropTarget ? 'border-dashed border-primary-300 bg-primary-50/40' : ''
                  } ${isDragging ? 'opacity-70 ring-2 ring-primary-200' : ''}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center group-hover:from-primary-200 group-hover:to-accent-200 transition-all">
                      <span className="text-xl">{emoji}</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <p
                      className={`text-sm font-semibold truncate transition-colors ${
                        isActive ? 'text-neutral-800 group-hover:text-primary-700' : 'text-neutral-500'
                      }`}
                    >
                      {label}
                    </p>
                    {description && (
                      <p className="text-xs text-neutral-500 truncate">
                        {description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isActive ? 'bg-green-500 animate-pulse' : 'bg-neutral-400'
                      }`}
                    />

                    <button
                      type="button"
                      onClick={menuToggle}
                      onDragStart={(event) => handleDragStart(event, automation.templateId)}
                      onDragEnd={handleDragEnd}
                      draggable
                      className="relative flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      aria-label="Automation actions"
                    >
                      <Bars3Icon className="h-5 w-5" />
                    </button>
                  </div>
                </button>

                {isMenuOpen && (
                  <div
                    ref={setMenuRef(automation.templateId)}
                    className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={handleDeactivateClick}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                    >
                      {isActive ? 'Pasifleştir' : 'Aktif et'}
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                        isActive ? 'border-red-500' : 'border-green-500'
                      }`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          isActive ? 'bg-red-500' : 'bg-green-500'
                        }`} />
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveAutomation}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      Otomasyonu kaldır
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {availableTemplates.length === 0 && (
        <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-500">
          Tüm otomasyonlar eklendi. Yeni şablonlar için{' '}
          <Link
            href="/automations"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            kütüphaneyi inceleyin
          </Link>
          .
        </div>
      )}
    </div>
  );
}

type DropdownProps = {
  templates: AutomationTemplate[];
  onSelect: (templateId: string) => void;
};

function Dropdown({ templates, onSelect }: DropdownProps) {
  if (templates.length === 0) {
    return (
      <div
        className="absolute right-0 mt-2 w-60 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-500 shadow-lg z-50"
      >
        Tüm otomasyonlar aktif.
      </div>
    );
  }

  return (
    <div
      className="absolute right-0 mt-2 w-64 rounded-xl border border-neutral-200 bg-white py-2 shadow-xl z-50"
    >
      <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Yeni otomasyon ekle
      </p>
      <div className="max-h-72 overflow-auto">
        {templates.map((template) => (
          <button
            type="button"
            key={template.id}
            onClick={() => onSelect(template.id)}
            className="flex w-full flex-col items-start gap-1 px-3 py-2 text-left hover:bg-neutral-50"
          >
            <span className="text-sm font-semibold text-neutral-800">
              {template.name}
            </span>
            <span className="text-xs text-neutral-500 line-clamp-2">
              {template.description}
            </span>
          </button>
        ))}
      </div>
      <div className="border-t border-neutral-100 px-3 pt-2">
        <Link
          href="/automations"
          className="text-xs font-medium text-primary-600 hover:text-primary-700"
        >
          Tüm şablonları gör →
        </Link>
      </div>
    </div>
  );
}