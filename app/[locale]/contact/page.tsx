'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Header, Button, AnimatedAvatarTooltip } from '@/components';
import { useStore } from '@/lib/store';
import { fetchDashboardData, mockUser } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import {
  PlusIcon,
  LinkIcon,
  SparklesIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';

type AccountStatus = 'active' | 'paused' | 'limited';

type SupportedLocale = 'en' | 'tr';

interface AccountMeta {
  role: 'owner' | 'manager' | 'creator';
  status: AccountStatus;
  credits: { used: number; total: number };
  workspace: 'primary' | 'secondary';
  lastSync: Record<SupportedLocale, string>;
  multi: boolean;
}

interface ConversationMeta {
  key: string;
  source: 'automation' | 'manual';
  unread?: boolean;
  tags: Array<'vip' | 'new' | 'returning' | 'followUp' | 'highIntent' | 'priority'>;
}

const accountSeed: AccountMeta[] = [
  {
    role: 'owner',
    status: 'active',
    credits: { used: 320, total: 500 },
    workspace: 'primary',
    lastSync: { en: '5 minutes ago', tr: '5 dk once' },
    multi: true,
  },
  {
    role: 'manager',
    status: 'active',
    credits: { used: 210, total: 400 },
    workspace: 'secondary',
    lastSync: { en: '12 minutes ago', tr: '12 dk once' },
    multi: true,
  },
  {
    role: 'creator',
    status: 'limited',
    credits: { used: 40, total: 150 },
    workspace: 'secondary',
    lastSync: { en: '35 minutes ago', tr: '35 dk once' },
    multi: false,
  },
];

const conversationSeed: ConversationMeta[][] = [
  [
    { key: 'elif', source: 'automation', unread: true, tags: ['vip', 'highIntent'] },
    { key: 'melis', source: 'manual', tags: ['followUp'] },
    { key: 'ugur', source: 'automation', tags: ['new'] },
    { key: 'aylin', source: 'manual', tags: ['priority'] },
    { key: 'karen', source: 'automation', tags: ['returning'] },
  ],
  [
    { key: 'burak', source: 'automation', unread: true, tags: ['new'] },
    { key: 'selin', source: 'manual', tags: ['followUp'] },
    { key: 'noah', source: 'automation', tags: ['vip'] },
    { key: 'esra', source: 'manual', tags: ['priority', 'followUp'] },
    { key: 'lucy', source: 'automation', tags: ['returning'] },
  ],
  [
    { key: 'demet', source: 'automation', tags: ['vip'] },
    { key: 'yasemin', source: 'manual', tags: ['followUp'] },
    { key: 'baris', source: 'automation', unread: true, tags: ['new', 'highIntent'] },
    { key: 'sude', source: 'manual', tags: ['priority'] },
    { key: 'emre', source: 'automation', tags: ['returning'] },
  ],
];

const statusColors: Record<AccountStatus, string> = {
  active: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  paused: 'bg-amber-50 text-amber-600 border border-amber-200',
  limited: 'bg-rose-50 text-rose-600 border border-rose-200',
};

const workspaceBadge: Record<AccountMeta['workspace'], string> = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-neutral-200 text-neutral-700',
};

const avatarGradients = [
  'from-primary-500 via-accent-500 to-primary-600',
  'from-amber-400 via-orange-500 to-rose-500',
  'from-cyan-400 via-blue-500 to-indigo-500',
  'from-emerald-400 via-teal-500 to-sky-500',
];

const sourceIcon: Record<ConversationMeta['source'], ReactNode> = {
  automation: <SparklesIcon className="h-4 w-4" />,
  manual: <ChatBubbleOvalLeftIcon className="h-4 w-4" />,
};

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const locale = useLocale();
  const normalizedLocale: SupportedLocale = locale.startsWith('tr') ? 'tr' : 'en';
  const { accounts, user, setAccounts, setUser, openAuthModal } = useStore();
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      // Don't auto-login
      return;
    }
    if (!accounts.length) {
      fetchDashboardData().then((data) => {
        setAccounts(data.accounts);
      });
    }
  }, [accounts.length, setAccounts, user]);

  const hydratedAccounts = useMemo(() => {
    if (!accounts.length) {
      return [];
    }

    return accounts.map((account, index) => {
      const seed = accountSeed[index % accountSeed.length];
      const usage = Math.min(seed.credits.used, seed.credits.total);
      const percentage = Math.round((usage / seed.credits.total) * 100);

      return {
        account,
        seed,
        usage,
        percentage,
        index,
      };
    });
  }, [accounts]);

  useEffect(() => {
    if (hydratedAccounts.length && !activeAccountId) {
      setActiveAccountId(hydratedAccounts[0].account.id);
    }
  }, [activeAccountId, hydratedAccounts]);

  const activeAccount = useMemo(() => {
    if (!activeAccountId) {
      return null;
    }
    return hydratedAccounts.find(({ account }) => account.id === activeAccountId) ?? null;
  }, [activeAccountId, hydratedAccounts]);

  const activeConversations = useMemo(() => {
    if (!activeAccount) {
      return [];
    }
    const seedIndex = activeAccount.index % conversationSeed.length;
    return conversationSeed[seedIndex];
  }, [activeAccount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <Header />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <section className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold text-primary-600 shadow-sm">
            {t('subtitle')}
          </span>
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl descender-safe">
            {t('title')}
          </h1>
          <p className="max-w-2xl text-sm text-neutral-600 sm:text-base">{t('description')}</p>
        </section>

        {!user ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border border-white/70 bg-white/95 shadow-neu-md backdrop-blur">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6">
              <span className="text-4xl">🔐</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 text-center">
              {normalizedLocale === 'tr' ? 'Önce Giriş Yapınız' : 'Please Sign In First'}
            </h2>
            <p className="text-neutral-600 mb-8 text-center max-w-md">
              {normalizedLocale === 'tr'
                ? 'İletişim ve konuşma özelliklerini kullanabilmek için lütfen giriş yapın.'
                : 'Please sign in to access contact and conversation features.'}
            </p>
            <Button
              size="lg"
              onClick={openAuthModal}
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg"
            >
              {normalizedLocale === 'tr' ? 'Giriş Yap' : 'Sign In'}
            </Button>
          </div>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="flex h-[70vh] min-h-[540px] flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-neu-md backdrop-blur">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                  {t('accountsPanel.connected')}
                </p>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {t('accountsPanel.title')}
                </h2>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="!h-10 !w-10 !rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100"
              >
                <PlusIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
              {hydratedAccounts.map(({ account, seed, usage, percentage, index }) => {
                const isActive = activeAccountId === account.id;
                const lastSyncDisplay = seed.lastSync[normalizedLocale] ?? seed.lastSync.en;
                const gradient = avatarGradients[index % avatarGradients.length];
                const initials =
                  account.username.replace('@', '').charAt(0).toUpperCase() || 'A';
                const roleLabel = t(`accountsPanel.roles.${seed.role}` as const);
                const followersMeta = t('accountsPanel.followers', {
                  count: formatNumber(account.followers),
                });
                return (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => setActiveAccountId(account.id)}
                    className={`group flex w-full flex-col gap-3 rounded-2xl border px-4 py-4 text-left transition-all ${
                      isActive
                        ? 'border-primary-200 bg-primary-50/80 shadow-neu-sm'
                        : 'border-transparent bg-white hover:border-primary-100 hover:bg-primary-50/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-1 items-start gap-3">
                        <AnimatedAvatarTooltip
                          initials={initials}
                          label={account.username}
                          caption={roleLabel}
                          meta={followersMeta}
                          gradient={gradient}
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-neutral-900">{account.username}</p>
                          <p className="text-xs text-neutral-500">
                            {seed.workspace === 'primary'
                              ? t('accounts.primaryWorkspace')
                              : t('accounts.secondaryWorkspace')}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${statusColors[seed.status]}`}
                      >
                        {t(`accounts.statuses.${seed.status}` as const)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                      <span>{t('accountsPanel.followers', { count: formatNumber(account.followers) })}</span>
                      <span>•</span>
                      <span>{t('accountsPanel.posts', { count: account.posts })}</span>
                      <span>•</span>
                      <span>{t(`accounts.roles.${seed.role}` as const)}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-neutral-500">
                        <span>
                          {t('accounts.creditUsage', {
                            used: usage,
                            total: seed.credits.total,
                          })}
                        </span>
                        <span>{t('accountsPanel.lastSync', { time: lastSyncDisplay })}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-neutral-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {seed.multi && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-2.5 py-1 text-[11px] font-semibold text-primary-700">
                        <LinkIcon className="h-3.5 w-3.5" />
                        {t('accounts.multiAutomation')}
                      </span>
                    )}
                  </button>
                );
              })}

              {!hydratedAccounts.length && (
                <div className="rounded-2xl border border-dashed border-primary-200/70 bg-primary-50/40 p-6 text-center text-sm text-neutral-600">
                  {t('accountsPanel.empty')}
                </div>
              )}
            </div>

            <div className="border-t border-neutral-100 px-5 py-4">
              <Button variant="secondary" className="w-full">
                <PlusIcon className="h-4 w-4" />
                {t('accountsPanel.cta')}
              </Button>
            </div>
          </aside>

          <section className="flex h-[70vh] min-h-[540px] flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-neu-md backdrop-blur">
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                  {t('conversationsPanel.badge')}
                </p>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {t('conversationsPanel.title')}
                </h2>
                <p className="text-xs text-neutral-500">
                  {activeAccount
                    ? t('conversationsPanel.subtitle', {
                        account: activeAccount.account.username,
                      })
                    : t('conversationsPanel.subtitleFallback')}
                </p>
              </div>
              <Button variant="secondary" size="sm" className="sm:text-sm">
                {t('conversationsPanel.cta')}
              </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
              {activeAccount && activeConversations.length ? (
                activeConversations.map((conversation, idx) => {
                  const name = t(`conversationsPanel.items.${conversation.key}.name`);
                  const handle = t(`conversationsPanel.items.${conversation.key}.handle`);
                  const snippet = t(`conversationsPanel.items.${conversation.key}.snippet`);
                  const stage = t(`conversationsPanel.items.${conversation.key}.stage`);
                  const lastActive = t(`conversationsPanel.items.${conversation.key}.lastActive`);
                  const initials = name.charAt(0).toUpperCase();
                  const gradient = avatarGradients[idx % avatarGradients.length];

                  return (
                    <article
                      key={conversation.key}
                      className="group relative flex gap-3 rounded-3xl border border-white/60 bg-white/95 p-5 shadow-sm transition-all hover:border-primary-200 hover:shadow-neu-sm"
                    >
                      <AnimatedAvatarTooltip
                        initials={initials}
                        label={name}
                        caption={handle}
                        meta={lastActive}
                        gradient={gradient}
                        size="sm"
                      />

                      <div className="flex flex-1 flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-neutral-900">{name}</p>
                            <p className="text-xs text-neutral-500">{handle}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-2.5 py-1 text-[11px] font-semibold text-primary-700">
                              {sourceIcon[conversation.source]}
                              {t(`conversationsPanel.sources.${conversation.source}`)}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                              {stage}
                            </span>
                            {conversation.unread && (
                              <span className="inline-flex items-center rounded-full bg-primary-500 px-2.5 py-1 text-[11px] font-semibold text-white">
                                {t('conversationsPanel.unread')}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-neutral-600">{snippet}</p>

                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
                          <span>{lastActive}</span>
                          {conversation.tags.map((tag) => (
                            <span
                              key={`${conversation.key}-${tag}`}
                              className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600"
                            >
                              {t(`conversationsPanel.tags.${tag}`)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="flex h-full items-center justify-center px-6 py-12 text-center text-sm text-neutral-500">
                  {t('conversationsPanel.empty')}
                </div>
              )}
            </div>
          </section>
        </section>
        )}
      </main>
    </div>
  );
}
