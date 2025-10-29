import { Metadata } from 'next';
import { aestheticAIContent } from '@/lib/automation-content';

export const metadata: Metadata = {
  title: aestheticAIContent.metadata.ogTitle,
  description: aestheticAIContent.metadata.ogDescription,
  keywords: aestheticAIContent.metadata.keywords.join(', '),
  openGraph: {
    title: aestheticAIContent.metadata.ogTitle,
    description: aestheticAIContent.metadata.ogDescription,
    type: 'website',
    images: [
      {
        url: aestheticAIContent.images.result,
        width: 1200,
        height: 630,
        alt: aestheticAIContent.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: aestheticAIContent.metadata.ogTitle,
    description: aestheticAIContent.metadata.ogDescription,
    images: [aestheticAIContent.images.result],
  },
};

export default function AestheticAILandingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

