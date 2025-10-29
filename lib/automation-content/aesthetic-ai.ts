import { AutomationContent } from './types';

export const aestheticAIContent: AutomationContent = {
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
};

