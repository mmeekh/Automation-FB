import { defaultLocale, type Locale } from '@/i18n/config';
import type { AutomationContent } from './types';

type JewelryContentMap = Record<Locale, AutomationContent>;

const jewelryContentByLocale: JewelryContentMap = {
  en: {
    slug: 'jewelry',
    templateId: 'jewelry',
    title: 'AI Jewelry Try-On',
    subtitle: 'Instant virtual try-ons through Instagram DMs',
    description:
      'Showcase necklaces, earrings, rings, and bracelets on each customer within seconds. Ideal for jewelers, bridal boutiques, and online jewelry stores.',
    images: {
      before: '/media/jewel1.webp',
      style: '/media/jewel2.webp',
      result: '/media/jewel3.webp',
    },
    hero: {
      title: 'Do customers want to see the jewelry on themselves?',
      description:
        'Our DM automation renders fine jewelry on client photos instantly. Remove hesitation, increase conversion rates, and elevate the buying experience with a virtual stylist available 24/7.',
      cta: 'Launch automation',
    },
    features: [
      {
        icon: '⚡',
        title: 'Instant try-on',
        description: 'Clients send a selfie and see the selected piece on their photo in under five seconds.',
      },
      {
        icon: '💍',
        title: 'Supports every jewelry type',
        description: 'Necklaces, earrings, rings, bracelets, brooches, and more across every metal or gemstone.',
      },
      {
        icon: '📱',
        title: 'Instagram native journey',
        description: 'No app downloads or logins — the entire fitting happens in a DM conversation.',
      },
      {
        icon: '💼',
        title: 'Photoreal sparkle',
        description: 'AI keeps gemstone brilliance, metal reflections, and anatomy aligned for authentic results.',
      },
      {
        icon: '📊',
        title: 'Collection insights',
        description: 'Discover your most tried pieces and plan inventory, bundles, or campaigns with data.',
      },
      {
        icon: '🔄',
        title: 'Always on',
        description: 'Serve customers globally with 24/7 virtual fittings and concierge follow-ups.',
      },
    ],
    useCases: [
      {
        icon: '💎',
        title: 'Jewelry boutiques & jewellers',
        description:
          'Let shoppers see high-value pieces on themselves remotely to build trust before they visit.',
      },
      {
        icon: '🛍️',
        title: 'Online jewelry stores',
        description: 'Add virtual fittings to your purchase flow and reduce returns or indecision.',
      },
      {
        icon: '✨',
        title: 'Jewelry designers',
        description: 'Preview new collections with clients and gather feedback before launch.',
      },
      {
        icon: '💍',
        title: 'Bridal & occasion retailers',
        description: 'Offer instant styling for engagement, wedding, or evening jewellery sets.',
      },
    ],
    faq: [
      {
        question: 'How does the automation work?',
        answer:
          'Customers message you on Instagram, send a portrait, and choose a piece. AI places the jewelry on their photo and returns a polished render right away.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'Roughly five minutes. Connect your Instagram account, pick the AI model, set trigger keywords, upload your catalog, and go live.',
      },
      {
        question: 'What pricing tiers are available?',
        answer:
          'Start with 100 free try-ons. Afterwards use pay-per-render or unlimited usage via your automation plan.',
      },
      {
        question: 'How realistic are the renders?',
        answer:
          'We employ the latest Stable Diffusion and ControlNet models to maintain gemstone brilliance, metal shine, and fit with 93%+ realism.',
      },
      {
        question: 'Is client data protected?',
        answer:
          'Photos are encrypted and automatically removed after 30 days. GDPR and KVKK compliant.',
      },
      {
        question: 'Which jewelry categories are supported?',
        answer:
          'Necklaces, earrings, rings, bracelets, brooches, and piercings across gold, silver, diamonds, and coloured stones.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Hi, I’d love to try your necklace on me',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Wonderful! 💎 Please send a clear photo of yourself.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/jewel1.webp',
        imageAlt: 'Customer portrait',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Great! Now share the piece you want to try 💍',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/jewel2.webp',
        imageAlt: 'Jewelry reference photo',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI is placing the jewelry... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Here’s how it looks on you! 🌟',
        image: '/media/jewel3.webp',
        imageAlt: 'Rendered jewelry try-on',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Ready to make it yours? Tap below to continue 🛒',
        button: {
          text: 'Book an appointment',
        },
      },
    ],
    metadata: {
      keywords: [
        'virtual jewelry try on',
        'instagram jeweler automation',
        'ai necklace preview',
        'bridal jewelry chatbot',
        'online jewelry AR',
        'looklab automation',
        'jewelry visualization',
      ],
      ogTitle: 'AI Jewelry Try-On Automation | LookLab',
      ogDescription:
        'Preview fine jewelry on every customer inside Instagram DMs in seconds. Increase conversions with LookLab’s virtual try-on automation.',
    },
    stats: [
      { value: '5s', label: 'Average try-on time' },
      { value: '93%', label: 'Realism rating' },
      { value: '24/7', label: 'Always available' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Deliver premium virtual fittings in three steps.',
      steps: [
        {
          step: '1',
          title: 'Connect Instagram',
          description: 'Link your business profile and enable DM access securely.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Upload your collection',
          description: 'Add product images, set trigger keywords, and craft the concierge script.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Go live',
          description: 'Activate the automation and let clients try pieces anytime.',
          icon: '🚀',
        },
      ],
    },
  },
  tr: {
    slug: 'jewelry',
    templateId: 'jewelry',
    title: 'Takı Deneme AI',
    subtitle: 'Instagram üzerinden anında sanal takı deneme',
    description:
      'Yapay zeka ile müşterilerinize kolye, küpe, yüzük ve bilezikleri anında gösterin. Kuyumcular ve takı mağazaları için ideal.',
    images: {
      before: '/media/jewel1.webp',
      style: '/media/jewel2.webp',
      result: '/media/jewel3.webp',
    },
    hero: {
      title: 'Müşterileriniz Takıyı Üzerlerinde Görmek İstiyor mu?',
      description:
        'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize kolye, küpe, yüzük ve bileziklerin üzerlerinde nasıl duracağını saniyeler içinde gösterin. Satışlarınızı artırın.',
      cta: 'Otomasyonu Başlat',
    },
    features: [
      {
        icon: '⚡',
        title: 'Anında Deneme',
        description: 'Müşteri fotoğrafını gönderir, 5 saniye içinde takı ile görüntülenir.',
      },
      {
        icon: '💍',
        title: 'Tüm Takı Tipleri',
        description: 'Kolye, küpe, yüzük, bilezik, broş - her türlü takı için destek.',
      },
      {
        icon: '📱',
        title: 'Instagram Entegrasyonu',
        description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
      },
      {
        icon: '💼',
        title: 'Gerçekçi Parlaklık',
        description: 'AI teknolojisi ile taş parlaklığı, metal yansıması ve vücut uyumlu sonuçlar.',
      },
      {
        icon: '📊',
        title: 'Takı Analitiği',
        description: 'Hangi modeller daha çok deneniyor? Stok ve koleksiyon kararlarını optimize edin.',
      },
      {
        icon: '🔄',
        title: '7/24 Aktif',
        description: 'Mesai saatleri dışında bile müşteriler takı deneme deneyimi yaşar.',
      },
    ],
    useCases: [
      {
        icon: '💎',
        title: 'Kuyumcular',
        description:
          'Müşterilere değerli takıları üzerlerinde gösterin. Güven oluşturun ve satış sürecini hızlandırın.',
      },
      {
        icon: '🛍️',
        title: 'Online Takı Mağazaları',
        description:
          'E-ticaret sitenize sanal deneme özelliği ekleyin. Müşteri deneyimini geliştirin.',
      },
      {
        icon: '✨',
        title: 'Takı Tasarımcıları',
        description: 'Yeni koleksiyonlarınızı müşterilere tanıtmadan önce görsel olarak sunun.',
      },
      {
        icon: '💍',
        title: 'Nişan & Düğün Mağazaları',
        description: 'Özel gün takılarını müşterilere sanal olarak deneme fırsatı tanıyın.',
      },
    ],
    faq: [
      {
        question: 'Nasıl çalışır?',
        answer:
          'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve fotoğraf ister. Müşteri fotoğrafını ve denemek istediği takıyı gönderir. AI saniyeler içinde takıyı müşteri üzerinde gösterir.',
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
          'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Taş parlaklığı, metal yansıması ve vücut anatomisi korunarak %93+ gerçekçilik oranı sağlıyoruz.',
      },
      {
        question: 'Müşteri verileri güvende mi?',
        answer:
          'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
      },
      {
        question: 'Hangi takı tipleri destekleniyor?',
        answer:
          'Kolye, küpe, yüzük, bilezik, broş, piercing - tüm takı kategorileri. Altın, gümüş, pırlanta, renkli taşlar için optimize edilmiştir.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Merhaba, bir kolye denemek istiyorum',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Harika! 💎 Lütfen fotoğrafınızı gönderin.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/jewel1.webp',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Süper! Şimdi denemek istediğiniz takının fotoğrafını gönderin 💍',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/jewel2.webp',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI takıyı takıyor... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'İşte üzerinizdeki hali! 🌟',
        image: '/media/jewel3.webp',
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
        'sanal takı deneme',
        'kolye AI',
        'Instagram otomasyon',
        'kuyumcu otomasyonu',
        'online takı deneme',
        'jewelry tech',
        'takı görselleştirme',
      ],
      ogTitle: 'Takı Deneme AI - Instagram Otomasyonu | LookLab',
      ogDescription:
        'Müşterilerinize Instagram DM üzerinden AI ile takıları üzerlerinde anında gösterin. Kuyumcular için profesyonel otomasyon çözümü.',
    },
    stats: [
      { value: '5 sn', label: 'Deneme süresi' },
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
          title: 'Koleksiyonunu Yükle',
          description: 'Ürün fotoğraflarını ekleyin, tetikleyici kelimeleri ve mesaj akışını ayarlayın.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Yayına Al',
          description: 'Otomasyonu aktif edin. Artık müşterileriniz 7/24 takı deneyebilir.',
          icon: '🚀',
        },
      ],
    },
  },
};

export function getJewelryContent(locale: Locale): AutomationContent {
  return jewelryContentByLocale[locale] ?? jewelryContentByLocale[defaultLocale];
}
