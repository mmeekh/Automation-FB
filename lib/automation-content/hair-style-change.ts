import { defaultLocale, type Locale } from '@/i18n/config';
import type { AutomationContent } from './types';

type HairStyleContentMap = Record<Locale, AutomationContent>;

const hairStyleContentByLocale: HairStyleContentMap = {
  en: {
    slug: 'hair-style-change',
    templateId: 'instagram-bald-to-haired',
    title: 'AI Hair Style Transformation',
    subtitle: 'Instant hair simulations inside Instagram DMs',
    description:
      'Show clients how new cuts, colours, or regrowth results look on them within seconds. Perfect for salons, barbers, and hair restoration clinics.',
    images: {
      before: '/media/hairchange1.webp',
      style: '/media/hairchange2.webp',
      result: '/media/hairchange3.webp',
    },
    hero: {
      title: 'Ready for clients to see their next hair style?',
      description:
        'Our Instagram DM automation renders new styles in seconds. Build trust before appointments, close more consultations, and increase upsells with an always-on virtual stylist.',
      cta: 'Launch automation',
    },
    features: [
      {
        icon: '⚡',
        title: 'Instant transformation',
        description: 'Clients send a selfie and see the new look in five seconds or less.',
      },
      {
        icon: '🎨',
        title: 'Unlimited style library',
        description: 'Upload references for short, long, curly, straight, vivid colours, or balayage.',
      },
      {
        icon: '📱',
        title: 'Native Instagram journey',
        description: 'No app downloads. Everything happens inside a familiar DM chat.',
      },
      {
        icon: '💼',
        title: 'Salon-grade realism',
        description: 'AI preserves face shape, skin tone, and lighting for believable results.',
      },
      {
        icon: '📊',
        title: 'Conversion analytics',
        description: 'Track which styles convert to bookings and tailor your promotions.',
      },
      {
        icon: '🔄',
        title: 'Always available',
        description: 'Clients can experiment with styles even when your team is offline.',
      },
    ],
    useCases: [
      {
        icon: '💇‍♀️',
        title: 'Hair salons & barbers',
        description:
          'Preview cuts, colours, and treatments before appointments to set expectations and reduce no-shows.',
      },
      {
        icon: '✨',
        title: 'Beauty studios',
        description:
          'Show post-treatment results for keratin, gloss, or smoothing services to drive upgrades.',
      },
      {
        icon: '🎓',
        title: 'Hair restoration clinics',
        description:
          'Simulate regrowth outcomes for prospects and accelerate decision making with realistic visuals.',
      },
      {
        icon: '🛍️',
        title: 'Wig & extension retailers',
        description: 'Display how wigs, toppers, or clip-ins will look on each customer instantly.',
      },
    ],
    faq: [
      {
        question: 'How does the automation work?',
        answer:
          'Clients message you on Instagram. The automation asks for their current photo and a reference style. AI blends the new look on their image and sends the result back immediately.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'Around five minutes. Connect your Instagram account, choose the AI model, set trigger keywords, and launch — no technical skills required.',
      },
      {
        question: 'How is pricing structured?',
        answer:
          'Use it with your monthly automation plan. The first 100 transformations are free, then pay per render or choose a flat monthly bundle.',
      },
      {
        question: 'How realistic are the results?',
        answer:
          'We use the latest Stable Diffusion and ControlNet pipelines to maintain facial features, lighting, and texture with 90%+ realism.',
      },
      {
        question: 'Is client data secure?',
        answer:
          'All photos are encrypted and automatically deleted after 30 days. We operate in line with GDPR and KVKK requirements.',
      },
      {
        question: 'Which hair types are supported?',
        answer:
          'Straight, wavy, curly, afro, short or long — the AI is optimised for all textures across female and male clients.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Hi! I want to try a new hairstyle',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Amazing! 🎉 Please send a recent photo of your current hair.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/hairchange1.webp',
        imageAlt: 'Client current hairstyle photo',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Great! Now send a reference image of the style you’d like to try 💇‍♀️',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/hairchange2.webp',
        imageAlt: 'Desired hairstyle reference',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI magic in progress... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Here’s your new look! 🌟',
        image: '/media/hairchange3.webp',
        imageAlt: 'Rendered hairstyle result',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Want to book this style? Tap below to schedule 📅',
        button: {
          text: 'Book appointment',
        },
      },
    ],
    metadata: {
      keywords: [
        'ai hair try on',
        'virtual hairstyle preview',
        'instagram salon automation',
        'haircut simulation ai',
        'beauty salon chatbot',
        'hair restoration preview',
        'looklab automation',
      ],
      ogTitle: 'AI Hair Style Transformation Automation | LookLab',
      ogDescription:
        'Preview new cuts and colours for every client directly in Instagram DMs. Increase bookings and confidence with LookLab’s hair styling automation.',
    },
    stats: [
      { value: '5s', label: 'Average processing time' },
      { value: '94%', label: 'Client satisfaction' },
      { value: '24/7', label: 'Always available' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Deliver an AI-powered styling experience in three simple steps.',
      steps: [
        {
          step: '1',
          title: 'Connect Instagram',
          description: 'Securely link your business profile. Setup completes in one click.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Customise the flow',
          description: 'Select trigger keywords, adjust scripts, and choose the hair AI model.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Go live',
          description: 'Activate the automation and let clients explore styles 24/7.',
          icon: '🚀',
        },
      ],
    },
  },
  tr: {
    slug: 'hair-style-change',
    templateId: 'instagram-bald-to-haired',
    title: 'Saç Stili Değiştirme AI',
    subtitle: 'Instagram üzerinden anında saç stili değişimi',
    description:
      'Yapay zeka ile müşterilerinize farklı saç stillerini anında gösterin. Kuaförler ve güzellik salonları için ideal.',
    images: {
      before: '/media/hairchange1.webp',
      style: '/media/hairchange2.webp',
      result: '/media/hairchange3.webp',
    },
    hero: {
      title: 'Müşterileriniz Yeni Saç Stilini Görmeye Hazır mı?',
      description:
        'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize farklı saç modellerini saniyeler içinde gösterin. Randevu öncesi güven oluşturun, satışlarınızı artırın.',
      cta: 'Otomasyonu Başlat',
    },
    features: [
      {
        icon: '⚡',
        title: 'Anında Dönüşüm',
        description: 'Müşteri fotoğrafını gönderir, 5 saniye içinde yeni saç stili ile görselleştirilir.',
      },
      {
        icon: '🎨',
        title: 'Sınırsız Stil Seçeneği',
        description: 'Kısa, uzun, bukle, düz - her türlü saç modeli için referans görseli yükleyin.',
      },
      {
        icon: '📱',
        title: 'Instagram Entegrasyonu',
        description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
      },
      {
        icon: '💼',
        title: 'Profesyonel Sonuçlar',
        description: 'AI teknolojisi ile gerçekçi, yüksek kaliteli görsel çıktılar.',
      },
      {
        icon: '📊',
        title: 'Otomasyon Raporları',
        description: 'Kaç kişiye ulaştınız, kaç randevu aldınız - tüm metrikleri takip edin.',
      },
      {
        icon: '🔄',
        title: '7/24 Aktif',
        description: 'Siz uyurken bile müşteri adaylarınız saç stillerini deneyimler.',
      },
    ],
    useCases: [
      {
        icon: '💇‍♀️',
        title: 'Kuaför Salonları',
        description:
          'Müşterilere randevu öncesi farklı kesim ve renk seçeneklerini gösterin. Güven oluşturun ve iptal oranlarını düşürün.',
      },
      {
        icon: '✨',
        title: 'Güzellik Merkezleri',
        description:
          'Saç bakımı, keratin, röfle gibi işlemler sonrası beklenen sonucu önceden gösterin.',
      },
      {
        icon: '🎓',
        title: 'Saç Ekimi Klinikleri',
        description:
          'Potansiyel hastalara saç ekimi sonrası görünümlerini AI ile simüle edin. Karar verme sürecini hızlandırın.',
      },
      {
        icon: '🛍️',
        title: 'Peruk & Takma Saç Satıcıları',
        description: 'Müşterilerinize perukun üzerlerinde nasıl duracağını anlık olarak gösterin.',
      },
    ],
    faq: [
      {
        question: 'Nasıl çalışır?',
        answer:
          'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve fotoğraf ister. Müşteri fotoğrafını ve istediği saç stili referansını gönderir. AI saniyeler içinde dönüşümü gerçekleştirir ve sonucu gönderir.',
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
          'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Yüz yapısı, ten rengi ve ışık koruması ile %90+ gerçekçilik oranı sağlıyoruz.',
      },
      {
        question: 'Müşteri verileri güvende mi?',
        answer:
          'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
      },
      {
        question: 'Hangi saç tipleri destekleniyor?',
        answer:
          'Tüm saç tipleri: düz, dalgalı, kıvırcık, afro. Hem kadın hem erkek saç modelleri için optimize edilmiştir.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Merhaba, saç stilimi değiştirmek istiyorum',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Harika! 🎉 Lütfen mevcut saç stilinizin bir fotoğrafını gönderin.',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/hairchange1.webp',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Süper! Şimdi denemek istediğiniz saç modelinin referans fotoğrafını gönderin 💇‍♀️',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/hairchange2.webp',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI sihri devrede... ✨',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'İşte yeni saç stiliniz! 🌟',
        image: '/media/hairchange3.webp',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Bu stili denemek için randevu almak ister misiniz? 📅',
        button: {
          text: 'Randevu Al',
        },
      },
    ],
    metadata: {
      keywords: [
        'saç stili deneme',
        'kuaför AI',
        'Instagram otomasyon',
        'güzellik salonu otomasyonu',
        'saç simülasyonu',
        'saç ekimi önizleme',
        'LookLab otomasyon',
      ],
      ogTitle: 'Saç Stili Değiştirme AI - Instagram Otomasyonu | LookLab',
      ogDescription:
        'Müşterilerinize Instagram DM üzerinden AI ile yeni saç stillerini saniyeler içinde gösterin. Kuaförler için profesyonel otomasyon çözümü.',
    },
    stats: [
      { value: '5 sn', label: 'Ortalama işlem' },
      { value: '%94', label: 'Müşteri memnuniyeti' },
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

export function getHairStyleChangeContent(locale: Locale): AutomationContent {
  return hairStyleContentByLocale[locale] ?? hairStyleContentByLocale[defaultLocale];
}
