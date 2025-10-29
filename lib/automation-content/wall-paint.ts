import { AutomationContent } from './types';

export const wallPaintContent: AutomationContent = {
  slug: 'wall-paint',
  templateId: 'wall-paint',
  title: 'Duvar Rengi/Duvar Kağıdı AI',
  subtitle: 'Instagram üzerinden anında duvar renk değişimi',
  description:
    'Yapay zeka ile müşterilerinize farklı duvar renkleri ve duvar kağıtlarını anında gösterin. İç mimarlar ve boya satıcıları için ideal.',

  images: {
    before: '/media/wall1.webp',
    style: '/media/wall2.webp',
    result: '/media/wall3.webp',
  },

  hero: {
    title: 'Müşterileriniz Duvarları Yeni Renkle Görmek İstiyor mu?',
    description:
      'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize mekanlarının farklı duvar renkleri ve kağıtlarıyla görünümünü saniyeler içinde gösterin. Karar sürecini hızlandırın.',
    cta: 'Otomasyonu Başlat',
  },

  features: [
    {
      icon: '⚡',
      title: 'Anında Görselleştirme',
      description: 'Müşteri mekan fotoğrafını gönderir, 5 saniye içinde yeni duvar rengiyle görüntülenir.',
    },
    {
      icon: '🎨',
      title: 'Sınırsız Renk & Desen',
      description: 'Boya, duvar kağıdı, dokulu kaplama - tüm seçenekler için destek.',
    },
    {
      icon: '📱',
      title: 'Instagram Entegrasyonu',
      description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
    },
    {
      icon: '💼',
      title: 'Gerçekçi Işıklandırma',
      description: 'AI teknolojisi ile mekan aydınlatması ve gölgelendirme korumalı sonuçlar.',
    },
    {
      icon: '📊',
      title: 'Trend Analizi',
      description: 'Hangi renkler ve desenler daha çok tercih ediliyor? Verilerle karar verin.',
    },
    {
      icon: '🔄',
      title: '7/24 Aktif',
      description: 'Mesai saatleri dışında bile müşteriler renk seçeneklerini deneyimler.',
    },
  ],

  useCases: [
    {
      icon: '🏠',
      title: 'İç Mimarlar & Dekoratörler',
      description:
        'Müşterilere mekan tasarımlarını farklı renk paletleriyle sunun. Görsel sunum gücünü artırın.',
    },
    {
      icon: '🎨',
      title: 'Boya & Dekorasyon Mağazaları',
      description:
        'Müşterilere ürünlerinizi kendi mekanlarında görme fırsatı tanıyın. Satış konversiyon oranını yükseltin.',
    },
    {
      icon: '🏢',
      title: 'Boya Üreticileri',
      description: 'Yeni renk koleksiyonlarınızı pazara sunmadan önce müşteri tepkilerini ölçün.',
    },
    {
      icon: '🛋️',
      title: 'Mobilya & Dekorasyon Firmaları',
      description: 'Ürünlerinizi farklı duvar renkleriyle uyumlu olarak gösterin.',
    },
  ],

  faq: [
    {
      question: 'Nasıl çalışır?',
      answer:
        'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve mekan fotoğrafı ister. Müşteri mekanının fotoğrafını ve denemek istediği renk/desen örneğini gönderir. AI saniyeler içinde duvarları yeni renkte gösterir.',
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
        'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Mekan perspektifi, ışıklandırma ve gölgeler korunarak %95+ gerçekçilik oranı sağlıyoruz.',
    },
    {
      question: 'Müşteri verileri güvende mi?',
      answer:
        'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
    },
    {
      question: 'Hangi mekan tipleri destekleniyor?',
      answer:
        'Oturma odası, yatak odası, mutfak, ofis - tüm iç mekan tipleri. Farklı ışık koşulları ve perspektifler için optimize edilmiştir.',
    },
  ],

  chatPreview: [
    {
      id: 'msg-1',
      type: 'user',
      content: 'Merhaba, oturma odamın duvarlarını farklı renkte görmek istiyorum',
    },
    {
      id: 'msg-2',
      type: 'bot',
      content: 'Harika! 🏠 Lütfen mekanınızın mevcut fotoğrafını gönderin.',
    },
    {
      id: 'msg-3',
      type: 'user',
      content: '',
      image: '/media/wall1.webp',
    },
    {
      id: 'msg-4',
      type: 'bot',
      content: 'Süper! Şimdi denemek istediğiniz renk/desen örneğini gönderin 🎨',
    },
    {
      id: 'msg-5',
      type: 'user',
      content: '',
      image: '/media/wall2.webp',
    },
    {
      id: 'msg-6',
      type: 'bot',
      content: 'AI duvarları boyuyor... ✨',
    },
    {
      id: 'msg-7',
      type: 'bot',
      content: 'İşte mekanınız yeni haliyle! 🌟',
      image: '/media/wall3.webp',
    },
    {
      id: 'msg-8',
      type: 'bot',
      content: 'Beğendiniz mi? Ürün detayları ve fiyat için tıklayın 🛒',
    },
  ],

  metadata: {
    keywords: [
      'duvar rengi değiştirme',
      'duvar kağıdı AI',
      'Instagram otomasyon',
      'iç mimar otomasyonu',
      'sanal boya deneme',
      'dekorasyon AI',
      'mekan görselleştirme',
    ],
    ogTitle: 'Duvar Rengi/Duvar Kağıdı AI - Instagram Otomasyonu | LookLab',
    ogDescription:
      'Müşterilerinize Instagram DM üzerinden AI ile mekanlarının farklı duvar renkleriyle görünümünü anında gösterin. İç mimarlar için profesyonel otomasyon çözümü.',
  },
};
