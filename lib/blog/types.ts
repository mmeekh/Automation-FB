'use client';

export interface BlogSection {
  heading: string;
  body: string;
  highlights?: string[];
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  category: string;
  readTime: string;
  publishedAt: string;
  author: BlogAuthor;
  keywords: string[];
  lsiKeywords?: string[];
  metaDescription: string;
  sections: BlogSection[];
}

export type BlogCategoryColor = 'emerald' | 'blue' | 'rose' | 'purple' | 'slate' | 'amber' | 'teal' | 'indigo';

export interface BlogCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: BlogCategoryColor;
  posts: BlogPost[];
}
