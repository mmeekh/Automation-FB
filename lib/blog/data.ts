'use client';

import { growthPlaybooksCategory } from './categories/growthPlaybooks';
import { aiCustomerExperienceCategory } from './categories/aiCustomerExperience';
import { salonSuccessStoriesCategory } from './categories/salonSuccessStories';
import type { BlogCategory } from './types';

export const BLOG_CATEGORIES: BlogCategory[] = [
  growthPlaybooksCategory,
  aiCustomerExperienceCategory,
  salonSuccessStoriesCategory,
];

export const findPostBySlug = (slug: string) => {
  for (const category of BLOG_CATEGORIES) {
    const match = category.posts.find((post) => post.slug === slug);
    if (match) return match;
  }
  return null;
};
