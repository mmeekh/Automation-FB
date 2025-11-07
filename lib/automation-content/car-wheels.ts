import { defaultLocale, type Locale } from '@/i18n/config';
import type { AutomationContent } from './types';

type CarWheelsContentMap = Record<Locale, AutomationContent>;

const carWheelsContentByLocale: CarWheelsContentMap = {
  en: {
    slug: 'car-wheels',
    templateId: 'car-wheels',
    title: 'AI Wheel & Tire Visualiser',
    subtitle: 'Instant wheel swaps directly in Instagram DMs',
    description:
      'Show customers how new wheels or tyre packages look on their vehicle in seconds. Built for wheel retailers, tuning shops, and tyre marketplaces.',
    images: {
      before: '/media/rim1.webp',
      style: '/media/rim2.webp',
      result: '/media/rim3.webp',
    },
    hero: {
      title: 'Ready to preview new wheels on every customer car?',
      description:
        'Our DM automation renders wheel and tyre combinations in real time. Remove uncertainty, increase attachment sales, and keep shoppers engaged around the clock.',
      cta: 'Launch automation',
    },
    features: [
      {
        icon: '⚡',
        title: 'Instant visualisation',
        description: 'Upload a vehicle photo and see the new wheel set applied in under five seconds.',
      },
      {
        icon: '🎯',
        title: 'Complete wheel catalogue',
        description: 'Support for alloy, steel, forged, custom designs, and staggered setups.',
      },
      {
        icon: '📱',
        title: 'Native Instagram experience',
        description: 'No extra apps. Customers stay in a familiar DM chat from start to finish.',
      },
      {
        icon: '💼',
        title: 'Perspective-aware renders',
        description: 'AI respects angles, lighting, and wheel size so results look showroom-ready.',
      },
      {
        icon: '📊',
        title: 'Merchandising analytics',
        description: 'Track the most requested styles and adjust inventory or promotions with data.',
      },
      {
        icon: '🔄',
        title: '24/7 engagement',
        description: 'Let customers experiment with looks even when your team is offline.',
      },
    ],
    useCases: [
      {
        icon: '🛞',
        title: 'Wheel & tyre retailers',
        description: 'Visualise packages on the exact vehicle to eliminate doubt and boost conversions.',
      },
      {
        icon: '🚗',
        title: 'Accessory dealerships',
        description: 'Showcase premium wheel upgrades during the sales process and increase add-ons.',
      },
      {
        icon: '🔧',
        title: 'Tuning & custom shops',
        description: 'Pitch bespoke designs and finishes with realistic previews before ordering.',
      },
      {
        icon: '🏪',
        title: 'Online tyre marketplaces',
        description: 'Embed AI previews into checkout flows to enrich the digital shopping experience.',
      },
    ],
    faq: [
      {
        question: 'How does the automation work?',
        answer:
          'Customers message you on Instagram, share a vehicle photo, and select a wheel style. AI maps the wheels to the car and returns the render instantly.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'About five minutes. Connect your Instagram account, choose the AI preset, configure trigger keywords, and go live — no technical skills required.',
      },
      {
        question: 'What pricing options are available?',
        answer:
          'Start with 100 free renders. Afterwards continue pay-per-render or opt for an unlimited monthly plan inside your automation subscription.',
      },
      {
        question: 'How realistic are the visuals?',
        answer:
          'We use modern diffusion models to maintain wheel size, perspective, and reflections with 93%+ realism scores.',
      },
      {
        question: 'Is customer data protected?',
        answer:
          'Photos are encrypted at rest and automatically deleted after 30 days. We comply with GDPR and KVKK.',
      },
      {
        question: 'Which vehicles are supported?',
        answer:
          'Cars, SUVs, pickups, motorcycles, and more. The AI adapts to different angles and lighting conditions.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Hi, I want to see new wheels on my car',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Sounds great! 🚗 Please send a current photo of your vehicle.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/rim1.webp',
        imageAlt: 'Customer vehicle image',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Awesome! Now share the wheel style you’d like to try 🛞',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/rim2.webp',
        imageAlt: 'Desired wheel reference',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI is fitting the wheels... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Here’s your ride with the new setup! 🌟',
        image: '/media/rim3.webp',
        imageAlt: 'Rendered car with new wheels',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Want pricing or availability? Tap below 👇',
        button: {
          text: 'Request a quote',
        },
      },
    ],
    metadata: {
      keywords: [
        'ai wheel visualizer',
        'instagram wheel automation',
        'virtual rim preview',
        'tyre shop chatbot',
        'car accessory ai',
        'wheel simulation',
        'looklab automation',
      ],
      ogTitle: 'AI Wheel & Tire Visualiser | LookLab',
      ogDescription:
        'Preview wheel and tyre packages in Instagram DMs within seconds. Boost accessory sales with LookLab’s wheel automation.',
    },
    stats: [
      { value: '5s', label: 'Average render time' },
      { value: '93%', label: 'Realism rating' },
      { value: '24/7', label: 'Always available' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Deliver impressive wheel previews in three steps.',
      steps: [
        {
          step: '1',
          title: 'Connect Instagram',
          description: 'Link your business profile securely with one click.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Customise your catalog',
          description: 'Upload wheel references, set trigger keywords, and tweak the DM script.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Go live',
          description: 'Activate the automation so customers can try wheels any time.',
          icon: '🚀',
        },
      ],
    },
  },
  tr: {
    slug: 'car-wheels',
    templateId: 'car-wheels',
    title: 'Araba Jant/Lastik AI',
    subtitle: 'Instagram üzerinden anında araç jant değişimi',
    description:
      'Yapay zeka ile müşterilerinize farklı jant ve lastik modellerini anında gösterin. Oto aksesuar ve lastik mağazaları için ideal.',
    images: {
      before: '/media/rim1.webp',
      style: '/media/rim2.webp',
      result: '/media/rim3.webp',
    },
    hero: {
      title: 'Müşterileriniz Aracını Yeni Jantlarla Görmek İstiyor mu?',
      description:
        'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize araçlarının farklı jant ve lastiklerle görünümünü saniyeler içinde gösterin. Satın alma kararını hızlandırın.',
      cta: 'Otomasyonu Başlat',
    },
    features: [
      {
        icon: '⚡',
        title: 'Anında Görselleştirme',
        description: 'Müşteri araç fotoğrafını gönderir, 5 saniye içinde yeni jantlarla görüntülenir.',
      },
      {
        icon: '🎯',
        title: 'Tüm Jant Modelleri',
        description: 'Alüminyum, çelik, özel tasarım - her türlü jant modeli için destek.',
      },
      {
        icon: '📱',
        title: 'Instagram Entegrasyonu',
        description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
      },
      {
        icon: '💼',
        title: 'Gerçekçi Perspektif',
        description: 'AI teknolojisi ile araç perspektifi ve ışıklandırma korumalı sonuçlar.',
      },
      {
        icon: '📊',
        title: 'Satış Analizi',
        description: 'Hangi jant modelleri daha çok ilgi görüyor? Stok planlamasını optimize edin.',
      },
      {
        icon: '🔄',
        title: '7/24 Aktif',
        description: 'Mesai saatleri dışında bile müşteriler jant seçeneklerini deneyimler.',
      },
    ],
    useCases: [
      {
        icon: '🛞',
        title: 'Lastik & Jant Mağazaları',
        description:
          'Müşterilere jant ve lastikleri araçları üzerinde gösterin. Kararsızlığı ortadan kaldırın.',
      },
      {
        icon: '🚗',
        title: 'Oto Aksesuar Bayileri',
        description:
          'Geniş ürün yelpazenizdeki jantları müşterilere görsel olarak sunun. Satış konversiyon oranını artırın.',
      },
      {
        icon: '🔧',
        title: 'Tuning & Modifikasyon Atölyeleri',
        description: 'Özel jant tasarımlarını müşteri araçları üzerinde simüle edin.',
      },
      {
        icon: '🏪',
        title: 'Online Lastik Satıcıları',
        description: 'E-ticaret sitenize AI entegrasyonu ile müşteri deneyimini geliştirin.',
      },
    ],
    faq: [
      {
        question: 'Nasıl çalışır?',
        answer:
          'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve araç fotoğrafı ister. Müşteri aracının fotoğrafını ve denemek istediği jant modelini gönderir. AI saniyeler içinde jantı araç üzerinde gösterir.',
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
          'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Araç perspektifi, tekerlek boyutu ve ışıklandırma korunarak %93+ gerçekçilik oranı sağlıyoruz.',
      },
      {
        question: 'Müşteri verileri güvende mi?',
        answer:
          'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
      },
      {
        question: 'Hangi araç tipleri destekleniyor?',
        answer:
          'Otomobil, SUV, kamyonet, motosiklet - tüm araç tipleri. Farklı açılar ve ışık koşulları için optimize edilmiştir.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Merhaba, aracıma yeni jant bakmak istiyorum',
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
        image: '/media/rim1.webp',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Süper! Şimdi denemek istediğiniz jant modelinin fotoğrafını gönderin 🛞',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/rim2.webp',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI jantları takıyor... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'İşte aracınız yeni jantlarla! 🌟',
        image: '/media/rim3.webp',
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
        'araba jant değiştirme',
        'lastik AI',
        'Instagram otomasyon',
        'jant mağazası otomasyonu',
        'sanal jant deneme',
        'araç aksesuar AI',
        'jant simülasyonu',
      ],
      ogTitle: 'Araba Jant/Lastik AI - Instagram Otomasyonu | LookLab',
      ogDescription:
        'Müşterilerinize Instagram DM üzerinden AI ile araçlarının farklı jantlarla görünümünü anında gösterin. Lastik mağazaları için profesyonel otomasyon çözümü.',
    },
    stats: [
      { value: '5 sn', label: 'Görselleştirme süresi' },
      { value: '%93', label: 'Gerçekçilik oranı' },
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
          description: 'Tetikleyici kelimeleri, mesajları ve jant kataloğunu ayarlayın.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Yayına Al',
          description: 'Otomasyonu aktif edin. Artık müşterileriniz 7/24 jant deneyebilir.',
          icon: '🚀',
        },
      ],
    },
  },
};

export function getCarWheelsContent(locale: Locale): AutomationContent {
  return carWheelsContentByLocale[locale] ?? carWheelsContentByLocale[defaultLocale];
}
