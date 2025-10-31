'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { BLOG_CATEGORIES } from '@/lib/blog/data';

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <header className="mb-12 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold text-primary-700">
              Blog
            </span>
            <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              LookLab Automation Journal
            </h1>
            <p className="text-sm text-neutral-600 sm:text-base">
              Choose a category to dive into proven automation strategies, AI customer experience recipes, and salon success stories powered by LookLab.
            </p>
          </header>

          <section className="grid gap-6 sm:grid-cols-2">
            {BLOG_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`./blog/category/${category.slug}`}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
                  Category
                </span>
                <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600">
                  {category.title}
                </h2>
                <p className="text-sm text-neutral-600">{category.description}</p>
                <span className="mt-auto text-xs font-semibold text-neutral-500">
                  {category.posts.length} articles
                </span>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
