import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { defaultLocale } from '@/i18n/config';
import { getClothesTryonContent } from '@/lib/automation-content';

type LayoutProps = {
  children: React.ReactNode;
};

type MetadataParams = {
  params: { locale: Locale };
};

export function generateMetadata({ params }: MetadataParams): Metadata {
  const content = getClothesTryonContent(params.locale ?? defaultLocale);

  return {
    title: content.metadata.ogTitle,
    description: content.metadata.ogDescription,
    keywords: content.metadata.keywords.join(', '),
    openGraph: {
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
      type: 'website',
      images: [
        {
          url: '/media/dress3.webp',
          width: 1200,
          height: 630,
          alt: content.metadata.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
      images: ['/media/dress3.webp'],
    },
  };
}

export default function ClothesTryonLayout({ children }: LayoutProps) {
  return children;
}
