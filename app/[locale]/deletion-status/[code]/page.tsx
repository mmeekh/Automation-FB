import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import prisma from '@/lib/db';
import { cn } from '@/lib/utils';

type PageParams = {
  params: {
    locale: string;
    code: string;
  };
};

type StatusKey = 'pending' | 'completed' | 'failed' | 'unknown';

export const revalidate = 0;
export const runtime = 'nodejs';

const statusIcons = {
  pending: ClockIcon,
  completed: CheckCircleIcon,
  failed: ExclamationTriangleIcon,
  unknown: ExclamationTriangleIcon,
};

const statusThemes: Record<StatusKey, { ring: string; icon: string }> = {
  pending: {
    ring: 'ring-amber-400/30 bg-amber-500/10',
    icon: 'text-amber-400',
  },
  completed: {
    ring: 'ring-emerald-400/30 bg-emerald-500/10',
    icon: 'text-emerald-400',
  },
  failed: {
    ring: 'ring-rose-400/30 bg-rose-500/10',
    icon: 'text-rose-400',
  },
  unknown: {
    ring: 'ring-slate-400/30 bg-slate-500/10',
    icon: 'text-slate-300',
  },
};

const formatDate = (value: Date | null | undefined, locale: string, fallback: string) => {
  if (!value) return fallback;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(value);
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'deletionStatus' });
  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}

export default async function DeletionStatusPage({ params }: PageParams) {
  const { locale, code } = params;
  const t = await getTranslations({ locale, namespace: 'deletionStatus' });
  const deletionRequest = await prisma.deletionRequest.findUnique({
    where: { confirmationCode: code },
  });

  const normalized =
    (deletionRequest?.status?.toLowerCase() as StatusKey | undefined) ?? undefined;
  const status: StatusKey =
    normalized && ['pending', 'completed', 'failed'].includes(normalized)
      ? normalized
      : deletionRequest
        ? 'pending'
        : 'unknown';

  const StatusIcon = statusIcons[status];
  const theme = statusThemes[status];

  const requestedLabel = t('timestamps.requested');
  const completedLabel = t('timestamps.completed');
  const notAvailable = t('timestamps.notAvailable');

  return (
    <div className="min-h-screen bg-neutral-950 py-20 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300/70">
            {t('title')}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t('subtitle')}
          </h1>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl ring-1 ring-white/10 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className={cn('rounded-2xl p-3 ring-1', theme.ring)}>
                <StatusIcon className={cn('h-8 w-8', theme.icon)} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-white/60">{t('statusLabel')}</p>
                <p className="text-2xl font-semibold text-white">{t(`statuses.${status}.label`)}</p>
                <p className="mt-2 text-sm text-white/70">
                  {t(`statuses.${status}.description`)}
                </p>
                {status === 'pending' && (
                  <p className="mt-2 text-sm font-medium text-amber-200">
                    {t('statuses.pending.eta')}
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-black/20 p-4 text-center sm:min-w-[220px]">
              <p className="text-xs uppercase tracking-wider text-white/50">
                {t('confirmationLabel')}
              </p>
              <p className="mt-2 font-mono text-sm text-white">{code}</p>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <dt className="text-sm font-medium text-white/60">{requestedLabel}</dt>
              <dd className="mt-2 text-lg font-semibold text-white">
                {formatDate(deletionRequest?.requestedAt, locale, notAvailable)}
              </dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <dt className="text-sm font-medium text-white/60">{completedLabel}</dt>
              <dd className="mt-2 text-lg font-semibold text-white">
                {formatDate(deletionRequest?.completedAt, locale, notAvailable)}
              </dd>
            </div>
          </dl>

          {status === 'failed' && (
            <p className="mt-6 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-rose-100">
              {t('help.description')}
            </p>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                {t('timelineHeading')}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{t('detailsHeading')}</h2>
              <p className="mt-2 text-sm text-white/70">{t(`statuses.${status}.description`)}</p>
            </div>
            <a
              href={`/${locale}/deletion-status/${code}`}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-neutral-900"
            >
              {t('refresh')}
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[requestedLabel, completedLabel].map((label, idx) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-medium text-white/60">{label}</p>
                <p className="mt-2 font-mono text-sm text-white/90">
                  {idx === 0
                    ? formatDate(deletionRequest?.requestedAt, locale, notAvailable)
                    : formatDate(deletionRequest?.completedAt, locale, notAvailable)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            {t('help.title')}
          </p>
          <p className="mt-3 text-base text-white/80">{t('help.description')}</p>
        </section>
      </div>
    </div>
  );
}
