import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const sections = [
  'overview',
  'howToRequest',
  'whatIsDeleted',
  'exceptions',
  'contact',
] as const;

export default async function DataDeletionPolicyPage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('legal.dataDeletion');
  const root = await getTranslations('legal');

  return (
    <article className="space-y-8">
      <div className="space-y-3">
        <Link
          href={`/${params.locale}/legal`}
          className="text-sm font-semibold text-primary-600 hover:text-primary-500 transition-colors"
        >
          ← {root('back')}
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold descender-safe">
          {t('title')}
        </h1>
        <p className="text-sm text-neutral-500">
          {root('updated', { date: t('lastUpdated') })}
        </p>
        <p className="text-base sm:text-lg text-neutral-600">
          {t('intro')}
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <section key={section} className="space-y-2">
            <h2 className="text-xl font-semibold text-neutral-900">
              {t(`sections.${section}.heading`)}
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {t(`sections.${section}.body`)}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
