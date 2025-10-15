'use client';

import { useTranslations } from 'next-intl';
import { BellIcon } from '@heroicons/react/24/outline';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useStore } from '@/lib/store';

export function Header() {
  const t = useTranslations('nav');
  const user = useStore((state) => state.user);

  const navItems = [
    { key: 'dashboard', href: '/dashboard' },
    { key: 'automations', href: '/automations' },
    { key: 'analytics', href: '/analytics' },
    { key: 'templates', href: '/templates' },
    { key: 'settings', href: '/settings' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              AutoFlow
            </h1>
            <nav className="hidden md:flex gap-6">
              {navItems.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  className="text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors"
                >
                  {t(key as any)}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button className="relative p-2 text-neutral-600 hover:text-primary-500 transition-colors">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full" />
            </button>
            {user && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                {user.avatar || user.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
