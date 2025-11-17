'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useAuth, type InstagramAccount } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/lib/store';
import { AutomationSidebar } from '@/components/layout/AutomationSidebar';

type SupportedLocale = 'en';

type TestCopy = {
  title: string;
  subtitle: string;
  statusHeading: string;
  fetchButton: string;
  logoutButton: string;
  notAuthenticated: string;
  loginButton: string;
  accountsHeading: (count: number) => string;
  followers: string;
  following: string;
  posts: string;
  idLabel: string;
  stepsTitle: string;
  steps: string[];
  noteTitle: string;
  noteDescription: string;
  noteList: string[];
  noAccountsAlert: string;
  fetchError: string;
};

const TEST_COPY: Record<SupportedLocale, TestCopy> = {
  en: {
    title: 'Instagram Authentication Test',
    subtitle: 'Verify the Facebook/Instagram login flow and inspect connected accounts',
    statusHeading: 'Authentication Status',
    fetchButton: 'Fetch Instagram Accounts',
    logoutButton: 'Log Out',
    notAuthenticated: 'You are not logged in',
    loginButton: 'Login with Facebook/Instagram',
    accountsHeading: (count) => `Instagram Business Accounts (${count})`,
    followers: 'followers',
    following: 'following',
    posts: 'posts',
    idLabel: 'ID',
    stepsTitle: '📋 Test Steps',
    steps: [
      'Click the "Login with Facebook/Instagram" button',
      'Sign in with your Facebook account',
      'Approve the requested permissions (Instagram, Pages, Messages, etc.)',
      'Click the "Fetch Instagram Accounts" button',
      'Review the connected Instagram Business accounts'
    ],
    noteTitle: 'Note:',
    noteDescription: 'To list an Instagram account you must ensure that:',
    noteList: [
      'A Facebook Page exists',
      'The Instagram account is Business or Creator type',
      'The Instagram account is linked to the Facebook Page'
    ],
    noAccountsAlert:
      'No Instagram Business accounts were found. Please ensure your Facebook Page is linked to an Instagram Business profile.',
    fetchError: 'An error occurred while fetching Instagram accounts.'
  }
};

export default function TestInstagramPage() {
  const locale = (useLocale() as SupportedLocale) ?? 'en';
  const copy = TEST_COPY[locale] ?? TEST_COPY.en;

  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [loading, setLoading] = useState(false);

  const { user, isAuthenticated, logout, fetchInstagramAccounts } = useAuth();
  const openAuthModal = useStore((state) => state.openAuthModal);

  const handleFetchAccounts = async () => {
    setLoading(true);
    try {
      const igAccounts = await fetchInstagramAccounts();
      setAccounts(igAccounts);

      if (igAccounts.length === 0) {
        alert(copy.noAccountsAlert);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      alert(copy.fetchError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AutomationSidebar />

      <main className="flex-1 bg-neutral-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">{copy.title}</h1>
          <p className="text-neutral-600 mb-8">{copy.subtitle}</p>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">{copy.statusHeading}</h2>

            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
                    {user.picture ? (
                      <img src={user.picture} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{user.name}</p>
                    <p className="text-sm text-neutral-600">{user.email}</p>
                    <p className="text-xs text-neutral-500">{copy.idLabel}: {user.id}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-3 flex-wrap">
                  <Button onClick={handleFetchAccounts} loading={loading} variant="primary">
                    {copy.fetchButton}
                  </Button>
                  <Button onClick={logout} variant="secondary">
                    {copy.logoutButton}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-neutral-600 mb-4">{copy.notAuthenticated}</p>
                <Button onClick={openAuthModal} variant="primary">
                  {copy.loginButton}
                </Button>
              </div>
            )}
          </div>

          {accounts.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold mb-4">{copy.accountsHeading(accounts.length)}</h2>

              <div className="grid gap-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg hover:border-primary-400 transition"
                  >
                    {account.profile_picture_url ? (
                      <img
                        src={account.profile_picture_url}
                        alt={account.username}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                        {account.username.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900">@{account.username}</p>
                      {account.name && <p className="text-sm text-neutral-600">{account.name}</p>}
                      <div className="flex gap-4 mt-2 text-xs text-neutral-500 flex-wrap">
                        {account.followers_count !== undefined && (
                          <span>{account.followers_count.toLocaleString()} {copy.followers}</span>
                        )}
                        {account.follows_count !== undefined && (
                          <span>{account.follows_count.toLocaleString()} {copy.following}</span>
                        )}
                        {account.media_count !== undefined && (
                          <span>{account.media_count.toLocaleString()} {copy.posts}</span>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-neutral-500">
                      {copy.idLabel}: {account.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">{copy.stepsTitle}</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              {copy.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-xs text-yellow-800">
                <strong>{copy.noteTitle}</strong> {copy.noteDescription}
                <br />• {copy.noteList[0]}
                <br />• {copy.noteList[1]}
                <br />• {copy.noteList[2]}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
