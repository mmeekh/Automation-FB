'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { BellIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useStore } from '@/lib/store';
import { useAuth } from '@/lib/hooks/useAuth';
import { BLOG_CATEGORIES } from '@/lib/blog/data';
import { getBlogCategoryTheme } from '@/lib/blog/categoryThemes';
import { AutomationRegistry } from '@/lib/automations';
import Hamburger from '@/components/ui/Hamburger';
import { getAutomationLandingUrl } from '@/lib/utils/automation-slugs';

// Navigation items - memoized outside component
type NavKey = 'dashboard' | 'automations' | 'blog' | 'pricing';

const NAV_ITEMS: ReadonlyArray<{ key: NavKey; href: string }> = [
  { key: 'dashboard', href: 'dashboard' },
  { key: 'automations', href: 'automations' },
  { key: 'blog', href: 'blog' },
  { key: 'pricing', href: 'pricing' },
] as const;

// Blog category icon mapping
const BLOG_CATEGORY_ICONS: Record<string, string> = {
  'growth-playbooks': '/icons/growthicon.png',
  'ai-customer-experience': '/icons/aicustomerexicon.png',
  'salon-success-stories': '/icons/successicon.png',
  'instagram-content-strategy': '/icons/contentstrategyicon.png',
  'business-analytics': '/icons/businessanalyticsicon.png',
};

export function Header() {
  const t = useTranslations('nav');
  const authT = useTranslations('auth');
  const userMenuT = useTranslations('header.userMenu');
  const blogT = useTranslations('blogCategories');
  const automationT = useTranslations('automationNames');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setAccounts = useStore((state) => state.setAccounts);
  const setWorkflows = useStore((state) => state.setWorkflows);
  const openAuthModal = useStore((state) => state.openAuthModal);
  const { logout: authLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuTimer = useRef<NodeJS.Timeout | null>(null);
  const automationTemplates = useMemo(() => AutomationRegistry.getAllTemplates(), []);

  useEffect(() => {
    return () => {
      if (menuTimer.current) clearTimeout(menuTimer.current);
    };
  }, []);

  // Check if current path is active
  const isActive = (href: string) => {
    return pathname?.includes(`/${href}`);
  };

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

  const handleLogout = async () => {
    // Call backend logout to clear HTTP-only cookie
    await authLogout();

    // Clear local state
    setUser(null);
    setAccounts([]);
    setWorkflows([]);
    setUserMenuOpen(false);

    // Redirect to dashboard
    router.push(`/${locale}/dashboard`);
  };

  const getAvatarContent = (size: 'desktop' | 'mobile') => {
    if (!user) return null;
    const avatar = user.avatar?.trim() || '';
    const isUrl = avatar.startsWith('http');
    const sizeClasses =
      size === 'desktop'
        ? 'w-9 h-9 sm:w-10 sm:h-10'
        : 'w-12 h-12';

    if (isUrl) {
      return (
        <Image
          src={avatar}
          alt={user.name}
          width={48}
          height={48}
          className={`${sizeClasses} rounded-full object-cover`}
        />
      );
    }

    const initial = avatar || user.name.charAt(0).toUpperCase();
    return (
      <span className="text-white font-semibold text-sm sm:text-base">
        {initial}
      </span>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/dashboard`} prefetch={false} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                  <span className="text-xl font-semibold text-white">LL</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold gradient-text">
                  LookLab
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-4">
              {NAV_ITEMS.map(({ key, href }) => {
                const active = isActive(href);
                const hasDropdown = key === 'blog' || key === 'automations';
                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => {
                      if (!hasDropdown) return;
                      if (menuTimer.current) clearTimeout(menuTimer.current);
                      setHoveredMenu(key);
                    }}
                    onMouseLeave={() => {
                      if (!hasDropdown) return;
                      if (menuTimer.current) clearTimeout(menuTimer.current);
                      menuTimer.current = setTimeout(() => setHoveredMenu((current) => (current === key ? null : current)), 120);
                    }}
                  >
                    <Link
                      href={`/${locale}/${href}`}
                      prefetch={false}
                      className={`text-sm font-medium transition-all px-3 py-2 rounded-lg ${
                        active
                          ? 'text-accent-600 bg-accent-50 font-bold'
                          : 'text-neutral-600 hover:text-primary-500 hover:bg-white/50'
                      }`}
                    >
                      {t(key)}
                    </Link>
                    {hasDropdown && hoveredMenu === key && (
                      <div
                        className="absolute left-0 top-full z-50 mt-2 w-72 rounded-3xl border border-neutral-200 bg-white shadow-[0_18px_46px_-16px_rgba(15,23,42,0.25)] transition-all duration-200"
                        onMouseEnter={() => {
                          if (menuTimer.current) clearTimeout(menuTimer.current);
                          setHoveredMenu(key);
                        }}
                        onMouseLeave={() => {
                          if (menuTimer.current) clearTimeout(menuTimer.current);
                          menuTimer.current = setTimeout(() => setHoveredMenu(null), 120);
                        }}
                      >
                        {key === 'blog' ? (
                          <div className="flex flex-col gap-0.5 p-2">
                            {BLOG_CATEGORIES.map((category) => {
                              const iconPath = BLOG_CATEGORY_ICONS[category.slug];

                              return (
                                <Link
                                  key={category.slug}
                                  href={`/${locale}/blog/category/${category.slug}`}
                                  className="flex items-center gap-3 rounded-xl px-3 py-1.5 transition-all duration-200 hover:bg-neutral-100 hover:shadow-sm"
                                >
                                  {iconPath && (
                                    <Image
                                      src={iconPath}
                                      alt={category.title}
                                      width={56}
                                      height={56}
                                      className="h-10 w-10 flex-shrink-0 object-contain"
                                    />
                                  )}
                                  <h3 className="text-sm font-semibold text-neutral-900 leading-tight">
                                    {blogT(category.title) || category.title}
                                  </h3>
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <div className="max-h-80 overflow-y-auto p-2 scrollbar-hidden">
                              {automationTemplates.map((template) => (
                                <Link
                                  key={template.id}
                                  href={getAutomationLandingUrl(template.id, locale)}
                                  className="flex items-center gap-3 rounded-2xl px-2 py-3 transition-all duration-200 hover:bg-primary-100 hover:shadow-sm"
                                >
                                  <span className="text-2xl leading-none" aria-hidden="true">
                                    {template.icon ?? '🤖'}
                                  </span>
                                  <div>
                                    <p className="text-sm font-semibold text-neutral-900">{automationT(template.name) || template.name}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {!user && (
                <div className="hidden sm:block">
                  <LanguageSwitcher />
                </div>
              )}

              {user ? (
                <>
                  <button className="relative hidden sm:inline-flex p-2 text-neutral-600 hover:text-primary-500 transition-colors rounded-lg hover:bg-white/50">
                    <BellIcon className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                  </button>

                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setUserMenuOpen((prev) => !prev)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg hover-lift cursor-pointer transition-all active:scale-95"
                    >
                      {getAvatarContent('desktop')}
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-neutral-200/60 bg-white shadow-[0_18px_42px_-18px_rgba(15,23,42,0.25)] overflow-hidden z-50">
                        <div className="px-4 py-3">
                          <p className="text-sm font-semibold text-neutral-900">{user.name}</p>
                          <p className="text-xs text-neutral-500">{user.email}</p>
                        </div>

                        <div className="border-t border-neutral-100">
                          <Link
                            href={`/${locale}/settings`}
                            prefetch={false}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            <UserCircleIcon className="h-5 w-5 text-neutral-400" />
                            <span>{userMenuT('profile')}</span>
                          </Link>
                          <Link
                            href={`/${locale}/settings`}
                            prefetch={false}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            <Cog6ToothIcon className="h-5 w-5 text-neutral-400" />
                            <span>{t('settings')}</span>
                          </Link>
                          <div className="px-4 py-3">
                            <LanguageSwitcher />
                          </div>
                        </div>

                        <div className="border-t border-neutral-100 bg-rose-50/40">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
                          >
                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                            <span>{authT('logout')}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={openAuthModal}
                  className="hidden sm:inline-flex bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  {authT('login')}
                </Button>
              )}

              <Hamburger
                onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-neutral-600 hover:text-primary-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 mt-16">
          <div className="glass h-full p-6 space-y-4 overflow-y-auto">
            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {NAV_ITEMS.map(({ key, href }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={key}
                    href={`/${locale}/${href}`}
                    prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-all relative ${
                      active
                        ? 'text-accent-600 bg-accent-50 font-bold border-l-4 border-accent-500'
                        : 'text-neutral-700 hover:text-primary-500 hover:bg-white/50'
                    }`}
                  >
                    {t(key)}
                    {active && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile User Info */}
            <div className="pt-4 border-t border-neutral-200 space-y-4">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-neutral-100 shadow-neu-sm">
                    <div className="rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                      {getAvatarContent('mobile')}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800">{user.name}</div>
                      <div className="text-sm text-neutral-600">{user.email}</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-neutral-200 p-4 space-y-3 bg-white/80">
                    <LanguageSwitcher />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-200 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      {authT('logout')}
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  {authT('login')}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
