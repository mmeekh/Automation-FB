'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  const locale = useMemo(() => {
    if (!pathname) return 'en';
    const [, maybeLocale] = pathname.split('/');
    return maybeLocale && maybeLocale.length > 0 ? maybeLocale : 'en';
  }, [pathname]);

  if (pathname?.includes('/automations/builder/')) {
    return null;
  }

  const withLocale = (segment: string) => {
    if (!segment || segment === '/') {
      return `/${locale}`;
    }
    return `/${locale}${segment.startsWith('/') ? segment : `/${segment}`}`;
  };

  const aboutLinks = [
    { label: 'About Us', href: withLocale('/') },
    { label: 'Blog', href: withLocale('/blog') },
    { label: 'Pricing', href: withLocale('/pricing') },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: withLocale('/legal/privacy') },
    { label: 'Terms of Service', href: withLocale('/legal/terms') },
    { label: 'Data Deletion', href: withLocale('/legal/data-deletion') },
  ];

  return (
    <footer className="relative w-full overflow-hidden border-t border-neutral-200 bg-neutral-50/50 backdrop-blur-sm pt-16 pb-40 lg:pt-24 lg:pb-48">
      {/* Large LookLab wordmark (desktop) */}
      <div className="footer-big-text hidden lg:block" aria-hidden="true">
        Look Lab
      </div>

      {/* Main footer content */}
      <div className="relative z-20 mx-auto mb-8 max-w-7xl px-6 lg:mb-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={withLocale('/')} className="text-xl font-bold tracking-tight text-neutral-900">
              LookLab
            </Link>
            <p className="text-sm leading-relaxed text-neutral-600">
              Instagram automation made simple. Transform your DMs with AI-powered workflows.
            </p>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              About
            </h3>
            <ul className="space-y-3 text-sm">
              {aboutLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-neutral-600 transition-colors hover:text-primary-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-neutral-600 transition-colors hover:text-primary-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Social Media
            </h3>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/looklab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-primary-600"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/looklab.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 transition-colors hover:text-primary-600"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <p className="pt-2 text-sm text-neutral-500">
              Copyright {new Date().getFullYear()} LookLab. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Large LookLab wordmark (mobile) */}
      <div className="footer-big-text-mobile lg:hidden" aria-hidden="true">
        Look Lab
      </div>
    </footer>
  );
}
