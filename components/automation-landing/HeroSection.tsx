'use client';

import { Button } from '@/components/ui/Button';
import { AutomationContent } from '@/lib/automation-content/types';

interface HeroSectionProps {
  hero: AutomationContent['hero'];
  title: string;
  onLaunch: () => void;
}

export function HeroSection({ hero, title, onLaunch }: HeroSectionProps) {
  return (
    <section className="space-y-8">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
        </span>
        AI Otomasyon
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl lg:text-6xl leading-tight">
          {hero.title}
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">{hero.description}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          onClick={onLaunch}
          size="lg"
          className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-lg shadow-primary-500/30"
        >
          {hero.cta} →
        </Button>
        <Button variant="outline" size="lg" className="border-2">
          Demo İzle
        </Button>
      </div>

      <div className="flex items-center gap-8 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white"
              />
            ))}
          </div>
          <span className="text-sm text-neutral-600">2,400+ aktif kullanıcı</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-sm font-semibold text-neutral-900">4.9/5</span>
          <span className="text-sm text-neutral-500">(850+ değerlendirme)</span>
        </div>
      </div>
    </section>
  );
}
