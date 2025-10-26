'use client';

import { useTranslations } from 'next-intl';
import { BoltIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { Header, Button, AITemplateCard } from '@/components';
import { AutomationRegistry } from '@/lib/automations';
import { getTemplateThumbnail } from '@/components/templates/TemplateThumbnails';
import { useStore } from '@/lib/store';

export default function AutomationsPage() {
  const t = useTranslations('automationsPage');
  const templates = AutomationRegistry.getAllTemplates();
  const { user, openAuthModal } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="space-y-8">
            <div className="text-center space-y-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
            bg-gradient-to-r from-primary-500/10 to-accent-500/10 
            border border-primary-200/50"
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {t('badge')}
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold 
            bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 
            bg-clip-text text-transparent"
            >
              <span className="descender-safe">{t('title')}</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {templates.map((template) => (
              <AITemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                description={template.description}
                icon={<BoltIcon className="w-7 h-7" />}
                gradient={template.gradient}
                accentColor={template.accentColor}
                category={template.category}
                thumbnail={getTemplateThumbnail(template.id)}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="group relative overflow-hidden 
              bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 
              shadow-[0_18px_38px_-18px_rgba(124,58,237,0.55)] 
              hover:from-primary-600 hover:via-accent-600 hover:to-primary-700 
              hover:shadow-[0_20px_44px_-16px_rgba(124,58,237,0.7)]"
            >
              <span
                className="pointer-events-none absolute inset-0 rounded-2xl 
              bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-40"
              />
              <span
                className="pointer-events-none absolute -inset-x-12 -top-24 h-32 
              bg-gradient-to-r from-transparent via-white/40 to-transparent 
              opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-70"
              />
              <span className="relative flex items-center gap-3">
                <ArrowRightIcon className="w-5 h-5" />
                {t('browse')}
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">{templates.length}+</span>
              </span>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

