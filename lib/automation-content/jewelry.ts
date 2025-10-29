import { AutomationContent } from './types';

export const jewelryContent: AutomationContent = {
  slug: 'jewelry',
  templateId: 'jewelry',
  title: 'Takı Deneme AI',
  subtitle: 'Instagram üzerinden anında sanal takı deneme',
  description:
    'Yapay zeka ile müşterilerinize kolye, küpe, yüzük ve bilezikleri anında gösterin. Kuyumcular ve takı mağazaları için ideal.',

  images: {
    before: '/media/jewel1.webp',
    style: '/media/jewel2.webp',
    result: '/media/jewel3.webp',
  },

  hero: {
    title: 'Müşterileriniz Takıyı Üzerlerinde Görmek İstiyor mu?',
    description:
      'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize kolye, küpe, yüzük ve bileziklerin üzerlerinde nasıl duracağını saniyeler içinde gösterin. Satışlarınızı artırın.',
    cta: 'Otomasyonu Başlat',
  },

  features: [
    {
      icon: '⚡',
      title: 'Anında Deneme',
      description: 'Müşteri fotoğrafını gönderir, 5 saniye içinde takı ile görüntülenir.',
    },
    {
      icon: '💍',
      title: 'Tüm Takı Tipleri',
      description: 'Kolye, küpe, yüzük, bilezik, broş - her türlü takı için destek.',
    },
    {
      icon: '📱',
      title: 'Instagram Entegrasyonu',
      description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
    },
    {
      icon: '💼',
      title: 'Gerçekçi Parlaklık',
      description: 'AI teknolojisi ile taş parlaklığı, metal yansıması ve vücut uyumlu sonuçlar.',
    },
    {
      icon: '📊',
      title: 'Takı Analitiği',
      description: 'Hangi modeller daha çok deneniyor? Stok ve koleksiyon kararlarını optimize edin.',
    },
    {
      icon: '🔄',
      title: '7/24 Aktif',
      description: 'Mesai saatleri dışında bile müşteriler takı deneme deneyimi yaşar.',
    },
  ],

  useCases: [
    {
      icon: '💎',
      title: 'Kuyumcular',
      description:
        'Müşterilere değerli takıları üzerlerinde gösterin. Güven oluşturun ve satış sürecini hızlandırın.',
    },
    {
      icon: '🛍️',
      title: 'Online Takı Mağazaları',
      description:
        'E-ticaret sitenize sanal deneme özelliği ekleyin. Müşteri deneyimini geliştirin.',
    },
    {
      icon: '✨',
      title: 'Takı Tasarımcıları',
      description: 'Yeni koleksiyonlarınızı müşterilere tanıtmadan önce görsel olarak sunun.',
    },
    {
      icon: '💍',
      title: 'Nişan & Düğün Mağazaları',
      description: 'Özel gün takılarını müşterilere sanal olarak deneme fırsatı tanıyın.',
    },
  ],

  faq: [
    {
      question: 'Nasıl çalışır?',
      answer:
        'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve fotoğraf ister. Müşteri fotoğrafını ve denemek istediği takıyı gönderir. AI saniyeler içinde takıyı müşteri üzerinde gösterir.',
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
        'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Taş parlaklığı, metal yansıması ve vücut anatomisi korunarak %93+ gerçekçilik oranı sağlıyoruz.',
    },
    {
      question: 'Müşteri verileri güvende mi?',
      answer:
        'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
    },
    {
      question: 'Hangi takı tipleri destekleniyor?',
      answer:
        'Kolye, küpe, yüzük, bilezik, broş, piercing - tüm takı kategorileri. Altın, gümüş, pırlanta, renkli taşlar için optimize edilmiştir.',
    },
  ],

  chatPreview: [
    {
      id: 'msg-1',
      type: 'user',
      content: 'Merhaba, bir kolye denemek istiyorum',
    },
    {
      id: 'msg-2',
      type: 'bot',
      content: 'Harika! 💎 Lütfen fotoğrafınızı gönderin.',
    },
    {
      id: 'msg-3',
      type: 'user',
      content: '',
      image: '/media/jewel1.webp',
    },
    {
      id: 'msg-4',
      type: 'bot',
      content: 'Süper! Şimdi denemek istediğiniz takının fotoğrafını gönderin 💍',
    },
    {
      id: 'msg-5',
      type: 'user',
      content: '',
      image: '/media/jewel2.webp',
    },
    {
      id: 'msg-6',
      type: 'bot',
      content: 'AI takıyı takıyor... ✨',
    },
    {
      id: 'msg-7',
      type: 'bot',
      content: 'İşte üzerinizdeki hali! 🌟',
      image: '/media/jewel3.webp',
    },
    {
      id: 'msg-8',
      type: 'bot',
      content: 'Beğendiniz mi? Satın almak için tıklayın 🛒',
    },
  ],

  metadata: {
    keywords: [
      'sanal takı deneme',
      'kolye AI',
      'Instagram otomasyon',
      'kuyumcu otomasyonu',
      'online takı deneme',
      'jewelry tech',
      'takı görselleştirme',
    ],
    ogTitle: 'Takı Deneme AI - Instagram Otomasyonu | LookLab',
    ogDescription:
      'Müşterilerinize Instagram DM üzerinden AI ile takıları üzerlerinde anında gösterin. Kuyumcular için profesyonel otomasyon çözümü.',
  },
};
