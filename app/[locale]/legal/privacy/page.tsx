import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const sections = [
  'introduction',
  'dataCollection',
  'dataUse',
  'rights',
  'contact',
] as const;

export default async function PrivacyPolicyPage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('legal.privacy');
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
          <section key={section} className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 descender-safe">
              {t(`sections.${section}.heading`)}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {t(`sections.${section}.body`)}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}

