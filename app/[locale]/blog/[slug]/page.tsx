'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { findPostBySlug, BLOG_CATEGORIES } from '@/lib/blog/data';
import type { BlogSection } from '@/lib/blog/types';
import { getBlogCategoryTheme } from '@/lib/blog/categoryThemes';

const SECTION_VARIANTS = ['playbook', 'interview', 'roadmap'] as const;
type SectionVariant = (typeof SECTION_VARIANTS)[number];

type SectionStyle = {
  renderBadge?: (index: number) => JSX.Element;
  renderHeading?: (text: string) => JSX.Element;
  secondaryTagline?: JSX.Element;
  highlightTitle?: string;
  highlightWrapperClass?: string;
  highlightItemClass?: string;
  highlightPrefixLabel?: string;
  highlightPrefixClass?: string;
  highlightDotClass?: string;
  stepBadgeClass?: string;
  containerClass?: string;
  timelineAccentClass?: string;
};

const SECTION_STYLES: SectionStyle[] = [
  {
    renderBadge: (index) => (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
        Signal {index + 1}
      </span>
    ),
    renderHeading: (text) => (
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
          Conversion Move
        </span>
        <h2 className="mt-1 text-3xl font-black text-emerald-900 sm:text-[2.15rem]">{text}</h2>
        <span className="mt-3 h-1 w-16 rounded-full bg-emerald-300" aria-hidden />
      </div>
    ),
    secondaryTagline: (
      <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 sm:inline-flex">
        Growth Pulse
      </span>
    ),
    highlightTitle: 'Greenroom Checklist',
    highlightWrapperClass: 'mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6',
    highlightItemClass:
      'flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-sm text-emerald-900 shadow-sm',
    highlightDotClass: 'mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-500',
    highlightPrefixLabel: 'Playbook Tip',
    highlightPrefixClass: 'text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600',
    stepBadgeClass: 'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white',
    containerClass: 'ring-1 ring-emerald-100',
    timelineAccentClass: 'bg-emerald-500',
  },
  {
    renderBadge: (index) => (
      <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-rose-600">
        Studio Story {index + 1}
      </span>
    ),
    renderHeading: (text) => (
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-black sm:text-[2.15rem]">
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            {text}
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" aria-hidden />
          <span className="h-[2px] flex-1 rounded-full bg-rose-200" aria-hidden />
        </div>
      </div>
    ),
    secondaryTagline: (
      <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-rose-300 sm:inline-flex">
        Client Love Signals
      </span>
    ),
    highlightTitle: 'Studio Soundbites',
    highlightWrapperClass: 'mt-6 grid gap-2 rounded-2xl border border-rose-100 bg-rose-50/60 p-5',
    highlightItemClass:
      'flex flex-col gap-1 rounded-xl border border-rose-200 bg-white/90 px-4 py-3 text-sm text-rose-900 shadow-sm',
    highlightPrefixLabel: 'Quote',
    highlightPrefixClass: 'text-xs font-semibold uppercase tracking-[0.24em] text-rose-600',
    stepBadgeClass: 'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white',
    containerClass: 'border-rose-100 bg-gradient-to-br from-rose-50 via-white to-white',
    timelineAccentClass: 'bg-rose-500',
  },
  {
    renderBadge: (index) => (
      <span className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
        Sprint {index + 1}
      </span>
    ),
    renderHeading: (text) => (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-sky-400 bg-sky-100 text-xs font-semibold text-sky-600">
            ✦
          </span>
          <h2 className="text-2xl font-bold text-sky-900 sm:text-[2.05rem]">{text}</h2>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.45em] text-sky-400">
          Blueprint
        </span>
      </div>
    ),
    secondaryTagline: (
      <span className="hidden text-xs font-semibold uppercase tracking-[0.25em] text-sky-300 sm:inline-flex">
        Operational Blueprint
      </span>
    ),
    highlightTitle: 'Launch Signals',
    highlightWrapperClass: 'mt-6 rounded-2xl border border-sky-100 bg-sky-50/60 p-6',
    highlightItemClass:
      'flex items-start gap-3 rounded-xl bg-white px-3 py-2 text-sm text-sky-900 shadow-sm',
    highlightDotClass: 'mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400',
    highlightPrefixLabel: 'Signal',
    highlightPrefixClass: 'text-xs font-semibold uppercase tracking-[0.24em] text-sky-600',
    stepBadgeClass: 'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white',
    containerClass: 'ring-1 ring-sky-100',
    timelineAccentClass: 'bg-sky-500',
  },
  {
    renderBadge: (index) => (
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
        Workshop {index + 1}
      </span>
    ),
    renderHeading: (text) => (
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold italic text-amber-900 sm:text-[2.2rem]">
          “{text}”
        </h2>
        <span className="w-24 border-b-2 border-dashed border-amber-300" aria-hidden />
      </div>
    ),
    secondaryTagline: (
      <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 sm:inline-flex">
        Facilitator Notes
      </span>
    ),
    highlightTitle: 'Room Reminders',
    highlightWrapperClass:
      'mt-6 grid gap-2 rounded-2xl border border-amber-100 bg-amber-50/60 p-5 text-amber-900',
    highlightItemClass:
      'flex flex-col gap-1 rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm text-amber-900 shadow-sm',
    highlightPrefixLabel: 'Reminder',
    highlightPrefixClass: 'text-xs font-semibold uppercase tracking-[0.22em] text-amber-600',
    highlightDotClass: 'mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-amber-400',
    stepBadgeClass: 'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-white',
    containerClass: 'ring-1 ring-amber-100',
    timelineAccentClass: 'bg-amber-500',
  },
  {
    renderBadge: (index) => (
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-50">
        System {index + 1}
      </span>
    ),
    renderHeading: (text) => (
      <div className="flex items-center gap-3">
        <span className="h-10 w-1.5 rounded-full bg-slate-900" aria-hidden />
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-[2.2rem]">{text}</h2>
          <p className="mt-2 text-xs uppercase tracking-[0.32em] text-slate-400">
            Ops Intelligence
          </p>
        </div>
      </div>
    ),
    secondaryTagline: (
      <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 sm:inline-flex">
        Ops Intelligence Brief
      </span>
    ),
    highlightTitle: 'Control Gates',
    highlightWrapperClass: 'mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-6',
    highlightItemClass:
      'flex items-start gap-3 rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm',
    highlightDotClass: 'mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-slate-500',
    highlightPrefixLabel: 'Checklist',
    highlightPrefixClass: 'text-xs font-semibold uppercase tracking-[0.2em] text-slate-600',
    stepBadgeClass: 'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white',
    containerClass: 'ring-1 ring-slate-200 bg-white/95',
    timelineAccentClass: 'bg-slate-900',
  },
  {
    renderBadge: (index) => (
      <span className="inline-flex items-center gap-2 rounded-full bg-fuchsia-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-600">
        Momentum {index + 1}
      </span>
    ),
    renderHeading: (text) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-fuchsia-900 sm:text-[2.25rem]">
            <span className="relative inline-block">
              {text}
              <span className="absolute inset-x-0 bottom-[-6px] h-2 rounded-full bg-fuchsia-200" aria-hidden />
            </span>
          </h2>
          <span className="hidden text-lg text-fuchsia-300 sm:inline">✺</span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.34em] text-fuchsia-400">
          Creative Momentum
        </span>
      </div>
    ),
    secondaryTagline: (
      <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300 sm:inline-flex">
        Creative Momentum Deck
      </span>
    ),
    highlightTitle: 'Cadence Sparks',
    highlightWrapperClass: 'mt-6 rounded-2xl border border-fuchsia-100 bg-fuchsia-50/60 p-6',
    highlightItemClass:
      'flex items-start gap-3 rounded-xl bg-white px-3 py-3 text-sm text-fuchsia-900 shadow-sm',
    highlightDotClass: 'mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-fuchsia-400',
    highlightPrefixLabel: 'Spark',
    highlightPrefixClass: 'text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-600',
    stepBadgeClass: 'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-500 text-sm font-semibold text-white',
    containerClass: 'ring-1 ring-fuchsia-100',
    timelineAccentClass: 'bg-fuchsia-500',
  },
];

function getSectionStyle(index: number): SectionStyle {
  return SECTION_STYLES[index % SECTION_STYLES.length];
}

function computeVariant(slug: string): SectionVariant {
  const hash = slug.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return SECTION_VARIANTS[hash % SECTION_VARIANTS.length];
}

function renderHighlights(
  variant: SectionVariant,
  highlights: string[] | undefined,
  style: SectionStyle
): JSX.Element | null {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  switch (variant) {
    case 'playbook':
      return (
        <div
          className={
            style.highlightWrapperClass ??
            'mt-6 rounded-2xl border border-primary-100 bg-primary-50/60 p-6'
          }
        >
          <h3
            className={
              style.highlightPrefixClass ??
              'text-sm font-semibold uppercase tracking-[0.18em] text-primary-700'
            }
          >
            {style.highlightTitle ?? 'Field Notes'}
          </h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className={
                  style.highlightItemClass ??
                  'flex items-start gap-2 rounded-xl bg-white/80 px-3 py-2 text-sm text-neutral-700 shadow-sm'
                }
              >
                {style.highlightDotClass && (
                  <span className={style.highlightDotClass} aria-hidden />
                )}
                <div className="space-y-1">
                  {style.highlightPrefixLabel && (
                    <span className={
                      style.highlightPrefixClass ??
                      'text-xs font-semibold uppercase tracking-[0.2em] text-primary-600'
                    }>
                      {style.highlightPrefixLabel}
                    </span>
                  )}
                  <span>{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'interview':
      return (
        <div
          className={
            style.highlightWrapperClass ??
            'mt-6 grid gap-2 rounded-2xl border border-amber-100 bg-amber-50/60 p-5'
          }
        >
          {highlights.map((item) => (
            <div
              key={item}
              className={
                style.highlightItemClass ??
                'rounded-xl border border-amber-200 bg-white/90 px-4 py-3 text-sm text-amber-900 shadow-sm'
              }
            >
              {style.highlightPrefixLabel && (
                <span className={
                  style.highlightPrefixClass ?? 'font-semibold text-amber-600 uppercase tracking-[0.2em]'
                }>
                  {style.highlightPrefixLabel}
                </span>
              )}
              <span className={style.highlightPrefixLabel ? 'mt-1 block text-sm text-inherit' : undefined}>
                {item}
              </span>
            </div>
          ))}
        </div>
      );
    case 'roadmap':
      return (
        <div className="mt-6 space-y-4">
          {highlights.map((item, index) => (
            <div
              key={item}
              className={
                style.highlightItemClass ??
                'flex items-start gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 shadow-[0_14px_40px_-35px_rgba(15,23,42,0.4)]'
              }
            >
              <span
                className={
                  style.stepBadgeClass ??
                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white'
                }
              >
                {index + 1}
              </span>
              <p className="text-sm text-neutral-700">{item}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function renderSection(
  variant: SectionVariant,
  section: BlogSection,
  index: number
): JSX.Element {
  const style = getSectionStyle(index);
  const paragraphs = section.body
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const badge = style.renderBadge
    ? style.renderBadge(index)
    : (
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
          Insight {index + 1}
        </span>
      );

  const headingRenderer =
    style.renderHeading ?? ((text: string) => (
      <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">{text}</h2>
    ));

  if (variant === 'interview') {
    return (
      <section
        key={section.heading}
        className={`rounded-[30px] border bg-gradient-to-br from-violet-50 via-white to-white p-8 shadow-[0_28px_80px_-60px_rgba(114,89,254,0.4)] transition hover:-translate-y-1 hover:shadow-[0_40px_110px_-70px_rgba(114,89,254,0.35)] ${
          style.containerClass ?? 'border-violet-100'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {badge}
          {style.secondaryTagline ?? (
            <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 sm:inline-flex">
              Behind the Scenes
            </span>
          )}
        </div>
        <div className="mt-4">{headingRenderer(section.heading)}</div>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-700 sm:text-lg">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        {renderHighlights(variant, section.highlights, style)}
      </section>
    );
  }

  if (variant === 'roadmap') {
    return (
      <section
        key={section.heading}
        className={`relative overflow-hidden rounded-[30px] border bg-white/95 p-8 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.35)] ${
          style.containerClass ?? 'border-neutral-200'
        }`}
      >
        <span
          className={`absolute left-0 top-0 h-full w-1 ${
            style.timelineAccentClass ?? 'bg-primary-500'
          }`}
          aria-hidden
        />
        <div className="ml-4 sm:ml-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Milestone {index + 1}
          </div>
          <div className="mt-4">{headingRenderer(section.heading)}</div>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-700 sm:text-lg">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          {renderHighlights(variant, section.highlights, style)}
        </div>
      </section>
    );
  }

  return (
    <section
      key={section.heading}
      className={`rounded-[28px] border bg-white/90 p-8 shadow-[0_24px_70px_-60px_rgba(15,23,42,0.4)] transition hover:-translate-y-1 hover:shadow-[0_36px_90px_-65px_rgba(15,23,42,0.3)] ${
        style.containerClass ?? 'border-neutral-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {badge}
        {style.secondaryTagline ?? (
          <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:inline-flex">
            LookLab Strategy Playbook
          </span>
        )}
      </div>
      <div className="mt-4">{headingRenderer(section.heading)}</div>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-700 sm:text-lg">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      {renderHighlights(variant, section.highlights, style)}
    </section>
  );
}

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

  const variant = computeVariant(post.slug);
  const categoryMeta = BLOG_CATEGORIES.find((category) =>
    category.posts.some((item) => item.slug === post.slug)
  );
  const theme = getBlogCategoryTheme(categoryMeta?.color);
  const categoryIcon = categoryMeta?.icon;

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

          {categoryIcon ? (
            <div className="flex items-start gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${theme.iconBg}`}>
                <span className={`text-2xl ${theme.iconText}`}>{categoryIcon}</span>
              </div>
              <div className="max-w-3xl">
                <h1 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
                  {post.title}
                </h1>
                <p className="mt-4 text-base text-neutral-600 sm:text-lg">{post.metaDescription}</p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base text-neutral-600 sm:text-lg">{post.metaDescription}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 ${theme.badgeBg} ${theme.badgeText}`}
            >
              {categoryIcon && <span className="text-sm">{categoryIcon}</span>}
              <span>{post.category}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-1.5 text-neutral-600">
              {post.publishedAt}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-1.5 text-neutral-600">
              {post.readTime}
            </span>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-[0_35px_100px_-60px_rgba(15,23,42,0.55)]">
            <div className="relative aspect-[16/9]">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 960px, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-12 space-y-10">
            {post.sections.map((section, index) => renderSection(variant, section, index))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {post.keywords.map((keyword) => (
              <span
                key={keyword}
                className={`rounded-full px-4 py-1 text-xs font-semibold ${theme.tagBg} ${theme.tagText}`}
              >
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
