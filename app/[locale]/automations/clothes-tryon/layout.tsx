import { Metadata } from 'next';
import { clothesTryonContent } from '@/lib/automation-content';

export const metadata: Metadata = {
  title: clothesTryonContent.metadata.ogTitle,
  description: clothesTryonContent.metadata.ogDescription,
  keywords: clothesTryonContent.metadata.keywords.join(', '),
  openGraph: {
    title: clothesTryonContent.metadata.ogTitle,
    description: clothesTryonContent.metadata.ogDescription,
    type: 'website',
    images: [
      {
        url: '/media/dress3.webp',
        width: 1200,
        height: 630,
        alt: 'Elbise/Kıyafet Deneme AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: clothesTryonContent.metadata.ogTitle,
    description: clothesTryonContent.metadata.ogDescription,
    images: ['/media/dress3.webp'],
  },
};

export default function ClothesTryonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}