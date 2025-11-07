import { defaultLocale, type Locale } from '@/i18n/config';
import type { AutomationContent } from './types';

type WallPaintContentMap = Record<Locale, AutomationContent>;

const wallPaintContentByLocale: WallPaintContentMap = {
  en: {
    slug: 'wall-paint',
    templateId: 'wall-paint',
    title: 'AI Wall Paint Preview',
    subtitle: 'Instant colour and wallpaper visualisations via Instagram DMs',
    description:
      'Let clients explore new paint colours, finishes, and wallpapers in their own rooms within seconds. Perfect for paint retailers, interior designers, and décor studios.',
    images: {
      before: '/media/wall1.webp',
      style: '/media/wall2.webp',
      result: '/media/wall3.webp',
    },
    hero: {
      title: 'Show every wall in the perfect palette',
      description:
        'Our DM automation renders fresh colours and wallpapers on customer rooms instantly. Accelerate decisions, reduce sample costs, and delight clients with hyper-real previews.',
      cta: 'Launch automation',
    },
    features: [
      {
        icon: '⚡',
        title: 'Instant transformations',
        description: 'Upload a room photo and view the new finish in less than five seconds.',
      },
      {
        icon: '🎨',
        title: 'Unlimited colours & patterns',
        description: 'Support for paint, wallpaper, textured coatings, and bespoke palettes.',
      },
      {
        icon: '📱',
        title: 'Instagram-native experience',
        description: 'No extra apps. Clients manage the entire journey inside DMs.',
      },
      {
        icon: '💼',
        title: 'Lighting-aware renders',
        description: 'AI preserves natural light, shadows, and perspective for believable results.',
      },
      {
        icon: '📊',
        title: 'Palette analytics',
        description: 'Identify trending colours and plan stock, bundles, or promotions accordingly.',
      },
      {
        icon: '🔄',
        title: 'Always-on showroom',
        description: 'Let clients explore finishes day or night — no scheduling needed.',
      },
    ],
    useCases: [
      {
        icon: '🏠',
        title: 'Interior designers',
        description: 'Present multiple palette options within minutes and win approvals faster.',
      },
      {
        icon: '🎨',
        title: 'Paint & décor retailers',
        description: 'Let shoppers preview colours in their own homes to boost conversion rates.',
      },
      {
        icon: '🏢',
        title: 'Paint manufacturers',
        description: 'Launch new collections with immersive previews and gather market feedback.',
      },
      {
        icon: '🛋️',
        title: 'Furniture & décor brands',
        description: 'Showcase products styled with complementary wall finishes for upsells.',
      },
    ],
    faq: [
      {
        question: 'How does the automation work?',
        answer:
          'Clients message you on Instagram, share a room photo, and pick a colour or pattern. AI repaints the walls and sends the render back instantly.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'Less than five minutes. Connect Instagram, choose the AI preset, import your palette, set trigger keywords, and go live.',
      },
      {
        question: 'What pricing options exist?',
        answer:
          'Use the first 100 previews for free, then switch to pay-per-render or unlimited monthly usage via your automation plan.',
      },
      {
        question: 'How realistic are the renders?',
        answer:
          'We leverage modern diffusion and ControlNet models to maintain perspective, lighting, and shadows with 95%+ realism.',
      },
      {
        question: 'Is customer data secure?',
        answer:
          'Room photos are encrypted and deleted automatically after 30 days. Fully GDPR and KVKK compliant.',
      },
      {
        question: 'Which room types are supported?',
        answer:
          'Living rooms, bedrooms, kitchens, offices, and more — optimised for varied lighting and angles.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Hi, I want to see my living room in a different colour',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Great choice! 🏠 Please send a photo of your space.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/wall1.webp',
        imageAlt: 'Customer living room',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Awesome! Now share the colour or wallpaper you’d like to try 🎨',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/wall2.webp',
        imageAlt: 'Colour sample reference',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI is repainting your walls... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Here’s your room with the new finish! 🌟',
        image: '/media/wall3.webp',
        imageAlt: 'Rendered room with new wall colour',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Love it? Tap below for product details 🛒',
        button: {
          text: 'Request pricing',
        },
      },
    ],
    metadata: {
      keywords: [
        'ai wall paint preview',
        'instagram paint automation',
        'virtual colour visualizer',
        'interior design ai',
        'wallpaper try on',
        'looklab automation',
        'room repaint ai',
      ],
      ogTitle: 'AI Wall Paint Preview Automation | LookLab',
      ogDescription:
        'Preview new paint colours and wallpapers in Instagram DMs instantly. Close projects faster with LookLab’s wall paint automation.',
    },
    stats: [
      { value: '5s', label: 'Average render time' },
      { value: '95%', label: 'Realism rating' },
      { value: '24/7', label: 'Always available' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Deliver immersive colour previews in three steps.',
      steps: [
        {
          step: '1',
          title: 'Connect Instagram',
          description: 'Securely link your account and enable DM permissions.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Import your palette',
          description: 'Upload colour swatches or wallpaper patterns and configure triggers.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Go live',
          description: 'Activate the automation and let clients explore options anytime.',
          icon: '🚀',
        },
      ],
    },
  },
  tr: {
    slug: 'wall-paint',
    templateId: 'wall-paint',
    title: 'Duvar Rengi/Duvar Kağıdı AI',
    subtitle: 'Instagram üzerinden anında duvar renk değişimi',
    description:
      'Yapay zeka ile müşterilerinize farklı duvar renkleri ve duvar kağıtlarını anında gösterin. İç mimarlar ve boya satıcıları için ideal.',
    images: {
      before: '/media/wall1.webp',
      style: '/media/wall2.webp',
      result: '/media/wall3.webp',
    },
    hero: {
      title: 'Müşterileriniz Duvarları Yeni Renkle Görmek İstiyor mu?',
      description:
        'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize mekanlarının farklı duvar renkleri ve kağıtlarıyla görünümünü saniyeler içinde gösterin. Karar sürecini hızlandırın.',
      cta: 'Otomasyonu Başlat',
    },
    features: [
      {
        icon: '⚡',
        title: 'Anında Görselleştirme',
        description: 'Müşteri mekan fotoğrafını gönderir, 5 saniye içinde yeni duvar rengiyle görüntülenir.',
      },
      {
        icon: '🎨',
        title: 'Sınırsız Renk & Desen',
        description: 'Boya, duvar kağıdı, dokulu kaplama - tüm seçenekler için destek.',
      },
      {
        icon: '📱',
        title: 'Instagram Entegrasyonu',
        description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
      },
      {
        icon: '💼',
        title: 'Gerçekçi Işıklandırma',
        description: 'AI teknolojisi ile mekan aydınlatması ve gölgelendirme korumalı sonuçlar.',
      },
      {
        icon: '📊',
        title: 'Trend Analizi',
        description: 'Hangi renkler ve desenler daha çok tercih ediliyor? Verilerle karar verin.',
      },
      {
        icon: '🔄',
        title: '7/24 Aktif',
        description: 'Mesai saatleri dışında bile müşteriler renk seçeneklerini deneyimler.',
      },
    ],
    useCases: [
      {
        icon: '🏠',
        title: 'İç Mimarlar & Dekoratörler',
        description:
          'Müşterilere mekan tasarımlarını farklı renk paletleriyle sunun. Görsel sunum gücünü artırın.',
      },
      {
        icon: '🎨',
        title: 'Boya & Dekorasyon Mağazaları',
        description:
          'Müşterilere ürünlerinizi kendi mekanlarında görme fırsatı tanıyın. Satış konversiyon oranını yükseltin.',
      },
      {
        icon: '🏢',
        title: 'Boya Üreticileri',
        description: 'Yeni renk koleksiyonlarınızı pazara sunmadan önce müşteri tepkilerini ölçün.',
      },
      {
        icon: '🛋️',
        title: 'Mobilya & Dekorasyon Firmaları',
        description: 'Ürünlerinizi farklı duvar renkleriyle uyumlu olarak gösterin.',
      },
    ],
    faq: [
      {
        question: 'Nasıl çalışır?',
        answer:
          'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve mekan fotoğrafı ister. Müşteri mekanının fotoğrafını ve denemek istediği renk/desen örneğini gönderir. AI saniyeler içinde duvarları yeni renkte gösterir.',
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
          'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Mekan perspektifi, ışıklandırma ve gölgeler korunarak %95+ gerçekçilik oranı sağlıyoruz.',
      },
      {
        question: 'Müşteri verileri güvende mi?',
        answer:
          'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
      },
      {
        question: 'Hangi mekan tipleri destekleniyor?',
        answer:
          'Oturma odası, yatak odası, mutfak, ofis - tüm iç mekan tipleri. Farklı ışık koşulları ve perspektifler için optimize edilmiştir.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Merhaba, oturma odamın duvarlarını farklı renkte görmek istiyorum',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Harika! 🏠 Lütfen mekanınızın mevcut fotoğrafını gönderin.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/wall1.webp',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Süper! Şimdi denemek istediğiniz renk/desen örneğini gönderin 🎨',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/wall2.webp',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI duvarları boyuyor... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'İşte mekanınız yeni haliyle! 🌟',
        image: '/media/wall3.webp',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Beğendiniz mi? Ürün detayları ve fiyat için tıklayın 🛒',
        button: {
          text: 'Randevu Al',
        },
      },
    ],
    metadata: {
      keywords: [
        'duvar rengi değiştirme',
        'duvar kağıdı AI',
        'Instagram otomasyon',
        'iç mimar otomasyonu',
        'sanal boya deneme',
        'dekorasyon AI',
        'mekan görselleştirme',
      ],
      ogTitle: 'Duvar Rengi/Duvar Kağıdı AI - Instagram Otomasyonu | LookLab',
      ogDescription:
        'Müşterilerinize Instagram DM üzerinden AI ile mekanlarının farklı duvar renkleriyle görünümünü anında gösterin. İç mimarlar için profesyonel otomasyon çözümü.',
    },
    stats: [
      { value: '5 sn', label: 'Görselleştirme süresi' },
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
          title: 'Paletini Yükle',
          description: 'Renk kartelalarını, desenleri ve tetikleyici kelimeleri ayarlayın.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Yayına Al',
          description: 'Otomasyonu aktif edin. Artık müşterileriniz 7/24 duvar rengini deneyebilir.',
          icon: '🚀',
        },
      ],
    },
  },
};

export function getWallPaintContent(locale: Locale): AutomationContent {
  return wallPaintContentByLocale[locale] ?? wallPaintContentByLocale[defaultLocale];
}
