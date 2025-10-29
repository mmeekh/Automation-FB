import { Metadata } from 'next';
import { petProductsContent } from '@/lib/automation-content';

export const metadata: Metadata = {
  title: petProductsContent.metadata.ogTitle,
  description: petProductsContent.metadata.ogDescription,
  keywords: petProductsContent.metadata.keywords.join(', '),
  openGraph: {
    title: petProductsContent.metadata.ogTitle,
    description: petProductsContent.metadata.ogDescription,
    type: 'website',
    images: [
      {
        url: '/media/pet3.webp',
        width: 1200,
        height: 630,
        alt: 'Evcil Hayvan Ürünleri AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: petProductsContent.metadata.ogTitle,
    description: petProductsContent.metadata.ogDescription,
    images: ['/media/pet3.webp'],
  },
};

export default function PetProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
