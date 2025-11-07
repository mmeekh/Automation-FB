import { defaultLocale, type Locale } from '@/i18n/config';
import type { AutomationContent } from './types';

type CarColorContentMap = Record<Locale, AutomationContent>;

const carColorContentByLocale: CarColorContentMap = {
  en: {
    slug: 'car-color-change',
    templateId: 'car-color-changer',
    title: 'AI Car Colour Changer',
    subtitle: 'Instant vehicle recolours inside Instagram DMs',
    description:
      'Let prospects visualise any paint finish in seconds. Ideal for dealerships, wrap studios, and detailing shops.',
    images: {
      before: '/media/carcolor1.webp',
      style: '/media/carcolor2.webp',
      result: '/media/carcolor3.webp',
    },
    hero: {
      title: 'Do buyers want to see the car in another colour?',
      description:
        'Our automation renders new paint options through Instagram DMs in under five seconds. Remove hesitation, speed up decisions, and close more deals with an always-on virtual showroom.',
      cta: 'Launch automation',
    },
    features: [
      {
        icon: '⚡',
        title: 'Instant preview',
        description: 'Customers upload a photo and receive the colour-changed version within seconds.',
      },
      {
        icon: '🎨',
        title: 'Full paint library',
        description: 'Support for metallic, matte, satin, pearlescent, and custom wrap finishes.',
      },
      {
        icon: '📱',
        title: 'Native Instagram flow',
        description: 'No additional apps required — the entire experience lives in DM conversations.',
      },
      {
        icon: '💼',
        title: 'Photorealistic renders',
        description: 'AI keeps reflections, lighting, and body lines intact so customers trust the result.',
      },
      {
        icon: '📊',
        title: 'Sales analytics',
        description: 'See which colours convert best and tailor stock or marketing in real time.',
      },
      {
        icon: '🔄',
        title: 'Runs 24/7',
        description: 'Prospects can try colours after hours without waiting for a sales rep.',
      },
    ],
    useCases: [
      {
        icon: '🚗',
        title: 'Dealerships & showrooms',
        description:
          'Show vehicle inventory in any colour variation instantly to stop losing sales over availability.',
      },
      {
        icon: '🎨',
        title: 'Paint & wrap studios',
        description:
          'Provide visual approvals before starting work. Reduce re-do requests and increase upsells.',
      },
      {
        icon: '🔧',
        title: 'Tuning & custom shops',
        description: 'Pitch unique finishes, accents, or graphics with realistic mockups delivered automatically.',
      },
      {
        icon: '🏢',
        title: 'Fleet & rental companies',
        description: 'Demonstrate fleet vehicles in brand colours for corporate clients on demand.',
      },
    ],
    faq: [
      {
        question: 'How does the automation work?',
        answer:
          'Customers message you on Instagram, upload their car photo, and select or upload a colour reference. AI applies the finish and sends the rendered result back immediately.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'Roughly five minutes. Connect Instagram, choose the AI model, configure trigger keywords, and activate — no coding required.',
      },
      {
        question: 'What is the pricing model?',
        answer:
          'It’s part of your automation plan. Use the first 100 renders for free, then switch to pay-per-render or a flat monthly bundle.',
      },
      {
        question: 'How realistic are the results?',
        answer:
          'We leverage the latest Stable Diffusion and ControlNet pipelines to preserve reflections, shadows, and glass highlights with 95%+ realism.',
      },
      {
        question: 'Is customer data secure?',
        answer:
          'All uploads are encrypted at rest and auto-deleted after 30 days. We are compliant with GDPR and KVKK standards.',
      },
      {
        question: 'Which vehicle types are supported?',
        answer:
          'Cars, SUVs, vans, trucks, motorcycles, and commercial vehicles — for both indoor and outdoor photos.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Hi! Can I see my car in another colour?',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Absolutely! 🚗 Please send the current photo of your vehicle.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/carcolor1.webp',
        imageAlt: 'Customer vehicle photo',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Great! Now share the colour or wrap you want to try 🎨',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/carcolor2.webp',
        imageAlt: 'Desired colour reference',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI is applying the new finish... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Here’s how your car looks! 🌟',
        image: '/media/carcolor3.webp',
        imageAlt: 'Rendered vehicle with new colour',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Ready for a quote? Tap below to connect with our team 💰',
        button: {
          text: 'Request pricing',
        },
      },
    ],
    metadata: {
      keywords: [
        'ai car colour change',
        'virtual vehicle paint',
        'instagram dealership automation',
        'car wrap preview',
        'auto sales chatbot',
        'paint shop ai',
        'looklab automation',
      ],
      ogTitle: 'AI Car Colour Changer Automation | LookLab',
      ogDescription:
        'Show any paint or wrap finish inside Instagram DMs in seconds. Close more deals and reduce revisions with LookLab’s car colour automation.',
    },
    stats: [
      { value: '5s', label: 'Average colour render' },
      { value: '95%', label: 'Visual realism score' },
      { value: '24/7', label: 'Always available' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Deliver instant colour simulations in three simple steps.',
      steps: [
        {
          step: '1',
          title: 'Connect Instagram',
          description: 'Link your business account securely. Setup finishes in one click.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Customise your palette',
          description: 'Set trigger words, upload colour presets, and craft the DM script.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Go live',
          description: 'Activate the automation and let customers explore finishes 24/7.',
          icon: '🚀',
        },
      ],
    },
  },
  tr: {
    slug: 'car-color-change',
    templateId: 'car-color-changer',
    title: 'Araba Renk Değiştirme AI',
    subtitle: 'Instagram üzerinden anında araç renk değişimi',
    description:
      'Yapay zeka ile müşterilerinize farklı araç renklerini anında gösterin. Oto galeriler ve boyama atölyeleri için ideal.',
    images: {
      before: '/media/carcolor1.webp',
      style: '/media/carcolor2.webp',
      result: '/media/carcolor3.webp',
    },
    hero: {
      title: 'Müşterileriniz Aracı Farklı Renkte Görmek İstiyor mu?',
      description:
        'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize araçlarının farklı renklerdeki görünümünü saniyeler içinde gösterin. Satış öncesi güven oluşturun, karar sürecini hızlandırın.',
      cta: 'Otomasyonu Başlat',
    },
    features: [
      {
        icon: '⚡',
        title: 'Anında Önizleme',
        description: 'Müşteri araç fotoğrafını gönderir, 5 saniye içinde yeni renkte görüntülenir.',
      },
      {
        icon: '🎨',
        title: 'Tüm Renk Seçenekleri',
        description: 'Metalik, mat, parlak - her türlü boya çeşidi ve renk için destek.',
      },
      {
        icon: '📱',
        title: 'Instagram Entegrasyonu',
        description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
      },
      {
        icon: '💼',
        title: 'Gerçekçi Sonuçlar',
        description: 'AI teknolojisi ile ışık, gölge ve yansıma korumalı profesyonel çıktılar.',
      },
      {
        icon: '📊',
        title: 'Satış Metrikleri',
        description: 'Hangi renkler daha çok ilgi görüyor? Satış verilerinizi analiz edin.',
      },
      {
        icon: '🔄',
        title: '7/24 Aktif',
        description: 'Mesai saatleri dışında bile müşteriler renk seçeneklerini deneyimler.',
      },
    ],
    useCases: [
      {
        icon: '🚗',
        title: 'Oto Galeriler',
        description:
          'Satışa sunduğunuz araçları müşterilerinize farklı renklerde gösterin. Renk tercihi nedeniyle kaçan satışları önleyin.',
      },
      {
        icon: '🎨',
        title: 'Boya & Kaplama Atölyeleri',
        description:
          'Boyama işlemi öncesi müşteriye görsel önizleme sunun. Memnuniyetsizlik riskini minimize edin.',
      },
      {
        icon: '🔧',
        title: 'Araç Modifiye & Tuning',
        description: 'Özel renk, mat kaplama, wrap işlemleri için müşteriye görsel teklif sunun.',
      },
      {
        icon: '🏢',
        title: 'Filo Kiralama Şirketleri',
        description: 'Kurumsal müşterilere filo araçlarını kurumsal renklerde gösterin.',
      },
    ],
    faq: [
      {
        question: 'Nasıl çalışır?',
        answer:
          'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve araç fotoğrafı ister. Müşteri aracının fotoğrafını ve istediği renk örneğini gönderir. AI saniyeler içinde aracı yeni renkte işler ve sonucu gönderir.',
      },
      {
        question: 'Kurulum ne kadar sürer?',
        answer:
          '5 dakika. Instagram hesabınızı bağlayın, AI modelini seçin, tetikleyici kelimeleri ayarlayın ve yayına alın. Teknik bilgi gerektirmez.',
      },
      {
        question: 'Fiyatlandırma nasıl?',
        answer:
          'Aylık otomasyon paketi ile sınırsız kullanım. İlk 100 dönüşüm ücretsiz, sonrası dönüşüm başı ücretlendirme veya sabit aylık paket seçebilirsiniz.',
      },
      {
        question: 'AI ne kadar gerçekçi?',
        answer:
          'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Araç geometrisi, ışık, gölge ve cam yansımaları korunarak %95+ gerçekçilik oranı sağlıyoruz.',
      },
      {
        question: 'Müşteri verileri güvende mi?',
        answer:
          'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
      },
      {
        question: 'Hangi araç tipleri destekleniyor?',
        answer:
          'Tüm araç tipleri: otomobil, SUV, kamyonet, motosiklet, ticari araçlar. Hem dış hem iç mekan fotoğrafları için optimize edilmiştir.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Merhaba, aracımın farklı renkte nasıl durduğunu görmek istiyorum',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Harika! 🚗 Lütfen aracınızın mevcut fotoğrafını gönderin.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/carcolor1.webp',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Süper! Şimdi denemek istediğiniz rengin örnek fotoğrafını gönderin 🎨',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/carcolor2.webp',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI renk değişimi yapıyor... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'İşte aracınızın yeni hali! 🌟',
        image: '/media/carcolor3.webp',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Beğendiniz mi? Fiyat teklifi almak için tıklayın 💰',
        button: {
          text: 'Randevu Al',
        },
      },
    ],
    metadata: {
      keywords: [
        'araba renk değiştirme',
        'araç boya AI',
        'Instagram otomasyon',
        'oto galeri otomasyonu',
        'araç renk simülasyonu',
        'boya atölyesi AI',
        'araç wrap önizleme',
      ],
      ogTitle: 'Araba Renk Değiştirme AI - Instagram Otomasyonu | LookLab',
      ogDescription:
        'Müşterilerinize Instagram DM üzerinden AI ile araçlarının farklı renklerdeki görünümünü anında gösterin. Oto galeriler için profesyonel otomasyon çözümü.',
    },
    stats: [
      { value: '5 sn', label: 'Renk değişimi' },
      { value: '%95', label: 'Gerçekçilik oranı' },
      { value: '24/7', label: 'Kesintisiz aktif' },
    ],
    howItWorks: {
      title: 'Nasıl Çalışır?',
      subtitle: '3 basit adımda müşterilerinize AI deneyimi sunun',
      steps: [
        {
          step: '1',
          title: 'Instagram Hesabını Bağla',
          description: 'Hesabınızı güvenli şekilde bağlayın. Tek tık ile kurulum tamamlanır.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Otomasyonu Özelleştir',
          description: 'Tetikleyici kelimeleri, mesajları ve renk paletini ayarlayın.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Yayına Al',
          description: 'Otomasyonu aktif edin. Artık müşterileriniz 7/24 renk deneyebilir.',
          icon: '🚀',
        },
      ],
    },
  },
};

export function getCarColorChangeContent(locale: Locale): AutomationContent {
  return carColorContentByLocale[locale] ?? carColorContentByLocale[defaultLocale];
}
