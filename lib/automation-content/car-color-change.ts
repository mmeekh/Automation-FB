import { AutomationContent } from './types';

export const carColorChangeContent: AutomationContent = {
  slug: 'car-color-change',
  templateId: 'car-color-changer',
  title: 'Araba Renk Değiştirme AI',
  subtitle: 'Instagram üzerinden anında araç renk değişimi',
  description:
    'Yapay zeka ile müşterilerinize farklı araç renklerini anında gösterin. Oto galeriler ve boyama atölyeleri için ideal.',

  images: {
    before: '/media/carcolor1.webp',
    style: '/media/carcolor2.webp',
    result: '/media/carcolor3.webp',
  },

  hero: {
    title: 'Müşterileriniz Aracı Farklı Renkte Görmek İstiyor mu?',
    description:
      'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize araçlarının farklı renklerdeki görünümünü saniyeler içinde gösterin. Satış öncesi güven oluşturun, karar sürecini hızlandırın.',
    cta: 'Otomasyonu Başlat',
  },

  features: [
    {
      icon: '⚡',
      title: 'Anında Önizleme',
      description: 'Müşteri araç fotoğrafını gönderir, 5 saniye içinde yeni renkte görüntülenir.',
    },
    {
      icon: '🎨',
      title: 'Tüm Renk Seçenekleri',
      description: 'Metalik, mat, parlak - her türlü boya çeşidi ve renk için destek.',
    },
    {
      icon: '📱',
      title: 'Instagram Entegrasyonu',
      description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
    },
    {
      icon: '💼',
      title: 'Gerçekçi Sonuçlar',
      description: 'AI teknolojisi ile ışık, gölge ve yansıma korumalı profesyonel çıktılar.',
    },
    {
      icon: '📊',
      title: 'Satış Metrikleri',
      description: 'Hangi renkler daha çok ilgi görüyor? Satış verilerinizi analiz edin.',
    },
    {
      icon: '🔄',
      title: '7/24 Aktif',
      description: 'Mesai saatleri dışında bile müşteriler renk seçeneklerini deneyimler.',
    },
  ],

  useCases: [
    {
      icon: '🚗',
      title: 'Oto Galeriler',
      description:
        'Satışa sunduğunuz araçları müşterilerinize farklı renklerde gösterin. Renk tercihi nedeniyle kaçan satışları önleyin.',
    },
    {
      icon: '🎨',
      title: 'Boya & Kaplama Atölyeleri',
      description:
        'Boyama işlemi öncesi müşteriye görsel önizleme sunun. Memnuniyetsizlik riskini minimize edin.',
    },
    {
      icon: '🔧',
      title: 'Araç Modifiye & Tuning',
      description: 'Özel renk, mat kaplama, wrap işlemleri için müşteriye görsel teklif sunun.',
    },
    {
      icon: '🏢',
      title: 'Filo Kiralama Şirketleri',
      description: 'Kurumsal müşterilere filo araçlarını kurumsal renklerde gösterin.',
    },
  ],

  faq: [
    {
      question: 'Nasıl çalışır?',
      answer:
        'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve araç fotoğrafı ister. Müşteri aracının fotoğrafını ve istediği renk örneğini gönderir. AI saniyeler içinde aracı yeni renkte işler ve sonucu gönderir.',
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
        'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Araç geometrisi, ışık, gölge ve cam yansımaları korunarak %95+ gerçekçilik oranı sağlıyoruz.',
    },
    {
      question: 'Müşteri verileri güvende mi?',
      answer:
        'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
    },
    {
      question: 'Hangi araç tipleri destekleniyor?',
      answer:
        'Tüm araç tipleri: otomobil, SUV, kamyonet, motosiklet, ticari araçlar. Hem dış hem iç mekan fotoğrafları için optimize edilmiştir.',
    },
  ],

  chatPreview: [
    {
      id: 'msg-1',
      type: 'user',
      content: 'Merhaba, aracımın farklı renkte nasıl durduğunu görmek istiyorum',
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
      image: '/media/carcolor1.webp',
    },
    {
      id: 'msg-4',
      type: 'bot',
      content: 'Süper! Şimdi denemek istediğiniz rengin örnek fotoğrafını gönderin 🎨',
    },
    {
      id: 'msg-5',
      type: 'user',
      content: '',
      image: '/media/carcolor2.webp',
    },
    {
      id: 'msg-6',
      type: 'bot',
      content: 'AI renk değişimi yapıyor... ✨',
    },
    {
      id: 'msg-7',
      type: 'bot',
      content: 'İşte aracınızın yeni hali! 🌟',
      image: '/media/carcolor3.webp',
    },
    {
      id: 'msg-8',
      type: 'bot',
      content: 'Beğendiniz mi? Fiyat teklifi almak için tıklayın 💰',
    },
  ],

  metadata: {
    keywords: [
      'araba renk değiştirme',
      'araç boya AI',
      'Instagram otomasyon',
      'oto galeri otomasyonu',
      'araç renk simülasyonu',
      'boya atölyesi AI',
      'araç wrap önizleme',
    ],
    ogTitle: 'Araba Renk Değiştirme AI - Instagram Otomasyonu | LookLab',
    ogDescription:
      'Müşterilerinize Instagram DM üzerinden AI ile araçlarının farklı renklerdeki görünümünü anında gösterin. Oto galeriler için profesyonel otomasyon çözümü.',
  },
};
