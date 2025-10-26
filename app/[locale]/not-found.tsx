'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname?.split('/')[1] || 'en';

  useEffect(() => {
    // Redirect to dashboard after 1 second
    const timeout = setTimeout(() => {
      router.push(`/${locale}/dashboard`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [router, locale]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-primary-50/10 to-accent-50/10">
      <div className="text-center px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          {locale === 'tr' ? 'Sayfa Bulunamadı' : 'Page Not Found'}
        </h2>
        <p className="text-neutral-600 mb-6">
          {locale === 'tr' ? 'Ana sayfaya yönlendiriliyorsunuz...' : 'Redirecting to home page...'}
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
