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
  metaDescription: string;
  sections: BlogSection[];
}

export interface BlogCategory {
  slug: string;
  title: string;
  description: string;
  posts: BlogPost[];
}
