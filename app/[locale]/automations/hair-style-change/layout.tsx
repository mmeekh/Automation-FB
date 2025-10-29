import { Metadata } from 'next';
import { hairStyleChangeContent } from '@/lib/automation-content';

export const metadata: Metadata = {
  title: hairStyleChangeContent.metadata.ogTitle,
  description: hairStyleChangeContent.metadata.ogDescription,
  keywords: hairStyleChangeContent.metadata.keywords.join(', '),
  openGraph: {
    title: hairStyleChangeContent.metadata.ogTitle,
    description: hairStyleChangeContent.metadata.ogDescription,
    type: 'website',
    images: [
      {
        url: '/media/hairchange3.webp',
        width: 1200,
        height: 630,
        alt: 'Saç Stili Değiştirme AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: hairStyleChangeContent.metadata.ogTitle,
    description: hairStyleChangeContent.metadata.ogDescription,
    images: ['/media/hairchange3.webp'],
  },
};

export default function HairStyleChangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
