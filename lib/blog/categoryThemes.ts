'use client';

import type { BlogCategoryColor } from './types';

export type BlogCategoryTheme = {
  iconBg: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
  tagBg: string;
  tagText: string;
  border: string;
  hoverBorder: string;
};

const BLOG_CATEGORY_THEMES: Record<BlogCategoryColor, BlogCategoryTheme> = {
  emerald: {
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-600',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    tagBg: 'bg-emerald-50',
    tagText: 'text-emerald-600',
    border: 'border-emerald-100',
    hoverBorder: 'hover:border-emerald-200',
  },
  blue: {
    iconBg: 'bg-sky-100',
    iconText: 'text-sky-600',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-700',
    tagBg: 'bg-sky-50',
    tagText: 'text-sky-600',
    border: 'border-sky-100',
    hoverBorder: 'hover:border-sky-200',
  },
  rose: {
    iconBg: 'bg-rose-100',
    iconText: 'text-rose-600',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    tagBg: 'bg-rose-50',
    tagText: 'text-rose-600',
    border: 'border-rose-100',
    hoverBorder: 'hover:border-rose-200',
  },
  purple: {
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-600',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    tagBg: 'bg-purple-50',
    tagText: 'text-purple-600',
    border: 'border-purple-100',
    hoverBorder: 'hover:border-purple-200',
  },
  slate: {
    iconBg: 'bg-neutral-100',
    iconText: 'text-neutral-600',
    badgeBg: 'bg-neutral-100',
    badgeText: 'text-neutral-700',
    tagBg: 'bg-neutral-100',
    tagText: 'text-neutral-600',
    border: 'border-neutral-200',
    hoverBorder: 'hover:border-neutral-300',
  },
  amber: {
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-600',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    tagBg: 'bg-amber-50',
    tagText: 'text-amber-600',
    border: 'border-amber-100',
    hoverBorder: 'hover:border-amber-200',
  },
  teal: {
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-600',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    tagBg: 'bg-teal-50',
    tagText: 'text-teal-600',
    border: 'border-teal-100',
    hoverBorder: 'hover:border-teal-200',
  },
  indigo: {
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-600',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    tagBg: 'bg-indigo-50',
    tagText: 'text-indigo-600',
    border: 'border-indigo-100',
    hoverBorder: 'hover:border-indigo-200',
  },
};

export function getBlogCategoryTheme(color?: BlogCategoryColor): BlogCategoryTheme {
  if (!color) {
    return BLOG_CATEGORY_THEMES.slate;
  }

  return BLOG_CATEGORY_THEMES[color] ?? BLOG_CATEGORY_THEMES.slate;
}
