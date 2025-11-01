'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { DragEvent as ReactDragEvent, MouseEvent as ReactMouseEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import Link from 'next/link';
import { PlusIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

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
  onRequestCollapse?: () => void;
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

export function AutomationSwitcher({ collapsed, onMenuStateChange, onRequestCollapse }: AutomationSwitcherProps) {
  // Accounts & active automations
  const { accounts, currentAccountId, loadAccounts } = useAccountStore();
  const accountId = currentAccountId ?? accounts[0]?.id ?? FALLBACK_ACCOUNT_ID;

  const activeAutomations = useActiveAutomationStore(
    (s) => s.activeByAccount[accountId] ?? []
  );
  const currentTemplateId = useActiveAutomationStore(
    (s) => s.currentByAccount[accountId] ?? null
  );

  const addAutomation = useActiveAutomationStore((s) => s.addAutomation);
  const setCurrentAutomation = useActiveAutomationStore((s) => s.setCurrentAutomation);
  const removeAutomation = useActiveAutomationStore((s) => s.removeAutomation);
  const toggleAutomationActive = useActiveAutomationStore((s) => s.toggleAutomationActive);
  const reorderAutomations = useActiveAutomationStore((s) => s.reorderAutomations);

  // Builder / flow
  const loadFlow = useFlowStore((s) => s.loadFlow);
  const showBuilderFlow = useUIStore((s) => s.showBuilderFlow);

  // Local UI state
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const addDropdownRef = useRef<HTMLDivElement | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setMenuRef = useCallback(
    (templateId: string) => (node: HTMLDivElement | null) => {
      if (node) menuRefs.current[templateId] = node;
      else delete menuRefs.current[templateId];
    },
    []
  );

  // Mount
  useEffect(() => setMounted(true), []);

  // Ensure accounts
  useEffect(() => {
    if (accounts.length === 0) loadAccounts();
  }, [accounts.length, loadAccounts]);

  // Close "Add Automation" dropdown outside click
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (e: PointerEvent) => {
      if (addDropdownRef.current && !addDropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isDropdownOpen]);

  // Close per-item menu on outside / ESC
  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (e: PointerEvent) => {
      const menuEl = menuRefs.current[openMenuId];
      if (menuEl && menuEl.contains(e.target as Node)) return;
      setOpenMenuId(null);
      onRequestCollapse?.();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenuId(null);
        onRequestCollapse?.();
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openMenuId, onRequestCollapse]);

  // Inform parent about menu state
  useEffect(() => {
    onMenuStateChange?.(isDropdownOpen || Boolean(openMenuId));
  }, [isDropdownOpen, openMenuId, onMenuStateChange]);

  // Reset menus when account changes
  useEffect(() => setOpenMenuId(null), [accountId]);

  // Normalized automations (default isActive true)
  const sanitizedAutomations = useMemo(
    () =>
      activeAutomations.map((a) => ({
        ...a,
        isActive: a.isActive ?? true,
      })),
    [activeAutomations]
  );

  // Drag & Drop
  const handleDragStart = useCallback(
    (event: ReactDragEvent<HTMLDivElement>, templateId: string) => {
      event.stopPropagation();
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', templateId);
      setOpenMenuId(null);
      setDraggingId(templateId);
      setDragOverId(null);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDragOverId(null);
  }, []);

  const handleDragOver = useCallback(
    (event: ReactDragEvent<HTMLDivElement>, targetTemplateId: string) => {
      if (!draggingId || draggingId === targetTemplateId) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setDragOverId((prev) => (prev === targetTemplateId ? prev : targetTemplateId));
    },
    [draggingId]
  );

  const handleDragLeave = useCallback(
    (event: ReactDragEvent<HTMLDivElement>, targetTemplateId: string) => {
      const related = event.relatedTarget as Node | null;
      if (related && event.currentTarget.contains(related)) {
        return;
      }
      setDragOverId((prev) => (prev === targetTemplateId ? null : prev));
    },
    []
  );

  const handleDrop = useCallback(
    (event: ReactDragEvent<HTMLDivElement>, targetTemplateId: string) => {
      if (!draggingId) return;
      event.preventDefault();
      event.stopPropagation();
      if (draggingId !== targetTemplateId) {
        reorderAutomations(accountId, draggingId, targetTemplateId);
      }
      setDraggingId(null);
      setDragOverId(null);
    },
    [draggingId, reorderAutomations, accountId]
  );

  // Templates
  const templates = useMemo(() => AutomationRegistry.getAllTemplates(), []);
  const availableTemplates = useMemo(
    () =>
      templates.filter(
        (t) => !sanitizedAutomations.some((a) => a.templateId === t.id)
      ),
    [templates, sanitizedAutomations]
  );

  // Actions
  const handleAutomationSelect = (templateId: string) => {
    const existing = sanitizedAutomations.find((a) => a.templateId === templateId);

    if (!existing) {
      addAutomation(accountId, templateId);
      setCurrentAutomation(accountId, templateId);
      const flow = getMockFlowByTemplateId(templateId);
      if (flow) loadFlow(flow.id);
    } else {
      setCurrentAutomation(accountId, templateId);
      loadFlow(existing.flowId);
    }

    showBuilderFlow();
    setIsDropdownOpen(false);
  };

  const handleOpenDropdown = () => setIsDropdownOpen((p) => !p);

  // Keyboard support for the card wrapper
  const onCardKeyDown = (e: ReactKeyboardEvent, templateId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAutomationSelect(templateId);
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 animate-pulse rounded-full border-2 border-dashed border-neutral-200" />
      </div>
    );
    }

  // Collapsed (iconic) view
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

        <div className="relative z-50" ref={addDropdownRef}>
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

  // Expanded view
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Active Automations
        </span>

        <div className="relative z-50" ref={addDropdownRef}>
          <button
            type="button"
            onClick={handleOpenDropdown}
            className="w-6 h-6 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
            title="Add Automation"
          >
            <PlusIcon className="w-3 h-3 text-neutral-400 group-hover:text-primary-500" />
          </button>
          {isDropdownOpen && (
            <Dropdown templates={availableTemplates} onSelect={handleAutomationSelect} />
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
            const isDragOver =
              dragOverId === automation.templateId && draggingId !== automation.templateId;
            const isMenuOpen = openMenuId === automation.templateId;

            const menuToggle = (event: ReactMouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              setOpenMenuId((prev) => (prev === automation.templateId ? null : automation.templateId));
            };

            const handleDeactivateClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              toggleAutomationActive(accountId, automation.templateId);
              // Menü açık kalsın
            };

            const handleRemoveAutomation = (event: ReactMouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              removeAutomation(accountId, automation.templateId);
              setOpenMenuId(null); // Sadece kaldırınca kapat
            };

            return (
              <div key={automation.templateId} className="relative">
                {/* Dış kapsayıcı: button DEĞİL — erişilebilir div */}
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => onCardKeyDown(e, automation.templateId)}
                  onClick={() => {
                    if (draggingId) return;
                    handleAutomationSelect(automation.templateId);
                  }}
                  draggable
                  onDragStart={(event) => handleDragStart(event, automation.templateId)}
                  onDragEnd={handleDragEnd}
                  onDragEnter={(event) => handleDragOver(event, automation.templateId)}
                  onDragOver={(event) => handleDragOver(event, automation.templateId)}
                  onDragLeave={(event) => handleDragLeave(event, automation.templateId)}
                  onDrop={(event) => handleDrop(event, automation.templateId)}
                  className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border-2 text-left ${
                    isCurrent
                      ? 'border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50 shadow-sm'
                      : 'border-transparent hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:border-primary-200'
                  } ${
                    isDragOver ? 'border-dashed border-primary-300 bg-primary-50/60 shadow-md' : ''
                  } ${
                    isDragging
                      ? 'cursor-grabbing scale-[1.02] shadow-lg ring-2 ring-primary-200 opacity-95'
                      : 'cursor-grab'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center group-hover:from-primary-200 group-hover:to-accent-200 transition-all">
                      <span className="text-xl">{emoji}</span>
                    </div>
                  </div>

                  {/* Parent'ta opacity yok; sadece içerik kısılır */}
                  <div className={`flex-1 overflow-hidden ${isActive ? '' : 'opacity-60'}`}>
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
                    {/* İç aksiyon gerçek button olarak kalır */}
                    <button
                      type="button"
                      onClick={menuToggle}
                      className="relative flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      aria-label={isMenuOpen ? 'Close automation actions' : 'Automation actions'}
                    >
                      {isMenuOpen ? (
                        <XMarkIcon className="h-5 w-5" />
                      ) : (
                        <Bars3Icon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Menü */}
                {isMenuOpen && (
                  <div
                    ref={setMenuRef(automation.templateId)}
                    className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl pointer-events-auto"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={handleDeactivateClick}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                    >
                      {isActive ? 'Pasifleştir' : 'Aktif et'}
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                          isActive ? 'border-red-500' : 'border-green-500'
                        }`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isActive ? 'bg-red-500' : 'bg-green-500'
                          }`}
                        />
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
      <div className="absolute right-0 mt-2 w-60 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-500 shadow-lg z-50">
        Tüm otomasyonlar aktif.
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-64 rounded-xl border border-neutral-200 bg-white py-2 shadow-xl z-50 pointer-events-auto">
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
