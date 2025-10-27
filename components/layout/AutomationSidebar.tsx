'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAccountStore } from '@/lib/store/accountStore';
import { useUIStore } from '@/lib/store/uiStore';
import { AccountSwitcher } from './AccountSwitcher';
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Contacts', href: '/contacts', icon: UsersIcon },
  { name: 'Automation', href: '/automations', icon: SparklesIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export function AutomationSidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  const { getCurrentAccount } = useAccountStore();

  const currentAccount = getCurrentAccount();

  return (
    <div
      className={`relative h-screen bg-white border-r border-neutral-200 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'w-[70px]' : 'w-[280px]'
      }`}
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-neutral-100">
        {!isSidebarCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              LookLab
            </span>
          </Link>
        )}

        {isSidebarCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">L</span>
          </div>
        )}
      </div>

      {/* Account Switcher */}
      <div className="px-4 py-6 border-b border-neutral-100">
        <AccountSwitcher collapsed={isSidebarCollapsed} />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-neutral-500 group-hover:text-primary-500'
                }`}
              />

              {!isSidebarCollapsed && (
                <span className={`font-medium ${isActive ? 'text-white' : 'text-neutral-700'}`}>
                  {item.name}
                </span>
              )}

              {!isSidebarCollapsed && item.badge && (
                <span className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-accent-500 text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-neutral-100 px-3 py-4 space-y-2">
        {/* Profile */}
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-600 hover:bg-neutral-50 transition-all"
        >
          <UserCircleIcon className="w-5 h-5 text-neutral-500" />
          {!isSidebarCollapsed && <span className="font-medium text-neutral-700">My Profile</span>}
        </Link>

        {/* Help */}
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-600 hover:bg-neutral-50 transition-all"
        >
          <QuestionMarkCircleIcon className="w-5 h-5 text-neutral-500" />
          {!isSidebarCollapsed && <span className="font-medium text-neutral-700">Help</span>}
        </Link>
      </div>

      {/* Collapse/Expand Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-white border-2 border-neutral-200 shadow-md flex items-center justify-center hover:bg-neutral-50 transition-all"
      >
        {isSidebarCollapsed ? (
          <ChevronRightIcon className="w-3 h-3 text-neutral-600" />
        ) : (
          <ChevronLeftIcon className="w-3 h-3 text-neutral-600" />
        )}
      </button>
    </div>
  );
}
