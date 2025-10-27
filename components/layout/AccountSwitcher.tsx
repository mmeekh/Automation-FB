'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useAccountStore } from '@/lib/store/accountStore';
import { useUIStore } from '@/lib/store/uiStore';
import { PlusIcon } from '@heroicons/react/24/solid';

interface AccountSwitcherProps {
  collapsed: boolean;
}

export function AccountSwitcher({ collapsed }: AccountSwitcherProps) {
  const { accounts, currentAccountId, selectAccount, loadAccounts } = useAccountStore();
  const { openAddAccountModal } = useUIStore();

  const connectedAccounts = accounts.filter((acc) => acc.isConnected);
  const currentAccount = accounts.find((acc) => acc.id === currentAccountId);

  // Load accounts on mount
  useEffect(() => {
    if (accounts.length === 0) {
      loadAccounts();
    }
  }, [accounts.length, loadAccounts]);

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
        <button
          onClick={openAddAccountModal}
          className="w-6 h-6 rounded-full border-2 border-dashed border-neutral-300 hover:border-primary-400 flex items-center justify-center transition-all hover:bg-primary-50 group"
          title="Add Account"
        >
          <PlusIcon className="w-3 h-3 text-neutral-400 group-hover:text-primary-500" />
        </button>
      </div>

      {/* Account List */}
      <div className="space-y-2">
        {connectedAccounts.map((account) => {
          const isActive = account.id === currentAccountId;

          return (
            <button
              key={account.id}
              onClick={() => selectAccount(account.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-50 to-accent-50 border-2 border-primary-200'
                  : 'hover:bg-neutral-50 border-2 border-transparent'
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden ${
                    isActive ? 'ring-2 ring-primary-500 ring-offset-2' : ''
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
                    isActive ? 'text-primary-700' : 'text-neutral-800'
                  }`}
                >
                  @{account.username}
                </p>
                <p className="text-xs text-neutral-500 truncate">{account.displayName}</p>
              </div>

              {/* Quota indicator */}
              <div className="flex-shrink-0">
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
              </div>
            </button>
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
