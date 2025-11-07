import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Rubik_Moonrocks } from 'next/font/google';
import { Footer, AuthModal } from '@/components';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastContainer } from '@/components/ui/Toast';
import { AuthProvider } from '@/components/providers/AuthProvider';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });
const rubikMoonrocks = Rubik_Moonrocks({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-moonrocks',
  display: 'swap'
});

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={rubikMoonrocks.variable}>
      <body className={inter.className}>
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              {children}
              <Footer />
              <AuthModal />
              <ToastContainer />
            </AuthProvider>
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
