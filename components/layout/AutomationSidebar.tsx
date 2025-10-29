'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AccountSwitcher } from './AccountSwitcher';
import { AutomationSwitcher } from './AutomationSwitcher';
import {
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { useUIStore } from '@/lib/store/uiStore';
import { BuilderAnalyticsWidget } from '@/components/automation-builder/BuilderAnalyticsWidget';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  onClick?: () => void;
}

const navItemsBase: NavItem[] = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Automation', href: '/automations', icon: SparklesIcon },
];

const bottomItems: NavItem[] = [
  { name: 'Settings', href: '/automation-settings', icon: Cog6ToothIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
];

export function AutomationSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const builderView = useUIStore((s) => s.builderView);
  const showBuilderAnalytics = useUIStore((s) => s.showBuilderAnalytics);
  const showBuilderFlow = useUIStore((s) => s.showBuilderFlow);
  const [isOpen, setIsOpen] = useState(false);

  const isOnBuilderPage = pathname.includes('/automations/builder/');

  const navItems: NavItem[] = [
    ...navItemsBase,
    {
      name: 'Analytics',
      href: isOnBuilderPage ? pathname : '/automations',
      icon: ChartBarIcon,
      onClick: () => {
        if (isOnBuilderPage) {
          showBuilderAnalytics();
        } else {
          router.push('/automations');
        }
      },
    },
  ];

  return (
    <motion.div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      animate={{
        width: isOpen ? '280px' : '70px',
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="relative h-screen bg-white border-r border-neutral-200 flex flex-col overflow-hidden"
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-neutral-100">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              display: isOpen ? 'inline-block' : 'none',
            }}
            transition={{ duration: 0.2 }}
            className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent whitespace-nowrap"
          >
            LookLab
          </motion.span>
        </Link>
      </div>

      {/* Account Switcher */}
      <div className="px-4 py-6 border-b border-neutral-100">
        <AccountSwitcher collapsed={!isOpen} />
      </div>

      {/* Automation Switcher */}
      <div className="px-4 py-6 border-b border-neutral-100">
        <AutomationSwitcher collapsed={!isOpen} />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isAnalyticsItem = item.name === 'Analytics';
          const isActive = isAnalyticsItem
            ? isOnBuilderPage && builderView === 'analytics'
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          const commonClass = `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
            isActive
              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
              : 'text-neutral-600 hover:bg-neutral-50'
          }`;

          const content = (
            <>
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-neutral-500 group-hover:text-primary-500'
                }`}
              />
              <motion.span
                animate={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'inline-block' : 'none' }}
                transition={{ duration: 0.15 }}
                className={`font-medium whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-neutral-700 group-hover:translate-x-1 transition-transform'
                }`}
              >
                {item.name}
              </motion.span>
              {isOpen && item.badge && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-accent-500 text-white"
                >
                  {item.badge}
                </motion.span>
              )}
            </>
          );

          return item.onClick ? (
            <button key={item.name} onClick={item.onClick} className={commonClass} type="button">
              {content}
            </button>
          ) : (
            <Link key={item.name} href={item.href} className={commonClass}>
              {content}
            </Link>
          );
        })}
      </nav>

      <BuilderAnalyticsWidget collapsed={!isOpen} />

      {/* Bottom Section */}
      <div className="border-t border-neutral-100 px-3 py-4 space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-600 hover:bg-neutral-50 transition-all group"
            >
              <Icon className="w-5 h-5 text-neutral-500 group-hover:text-primary-500 flex-shrink-0" />
              <motion.span
                animate={{
                  opacity: isOpen ? 1 : 0,
                  display: isOpen ? 'inline-block' : 'none',
                }}
                transition={{ duration: 0.15 }}
                className="font-medium text-neutral-700 whitespace-nowrap group-hover:translate-x-1 transition-transform"
              >
                {item.name}
              </motion.span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
