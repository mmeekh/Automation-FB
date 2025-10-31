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

function HighlightCard({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <article className="group overflow-hidden rounded-[32px] border border-neutral-200/70 bg-white shadow-[0_30px_70px_-50px_rgba(15,23,42,0.55)]">
      <div
        className="bg-neutral-100"
        style={{ aspectRatio: `${post.coverWidth} / ${post.coverHeight}` }}
      >
        <Image
          src={post.cover}
          alt={post.title}
          width={post.coverWidth}
          height={post.coverHeight}
          sizes="(min-width: 1024px) 960px, 100vw"
          className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="space-y-6 p-8 sm:p-10">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          {post.category}
        </div>
        <Link href={`/${locale}/blog/${post.slug}`} className="group">
          <h3 className="text-3xl font-semibold leading-snug text-neutral-900 transition group-hover:text-primary-600">
            {post.title}
          </h3>
        </Link>
        <p className="max-w-3xl text-base text-neutral-600">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-neutral-700">
            {post.author.name} · {post.readTime}
          </span>
          <span>{post.publishedAt}</span>
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

function SecondaryCard({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-neutral-200/70 bg-white shadow-[0_20px_60px_-48px_rgba(15,23,42,0.55)] backdrop-blur-sm transition hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-60px_rgba(15,23,42,0.45)]">
      <div
        className="bg-neutral-100"
        style={{ aspectRatio: `${post.coverWidth} / ${post.coverHeight}` }}
      >
        <Image
          src={post.cover}
          alt={post.title}
          width={post.coverWidth}
          height={post.coverHeight}
          sizes="(min-width: 1280px) 320px, (min-width: 640px) 45vw, 100vw"
          className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {post.category}
        </span>
        <Link href={`/${locale}/blog/${post.slug}`}>
          <h4 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600">
            {post.title}
          </h4>
        </Link>
        <p className="text-sm text-neutral-600 line-clamp-4">{post.excerpt}</p>
        <span className="mt-auto text-xs text-neutral-500">{post.readTime}</span>
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
          <header className="flex flex-col gap-6 pb-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-4xl font-semibold text-neutral-900 sm:text-[2.75rem]">
                {category.title}
              </h1>
              <p className="text-base text-neutral-600 sm:text-lg">
                {category.description}
              </p>
            </div>
            <Button asChild className="bg-primary-600 hover:bg-primary-700">
              <Link href={`/${locale}/blog`}>Browse all categories</Link>
            </Button>
          </header>

          <HighlightCard locale={locale} post={highlight} />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(0, 5).map((post) => (
              <SecondaryCard key={post.slug} locale={locale} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
