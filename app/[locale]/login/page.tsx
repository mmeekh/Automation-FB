'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, Input, LanguageSwitcher, TwoFactorInput } from '@/components';
import { login } from '@/lib/api';
import { useStore } from '@/lib/store';

export default function LoginPage() {
  const t = useTranslations('auth');
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
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 right-20 w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 opacity-20 blur-xl animate-float" />
      <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 opacity-20 blur-xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-neu-lg border border-white/30 relative">
        {/* Floating Icons */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 flex items-center justify-center shadow-lg animate-float">
          <span className="text-xl">🤖</span>
        </div>
        <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '2s' }}>
          <span className="text-xl">📱</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            {t('welcomeBack')}
          </h1>
          <p className="text-neutral-600">{t('welcomeMessage')}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="p-3 rounded-lg bg-accent-50 border border-accent-200 text-accent-600 text-sm">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            {t('loginButton')}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-neutral-500">{t('orContinueWith')}</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="sm" onClick={() => alert('Facebook OAuth')}>
            <span>📘</span>
            {t('facebook')}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => alert('Instagram OAuth')}>
            <span>📸</span>
            {t('instagram')}
          </Button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-neutral-600 mt-6">
          {t('noAccount')}{' '}
          <a href="#" className="text-primary-500 font-semibold hover:underline">
            {t('signUp')}
          </a>
        </p>
      </div>
    </div>
  );
}
