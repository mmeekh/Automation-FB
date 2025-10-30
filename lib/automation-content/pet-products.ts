import { AutomationContent } from './types';

export const petProductsContent: AutomationContent = {
  slug: 'pet-products',
  templateId: 'pet-products',
  title: 'Evcil Hayvan Ürünleri AI',
  subtitle: 'Instagram üzerinden anında evcil hayvan ürün denemesi',
  description:
    'Yapay zeka ile müşterilerinizin evcil hayvanlarına tasma, giysi ve aksesuarları anında gösterin. Pet shoplar için ideal.',

  images: {
    before: '/media/pet1.webp',
    style: '/media/pet2.webp',
    result: '/media/pet3.webp',
  },

  hero: {
    title: 'Evcil Hayvanlar İçin Sanal Giyim Deneme Deneyimi',
    description:
      'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize evcil hayvanları üzerinde tasma, giysi ve aksesuarları saniyeler içinde gösterin. Satın alma kararını kolaylaştırın.',
    cta: 'Otomasyonu Başlat',
  },

  features: [
    {
      icon: '⚡',
      title: 'Anında Görselleştirme',
      description: 'Müşteri evcil hayvan fotoğrafını gönderir, 5 saniye içinde ürün üzerinde görüntülenir.',
    },
    {
      icon: '🐾',
      title: 'Tüm Evcil Hayvanlar',
      description: 'Kedi, köpek, tavşan - tüm evcil hayvan türleri için optimize edilmiş AI modeli.',
    },
    {
      icon: '📱',
      title: 'Instagram Entegrasyonu',
      description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
    },
    {
      icon: '💼',
      title: 'Gerçekçi Sonuçlar',
      description: 'AI teknolojisi ile ürünlerin evcil hayvanlarda doğal görünümü.',
    },
    {
      icon: '📊',
      title: 'Satış Artışı Takibi',
      description: 'Hangi ürünler daha çok ilgi görüyor? Satış verilerinizi analiz edin.',
    },
    {
      icon: '🔄',
      title: '7/24 Aktif',
      description: 'Mesai saatleri dışında bile müşteriler ürünleri deneyimler.',
    },
  ],

  useCases: [
    {
      icon: '🐕',
      title: 'Pet Shoplar',
      description:
        'Tasma, giysi, aksesuarları müşterilerin evcil hayvanları üzerinde gösterin. İade oranlarını düşürün.',
    },
    {
      icon: '🏪',
      title: 'Online Pet Mağazaları',
      description:
        'E-ticaret sitenize AI entegrasyonu ile müşteri deneyimini geliştirin. Sepet terk oranını azaltın.',
    },
    {
      icon: '🎨',
      title: 'Özel Tasarım Pet Ürünleri',
      description: 'Kişiselleştirilmiş ürünleri müşterilere önizleme olarak sunun.',
    },
    {
      icon: '💍',
      title: 'Pet Aksesuarları Üreticileri',
      description: 'Yeni ürünlerinizi pazara sunmadan önce müşteri geri bildirimi alın.',
    },
  ],

  faq: [
    {
      question: 'Nasıl çalışır?',
      answer:
        'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve evcil hayvan fotoğrafı ister. Müşteri evcil hayvanının fotoğrafını ve denemek istediği ürün referansını gönderir. AI saniyeler içinde ürünü evcil hayvan üzerinde gösterir.',
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
        'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Evcil hayvan anatomisi, kürk dokusu ve ürün uyumu korunarak %90+ gerçekçilik oranı sağlıyoruz.',
    },
    {
      question: 'Müşteri verileri güvende mi?',
      answer:
        'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
    },
    {
      question: 'Hangi hayvan türleri destekleniyor?',
      answer:
        'Köpek, kedi, tavşan, kuş ve diğer popüler evcil hayvanlar. Farklı ırklar ve boyutlar için optimize edilmiştir.',
    },
  ],

  chatPreview: [
    {
      id: 'msg-1',
      type: 'user',
      content: 'Merhaba, köpeğim için tasma bakmak istiyorum',
    },
    {
      id: 'msg-2',
      type: 'bot',
      content: 'Harika! 🐾 Lütfen evcil hayvanınızın fotoğrafını gönderin.',
    },
    {
      id: 'msg-3',
      type: 'user',
      content: '',
      image: '/media/pet1.webp',
    },
    {
      id: 'msg-4',
      type: 'bot',
      content: 'Çok tatlı! Şimdi denemek istediğiniz ürünün fotoğrafını gönderin 🎀',
    },
    {
      id: 'msg-5',
      type: 'user',
      content: '',
      image: '/media/pet2.webp',
    },
    {
      id: 'msg-6',
      type: 'bot',
      content: 'AI sihri başlıyor... ✨',
    },
    {
      id: 'msg-7',
      type: 'bot',
      content: 'İşte evcil hayvanınız ürün ile! 🌟',
      image: '/media/pet3.webp',
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
      'evcil hayvan ürünleri',
      'pet shop AI',
      'Instagram otomasyon',
      'sanal ürün deneme',
      'köpek tasması AI',
      'kedi aksesuarı deneme',
      'pet otomasyon',
    ],
    ogTitle: 'Evcil Hayvan Ürünleri AI - Instagram Otomasyonu | LookLab',
    ogDescription:
      'Müşterilerinize Instagram DM üzerinden AI ile evcil hayvan ürünlerini anında gösterin. Pet shoplar için profesyonel otomasyon çözümü.',
  },
};
