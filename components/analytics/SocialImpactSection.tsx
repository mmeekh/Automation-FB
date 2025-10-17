'use client';

import { Card, CardHeader, CardTitle, Button } from '@/components';
import { cn } from '@/lib/utils';
import { ArrowRight, Download, PieChart, RefreshCcw } from 'lucide-react';

const socialPosts = [
  {
    id: 'post-1',
    title: 'Transformation Reveal',
    type: 'Reel',
    reach: '128K',
    saves: '3.2K',
    engagement: '9.6%',
    growth: '+28%',
    thumbnailColor: 'bg-gradient-to-br from-[#f5d0fe] to-[#fce7f3]',
  },
  {
    id: 'post-2',
    title: 'Book with AI Stylist',
    type: 'Carousel',
    reach: '86K',
    saves: '2.1K',
    engagement: '7.4%',
    growth: '+18%',
    thumbnailColor: 'bg-gradient-to-br from-[#bae6fd] to-[#e0f2fe]',
  },
  {
    id: 'post-3',
    title: 'Live Consultation Recap',
    type: 'Live',
    reach: '74K',
    saves: '—',
    engagement: '11.1%',
    growth: '+35%',
    thumbnailColor: 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a]',
  },
];

export function SocialImpactSection() {
  return (
    <Card className="border border-white/70 bg-white">
      <CardHeader className="items-start pb-2">
        <div className="space-y-1">
          <CardTitle>Social Content Impact</CardTitle>
          <p className="text-sm text-neutral-500">
            Performance of AI-assisted Instagram content over the past week.
          </p>
        </div>
      </CardHeader>

      <div className="grid gap-5 px-6 pb-6 md:grid-cols-3">
        {socialPosts.map((post) => (
          <div
            key={post.id}
            className="group rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={cn(
                'relative mb-4 aspect-video w-full overflow-hidden rounded-xl border border-white/80',
                post.thumbnailColor
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
                <PieChart className="h-12 w-12" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-neutral-400">
              <span>{post.type}</span>
              <span className="font-semibold text-primary-500">{post.growth}</span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-neutral-800">{post.title}</h3>
            <dl className="mt-4 space-y-2 text-sm text-neutral-600">
              <div className="flex items-center justify-between">
                <dt className="text-neutral-500">Reach</dt>
                <dd className="font-medium text-neutral-800">{post.reach}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-neutral-500">Saves</dt>
                <dd className="font-medium text-neutral-800">{post.saves}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-neutral-500">Engagement</dt>
                <dd className="font-medium text-neutral-800">{post.engagement}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-neutral-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-500">
          Export a shareable snapshot or compare growth week-over-week.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" className="hover-lift">
            <Download className="h-4 w-4" />
            Export Report (PDF)
          </Button>
          <Button className="hover-lift">
            <RefreshCcw className="h-4 w-4" />
            Compare Weeks
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
