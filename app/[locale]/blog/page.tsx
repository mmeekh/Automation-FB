'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  cover: string;
}

const posts: BlogPost[] = [
  {
    id: 'instagram-dm-chatbot-seo',
    title: 'Instagram DM Chatbot SEO Playbook',
    summary:
      'English-first guide to align keywords, DM flows, and booking automation for organic growth. | TR: Anahtar kelime ve DM akisi uyumu.',
    category: 'Growth',
    readingTime: '9 min · 9 dk',
    publishedAt: '18 October 2025',
    author: {
      name: 'Naz Aydin',
      role: 'Growth Strategist',
      avatar: '/media/avatars/naz.png',
    },
    cover: '/media/main1.webp',
  },
  {
    id: 'ugc-automation-engine',
    title: 'UGC Automation Engine for Instagram DM Sales',
    summary:
      'Blueprint for injecting user-generated content into automated DM funnels. | TR: UGC ile DM satis hizlandirma.',
    category: 'Playbooks',
    readingTime: '8 min · 8 dk',
    publishedAt: '16 October 2025',
    author: {
      name: 'Deniz Kurt',
      role: 'Lifecycle Lead',
      avatar: '/media/avatars/deniz.png',
    },
    cover: '/media/main2.webp',
  },
  {
    id: 'privacy-compliance-automation',
    title: 'Privacy-First Instagram Automation Checklist',
    summary:
      'Consent, retention, and audit tactics for KVKK & GDPR-ready DM workflows. | TR: KVKK/GDPR uyum rehberi.',
    category: 'Compliance',
    readingTime: '10 min · 10 dk',
    publishedAt: '15 October 2025',
    author: {
      name: 'Efe Arslan',
      role: 'Compliance Officer',
      avatar: '/media/avatars/efe.png',
    },
    cover: '/media/blog6.webp',
  },
  {
    id: 'ai-hair-studio',
    title: 'AI ile sac tasariminda 5 pratik adim',
    summary:
      'Instagram otomasyonlarini kullanarak musteri sac stillerini anlik degistirme stratejileri.',
    category: 'Automation',
    readingTime: '6 dk',
    publishedAt: '12 Ekim 2025',
    author: {
      name: 'Merve Yilmaz',
      role: 'Automation Architect',
      avatar: '/media/avatars/merve.png',
    },
    cover: '/media/blog1.webp',
  },
  {
    id: 'dm-funnels',
    title: 'DM akislari ile organik randevu artisi',
    summary:
      'Mesaj bazli akislarda buton kombinasyonlari ve gecis oranlarini optimize etme ornekleri.',
    category: 'Playbooks',
    readingTime: '4 dk',
    publishedAt: '08 Ekim 2025',
    author: {
      name: 'Kerem Ozkan',
      role: 'Lifecycle Specialist',
      avatar: '/media/avatars/kerem.png',
    },
    cover: '/media/blog2.webp',
  },
  {
    id: 'visual-prompts',
    title: 'Gorsel promptlar ile kusursuz yanitlar',
    summary:
      'Image request nodelarinda kullaniciya dogru promtu gostermek icin soyut ipuclarinin kullanimi.',
    category: 'Creative',
    readingTime: '7 dk',
    publishedAt: '02 Ekim 2025',
    author: {
      name: 'Selin Kara',
      role: 'Creative Strategist',
      avatar: '/media/avatars/selin.png',
    },
    cover: '/media/blog3.webp',
  },
  {
    id: 'quota-health',
    title: 'Gunde 1000 DM limitini yonetme rehberi',
    summary:
      'Otomasyon kotalarini esnek tutmak icin gunluk takip ve calisan ekipler icin gorev dagilimi.',
    category: 'Operations',
    readingTime: '5 dk',
    publishedAt: '28 Eylul 2025',
    author: {
      name: 'Bora Yildiz',
      role: 'Ops Manager',
      avatar: '/media/avatars/bora.png',
    },
    cover: '/media/blog4.webp',
  },
  {
    id: 'story-handovers',
    title: 'Hikaye gecislerinde otomasyon-ne manuel?',
    summary:
      'Insan ekibine devredilen hikayelerde hizli aksiyon icin otomatik etiketleme yontemleri.',
    category: 'Workflow',
    readingTime: '8 dk',
    publishedAt: '20 Eylul 2025',
    author: {
      name: 'Esra Demir',
      role: 'Workflow Lead',
      avatar: '/media/avatars/esra.png',
    },
    cover: '/media/blog5.webp',
  },
  {
    id: 'analytics-dashboard',
    title: 'LookLab panelleri ile KPI takibi',
    summary:
      'Acik oturum oranlari, gecikme analizleri ve kanal bazli performans icin tablo onerileri.',
    category: 'Analytics',
    readingTime: '6 dk',
    publishedAt: '14 Eylul 2025',
    author: {
      name: 'Can Acar',
      role: 'Data Analyst',
      avatar: '/media/avatars/can.png',
    },
    cover: '/media/blog6.webp',
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <header className="space-y-6 text-center sm:text-left">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
                LookLab otomasyon blogu
              </h1>
              <p className="text-sm text-neutral-600 sm:text-base">
                Instagram otomasyon takiminiz icin strateji, tasarim ve veri odakli rehberler. Her
                yazi hazir bir playbook veya fikir listesi ile gelir.
              </p>
            </div>
            <div className="flex gap-3 justify-center sm:justify-end">
              <Button className="bg-primary-600 hover:bg-primary-700">
                Bultene kaydol
              </Button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48 w-full bg-neutral-100">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-primary-600">
                  <span>{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    <Link
                      href={`/blog/${post.id}`}
                      prefetch={false}
                      className="transition hover:text-primary-600"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-neutral-600">{post.summary}</p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-neutral-200 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-100">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{post.author.name}</p>
                      <p className="text-xs text-neutral-500">{post.author.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-neutral-500">{post.publishedAt}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
        </div>
      </main>
    </>
  );
}
