'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useAccountStore } from '@/lib/store/accountStore';
import { useUIStore } from '@/lib/store/uiStore';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface AccountSwitcherProps {
  collapsed: boolean;
  onMenuStateChange?: (isOpen: boolean) => void;
}

export function AccountSwitcher({ collapsed, onMenuStateChange }: AccountSwitcherProps) {
  const {
    accounts,
    currentAccountId,
    selectAccount,
    loadAccounts,
    toggleAccountActive,
    toggleAccountCreditPool,
    removeAccount,
  } = useAccountStore();
  const { openAddAccountModal } = useUIStore();

  const connectedAccounts = accounts.filter((acc) => acc.isConnected);
  const currentAccount = accounts.find((acc) => acc.id === currentAccountId);

  const sanitizedAccounts = useMemo(
    () =>
      connectedAccounts.map((account) => ({
        ...account,
        isActive: account.isActive ?? true,
        includedInCreditPool: account.includedInCreditPool ?? false,
      })),
    [connectedAccounts]
  );

  const [showAccountActions, setShowAccountActions] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setMenuRef = useCallback((accountId: string) => (node: HTMLDivElement | null) => {
    if (node) {
      menuRefs.current[accountId] = node;
    } else {
      delete menuRefs.current[accountId];
    }
  }, []);

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
          title="Add Instagram Account"
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
          Instagram Accounts
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAccountActions((prev) => !prev)}
            className={`h-6 w-6 rounded-md border border-neutral-200 flex items-center justify-center text-sm transition-colors ${
              showAccountActions
                ? 'bg-primary-50 border-primary-200 text-primary-600'
                : 'text-neutral-500 hover:bg-neutral-100'
            }`}
            title="Account actions"
            type="button"
            aria-pressed={showAccountActions}
          >
            <span role="img" aria-label="Settings">
              ⚙️
            </span>
          </button>
          <button
            onClick={openAddAccountModal}
            className="w-6 h-6 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
            title="Add Account"
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

          return (
            <div
              key={account.id}
              role="button"
              tabIndex={0}
              onClick={() => selectAccount(account.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  selectAccount(account.id);
                }
              }}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border-2',
                isSelected
                  ? 'bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200'
                  : 'border-transparent hover:bg-neutral-50'
              )}
            >
              <div
                className={clsx(
                  'flex items-center gap-3 flex-1 min-w-0 transition-opacity',
                  !account.isActive && 'opacity-60'
                )}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
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
                <div className="flex-1 text-left overflow-hidden">
                  <p
                    className={`text-sm font-semibold truncate ${
                      isSelected ? 'text-primary-700' : 'text-neutral-800'
                    }`}
                  >
                    @{account.username}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">{account.displayName}</p>
                </div>
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
                      aria-label="Account actions"
                    >
                      <Bars3Icon className="h-5 w-5" />
                    </button>

                    {isMenuOpen && (
                      <div
                        ref={setMenuRef(account.id)}
                        className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl"
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
                          {account.isActive ? 'Pasifleştir' : 'Aktif et'}
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
                          <span>Ortak kredi havuzu</span>
                          <div
                            className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                              account.includedInCreditPool
                                ? 'border-green-500 bg-green-50'
                                : 'border-neutral-300 bg-white'
                            }`}
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${
                                account.includedInCreditPool ? 'bg-green-500' : 'bg-neutral-300'
                              }`}
                            />
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
                          Hesabı kaldır
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-right">
                    <p className="text-xs font-semibold text-neutral-700">
                      {account.usedQuota}/{account.totalQuota}
                    </p>
                    <div className="w-12 h-1.5 bg-neutral-200 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full transition-all ${
                          (account.usedQuota / account.totalQuota) * 100 > 80
                            ? 'bg-red-500'
                            : 'bg-gradient-to-r from-primary-500 to-accent-500'
                        }`}
                        style={{
                          width: `${Math.min((account.usedQuota / account.totalQuota) * 100, 100)}%`,
                        }}
                      />
                    </div>
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
            {connectedAccounts.length} accounts connected
          </p>
        </div>
      )}
    </div>
  );
}
