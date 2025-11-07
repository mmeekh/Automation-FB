import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, type Locale } from './config';

export { locales, defaultLocale };
export type { Locale };

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  // Type guard to check if locale is valid
  const isValidLocale = (loc: string | undefined): loc is Locale => {
    return !!loc && (locales as readonly string[]).includes(loc);
  };

  if (!isValidLocale(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
