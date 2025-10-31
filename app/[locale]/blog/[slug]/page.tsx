'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { findPostBySlug, BLOG_CATEGORIES } from '@/lib/blog/data';

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = useMemo(() => findPostBySlug(params.slug), [params.slug]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">Post not found</h1>
          <p className="mt-2 text-neutral-600">The article you are looking for has moved or no longer exists.</p>
          <Button asChild className="mt-6 bg-primary-600 hover:bg-primary-700">
            <Link href="../blog">Return to blog</Link>
          </Button>
        </main>
      </>
    );
  }

  const related = BLOG_CATEGORIES.flatMap((category) =>
    category.posts.filter((item) => item.category === post.category && item.slug !== post.slug)
  ).slice(0, 3);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-neutral-500">
            <Link href="../blog" className="hover:text-primary-600">All posts</Link>
            <span className="mx-2">/</span>
            <span>{post.category}</span>
          </nav>

          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-neutral-600">{post.metaDescription}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
              {post.author.name} · {post.author.role}
            </span>
            <span>{post.publishedAt}</span>
            <span>{post.readTime}</span>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl bg-neutral-200">
            <Image
              src={post.cover}
              alt={post.title}
              width={post.coverWidth}
              height={post.coverHeight}
              sizes="(min-width: 1024px) 960px, (min-width: 640px) 90vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="prose prose-neutral mt-10 max-w-none">
            {post.sections.map((section) => (
              <section key={section.heading} className="mb-8">
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                {section.highlights && (
                  <ul>
                    {section.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {post.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold text-primary-600">
                #{keyword}
              </span>
            ))}
          </div>

          {related.length > 0 && (
            <aside className="mt-16 border-t border-neutral-200 pt-10">
              <h3 className="text-lg font-semibold text-neutral-900">More from {post.category}</h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`../blog/${item.slug}`}
                    className="group flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition hover:border-primary-200 hover:shadow-lg"
                  >
                    <div
                      className="flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100"
                      style={{
                        aspectRatio: `${item.coverWidth} / ${item.coverHeight}`,
                        width: '8rem',
                      }}
                    >
                      <Image
                        src={item.cover}
                        alt={item.title}
                        width={item.coverWidth}
                        height={item.coverHeight}
                        sizes="160px"
                        className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-600">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs text-neutral-500 line-clamp-2">{item.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </article>
      </main>
    </>
  );
}
