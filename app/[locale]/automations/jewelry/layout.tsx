import { Metadata } from 'next';
import { jewelryContent } from '@/lib/automation-content/jewelry';

export const metadata: Metadata = {
  title: jewelryContent.metadata.ogTitle,
  description: jewelryContent.metadata.ogDescription,
  keywords: jewelryContent.metadata.keywords.join(', '),
  openGraph: {
    title: jewelryContent.metadata.ogTitle,
    description: jewelryContent.metadata.ogDescription,
    type: 'website',
    images: [
      {
        url: '/media/jewel3.webp',
        width: 1200,
        height: 630,
        alt: 'Takı Deneme AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: jewelryContent.metadata.ogTitle,
    description: jewelryContent.metadata.ogDescription,
    images: ['/media/jewel3.webp'],
  },
};

export default function JewelryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
