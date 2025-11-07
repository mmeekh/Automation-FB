'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { BLOG_CATEGORIES } from '@/lib/blog/data';
import type { BlogPost } from '@/lib/blog/types';
import { getBlogCategoryTheme } from '@/lib/blog/categoryThemes';
import type { BlogCategoryTheme } from '@/lib/blog/categoryThemes';

function HighlightCard({
  post,
  locale,
  icon,
  theme,
}: {
  post: BlogPost;
  locale: string;
  icon?: string;
  theme: BlogCategoryTheme;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-[32px] border bg-white shadow-[0_30px_70px_-50px_rgba(15,23,42,0.55)] ${theme.border}`}
    >
      <div className="relative w-full overflow-hidden bg-neutral-100">
        <div className="relative aspect-[16/9] sm:aspect-[5/2]">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 960px, (min-width: 768px) 80vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            priority
          />
        </div>
      </div>
      <div className="space-y-6 p-8 sm:p-10">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${theme.badgeBg} ${theme.badgeText}`}
        >
          {icon && <span className="text-base">{icon}</span>}
          <span>{post.category}</span>
        </div>
        <Link href={`/${locale}/blog/${post.slug}`} className="group">
          <h3 className="text-3xl font-semibold leading-snug text-neutral-900 transition group-hover:text-primary-600 sm:text-[2.1rem]">
            {post.title}
          </h3>
        </Link>
        <p className="max-w-3xl text-base text-neutral-600 sm:text-lg">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 sm:text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-primary-700">
            {post.readTime}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-1.5 text-neutral-600">
            {post.publishedAt}
          </span>
        </div>
        <div>
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            Read story
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function SecondaryCard({
  post,
  locale,
  icon,
  theme,
}: {
  post: BlogPost;
  locale: string;
  icon?: string;
  theme: BlogCategoryTheme;
}) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[26px] border bg-white shadow-[0_20px_60px_-48px_rgba(15,23,42,0.55)] backdrop-blur-sm transition hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-60px_rgba(15,23,42,0.45)] ${theme.border}`}
    >
      <div className="relative w-full overflow-hidden bg-neutral-100">
        <div className="relative aspect-[4/3]">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${theme.badgeBg} ${theme.badgeText}`}
        >
          {icon && <span className="text-sm">{icon}</span>}
          <span>{post.category}</span>
        </span>
        <Link href={`/${locale}/blog/${post.slug}`}>
          <h4 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600">
            {post.title}
          </h4>
        </Link>
        <p className="text-sm text-neutral-600 line-clamp-4">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
          <span>{post.readTime}</span>
          <span className="h-1 w-1 rounded-full bg-neutral-400" aria-hidden />
          <span>{post.publishedAt}</span>
        </div>
      </div>
    </article>
  );
}

export default function BlogCategoryPage() {
  const params = useParams<{ category: string }>();
  const locale = useLocale();
  const category = useMemo(
    () => BLOG_CATEGORIES.find((item) => item.slug === params.category),
    [params.category]
  );

  if (!category) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">Category not found</h1>
          <p className="mt-2 text-neutral-600">The category you selected is not available yet.</p>
          <Button asChild className="mt-6 bg-primary-600 hover:bg-primary-700">
            <Link href={`/${locale}/blog`}>Back to blog</Link>
          </Button>
        </main>
      </>
    );
  }

  const [highlight, ...rest] = category.posts;
  const theme = getBlogCategoryTheme(category.color);
  const icon = category.icon;

  if (!highlight) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">No posts yet</h1>
          <p className="mt-2 text-neutral-600">We are preparing automation guides for this category.</p>
          <Button asChild className="mt-6 bg-primary-600 hover:bg-primary-700">
            <Link href={`/${locale}/blog`}>Browse other categories</Link>
          </Button>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-6 pb-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-5">
              {icon && (
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${theme.iconBg}`}>
                  <span className={`text-3xl ${theme.iconText}`}>{icon}</span>
                </div>
              )}
              <div className="max-w-3xl space-y-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${theme.badgeBg} ${theme.badgeText}`}
                >
                  Category · {category.posts.length} articles
                </span>
                <h1 className="text-4xl font-semibold text-neutral-900 sm:text-[2.75rem]">
                  {category.title}
                </h1>
                <p className="text-base text-neutral-600 sm:text-lg">
                  {category.description}
                </p>
              </div>
            </div>
            <Button asChild className="bg-primary-600 hover:bg-primary-700">
              <Link href={`/${locale}/blog`}>Browse all categories</Link>
            </Button>
          </header>

          <HighlightCard icon={icon} locale={locale} post={highlight} theme={theme} />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(0, 5).map((post) => (
              <SecondaryCard key={post.slug} icon={icon} locale={locale} post={post} theme={theme} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
