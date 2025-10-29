import { AutomationContent } from './types';

export const furniturePlacementContent: AutomationContent = {
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
};
