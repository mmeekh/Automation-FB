import { defaultLocale, type Locale } from '@/i18n/config';
import type { AutomationContent } from './types';

type FurnitureContentMap = Record<Locale, AutomationContent>;

const furnitureContentByLocale: FurnitureContentMap = {
  en: {
    slug: 'furniture-placement',
    templateId: 'furniture-placement',
    title: 'AI Furniture Placement',
    subtitle: 'Instant room visualisations inside Instagram DMs',
    description:
      'Help shoppers see your furniture inside their own space within seconds. Designed for furniture retailers, interior designers, and décor brands.',
    images: {
      before: '/media/furniture1.webp',
      style: '/media/furniture2.webp',
      result: '/media/furniture3.webp',
    },
    hero: {
      title: 'Do customers want to see your furniture in their room?',
      description:
        'Our Instagram DM automation places your catalog into client photos in seconds. Set expectations, cut return rates, and close more sales with a self-serve virtual staging assistant.',
      cta: 'Launch automation',
    },
    features: [
      {
        icon: '⚡',
        title: 'Instant placement',
        description: 'Customers send a room photo and receive a styled render in under five seconds.',
      },
      {
        icon: '🛋️',
        title: 'Any product category',
        description: 'Sofas, tables, wardrobes, beds, décor — upload your full catalog with ease.',
      },
      {
        icon: '📱',
        title: 'Native Instagram journey',
        description: 'No additional apps or logins. Everything happens inside the DM conversation.',
      },
      {
        icon: '💼',
        title: 'True-to-scale renders',
        description: 'AI respects room perspective, lighting, and proportions for believable previews.',
      },
      {
        icon: '📊',
        title: 'Merchandising insights',
        description: 'Identify high-intent products and optimise inventory or campaigns accordingly.',
      },
      {
        icon: '🔄',
        title: '24/7 showroom',
        description: 'Let shoppers try pieces day or night without waiting for a sales associate.',
      },
    ],
    useCases: [
      {
        icon: '🛋️',
        title: 'Furniture retailers',
        description: 'Answer “Will it fit?” instantly and give buyers confidence before they purchase.',
      },
      {
        icon: '🏪',
        title: 'Online furniture stores',
        description: 'Add AR-grade previews to checkout journeys and lower cart abandonment.',
      },
      {
        icon: '🏠',
        title: 'Interior designers',
        description: 'Present concept boards with photoreal staging tailored to each client space.',
      },
      {
        icon: '🏢',
        title: 'Office furniture suppliers',
        description: 'Show corporate buyers how layouts look before they approve large orders.',
      },
    ],
    faq: [
      {
        question: 'How does the automation work?',
        answer:
          'Customers message you on Instagram, upload a room photo, and pick a product. AI places the item inside the scene and sends a realistic render back instantly.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'Around five minutes. Connect Instagram, choose the AI model, configure trigger keywords, upload your catalog, and launch.',
      },
      {
        question: 'What is the pricing model?',
        answer:
          'Included in your automation plan. Enjoy the first 100 placements free, then choose pay-per-render or a flat monthly package.',
      },
      {
        question: 'How realistic are the renders?',
        answer:
          'We rely on advanced diffusion and ControlNet pipelines to match scale, perspective, and lighting with 92%+ realism scores.',
      },
      {
        question: 'Are customer photos secure?',
        answer:
          'Images are encrypted and automatically deleted after 30 days. GDPR and KVKK compliant by design.',
      },
      {
        question: 'Does it maintain measurements?',
        answer:
          'Yes. The AI infers room perspective to keep product dimensions accurate within the space.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Hi, I want to see a new sofa in my living room',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Great! 🏠 Please send a photo of your living room.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/furniture1.webp',
        imageAlt: 'Customer living room photo',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Awesome — now share the furniture piece you’d like to try 🛋️',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/furniture2.webp',
        imageAlt: 'Product reference photo',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI is placing the furniture... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Here’s your space styled with the sofa! 🌟',
        image: '/media/furniture3.webp',
        imageAlt: 'Rendered room with furniture',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Love it? Tap below to continue shopping 🛒',
        button: {
          text: 'Add to cart',
        },
      },
    ],
    metadata: {
      keywords: [
        'ai furniture placement',
        'virtual staging instagram',
        'furniture visualizer',
        'interior design chatbot',
        'ar furniture preview',
        'looklab automation',
        'retail showroom ai',
      ],
      ogTitle: 'AI Furniture Placement Automation | LookLab',
      ogDescription:
        'Showcase furniture inside customer spaces via Instagram DMs in seconds. Reduce returns and boost confidence with LookLab’s virtual staging automation.',
    },
    stats: [
      { value: '5s', label: 'Average placement time' },
      { value: '92%', label: 'Realism rating' },
      { value: '24/7', label: 'Always available' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Deliver virtual staging in three simple steps.',
      steps: [
        {
          step: '1',
          title: 'Connect Instagram',
          description: 'Securely link your account and authorise DM access.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Upload your catalog',
          description: 'Add product photos, set trigger keywords, and customise the script.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Go live',
          description: 'Activate the automation so shoppers can stage rooms any time.',
          icon: '🚀',
        },
      ],
    },
  },
  tr: {
    slug: 'furniture-placement',
    templateId: 'furniture-placement',
    title: 'Mobilya Yerleştirme AI',
    subtitle: 'Instagram üzerinden anında AR mobilya yerleştirme',
    description:
      'Yapay zeka ile müşterilerinize mobilyaları kendi mekanlarında anında gösterin. Mobilya mağazaları için ideal.',
    images: {
      before: '/media/furniture1.webp',
      style: '/media/furniture2.webp',
      result: '/media/furniture3.webp',
    },
    hero: {
      title: 'Müşterileriniz Mobilyayı Kendi Mekanında Görmek İstiyor mu?',
      description:
        'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize mobilyalarınızın kendi mekanlarında nasıl duracağını saniyeler içinde gösterin. İade oranlarını düşürün.',
      cta: 'Otomasyonu Başlat',
    },
    features: [
      {
        icon: '⚡',
        title: 'Anında Yerleştirme',
        description: 'Müşteri mekan fotoğrafını gönderir, 5 saniye içinde mobilya yerleştirilir.',
      },
      {
        icon: '🛋️',
        title: 'Tüm Mobilya Tipleri',
        description: 'Koltuk, masa, dolap, yatak - tüm mobilya kategorileri için destek.',
      },
      {
        icon: '📱',
        title: 'Instagram Entegrasyonu',
        description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
      },
      {
        icon: '💼',
        title: 'Gerçekçi Perspektif',
        description: 'AI teknolojisi ile mekan perspektifi, ölçü ve ışıklandırma uyumlu sonuçlar.',
      },
      {
        icon: '📊',
        title: 'Ürün Analitiği',
        description: 'Hangi mobilyalar daha çok deneniyor? Stok ve pazarlama kararlarını optimize edin.',
      },
      {
        icon: '🔄',
        title: '7/24 Aktif',
        description: 'Mesai saatleri dışında bile müşteriler mobilya yerleştirme deneyimi yaşar.',
      },
    ],
    useCases: [
      {
        icon: '🛋️',
        title: 'Mobilya Mağazaları',
        description:
          'Müşterilere ürünlerinizi kendi mekanlarında gösterin. "Odama sığar mı?" endişesini ortadan kaldırın.',
      },
      {
        icon: '🏪',
        title: 'Online Mobilya Satıcıları',
        description:
          'E-ticaret sitenize AR entegrasyonu ile müşteri deneyimini geliştirin. Sepet terk oranını azaltın.',
      },
      {
        icon: '🏠',
        title: 'İç Mimarlar',
        description: 'Müşterilerinize mekan tasarımlarını mobilyalarla beraber sunun. Sunum gücünüzü artırın.',
      },
      {
        icon: '🏢',
        title: 'Ofis Mobilyası Tedarikçileri',
        description: 'Kurumsal müşterilere ofis düzenlemelerini görselleştirin. B2B satışlarınızı hızlandırın.',
      },
    ],
    faq: [
      {
        question: 'Nasıl çalışır?',
        answer:
          'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve mekan fotoğrafı ister. Müşteri mekanının fotoğrafını ve denemek istediği mobilya ürününü gönderir. AI saniyeler içinde mobilyayı mekana yerleştirir.',
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
          'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Mekan perspektifi, mobilya ölçüleri ve ışıklandırma korunarak %92+ gerçekçilik oranı sağlıyoruz.',
      },
      {
        question: 'Müşteri verileri güvende mi?',
        answer:
          'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
      },
      {
        question: 'Ölçüler doğru mu?',
        answer:
          'AI, mekan perspektifinden ölçü oranlarını hesaplar. %90+ doğrulukla mobilya boyutları mekana uygun şekilde yerleştirilir.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Merhaba, oturma odama yeni koltuk bakmak istiyorum',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Harika! 🏠 Lütfen oturma odanızın fotoğrafını gönderin.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/furniture1.webp',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Süper! Şimdi denemek istediğiniz mobilya ürününün fotoğrafını gönderin 🛋️',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/furniture2.webp',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI mobilyayı yerleştiriyor... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'İşte mekanınız mobilya ile! 🌟',
        image: '/media/furniture3.webp',
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
        'mobilya yerleştirme',
        'AR mobilya',
        'Instagram otomasyon',
        'mobilya mağazası otomasyonu',
        'sanal mobilya deneme',
        'dekorasyon AI',
        'mobilya görselleştirme',
      ],
      ogTitle: 'Mobilya Yerleştirme AI - Instagram Otomasyonu | LookLab',
      ogDescription:
        'Müşterilerinize Instagram DM üzerinden AI ile mobilyaları kendi mekanlarında anında gösterin. Mobilya mağazaları için profesyonel otomasyon çözümü.',
    },
    stats: [
      { value: '5 sn', label: 'Yerleştirme süresi' },
      { value: '%92', label: 'Gerçekçilik oranı' },
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
          description: 'Otomasyonu aktif edin. Artık müşterileriniz 7/24 mobilya yerleştirebilir.',
          icon: '🚀',
        },
      ],
    },
  },
};

export function getFurniturePlacementContent(locale: Locale): AutomationContent {
  return furnitureContentByLocale[locale] ?? furnitureContentByLocale[defaultLocale];
}
