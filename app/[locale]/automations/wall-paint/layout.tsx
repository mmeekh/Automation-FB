import { Metadata } from 'next';
import { wallPaintContent } from '@/lib/automation-content';

export const metadata: Metadata = {
  title: wallPaintContent.metadata.ogTitle,
  description: wallPaintContent.metadata.ogDescription,
  keywords: wallPaintContent.metadata.keywords.join(', '),
  openGraph: {
    title: wallPaintContent.metadata.ogTitle,
    description: wallPaintContent.metadata.ogDescription,
    type: 'website',
    images: [
      {
        url: '/media/wall3.webp',
        width: 1200,
        height: 630,
        alt: 'Duvar Rengi/Duvar Kağıdı AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: wallPaintContent.metadata.ogTitle,
    description: wallPaintContent.metadata.ogDescription,
    images: ['/media/wall3.webp'],
  },
};

export default function WallPaintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
