import { Metadata } from 'next';
import { carColorChangeContent } from '@/lib/automation-content/car-color-change';

export const metadata: Metadata = {
  title: carColorChangeContent.metadata.ogTitle,
  description: carColorChangeContent.metadata.ogDescription,
  keywords: carColorChangeContent.metadata.keywords.join(', '),
  openGraph: {
    title: carColorChangeContent.metadata.ogTitle,
    description: carColorChangeContent.metadata.ogDescription,
    type: 'website',
    images: [
      {
        url: '/media/carcolor3.webp',
        width: 1200,
        height: 630,
        alt: 'Araba Renk Değiştirme AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: carColorChangeContent.metadata.ogTitle,
    description: carColorChangeContent.metadata.ogDescription,
    images: ['/media/carcolor3.webp'],
  },
};

export default function CarColorChangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
