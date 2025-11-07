import { defaultLocale, type Locale } from '@/i18n/config';
import type { AutomationContent } from './types';

type AestheticContentMap = Record<Locale, AutomationContent>;

const aestheticContentByLocale: AestheticContentMap = {
  en: {
    slug: 'aesthetic-ai',
    templateId: 'instagram-aesthetic-bald',
    title: 'Aesthetic AI Rhinoplasty Preview',
    subtitle: 'Realistic nose reshaping simulations inside Instagram DMs',
    description:
      'Designed for aesthetic clinics, this automation generates natural, clinic-approved nose previews in seconds. Build trust, qualify leads, and increase consultation bookings effortlessly.',
    images: {
      before: '/media/kel1.webp',
      style: '/media/kel2.webp',
      result: '/media/kel3.webp',
    },
    hero: {
      title: 'Let patients see their new profile instantly',
      description:
        'Patients send a selfie, you respond with balanced, natural rhinoplasty simulations crafted by AI. Share thoughtful guidance in DM before the consultation and arrive prepared for the in-clinic conversation.',
      cta: 'Launch automation',
    },
    features: [
      {
        icon: '✨',
        title: 'Ultra-realistic previews',
        description: 'AI generates three variations while preserving skin tone, lighting, and facial harmony.',
      },
      {
        icon: '🩺',
        title: 'Surgeon annotations',
        description: 'Clinic-authored notes are appended automatically so prospects understand the reasoning behind each option.',
      },
      {
        icon: '⚡',
        title: 'Results in 5 seconds',
        description: 'Once the selfie and reference are submitted, high-resolution renders arrive in seconds.',
      },
      {
        icon: '📊',
        title: 'Conversion analytics',
        description: 'Track preview requests, consultation bookings, and campaign performance in one dashboard.',
      },
      {
        icon: '🔒',
        title: 'Privacy-first storage',
        description: 'Images are encrypted, staff-only, and auto-delete after 30 days. GDPR and KVKK compliant.',
      },
      {
        icon: '🤖',
        title: 'Smart follow-ups',
        description: 'Positive reactions instantly trigger tailored CTAs to schedule a consultation.',
      },
    ],
    useCases: [
      {
        icon: '🏥',
        title: 'Aesthetic surgery clinics',
        description: 'Align expectations before in-person consults and equip surgeons with context-rich talking points.',
      },
      {
        icon: '💬',
        title: 'Social media consultants',
        description: 'Convert DM inquiries into warm leads with interactive demos, then push them into your CRM.',
      },
      {
        icon: '📈',
        title: 'Influencer partnerships',
        description: 'Run co-branded campaigns where followers receive personalised previews during the promotion.',
      },
      {
        icon: '🌍',
        title: 'International patient coordinators',
        description: 'Offer remote candidates realistic previews to build trust before travel planning.',
      },
    ],
    faq: [
      {
        question: 'How does it work?',
        answer:
          'A trigger word in Instagram DM collects a selfie and desired reference. The AI delivers three balanced rhinoplasty simulations plus your clinic’s notes within seconds.',
      },
      {
        question: 'What is the setup time?',
        answer:
          'Roughly seven minutes. Connect your Instagram Business account, add the AI API key, customise your CTA copy, and go live.',
      },
      {
        question: 'How are images stored?',
        answer:
          'All media is encrypted, accessible only to authorised staff, and automatically removed after 30 days to remain GDPR and KVKK compliant.',
      },
      {
        question: 'Which devices are supported?',
        answer:
          'Any device with Instagram — patients do not need to install extra apps.',
      },
      {
        question: 'How realistic are the results?',
        answer:
          'The AI preserves nose anatomy, skin texture, and symmetry. Clinics report 92% satisfaction with preview accuracy.',
      },
      {
        question: 'How is pricing structured?',
        answer:
          'Preview usage is part of your automation plan. The first 50 renders are free, then choose pay-per-render or an unlimited tier.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Hi, could I see a rhinoplasty preview?',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Absolutely! Please send a recent selfie so we can analyse your profile 🤳',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/kel1.webp',
        imageAlt: 'Patient selfie',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Thank you! Could you share a reference or describe your desired outcome? ✨',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/kel2.webp',
        imageAlt: 'Desired nose reference',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'Creating your tailored preview now… ⏱️',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Ready! Here is a natural, balanced option aligned with your features 🪄',
        image: '/media/kel3.webp',
        imageAlt: 'Generated rhinoplasty preview',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Would you like to schedule a complimentary consultation? 📆',
        button: {
          text: 'Book consultation',
        },
      },
    ],
    metadata: {
      keywords: [
        'rhinoplasty preview',
        'aesthetic ai',
        'instagram clinic automation',
        'cosmetic surgery marketing',
        'nose job simulation',
        'virtual consultation ai',
        'looklab automation',
      ],
      ogTitle: 'Aesthetic AI Rhinoplasty Preview | LookLab',
      ogDescription:
        'Deliver natural rhinoplasty simulations directly inside Instagram DMs. Build trust and grow consultations with LookLab’s aesthetic automation.',
    },
    stats: [
      { value: '5s', label: 'Preview generation' },
      { value: '92%', label: 'Patient satisfaction' },
      { value: '3', label: 'Simulations per request' },
    ],
    howItWorks: {
      title: 'How it works',
      subtitle: 'Guide patients from curiosity to consultation in three steps.',
      steps: [
        {
          step: '1',
          title: 'Connect Instagram & AI API',
          description: 'Authorize your Business account and add your AI credentials securely.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Customise messaging',
          description: 'Add surgeon notes, disclaimers, and CTAs tailored to your clinic’s tone.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Activate automations',
          description: 'Launch the flow and start delivering previews to every qualified DM lead.',
          icon: '🚀',
        },
      ],
    },
  },
  tr: {
    slug: 'aesthetic-ai',
    templateId: 'instagram-aesthetic-bald',
    title: 'Aesthetic AI Burun Önizleme',
    subtitle: 'Instagram DM üzerinden saniyeler içinde burun estetiği simülasyonu',
    description:
      'Estetik klinikleri için tasarlanan bu otomasyon, danışanların burunlarını gerçekçi AI önizlemeleriyle saniyeler içinde görmesini sağlar. Güven oluşturur, danışma randevularını artırır.',
    images: {
      before: '/media/kel1.webp',
      style: '/media/kel2.webp',
      result: '/media/kel3.webp',
    },
    hero: {
      title: 'Hastalarınız yeni görünümlerini anında görsün',
      description:
        'Danışan selfie’sini gönderiyor, siz de doğal, dengeli ve klinik onaylı burun estetiği simülasyonunu saniyeler içinde sunuyorsunuz. DM’den ölçülü bir şekilde ön bilgi paylaşarak klinikteki görüşmeye hazırlık yapın.',
      cta: 'Otomasyonu Başlat',
    },
    features: [
      {
        icon: '✨',
        title: 'Ultra gerçekçi önizleme',
        description: 'AI, gönderilen selfieden doğal ışık, cilt tonu ve burun yapısını koruyarak üç farklı önizleme üretir.',
      },
      {
        icon: '🩺',
        title: 'Cerrah notları',
        description: 'Klinik tarafından hazırlanan açıklamalar otomatik olarak eklenir; aday hasta değişikliği daha iyi anlar.',
      },
      {
        icon: '⚡',
        title: '5 sn’de sonuç',
        description: 'Selfie ve hedef görsel geldikten sonra 5 saniye içinde yüksek çözünürlüklü önizleme paylaşılır.',
      },
      {
        icon: '📊',
        title: 'Veri odaklı raporlama',
        description: 'Kaç kişi önizleme aldı, kaç kişi kliniğe randevu talep etti; bütün istatistikler panelde.',
      },
      {
        icon: '🔒',
        title: 'KVKK uyumlu saklama',
        description: 'Fotoğraflar şifreli saklanır, 30 gün sonra otomatik silinir. İzin yönetimi otomasyona dahildir.',
      },
      {
        icon: '🤖',
        title: 'Akıllı takip mesajları',
        description: 'Emoji veya “harika” gibi olumlu geri bildirimler geldiğinde otomatik randevu CTA’sı gönderir.',
      },
    ],
    useCases: [
      {
        icon: '🏥',
        title: 'Estetik cerrahi klinikleri',
        description:
          'Klinikte randevu öncesi danışanın beklentisini netleştirin, muayene sırasında doktorunuz hazır başlıklarla devam etsin.',
      },
      {
        icon: '💬',
        title: 'Instagram DM danışmanları',
        description:
          'Sosyal medya üzerinden gelen soruları demo ile cevaplayın, sıcak leads’i CRM’e aktarın, dönüşümleri hızlandırın.',
      },
      {
        icon: '📈',
        title: 'Influencer iş birlikleri',
        description:
          'İşbirliği yaptığınız influencer’ın takipçilerine otomatik demo sunarak kampanya boyunca randevu trafiği toplayın.',
      },
      {
        icon: '🌍',
        title: 'Yurtdışı hasta koordinasyonu',
        description:
          'Uzak mesafedeki danışanlara online önizleme sunup güven oluşturun, seyahat planlamasını kolaylaştırın.',
      },
    ],
    faq: [
      {
        question: 'Nasıl çalışıyor?',
        answer:
          'Danışan Instagram DM’den tetik kelimeyi yazıyor. Otomasyon selfie ve hedef görseli topluyor, AI modeli 3 farklı burun önizlemesi üretiyor ve kliniğinizin mesajıyla sonucu gönderiyor.',
      },
      {
        question: 'Kurulum süresi nedir?',
        answer:
          'Yaklaşık 7 dakika. Instagram Business hesabınızı bağlıyorsunuz, AI API anahtarınızı giriyor, CTA metninizi seçip yayına alıyorsunuz.',
      },
      {
        question: 'Veriler nasıl saklanıyor?',
        answer:
          'Fotoğraflar şifreli depolanır, sadece klinik personeli erişebilir. 30 gün sonra otomatik olarak silinir, KVKK ve GDPR ile uyumludur.',
      },
      {
        question: 'Hangi cihazlardan kullanılabilir?',
        answer:
          'Instagram uygulaması olan her cihazdan çalışır. Danışanın ek bir uygulama indirmesine gerek yoktur.',
      },
      {
        question: 'Sonuçlar ne kadar gerçekçi?',
        answer:
          'Burun anatomisi, deri dokusu ve yüz simetrisi korunur. Klinikler %92 memnuniyet puanı raporluyor.',
      },
      {
        question: 'Ücretlendirme nasıl?',
        answer:
          'Aylık otomasyon paketine dahildir. İlk 50 dönüşüm ücretsiz; sonrasında dönüşüm başına küçük bir ücret veya sınırsız paket seçebilirsiniz.',
      },
    ],
    chatPreview: [
      {
        id: 'msg-1',
        type: 'user',
        content: 'Merhaba, burun estetiği için önizleme görebilir miyim?',
      },
      {
        id: 'msg-2',
        type: 'bot',
        content: 'Elbette! Önce mevcut halinizi görebilmem için lütfen güncel bir selfie gönderir misiniz? 🤳',
      },
      {
        id: 'msg-3',
        type: 'user',
        content: '',
        image: '/media/kel1.webp',
      },
      {
        id: 'msg-4',
        type: 'bot',
        content: 'Teşekkürler! Şimdi hayal ettiğiniz burun tipine ait bir referans fotoğrafı paylaşabilir misiniz? ✨',
      },
      {
        id: 'msg-5',
        type: 'user',
        content: '',
        image: '/media/kel2.webp',
      },
      {
        id: 'msg-6',
        type: 'bot',
        content: 'AI modelimiz detaylı bir önizleme hazırlıyor… ⏱️',
      },
      {
        id: 'msg-7',
        type: 'bot',
        content: 'Hazır! Doğal, dengeli ve çene hattınızla uyumlu önerimizi aşağıda görebilirsiniz. 🪄',
        image: '/media/kel3.webp',
      },
      {
        id: 'msg-8',
        type: 'bot',
        content: 'Beğendiyseniz ücretsiz muayene randevusu planlayalım mı? 📆',
        button: {
          text: 'Randevu Al',
        },
      },
    ],
    metadata: {
      keywords: [
        'burun estetiği',
        'aesthetic ai',
        'instagram otomasyon',
        'estetik cerrahi',
        'selfie önizleme',
        'burun simülasyonu',
        'klinik otomasyonu',
      ],
      ogTitle: 'Aesthetic AI Burun Önizleme - Instagram Otomasyonu | Automation-FB',
      ogDescription:
        'Instagram DM üzerinden gerçekçi burun estetiği önizlemesi sunun. Estetik klinikleri için güven oluşturan AI otomasyonu.',
    },
    stats: [
      { value: '5 sn', label: 'Önizleme süresi' },
      { value: '%92', label: 'Memnuniyet puanı' },
      { value: '3', label: 'Önizleme varyasyonu' },
    ],
    howItWorks: {
      title: 'Nasıl Çalışır?',
      subtitle: 'Meraktan randevuya üç adımda ilerleyin',
      steps: [
        {
          step: '1',
          title: 'Instagram & AI entegrasyonu',
          description: 'Business hesabınızı bağlayın, AI kimliğinizi güvenle ekleyin.',
          icon: '📱',
        },
        {
          step: '2',
          title: 'Mesaj akışını özelleştir',
          description: 'Cerrah notlarını, uyarıları ve CTA metinlerini kliniğinize göre ayarlayın.',
          icon: '⚙️',
        },
        {
          step: '3',
          title: 'Otomasyonu aktive et',
          description: 'Akışı yayınlayın ve her nitelikli DM’yi randevuya dönüştürün.',
          icon: '🚀',
        },
      ],
    },
  },
};

export function getAestheticAIContent(locale: Locale): AutomationContent {
  return aestheticContentByLocale[locale] ?? aestheticContentByLocale[defaultLocale];
}
