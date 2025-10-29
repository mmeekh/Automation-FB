import { Metadata } from 'next';
import { carWheelsContent } from '@/lib/automation-content';

export const metadata: Metadata = {
  title: carWheelsContent.metadata.ogTitle,
  description: carWheelsContent.metadata.ogDescription,
  keywords: carWheelsContent.metadata.keywords.join(', '),
  openGraph: {
    title: carWheelsContent.metadata.ogTitle,
    description: carWheelsContent.metadata.ogDescription,
    type: 'website',
    images: [
      {
        url: '/media/rim3.webp',
        width: 1200,
        height: 630,
        alt: 'Araba Jant/Lastik AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: carWheelsContent.metadata.ogTitle,
    description: carWheelsContent.metadata.ogDescription,
    images: ['/media/rim3.webp'],
  },
};

export default function CarWheelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
