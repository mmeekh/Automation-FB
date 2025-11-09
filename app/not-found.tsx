'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const COPY = {
  en: {
    title: 'Page Not Found',
    message: 'Redirecting to home page...'
  },
  tr: {
    title: 'Sayfa Bulunamadı',
    message: 'Ana sayfaya yönlendiriliyorsunuz...'
  }
} as const;

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  const locale = useMemo(() => {
    const [maybeLocale] = pathname?.split('/').filter(Boolean) ?? [];
    return maybeLocale === 'tr' ? 'tr' : 'en';
  }, [pathname]);

  const copy = COPY[locale as 'en' | 'tr'] ?? COPY.en;

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(`/${locale}/dashboard`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [locale, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-primary-50/10 to-accent-50/10">
      <div className="text-center px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">{copy.title}</h2>
        <p className="text-neutral-600 mb-6">{copy.message}</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
