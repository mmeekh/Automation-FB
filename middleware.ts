import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const config = {
  // Skip all paths that should not be internationalized (including /api/*)
  matcher: ['/', '/(tr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
