'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Button, Input, LanguageSwitcher, TwoFactorInput } from '@/components';
import { login } from '@/lib/api';
import { useStore } from '@/lib/store';

export default function LoginPage() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || twoFactorCode.length !== 6) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { user } = await login(email, password, twoFactorCode);
      setUser(user);
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-32 sm:w-40 lg:w-52 h-32 sm:h-40 lg:h-52 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 sm:w-52 lg:w-64 h-40 sm:h-52 lg:h-64 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 opacity-20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-full bg-gradient-to-r from-primary-300 to-accent-300 opacity-10 blur-3xl animate-pulse" />
      </div>

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md glass rounded-3xl p-6 sm:p-8 lg:p-10 shadow-neu-lg relative z-10 card-enter">
        {/* Logo Badge */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-xl bounce-soft">
            <span className="text-3xl sm:text-4xl">⚡</span>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 flex items-center justify-center shadow-lg animate-float">
          <span className="text-lg sm:text-xl">🤖</span>
        </div>
        <div className="absolute bottom-4 left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '2s' }}>
          <span className="text-lg sm:text-xl">📱</span>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 gradient-text">
            {t('welcomeBack')}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600">{t('welcomeMessage')}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <Input
            label={t('email')}
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label={t('password')}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div>
            <label className="block mb-3 text-sm font-medium text-neutral-800">
              {t('twoFactorCode')}
            </label>
            <TwoFactorInput onComplete={setTwoFactorCode} />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-accent-50 border border-accent-200 text-accent-600 text-sm animate-pulse">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full hover-glow" loading={loading}>
            {t('loginButton')}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-5 sm:my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="glass px-3 py-1 text-neutral-500 rounded-full">{t('orContinueWith')}</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="sm" onClick={() => alert('Facebook OAuth')} className="hover-lift">
            <span className="text-xl">📘</span>
            <span className="hidden sm:inline">{t('facebook')}</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={() => alert('Instagram OAuth')} className="hover-lift">
            <span className="text-xl">📸</span>
            <span className="hidden sm:inline">{t('instagram')}</span>
          </Button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-xs sm:text-sm text-neutral-600 mt-5 sm:mt-6">
          {t('noAccount')}{' '}
          <a href="#" className="text-primary-500 font-semibold hover:underline hover:text-accent-500 transition-colors">
            {t('signUp')}
          </a>
        </p>
      </div>
    </div>
  );
}
