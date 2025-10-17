'use client';

import { Card, CardHeader, CardTitle, CardBadge } from '@/components';

export function RealtimeHighlights() {
  return (
    <Card className="border border-white/70 bg-white">
      <CardHeader className="items-start pb-4">
        <div>
          <CardTitle>Realtime Impact Highlights</CardTitle>
          <p className="mt-1 text-sm text-neutral-500">
            AI flows responding to spikes in trending content.
          </p>
        </div>
        <CardBadge className="bg-gradient-to-r from-indigo-400/20 to-purple-400/20 text-primary-600">
          Auto-curated
        </CardBadge>
      </CardHeader>
      <div className="space-y-4 px-6 pb-6">
        {[
          {
            id: 1,
            title: 'Stylistic Upsell',
            description: 'AutoFlow sent 214 dynamic product carousels in the past hour for high-intent users.'
          },
          {
            id: 2,
            title: 'Booking Surge',
            description: 'Peak time detected: 87 appointment requests processed automatically via AI flow.'
          },
          {
            id: 3,
            title: 'Engagement Spike',
            description: 'Story mention trigger activated 156 personalized responses in 15 minutes.'
          }
        ].map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-dashed border-primary-200 bg-primary-50/30 p-4 text-sm text-neutral-600"
          >
            <strong className="font-semibold text-primary-600">
              #{item.id} — {item.title}
            </strong>{' '}
            {item.description}
          </div>
        ))}
      </div>
    </Card>
  );
}
