export interface AutomationContent {
  slug: string;
  templateId: string;
  title: string;
  subtitle: string;
  description: string;
  images: {
    before: string;
    style: string;
    result: string;
  };
  hero: {
    title: string;
    description: string;
    cta: string;
  };
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  useCases: {
    icon: string;
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  chatPreview: {
    id: string;
    type: 'user' | 'bot';
    content: string;
    image?: string;
    imageAlt?: string;
    button?: {
      text: string;
      url?: string;
    };
  }[];
  metadata: {
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
}
