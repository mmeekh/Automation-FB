import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Card, CardHeader, CardTitle, CardBadge } from '@/components';

const legalDocs = [
  {
    key: 'privacy',
    href: 'privacy',
  },
  {
    key: 'terms',
    href: 'terms',
  },
] as const;

export default async function LegalIndexPage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('legal');

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 descender-safe">
          {t('title')}
        </h1>
        <p className="text-neutral-600 text-base sm:text-lg max-w-2xl">
          {t('intro')}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {legalDocs.map((doc) => (
          <Card
            key={doc.key}
            hover={false}
            className="glass bg-white/90 border border-white/60 shadow-neu-sm"
          >
            <CardHeader className="flex-col items-start gap-3">
              <CardBadge className="bg-white text-primary-600 shadow-none">
                {t('updated', { date: t(`${doc.key}.lastUpdated`) })}
              </CardBadge>
              <CardTitle className="gradient-text text-2xl descender-safe">
                {t(`${doc.key}.title`)}
              </CardTitle>
              <p className="text-sm text-neutral-600">
                {t(`${doc.key}.summary`)}
              </p>
              <Link
                href={`/${params.locale}/legal/${doc.href}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-500 transition-colors"
              >
                {t('viewDocument')}
                <span aria-hidden className="text-lg">→</span>
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

