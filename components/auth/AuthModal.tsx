'use client';

import { type FormEvent, type MouseEvent, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { useFacebookSDK } from '@/lib/hooks/useFacebookSDK';
import { useAuth } from '@/lib/hooks/useAuth';
import { useToast } from '@/lib/hooks/useToast';
import { CredentialResponse, useGoogleLogin } from '@react-oauth/google';


const GoogleIcon = () => (
  <motion.svg
    className="w-7 h-7"
    viewBox="0 0 24 24"
    aria-hidden="true"
    whileHover={{ scale: 1.15, rotate: -5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.38-1.04 2.55-2.22 3.34v2.77h3.58c2.1-1.94 3.28-4.79 3.28-8.12z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.58-2.77c-.99.67-2.26 1.07-3.7 1.07-2.85 0-5.27-1.93-6.13-4.54H2.17v2.85C3.98 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.87 13.1c-.22-.67-.35-1.38-.35-2.1s.13-1.43.35-2.1V6.05H2.17C1.42 7.58 1 9.23 1 11s.42 3.42 1.17 4.95l2.7-2.22z"
    />
    <path
      fill="#EA4335"
      d="M12 4.74c1.62 0 3.07.56 4.21 1.67l3.15-3.15C17.45 1.4 14.97.33 12 .33 7.7.33 3.98 2.8 2.17 6.05l2.7 2.22C5.73 5.66 8.15 4.74 12 4.74z"
    />
  </motion.svg>
);

const InstagramIcon = () => (
  <motion.svg
    className="w-9 h-9"
    viewBox="0 0 24 24"
    aria-hidden="true"
    whileHover={{ scale: 1.15, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <defs>
      <radialGradient id="instagramGradient" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#FDF497" />
        <stop offset="5%" stopColor="#FDF497" />
        <stop offset="45%" stopColor="#FD5949" />
        <stop offset="60%" stopColor="#D6249F" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <motion.rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      fill="url(#instagramGradient)"
      animate={{
        boxShadow: ["0 0 0px rgba(225, 48, 108, 0)", "0 0 20px rgba(225, 48, 108, 0.5)", "0 0 0px rgba(225, 48, 108, 0)"]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="2.2" fill="white" />
    <circle cx="16.2" cy="7.8" r="1.1" fill="white" />
  </motion.svg>
);

interface SocialButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  icon: React.ReactNode;
  label: string;
}

function SocialButton({ onClick, disabled, loading, icon, label }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-14 w-24 items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-300 hover:shadow-md disabled:opacity-50"
      aria-label={label}
    >
      {loading ? (
        <div className="h-6 w-6 rounded-full border-2 border-neutral-400 border-t-transparent animate-spin" />
      ) : (
        icon
      )}
    </button>
  );
}

export function AuthModal() {
  const t = useTranslations('auth');
  const router = useRouter();
  const locale = useLocale();
  const isAuthModalOpen = useStore((state) => state.isAuthModalOpen);
  const closeAuthModal = useStore((state) => state.closeAuthModal);
  const setUser = useStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingProvider, setLoadingProvider] = useState<'email' | 'google' | 'instagram' | null>(null);

  const { isLoaded: fbSdkLoaded, login: facebookLogin } = useFacebookSDK();
  const { login: backendLogin, loginWithGoogle } = useAuth();
  const toast = useToast();

  const handleGoogleSuccess = useCallback(
    async (tokenResponse: CredentialResponse) => {
      try {
        const credential = tokenResponse.credential;
        if (!credential) {
          throw new Error('Google kimlik belirteci eksik');
        }

        const backendResult = await loginWithGoogle(credential);

        if (!backendResult.success || !backendResult.user) {
          throw new Error('Google ile kimlik doğrulaması başarısız');
        }

        const userInfo = backendResult.user;
        const displayName = userInfo.name || 'Kullanıcı';

        setUser({
          id: userInfo.id,
          name: displayName,
          email: userInfo.email || '',
          avatar:
            userInfo.picture ||
            displayName.charAt(0)?.toUpperCase() ||
            'G',
        });

        toast.success(`Hoş geldiniz, ${displayName}!`);
        closeAuthModal();

        setTimeout(() => {
          router.push(`/${locale}/dashboard`);
        }, 500);
      } catch (error) {
        console.error('Google login error:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Google ile giriş yapılamadı';
        toast.error(errorMessage);
      } finally {
        setLoadingProvider(null);
      }
    },
    [closeAuthModal, locale, loginWithGoogle, router, setUser, toast]
  );

  const handleGoogleError = useCallback(() => {
    toast.error('Google kimlik doğrulaması başarısız oldu');
    setLoadingProvider(null);
  }, [toast]);

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: 'implicit',
  });

  const trimmedEmail = useMemo(() => email.trim(), [email]);
  const showPasswordField = trimmedEmail.length > 0;
  const emailDisabled = trimmedEmail.length === 0 || (showPasswordField && password.length === 0) || loadingProvider !== null;

  if (!isAuthModalOpen) return null;

  const completeLogin = (data: { id: string; name: string; email: string; avatar: string }) => {
    setTimeout(() => {
      setUser(data);
      setLoadingProvider(null);
      closeAuthModal();
    }, 800);
  };

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailDisabled) return;
    setLoadingProvider('email');
    completeLogin({
      id: 'email_user',
      name: trimmedEmail.split('@')[0] || 'Kullanıcı',
      email: trimmedEmail,
      avatar: trimmedEmail.charAt(0)?.toUpperCase() ?? 'E',
    });
  };

  const handleGoogleLogin = () => {
    setLoadingProvider('google');
    try {
      googleLogin();
    } catch (error) {
      console.error('Google login failed to start:', error);
      toast.error('Google ile giriş başlatılamadı');
      setLoadingProvider(null);
    }
  };

  const handleInstagramLogin = async () => {
    if (!fbSdkLoaded) {
      toast.error('Facebook SDK yükleniyor, lütfen bekleyin...');
      return;
    }

    setLoadingProvider('instagram');

    try {
      // 1. Facebook SDK ile login
      const fbResult = await facebookLogin();

      if (!fbResult.success || !fbResult.accessToken) {
        throw new Error(fbResult.error || 'Facebook login başarısız');
      }

      // 2. Backend'e access token gönder
      const backendResult = await backendLogin(fbResult.accessToken);

      if (!backendResult.success || !backendResult.user) {
        throw new Error('Backend authentication başarısız');
      }

      // 3. Store'a kullanıcıyı kaydet
      setUser({
        id: backendResult.user.id,
        name: backendResult.user.name,
        email: backendResult.user.email || '',
        avatar: backendResult.user.picture || backendResult.user.name.charAt(0).toUpperCase(),
      });

      // 4. Success
      toast.success(`Hoş geldiniz, ${backendResult.user.name}!`);
      closeAuthModal();

      // Dashboard'a yönlendir
      setTimeout(() => {
        router.push(`/${locale}/dashboard`);
      }, 500);
    } catch (error) {
      console.error('Instagram login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Giriş yapılamadı';
      toast.error(errorMessage);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && loadingProvider === null) {
      closeAuthModal();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md mx-4 rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden">
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-neutral-100 transition"
          aria-label="Close"
          disabled={loadingProvider !== null}
        >
          <XMarkIcon className="w-5 h-5 text-neutral-500" />
        </button>

        <div className="px-10 py-12">
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-2xl font-semibold text-neutral-900">
              Giriş yapın veya hesap oluşturun
            </h2>
            <p className="text-sm text-neutral-600">
              Hizmetlerimize erişmek için LookLab hesabınızı kullanarak giriş yapabilirsiniz.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-neutral-800 mb-2">
                E-posta adresi
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-posta adresinizi girin"
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition"
                required
              />
            </div>

            {showPasswordField && (
              <div>
                <label htmlFor="auth-password" className="block text-sm font-medium text-neutral-800 mb-2">
                  Şifre
                </label>
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Şifrenizi girin"
                  className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition"
                  required
                  minLength={6}
                />
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              loading={loadingProvider === 'email'}
              disabled={emailDisabled}
              className="w-full bg-[#0060f5] hover:bg-[#004ecc] text-white shadow-none"
            >
              E-postayla devam et
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4 text-xs text-neutral-500">
            <span className="h-px flex-1 bg-neutral-200" />
            veya bu seçeneklerden birini kullan
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          <div className="flex items-center justify-center gap-4">
            <SocialButton
              onClick={handleGoogleLogin}
              disabled={loadingProvider !== null}
              loading={loadingProvider === 'google'}
              icon={<GoogleIcon />}
              label="Google ile devam et"
            />
            <SocialButton
              onClick={handleInstagramLogin}
              disabled={loadingProvider !== null || !fbSdkLoaded}
              loading={loadingProvider === 'instagram'}
              icon={<InstagramIcon />}
              label="Instagram ile devam et"
            />
          </div>

          <p className="mt-10 text-center text-xs text-neutral-500">
            {t('agreementText')}{' '}
            <Link href="/terms" className="font-medium text-primary-600 hover:text-primary-700 underline underline-offset-2">
              {t('termsOfService')}
            </Link>{' '}
            {t('and')}{' '}
            <Link href="/privacy" className="font-medium text-primary-600 hover:text-primary-700 underline underline-offset-2">
              {t('privacyPolicy')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
