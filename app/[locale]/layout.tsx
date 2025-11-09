import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Footer, AuthModal } from '@/components';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastContainer } from '@/components/ui/Toast';
import { AuthProvider } from '@/components/providers/AuthProvider';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
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
  );
}
