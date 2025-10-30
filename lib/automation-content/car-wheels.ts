import { AutomationContent } from './types';

export const carWheelsContent: AutomationContent = {
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
};
