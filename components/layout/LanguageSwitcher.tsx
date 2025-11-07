'use client';

import { useLocale } from 'next-intl';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, type Locale } from '@/i18n/config';

const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales });

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-2 items-center bg-white/50 rounded-lg p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
            locale === loc
              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
