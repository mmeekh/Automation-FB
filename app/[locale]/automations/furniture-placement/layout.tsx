import { Metadata } from 'next';
import { furniturePlacementContent } from '@/lib/automation-content';

export const metadata: Metadata = {
  title: furniturePlacementContent.metadata.ogTitle,
  description: furniturePlacementContent.metadata.ogDescription,
  keywords: furniturePlacementContent.metadata.keywords.join(', '),
  openGraph: {
    title: furniturePlacementContent.metadata.ogTitle,
    description: furniturePlacementContent.metadata.ogDescription,
    type: 'website',
    images: [
      {
        url: '/media/furniture3.webp',
        width: 1200,
        height: 630,
        alt: 'Mobilya Yerleştirme AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: furniturePlacementContent.metadata.ogTitle,
    description: furniturePlacementContent.metadata.ogDescription,
    images: ['/media/furniture3.webp'],
  },
};

export default function FurniturePlacementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
