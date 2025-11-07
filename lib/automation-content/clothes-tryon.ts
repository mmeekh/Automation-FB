import { defaultLocale, type Locale } from '@/i18n/config';
import type { AutomationContent } from './types';

type ClothesTryOnContentMap = Record<Locale, AutomationContent>;

const clothesTryOnContentByLocale: ClothesTryOnContentMap = {
  en: {
    slug: 'clothes-tryon',
    templateId: 'clothes-tryon',
    title: 'AI Outfit Try-On',
    subtitle: 'Instant virtual fittings inside Instagram DMs',
    description:
      'Let AI show shoppers how your garments look on them in seconds. Ideal for fashion retailers, designers, and online boutiques.',
    images: {
      before: '/media/dress1.webp',
      style: '/media/dress2.webp',
      result: '/media/dress3.webp',
    },
    hero: {
      title: 'Do shoppers want to see outfits on themselves?',
      description:
        'Our Instagram DM automation renders garments on each customer within seconds. Turn curiosity into confident purchases and grow repeat revenue with a fully automated stylist.',
      cta: 'Launch automation',
    },
    features: [
      {
        icon: '⚡',
        title: 'Instant try-on',
        description: 'Shoppers send a photo and see the look with your outfit in under five seconds.',
      },
      {
        icon: '👗',
        title: 'Any garment category',
        description: 'Dresses, tops, pants, jackets — the AI adapts to every fabric and cut.',
      },
      {
        icon: '📱',
        title: 'Native Instagram flow',
        description: 'No extra apps required. Everything happens inside a familiar DM conversation.',
      },
      {
        icon: '💼',
        title: 'Photorealistic styling',
        description: 'Preserves body proportions and fabric texture so customers trust what they see.',
      },
      {
        icon: '📊',
        title: 'Fashion analytics',
        description: 'Track which looks are requested most and plan your merchandising accordingly.',
      },
      {
        icon: '🔄',
        title: 'Runs 24/7',
        description: 'Deliver virtual fittings around the clock without adding headcount.',
      },
    ],
    useCases: [
      {
        icon: '👗',
        title: 'Fashion retailers',
        description:
          'Help shoppers visualise outfits on their own body. Remove the “will it suit me?” objection.',
      },
      {
        icon: '🛍️',
        title: 'E-commerce apparel brands',
        description:
          'Embed virtual try-on into checkout flows and cut return rates by up to 40%.',
      },
      {
        icon: '✨',
        title: 'Fashion designers',
        description: 'Preview new collections with clients before production and gather instant feedback.',
      },
      {
        icon: '💍',
        title: 'Boutique stores',
        description: 'Showcase limited pieces to premium customers with personalised styling.',
      },
    ],
    faq: [
      {
        question: 'How does the automation work?',
        answer:
          'Customers message you on Instagram. The automation asks for a full-body photo and the garment they want to try. AI renders the outfit on their image and sends the result back in seconds.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'About five minutes. Connect your Instagram account, pick the AI model, set trigger keywords, and go live — no engineering required.',
      },
      {
        question: 'How is pricing structured?',
        answer:
          'Use it with your monthly automation plan. The first 100 renders are free, then choose pay-per-render or a flat monthly package.',
      },
      {
        question: 'How realistic are the results?',
        answer:
          'We use the latest Stable Diffusion and ControlNet models to keep body proportions, fabric drape, and lighting accurate with 91%+ realism.',
      },
      {
        question: 'Is customer data secure?',
        answer:
          'All photos are encrypted at rest and automatically deleted after 30 days. We comply with GDPR and KVKK requirements.',
      },
      {
        question: 'Can it recommend sizes?',
        answer:
          'Yes. The AI analyses body shape and suggests the closest fit so your customers know what to order.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Hi, I’d like to try on a dress',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Great! 👗 Please send a full-body photo.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/dress1.webp',
        imageAlt: 'Customer full-body reference photo',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Perfect — now send the outfit you want to try 👚',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/dress2.webp',
        imageAlt: 'Selected outfit photo',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI is styling the look... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Here is how it looks on you! 🌟',
        image: '/media/dress3.webp',
        imageAlt: 'Rendered try-on result',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Love it? Tap below to order 🛒',
        button: {
          text: 'Book a fitting',
        },
      },
    ],
    metadata: {
      keywords: [
        'virtual outfit try-on',
        'ai fashion assistant',
        'instagram automation',
        'online fitting room',
        'fashion tech',
        'apparel try-on ai',
        'looklab automation',
      ],
      ogTitle: 'AI Outfit Try-On Automation | LookLab',
      ogDescription:
        'Show customers how your apparel fits on them directly inside Instagram DMs. Increase conversions and reduce returns with LookLab’s virtual stylist.',
    },
    stats: [
      { value: '5s', label: 'Average render time' },
      { value: '91%', label: 'Customer satisfaction' },
      { value: '24/7', label: 'Always available' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Deliver an AI-powered styling experience in three simple steps.',
      steps: [
        {
          step: '1',
          title: 'Connect Instagram',
          description: 'Securely link your business account — setup takes just one click.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Customise the journey',
          description: 'Pick trigger keywords, adjust messaging, and select the AI try-on model.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Go live',
          description: 'Enable the automation and start delivering virtual fittings 24/7.',
          icon: '🚀',
        },
      ],
    },
  },
  tr: {
    slug: 'clothes-tryon',
    templateId: 'clothes-tryon',
    title: 'Elbise/Kıyafet Deneme AI',
    subtitle: 'Instagram üzerinden anında sanal kıyafet deneme',
    description:
      'Yapay zeka ile müşterilerinize kıyafetleri üzerlerinde anında gösterin. Moda mağazaları ve giyim markaları için ideal.',
    images: {
      before: '/media/dress1.webp',
      style: '/media/dress2.webp',
      result: '/media/dress3.webp',
    },
    hero: {
      title: 'Müşterileriniz Kıyafeti Üzerlerinde Görmek İstiyor mu?',
      description:
        'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize kıyafetlerinizin üzerlerinde nasıl duracağını saniyeler içinde gösterin. Online satışlarınızı artırın.',
      cta: 'Otomasyonu Başlat',
    },
    features: [
      {
        icon: '⚡',
        title: 'Anında Deneme',
        description: 'Müşteri fotoğrafını gönderir, 5 saniye içinde kıyafetle görüntülenir.',
      },
      {
        icon: '👗',
        title: 'Tüm Kıyafet Tipleri',
        description: 'Elbise, gömlek, pantolon, ceket - her türlü giyim için destek.',
      },
      {
        icon: '📱',
        title: 'Instagram Entegrasyonu',
        description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
      },
      {
        icon: '💼',
        title: 'Gerçekçi Giyim',
        description: 'AI teknolojisi ile vücut oranları ve kumaş dokusuna uyumlu sonuçlar.',
      },
      {
        icon: '📊',
        title: 'Moda Analitiği',
        description: 'Hangi modeller daha çok deneniyor? Koleksiyon planlamasını optimize edin.',
      },
      {
        icon: '🔄',
        title: '7/24 Aktif',
        description: 'Mesai saatleri dışında bile müşteriler kıyafet deneme deneyimi yaşar.',
      },
    ],
    useCases: [
      {
        icon: '👗',
        title: 'Moda Mağazaları',
        description:
          'Müşterilere kıyafetleri üzerlerinde gösterin. "Üzerime yakışır mı?" endişesini ortadan kaldırın.',
      },
      {
        icon: '🛍️',
        title: 'Online Giyim Satıcıları',
        description:
          'E-ticaret sitenize sanal deneme özelliği ekleyin. İade oranlarını %40 azaltın.',
      },
      {
        icon: '✨',
        title: 'Moda Tasarımcıları',
        description: 'Yeni koleksiyonlarınızı müşterilere tanıtmadan önce görsel olarak test edin.',
      },
      {
        icon: '💍',
        title: 'Butik Mağazalar',
        description: 'Özel tasarım ve sınırlı sayıda ürünlerinizi müşterilere sanal olarak sunun.',
      },
    ],
    faq: [
      {
        question: 'Nasıl çalışır?',
        answer:
          'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve vücut fotoğrafı ister. Müşteri fotoğrafını ve denemek istediği kıyafeti gönderir. AI saniyeler içinde kıyafeti müşteri üzerinde gösterir.',
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
          'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Vücut oranları, kumaş dokusu ve kıvrımlar korunarak %91+ gerçekçilik oranı sağlıyoruz.',
      },
      {
        question: 'Müşteri verileri güvende mi?',
        answer:
          'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
      },
      {
        question: 'Beden uyumu nasıl?',
        answer:
          'AI, vücut tipini analiz eder ve kıyafetin beden uyumunu otomatik hesaplar. Müşteriye en yakın görünümü sunar.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Merhaba, bir elbise denemek istiyorum',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Harika! 👗 Lütfen tam boy fotoğrafınızı gönderin.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/dress1.webp',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Süper! Şimdi denemek istediğiniz kıyafetin fotoğrafını gönderin 👚',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/dress2.webp',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI kıyafeti giyiyor... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'İşte üzerinizdeki hali! 🌟',
        image: '/media/dress3.webp',
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
        'sanal kıyafet deneme',
        'elbise AI',
        'Instagram otomasyon',
        'moda mağazası otomasyonu',
        'online giyim deneme',
        'fashion tech',
        'kıyafet simülasyonu',
      ],
      ogTitle: 'Elbise/Kıyafet Deneme AI - Instagram Otomasyonu | LookLab',
      ogDescription:
        'Müşterilerinize Instagram DM üzerinden AI ile kıyafetleri üzerlerinde anında gösterin. Moda mağazaları için profesyonel otomasyon çözümü.',
    },
    stats: [
      { value: '5 sn', label: 'Ortalama işlem' },
      { value: '%91', label: 'Müşteri memnuniyeti' },
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
          description: 'Tetikleyici kelimeleri, mesajları ve AI modelini ayarlayın.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Yayına Al',
          description: 'Otomasyonu aktif edin. Artık müşterileriniz 7/24 AI deneyimi yaşayabilir.',
          icon: '🚀',
        },
      ],
    },
  },
};

export function getClothesTryonContent(locale: Locale): AutomationContent {
  return clothesTryOnContentByLocale[locale] ?? clothesTryOnContentByLocale[defaultLocale];
}
