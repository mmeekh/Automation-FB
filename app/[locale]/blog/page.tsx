'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { BLOG_CATEGORIES } from '@/lib/blog/data';
import { getBlogCategoryTheme } from '@/lib/blog/categoryThemes';
import type { BlogPost } from '@/lib/blog/types';

export default function BlogIndexPage() {
  // Get posts from each category (3 from each)
  const growthPlaybooks = BLOG_CATEGORIES.find(cat => cat.slug === 'growth-playbooks')?.posts.slice(0, 3) || [];
  const aiCustomerExp = BLOG_CATEGORIES.find(cat => cat.slug === 'ai-customer-experience')?.posts.slice(0, 3) || [];
  const salonSuccess = BLOG_CATEGORIES.find(cat => cat.slug === 'salon-success-stories')?.posts.slice(0, 3) || [];
  const instagramContent = BLOG_CATEGORIES.find(cat => cat.slug === 'instagram-content-strategy')?.posts.slice(0, 3) || [];
  const businessAnalytics = BLOG_CATEGORIES.find(cat => cat.slug === 'business-analytics')?.posts.slice(0, 3) || [];

  // Featured post (first from Growth Playbooks)
  const featuredPost = growthPlaybooks[0];

  const getCategoryForPost = (post: BlogPost) => {
    return BLOG_CATEGORIES.find(cat =>
      cat.posts.some(p => p.slug === post.slug)
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section - Featured Post */}
        {featuredPost && (
          <section className="border-b border-neutral-200 bg-gradient-to-b from-neutral-50 to-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Left: Image */}
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group relative overflow-hidden rounded-2xl aspect-video"
                >
                  <Image
                    src={featuredPost.cover}
                    alt={featuredPost.title}
                    width={featuredPost.coverWidth}
                    height={featuredPost.coverHeight}
                    priority
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ width: '100%', height: '100%' }}
                  />
                </Link>

                {/* Right: Content */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      {(() => {
                        const cat = getCategoryForPost(featuredPost);
                        const theme = cat ? getBlogCategoryTheme(cat.color) : null;
                        return (
                          <span className={`rounded-full px-3 py-1 ${theme?.badgeBg} ${theme?.badgeText}`}>
                            {featuredPost.category}
                          </span>
                        );
                      })()}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`} className="group">
                    <h2 className="text-4xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-primary-600 lg:text-5xl">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-lg leading-relaxed text-neutral-600">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-4 pt-4">
                    {featuredPost.author.avatar && (
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Growth Playbooks */}
        <section className="border-b border-neutral-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900">Growth Playbooks</h2>
              <Link
                href="/blog/category/growth-playbooks"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {growthPlaybooks.slice(1).map((post) => {
                const cat = getCategoryForPost(post);
                const theme = cat ? getBlogCategoryTheme(cat.color) : null;

                return (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="mb-4 overflow-hidden rounded-xl aspect-video">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>

                      <div className="space-y-3">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${theme?.badgeBg} ${theme?.badgeText}`}>
                          {post.category}
                        </span>

                        <h3 className="text-lg font-semibold leading-tight text-neutral-900 group-hover:text-primary-600">
                          {post.title}
                        </h3>

                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2">
                          {post.author.avatar && (
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full"
                            />
                          )}
                          <span className="text-xs text-neutral-500">
                            {post.author.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Customer Experience */}
        <section className="border-b border-neutral-200 bg-neutral-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-neutral-900">
                  AI Customer Experience
                </h2>
                <p className="text-neutral-600">
                  Automate customer interactions with intelligence
                </p>
              </div>
              <Link
                href="/blog/category/ai-customer-experience"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {aiCustomerExp.map((post) => {
                const cat = getCategoryForPost(post);
                const theme = cat ? getBlogCategoryTheme(cat.color) : null;

                return (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="mb-4 overflow-hidden rounded-xl aspect-video">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold leading-tight text-neutral-900 group-hover:text-primary-600">
                          {post.title}
                        </h3>

                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2">
                          {post.author.avatar && (
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full"
                            />
                          )}
                          <span className="text-xs text-neutral-500">
                            {post.author.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Instagram Content Strategy */}
        <section className="border-b border-neutral-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-neutral-900">
                  Instagram Content Strategy
                </h2>
                <p className="text-neutral-600">
                  Master visual storytelling and social media marketing
                </p>
              </div>
              <Link
                href="/blog/category/instagram-content-strategy"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {instagramContent.map((post) => {
                const cat = getCategoryForPost(post);
                const theme = cat ? getBlogCategoryTheme(cat.color) : null;

                return (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="mb-4 overflow-hidden rounded-xl aspect-video">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold leading-tight text-neutral-900 group-hover:text-primary-600">
                          {post.title}
                        </h3>

                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2">
                          {post.author.avatar && (
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full"
                            />
                          )}
                          <span className="text-xs text-neutral-500">
                            {post.author.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Salon Success Stories */}
        <section className="border-b border-neutral-200 bg-neutral-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-neutral-900">
                  Salon Success Stories
                </h2>
                <p className="text-neutral-600">
                  Real-world automation transformations
                </p>
              </div>
              <Link
                href="/blog/category/salon-success-stories"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {salonSuccess.map((post) => {
                const cat = getCategoryForPost(post);
                const theme = cat ? getBlogCategoryTheme(cat.color) : null;

                return (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="mb-4 overflow-hidden rounded-xl aspect-video">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold leading-tight text-neutral-900 group-hover:text-primary-600">
                          {post.title}
                        </h3>

                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2">
                          {post.author.avatar && (
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full"
                            />
                          )}
                          <span className="text-xs text-neutral-500">
                            {post.author.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Business & Analytics */}
        <section className="border-b border-neutral-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-neutral-900">
                  Business & Analytics Mastery
                </h2>
                <p className="text-neutral-600">
                  Data-driven insights for salon growth
                </p>
              </div>
              <Link
                href="/blog/category/business-analytics"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all →
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {businessAnalytics.map((post) => {
                const cat = getCategoryForPost(post);
                const theme = cat ? getBlogCategoryTheme(cat.color) : null;

                return (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="mb-4 overflow-hidden rounded-xl aspect-video">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>

                      <div className="space-y-3">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${theme?.badgeBg} ${theme?.badgeText}`}>
                          {post.category}
                        </span>

                        <h3 className="font-semibold leading-tight text-neutral-900 group-hover:text-primary-600">
                          {post.title}
                        </h3>

                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2">
                          {post.author.avatar && (
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full"
                            />
                          )}
                          <span className="text-xs text-neutral-500">
                            {post.author.name}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              Stories, software, podcasts, and courses to help you build the future
            </h2>
            <p className="mb-8 text-lg text-neutral-600">
              Subscribe to get the latest insights delivered to your inbox
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full bg-primary-600 px-8 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
              >
                Get Started
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center rounded-full border-2 border-primary-600 bg-white px-8 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
