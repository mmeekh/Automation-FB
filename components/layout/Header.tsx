'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { BellIcon, Bars3Icon, XMarkIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useStore } from '@/lib/store';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [userMenuOpen]);

  const handleLogout = () => {
    setUser(null);
    router.push(`/${locale}/login`);
  };

  const navItems = [
    { key: 'dashboard', href: 'dashboard' },
    { key: 'automations', href: 'automations' },
    { key: 'analytics', href: 'analytics' },
    { key: 'templates', href: 'templates' },
    { key: 'settings', href: 'settings' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/dashboard`} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                  <span className="text-xl">⚡</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">
                  AutoFlow
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-6">
              {navItems.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}/${href}`}
                  className="text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors px-3 py-2 rounded-lg hover:bg-white/50"
                >
                  {t(key as any)}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              <button className="relative p-2 text-neutral-600 hover:text-primary-500 transition-colors rounded-lg hover:bg-white/50">
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              </button>

              {/* User Avatar with Dropdown */}
              {user && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold shadow-lg hover-lift cursor-pointer transition-all active:scale-95"
                  >
                    {user.avatar || user.name.charAt(0).toUpperCase()}
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 glass rounded-xl shadow-neu-lg border border-white/30 overflow-hidden z-50 card-enter">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-neutral-200/50">
                        <div className="font-semibold text-neutral-800 truncate">{user.name}</div>
                        <div className="text-xs text-neutral-600 truncate">{user.email}</div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href={`/${locale}/settings`}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <UserCircleIcon className="w-5 h-5" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href={`/${locale}/settings`}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <Cog6ToothIcon className="w-5 h-5" />
                          <span>Settings</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-neutral-200/50 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-accent-600 hover:bg-accent-50 transition-colors w-full text-left"
                        >
                          <ArrowRightOnRectangleIcon className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-600 hover:text-primary-500 transition-colors rounded-lg hover:bg-white/50"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 mt-16">
          <div className="glass h-full p-6 space-y-4 overflow-y-auto">
            {/* Mobile Language Switcher */}
            <div className="pb-4 border-b border-neutral-200 sm:hidden">
              <LanguageSwitcher />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navItems.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}/${href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-500 hover:bg-white/50 rounded-xl transition-all"
                >
                  {t(key as any)}
                </Link>
              ))}
            </nav>

            {/* Mobile User Info */}
            {user && (
              <div className="pt-4 border-t border-neutral-200">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-neutral-100 shadow-neu-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-lg">
                    {user.avatar || user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-800">{user.name}</div>
                    <div className="text-sm text-neutral-600">{user.email}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
