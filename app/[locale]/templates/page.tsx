import { getTranslations } from 'next-intl/server';
import { BeakerIcon, FolderIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Header, Button, Card, CardHeader, CardTitle, CardBadge } from '@/components';
import { fetchTemplatesLibrary } from '@/lib/api';

export default async function TemplatesPage() {
  const t = await getTranslations('templatesPage');
  const { categories, highlights } = await fetchTemplatesLibrary();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="bg-white/95 backdrop-blur-xl border border-white/40 shadow-neu-lg rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-400/10 to-primary-500/5 pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1.4fr,1fr] gap-10 items-start">
            <div>
              <CardBadge className="bg-gradient-to-r from-primary-500 to-accent-500">
                {t('hero.badge')}
              </CardBadge>
              <h1 className="text-4xl font-bold text-neutral-900 mt-5">{t('hero.title')}</h1>
              <p className="text-lg text-neutral-600 mt-4 max-w-2xl">{t('hero.subtitle')}</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button size="lg">
                  <SparklesIcon className="w-5 h-5" />
                  {t('hero.primaryCta')}
                </Button>
                <Button variant="secondary" size="lg">
                  {t('hero.secondaryCta')}
                </Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-white/60 shadow-neu-sm p-5">
                <p className="text-xs uppercase tracking-wide text-neutral-400">{t('hero.metrics.installs')}</p>
                <p className="text-3xl font-semibold text-neutral-900 mt-2">4,962</p>
                <p className="text-sm text-neutral-500 mt-2">{t('hero.metrics.installsHelp')}</p>
              </div>
              <div className="rounded-2xl bg-white border border-white/60 shadow-neu-sm p-5">
                <p className="text-xs uppercase tracking-wide text-neutral-400">{t('hero.metrics.curators')}</p>
                <p className="text-3xl font-semibold text-neutral-900 mt-2">19</p>
                <p className="text-sm text-neutral-500 mt-2">{t('hero.metrics.curatorsHelp')}</p>
              </div>
              <div className="sm:col-span-2 rounded-2xl bg-neutral-900 text-neutral-100 border border-neutral-800 p-6">
                <p className="uppercase text-xs tracking-wide text-neutral-400">{t('hero.metrics.aiLabel')}</p>
                <p className="text-2xl font-semibold mt-3">{t('hero.metrics.aiTitle')}</p>
                <p className="text-sm text-neutral-300 mt-2">{t('hero.metrics.aiSubtitle')}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Card>
            <CardHeader className="items-start">
              <div>
                <CardTitle>{t('highlights.title')}</CardTitle>
                <p className="text-sm text-neutral-500 mt-1">{t('highlights.subtitle')}</p>
              </div>
              <CardBadge>{t('highlights.badge')}</CardBadge>
            </CardHeader>
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map((item) => (
                <div key={item.id} className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6">
                  <span className="text-xs uppercase tracking-wide text-primary-500">{item.audience}</span>
                  <h3 className="text-lg font-semibold text-neutral-900 mt-2">{item.name}</h3>
                  <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
                    <span>{t('highlights.metrics.installs', { value: item.installs })}</span>
                    <span className="inline-flex items-center gap-1 text-primary-500 font-semibold">
                      <SparklesIcon className="w-4 h-4" />
                      {item.rating}
                    </span>
                  </div>
                  <Button variant="secondary" className="mt-6 w-full">
                    {t('highlights.cta')}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-10">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="items-start">
                <div>
                  <CardBadge>{category.name}</CardBadge>
                  <CardTitle className="mt-4">{t('categories.title', { category: category.name })}</CardTitle>
                  <p className="text-sm text-neutral-500 mt-2">{category.description}</p>
                </div>
                <FolderIcon className="w-10 h-10 text-primary-400" />
              </CardHeader>
              <div className="grid md:grid-cols-2 gap-6">
                {category.templates.map((template) => (
                  <div key={template.id} className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900">{template.name}</h3>
                        <p className="text-sm text-neutral-500 mt-1">{t('categories.goesLive', { duration: template.duration })}</p>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                        {t(`categories.complexity.${template.complexity}`)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {template.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-primary-50 text-primary-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <Button variant="secondary" size="sm">
                        {t('categories.preview')}
                      </Button>
                      <Button size="sm">
                        <BeakerIcon className="w-4 h-4" />
                        {t('categories.deploy')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
