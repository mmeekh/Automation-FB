import { AutomationContent } from './types';

export const hairStyleChangeContent: AutomationContent = {
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
      'saç stili değiştirme',
      'AI saç modeli',
      'Instagram otomasyon',
      'kuaför otomasyonu',
      'sanal saç deneme',
      'saç rengi AI',
      'saç kesimi simülasyon',
    ],
    ogTitle: 'Saç Stili Değiştirme AI - Instagram Otomasyonu | LookLab',
    ogDescription:
      'Müşterilerinize Instagram DM üzerinden AI ile farklı saç stillerini anında gösterin. Kuaförler için profesyonel otomasyon çözümü.',
  },
};
