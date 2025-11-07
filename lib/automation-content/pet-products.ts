import { defaultLocale, type Locale } from '@/i18n/config';
import type { AutomationContent } from './types';

type PetProductsContentMap = Record<Locale, AutomationContent>;

const petProductsContentByLocale: PetProductsContentMap = {
  en: {
    slug: 'pet-products',
    templateId: 'pet-products',
    title: 'AI Pet Product Try-On',
    subtitle: 'Instant pet accessory previews in Instagram DMs',
    description:
      'Help pet parents visualise collars, apparel, and accessories on their companions within seconds. Built for pet shops, groomers, and online pet brands.',
    images: {
      before: '/media/pet1.webp',
      style: '/media/pet2.webp',
      result: '/media/pet3.webp',
    },
    hero: {
      title: 'Give every pet a virtual fitting room',
      description:
        'Our DM automation renders collars, harnesses, outfits, and accessories on customer pets instantly. Remove uncertainty, reduce returns, and create a delightful shopping moment.',
      cta: 'Launch automation',
    },
    features: [
      {
        icon: '⚡',
        title: 'Instant visualisation',
        description: 'Pet parents send a photo and see the product on their furry friend in seconds.',
      },
      {
        icon: '🐾',
        title: 'Multi-species support',
        description: 'Optimised AI for dogs, cats, rabbits, and other popular companions.',
      },
      {
        icon: '📱',
        title: 'Instagram-native flow',
        description: 'No extra apps or accounts required. Everything happens inside DMs.',
      },
      {
        icon: '💼',
        title: 'Realistic fit & fur handling',
        description: 'AI respects fur texture, lighting, and anatomy so products look natural.',
      },
      {
        icon: '📊',
        title: 'Sales analytics',
        description: 'Track best-performing products and inform merchandising or bundles.',
      },
      {
        icon: '🔄',
        title: 'Always open',
        description: 'Let customers experiment with looks even after store hours.',
      },
    ],
    useCases: [
      {
        icon: '🐕',
        title: 'Pet stores & groomers',
        description: 'Show harnesses, collars, and outfits on the exact pet before purchase.',
      },
      {
        icon: '🏪',
        title: 'Online pet retailers',
        description: 'Embed AI try-ons into checkout journeys to reduce hesitation and returns.',
      },
      {
        icon: '🎨',
        title: 'Custom pet product makers',
        description: 'Preview personalised designs for clients and capture feedback instantly.',
      },
      {
        icon: '💍',
        title: 'Pet accessory brands',
        description: 'Launch new collections with engaging, shareable renders of real pets.',
      },
    ],
    faq: [
      {
        question: 'How does the automation work?',
        answer:
          'Customers send a pet photo via Instagram DM, choose a product, and AI renders the item on their companion. The result is delivered instantly for sharing or purchasing.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'About five minutes. Connect Instagram, pick the AI preset, configure trigger keywords, and upload your catalog.',
      },
      {
        question: 'What pricing options exist?',
        answer:
          'Use the first 100 try-ons for free, then continue with pay-per-render or a flat monthly automation plan.',
      },
      {
        question: 'How realistic are the visuals?',
        answer:
          'We use cutting-edge diffusion and ControlNet models to maintain fur details, fit, and lighting with 90%+ realism.',
      },
      {
        question: 'Is customer data secure?',
        answer:
          'Pet photos are encrypted and automatically deleted after 30 days. Fully GDPR and KVKK compliant.',
      },
      {
        question: 'Which animals are supported?',
        answer:
          'Dogs, cats, rabbits, birds, and more. The AI adapts to different breeds, sizes, and poses.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Hi! I want to see a new collar on my dog',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Amazing! 🐾 Please send a photo of your pet.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/pet1.webp',
        imageAlt: 'Customer pet photo',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'So cute! Now share the product you’d like to try 🎀',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/pet2.webp',
        imageAlt: 'Pet product photo',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI magic coming right up... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Here’s your buddy wearing it! 🌟',
        image: '/media/pet3.webp',
        imageAlt: 'Rendered pet with accessory',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Love the look? Tap to order 🛒',
        button: {
          text: 'Add to cart',
        },
      },
    ],
    metadata: {
      keywords: [
        'pet product try on ai',
        'instagram pet store automation',
        'virtual pet collar',
        'pet apparel preview',
        'looklab automation',
        'pet retail chatbot',
        'pet accessory visualization',
      ],
      ogTitle: 'AI Pet Product Try-On Automation | LookLab',
      ogDescription:
        'Preview collars, outfits, and accessories on customer pets via Instagram DMs. Increase basket value with LookLab’s pet product automation.',
    },
    stats: [
      { value: '5s', label: 'Average render time' },
      { value: '90%', label: 'Realism rating' },
      { value: '24/7', label: 'Always available' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Deliver adorable previews in three simple steps.',
      steps: [
        {
          step: '1',
          title: 'Connect Instagram',
          description: 'Link your business account and enable DM permissions.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Upload your catalog',
          description: 'Add product shots, configure trigger keywords, and customise replies.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Go live',
          description: 'Activate the automation so pet parents can try items anytime.',
          icon: '🚀',
        },
      ],
    },
  },
  tr: {
    slug: 'pet-products',
    templateId: 'pet-products',
    title: 'Evcil Hayvan Ürünleri AI',
    subtitle: 'Instagram üzerinden anında evcil hayvan ürün denemesi',
    description:
      'Yapay zeka ile müşterilerinizin evcil hayvanlarına tasma, giysi ve aksesuarları anında gösterin. Pet shoplar için ideal.',
    images: {
      before: '/media/pet1.webp',
      style: '/media/pet2.webp',
      result: '/media/pet3.webp',
    },
    hero: {
      title: 'Evcil Hayvanlar İçin Sanal Giyim Deneme Deneyimi',
      description:
        'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize evcil hayvanları üzerinde tasma, giysi ve aksesuarları saniyeler içinde gösterin. Satın alma kararını kolaylaştırın.',
      cta: 'Otomasyonu Başlat',
    },
    features: [
      {
        icon: '⚡',
        title: 'Anında Görselleştirme',
        description: 'Müşteri evcil hayvan fotoğrafını gönderir, 5 saniye içinde ürün üzerinde görüntülenir.',
      },
      {
        icon: '🐾',
        title: 'Tüm Evcil Hayvanlar',
        description: 'Kedi, köpek, tavşan - tüm evcil hayvan türleri için optimize edilmiş AI modeli.',
      },
      {
        icon: '📱',
        title: 'Instagram Entegrasyonu',
        description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
      },
      {
        icon: '💼',
        title: 'Gerçekçi Sonuçlar',
        description: 'AI teknolojisi ile ürünlerin evcil hayvanlarda doğal görünümü.',
      },
      {
        icon: '📊',
        title: 'Satış Artışı Takibi',
        description: 'Hangi ürünler daha çok ilgi görüyor? Satış verilerinizi analiz edin.',
      },
      {
        icon: '🔄',
        title: '7/24 Aktif',
        description: 'Mesai saatleri dışında bile müşteriler ürünleri deneyimler.',
      },
    ],
    useCases: [
      {
        icon: '🐕',
        title: 'Pet Shoplar',
        description:
          'Tasma, giysi, aksesuarları müşterilerin evcil hayvanları üzerinde gösterin. İade oranlarını düşürün.',
      },
      {
        icon: '🏪',
        title: 'Online Pet Mağazaları',
        description:
          'E-ticaret sitenize AI entegrasyonu ile müşteri deneyimini geliştirin. Sepet terk oranını azaltın.',
      },
      {
        icon: '🎨',
        title: 'Özel Tasarım Pet Ürünleri',
        description: 'Kişiselleştirilmiş ürünleri müşterilere önizleme olarak sunun.',
      },
      {
        icon: '💍',
        title: 'Pet Aksesuarları Üreticileri',
        description: 'Yeni ürünlerinizi pazara sunmadan önce müşteri geri bildirimi alın.',
      },
    ],
    faq: [
      {
        question: 'Nasıl çalışır?',
        answer:
          'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve evcil hayvan fotoğrafı ister. Müşteri evcil hayvanının fotoğrafını ve denemek istediği ürün referansını gönderir. AI saniyeler içinde ürünü evcil hayvan üzerinde gösterir.',
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
          'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Evcil hayvan anatomisi, kürk dokusu ve ürün uyumu korunarak %90+ gerçekçilik oranı sağlıyoruz.',
      },
      {
        question: 'Müşteri verileri güvende mi?',
        answer:
          'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
      },
      {
        question: 'Hangi hayvan türleri destekleniyor?',
        answer:
          'Köpek, kedi, tavşan, kuş ve diğer popüler evcil hayvanlar. Farklı ırklar ve boyutlar için optimize edilmiştir.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Merhaba, köpeğim için tasma bakmak istiyorum',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Harika! 🐾 Lütfen evcil hayvanınızın fotoğrafını gönderin.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/pet1.webp',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Çok tatlı! Şimdi denemek istediğiniz ürünün fotoğrafını gönderin 🎀',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/pet2.webp',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI sihri başlıyor... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'İşte evcil hayvanınız ürün ile! 🌟',
        image: '/media/pet3.webp',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Beğendiniz mi? Satın almak için tıklayın 🛒',
        button: {
          text: 'Randevu Al',
        },
      },
    ],
    metadata: {
      keywords: [
        'evcil hayvan ürünleri',
        'pet shop AI',
        'Instagram otomasyon',
        'sanal ürün deneme',
        'köpek tasması AI',
        'kedi aksesuarı deneme',
        'pet otomasyon',
      ],
      ogTitle: 'Evcil Hayvan Ürünleri AI - Instagram Otomasyonu | LookLab',
      ogDescription:
        'Müşterilerinize Instagram DM üzerinden AI ile evcil hayvan ürünlerini anında gösterin. Pet shoplar için profesyonel otomasyon çözümü.',
    },
    stats: [
      { value: '5 sn', label: 'Görselleştirme süresi' },
      { value: '%90', label: 'Gerçekçilik oranı' },
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
          title: 'Kataloğunu Yükle',
          description: 'Ürün fotoğraflarını ekleyin, tetikleyici kelimeleri ve mesaj akışını ayarlayın.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Yayına Al',
          description: 'Otomasyonu aktif edin. Artık müşterileriniz 7/24 ürün deneyebilir.',
          icon: '🚀',
        },
      ],
    },
  },
};

export function getPetProductsContent(locale: Locale): AutomationContent {
  return petProductsContentByLocale[locale] ?? petProductsContentByLocale[defaultLocale];
}
