'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';

export function AuthModal() {
  const t = useTranslations('auth');
  const isAuthModalOpen = useStore((state) => state.isAuthModalOpen);
  const closeAuthModal = useStore((state) => state.closeAuthModal);
  const setUser = useStore((state) => state.setUser);

  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = () => {
    setLoading(true);

    // Mock Google OAuth login (replace with real OAuth when backend is ready)
    setTimeout(() => {
      setUser({
        id: 'google_mock_user',
        name: 'Demo User (Google)',
        email: 'demo@gmail.com',
        avatar: '🔵'
      });
      setLoading(false);
      closeAuthModal();
    }, 800);
  };

  const handleInstagramLogin = () => {
    setLoading(true);

    // Mock Instagram OAuth login (replace with real OAuth when backend is ready)
    setTimeout(() => {
      setUser({
        id: 'instagram_mock_user',
        name: 'Demo User (Instagram)',
        email: 'demo@instagram.com',
        avatar: '📷'
      });
      setLoading(false);
      closeAuthModal();
    }, 800);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeAuthModal();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="relative w-full max-w-md mx-4 bg-white rounded-3xl shadow-2xl border border-neutral-200/60 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-neutral-100 transition-colors z-10"
          aria-label="Close"
        >
          <XMarkIcon className="w-5 h-5 text-neutral-500" />
        </button>

        {/* Content */}
        <div className="p-8 pt-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 items-center justify-center shadow-lg mb-4">
              <span className="text-3xl">🔬</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              {t('welcomeTitle')}
            </h2>
            <p className="text-sm text-neutral-600">
              {t('welcomeSubtitle')}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            {/* Google OAuth */}
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-neutral-50 text-neutral-700 border-2 border-neutral-200 hover:border-neutral-300 shadow-md hover:shadow-lg transition-all"
              size="lg"
            >
              <span className="text-xl mr-3">🔵</span>
              {t('continueWithGoogle')}
            </Button>

            {/* Instagram OAuth */}
            <Button
              onClick={handleInstagramLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all"
              size="lg"
            >
              <span className="text-xl mr-3">📷</span>
              {t('continueWithInstagram')}
            </Button>
          </div>

          {/* Legal Agreement Text */}
          <div className="mt-6 text-center text-xs text-neutral-500">
            <p>
              {t('agreementText')}{' '}
              <Link
                href="/terms"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
                onClick={(e) => e.stopPropagation()}
              >
                {t('termsOfService')}
              </Link>
              {' '}{t('and')}{' '}
              <Link
                href="/privacy"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
                onClick={(e) => e.stopPropagation()}
              >
                {t('privacyPolicy')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
