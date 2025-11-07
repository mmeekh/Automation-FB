'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { DragEvent as ReactDragEvent } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useAccountStore } from '@/lib/store/accountStore';
import { useUIStore } from '@/lib/store/uiStore';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface AccountSwitcherProps {
  collapsed: boolean;
  onMenuStateChange?: (isOpen: boolean) => void;
  onRequestCollapse?: () => void;
}

const getQuotaClasses = (used: number, total: number) => {
  const safeTotal = total > 0 ? total : 1;
  const remainingRatio = Math.max(0, (safeTotal - used) / safeTotal);

  if (remainingRatio <= 0.1) {
    return { text: 'text-red-600', bar: 'bg-red-500' };
  }
  if (remainingRatio <= 0.25) {
    return { text: 'text-orange-500', bar: 'bg-orange-500' };
  }
  if (remainingRatio <= 0.5) {
    return { text: 'text-yellow-500', bar: 'bg-yellow-400' };
  }
  return { text: 'text-green-600', bar: 'bg-green-500' };
};

export function AccountSwitcher({ collapsed, onMenuStateChange, onRequestCollapse }: AccountSwitcherProps) {
  const {
    accounts,
    currentAccountId,
    selectAccount,
    loadAccounts,
    toggleAccountActive,
    toggleAccountCreditPool,
    removeAccount,
  } = useAccountStore();
  const reorderAccounts = useAccountStore((s) => s.reorderAccounts);
  const { openAddAccountModal } = useUIStore();
  const t = useTranslations('accountSwitcher');
  const locale = useLocale();
  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const connectedAccounts = accounts.filter((acc) => acc.isConnected);
  const currentAccount = accounts.find((acc) => acc.id === currentAccountId);

  const sanitizedAccounts = useMemo(
    () =>
      connectedAccounts.map((account) => {
        const poolEnabled =
          (account as typeof account & { poolEnabled?: boolean }).poolEnabled ??
          account.includedInCreditPool ??
          false;

        return {
          ...account,
          isActive: account.isActive ?? true,
          includedInCreditPool: account.includedInCreditPool ?? false,
          poolEnabled,
        };
      }),
    [connectedAccounts]
  );

  const [showAccountActions, setShowAccountActions] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setMenuRef = useCallback((accountId: string) => (node: HTMLDivElement | null) => {
    if (node) {
      menuRefs.current[accountId] = node;
    } else {
      delete menuRefs.current[accountId];
    }
  }, []);

  const handleDragStart = useCallback(
    (event: ReactDragEvent<HTMLDivElement>, accountId: string) => {
      event.stopPropagation();
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', accountId);
      setOpenMenuId(null);
      setDraggingId(accountId);
      setDragOverId(null);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDragOverId(null);
  }, []);

  const handleDragOver = useCallback(
    (event: ReactDragEvent<HTMLDivElement>, targetAccountId: string) => {
      if (!draggingId || draggingId === targetAccountId) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setDragOverId((prev) => (prev === targetAccountId ? prev : targetAccountId));
    },
    [draggingId]
  );

  const handleDragLeave = useCallback(
    (event: ReactDragEvent<HTMLDivElement>, targetAccountId: string) => {
      const related = event.relatedTarget as Node | null;
      if (related && event.currentTarget.contains(related)) {
        return;
      }
      setDragOverId((prev) => (prev === targetAccountId ? null : prev));
    },
    []
  );

  const handleDrop = useCallback(
    (event: ReactDragEvent<HTMLDivElement>, targetAccountId: string) => {
      if (!draggingId) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (draggingId !== targetAccountId) {
        reorderAccounts(draggingId, targetAccountId);
      }
      setDraggingId(null);
      setDragOverId(null);
    },
    [draggingId, reorderAccounts]
  );

  // Load accounts on mount
  useEffect(() => {
    if (accounts.length === 0) {
      loadAccounts();
    }
  }, [accounts.length, loadAccounts]);

  useEffect(() => {
    if (collapsed) {
      setShowAccountActions(false);
      setOpenMenuId(null);
    }
  }, [collapsed]);

  useEffect(() => {
    if (!showAccountActions) {
      setOpenMenuId(null);
    }
  }, [showAccountActions]);

  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (event: PointerEvent) => {
      const container = menuRefs.current[openMenuId];
      if (container && container.contains(event.target as Node)) {
        return;
      }
      setOpenMenuId(null);
      onRequestCollapse?.();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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

  useEffect(() => {
    onMenuStateChange?.(Boolean(openMenuId));
  }, [openMenuId, onMenuStateChange]);

  if (collapsed) {
    // Collapsed: Show only current account + add button
    return (
      <div className="flex flex-col items-center gap-3">
        {/* Current Account Avatar */}
        {currentAccount && (
          <button
            className="relative group"
            title={`@${currentAccount.username}`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500 shadow-md">
              <Image
                src={currentAccount.profilePicture}
                alt={currentAccount.username}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            {/* Active indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
          </button>
        )}

        {/* Add Account Button */}
        <button
          onClick={openAddAccountModal}
          className="w-10 h-10 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
          title={t('collapsedAdd')}
        >
          <PlusIcon className="w-5 h-5 text-neutral-400 group-hover:text-primary-500" />
        </button>
      </div>
    );
  }

  // Expanded: Show account list
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          {t('title')}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAccountActions((prev) => !prev)}
            className={`h-6 w-6 rounded-md border border-neutral-200 flex items-center justify-center text-sm transition-colors ${
              showAccountActions
                ? 'bg-primary-50 border-primary-200 text-primary-600'
                : 'text-neutral-500 hover:bg-neutral-100'
            }`}
            title={t('accountActions')}
            type="button"
            aria-pressed={showAccountActions}
          >
            <span role="img" aria-label={t('menuIconLabel')}>
              ⚙️
            </span>
          </button>
          <button
            onClick={openAddAccountModal}
            className="w-6 h-6 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
            title={t('addAccount')}
            type="button"
          >
            <PlusIcon className="w-3 h-3 text-neutral-400 group-hover:text-primary-500" />
          </button>
        </div>
      </div>

      {/* Account List */}
      <div className="space-y-2">
        {sanitizedAccounts.map((account) => {
          const isSelected = account.id === currentAccountId;
          const isMenuOpen = openMenuId === account.id;
          const isDragging = draggingId === account.id;
          const isDragOver = dragOverId === account.id && draggingId !== account.id;
          const poolEnabled = account.poolEnabled ?? account.includedInCreditPool ?? false;
          const totalGenerations = account.totalGenerations || 0;
          const formattedGenerations = numberFormatter.format(totalGenerations);

          return (
            <div
              key={account.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (draggingId) {
                  return;
                }
                selectAccount(account.id);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  selectAccount(account.id);
                }
              }}
              draggable
              onDragStart={(event) => handleDragStart(event, account.id)}
              onDragEnd={handleDragEnd}
              onDragEnter={(event) => handleDragOver(event, account.id)}
              onDragOver={(event) => handleDragOver(event, account.id)}
              onDragLeave={(event) => handleDragLeave(event, account.id)}
              onDrop={(event) => handleDrop(event, account.id)}
              className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200'
                  : 'border-transparent hover:bg-neutral-50'
              } ${
                isDragOver ? 'border-dashed border-primary-300 bg-primary-50/60 shadow-md' : ''
              } ${isDragging ? 'cursor-grabbing scale-[1.02] shadow-lg ring-2 ring-primary-200 opacity-95' : 'cursor-grab'}`}
            >
              {/* Avatar */}
              <div className={`relative flex-shrink-0 ${account.isActive ? '' : 'opacity-60'}`}>
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden ${
                    isSelected ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                  }`}
                >
                  <Image
                    src={account.profilePicture}
                    alt={account.username}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                {/* Active flows indicator */}
                {account.activeFlowsCount > 0 && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">
                      {account.activeFlowsCount}
                    </span>
                  </div>
                )}
              </div>

              {/* Account Info */}
              <div className={`flex-1 text-left overflow-hidden ${account.isActive ? '' : 'opacity-60'}`}>
                <p
                  className={`text-sm font-semibold truncate ${
                    isSelected ? 'text-primary-700' : 'text-neutral-800'
                  }`}
                >
                  @{account.username}
                </p>
                <p className="text-xs text-neutral-500 truncate">{account.displayName}</p>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full ${
                    account.isActive ? 'bg-green-500 animate-pulse' : 'bg-neutral-400'
                  }`}
                />

                {showAccountActions ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenMenuId((prev) => (prev === account.id ? null : account.id));
                      }}
                      className="relative flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      aria-label={isMenuOpen ? t('toggle.close') : t('toggle.open')}
                    >
                      {isMenuOpen ? (
                        <XMarkIcon className="h-5 w-5" />
                      ) : (
                        <Bars3Icon className="h-5 w-5" />
                      )}
                    </button>

                    {isMenuOpen && (
                      <div
                        ref={setMenuRef(account.id)}
                        className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl pointer-events-auto"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleAccountActive(account.id);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                        >
                          {account.isActive ? t('menu.deactivate') : t('menu.activate')}
                          <div
                            className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                              account.isActive ? 'border-red-500' : 'border-green-500'
                            }`}
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${
                                account.isActive ? 'bg-red-500' : 'bg-green-500'
                              }`}
                            />
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleAccountCreditPool(account.id);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100"
                        >
                          <span>{t('menu.sharedPool')}</span>
                          <div
                            className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                              poolEnabled ? 'border-green-500' : 'border-red-500'
                            }`}
                          >
                            {poolEnabled ? (
                              <span className="text-green-500 text-xs">✓</span>
                            ) : (
                              <span className="text-red-500 text-xs">✕</span>
                            )}
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeAccount(account.id);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                        >
                          {t('menu.remove')}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`text-right ${poolEnabled ? 'transform -translate-y-[1px]' : ''}`}>
                    <p className="text-xs font-semibold text-primary-600">
                      {t('generations', { count: formattedGenerations })}
                    </p>
                    {poolEnabled && (
                      <div className="mt-1 flex justify-end">
                        <div className="flex flex-col items-center">
                          <span className="text-[11px] font-semibold leading-none text-[#16a34a]">
                            {t('poolLabel')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Multiple accounts indicator */}
      {connectedAccounts.length > 3 && (
        <div className="pt-4 border-t border-neutral-100">
          <p className="text-xs text-center text-neutral-500">
            {t('connected', { count: connectedAccounts.length })}
          </p>
        </div>
      )}
    </div>
  );
}
