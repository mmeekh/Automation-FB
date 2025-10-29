import { AutomationContent } from './types';

export const clothesTryonContent: AutomationContent = {
  slug: 'clothes-tryon',
  templateId: 'clothes-tryon',
  title: 'Elbise/Kıyafet Deneme AI',
  subtitle: 'Instagram üzerinden anında sanal kıyafet deneme',
  description:
    'Yapay zeka ile müşterilerinize kıyafetleri üzerlerinde anında gösterin. Moda mağazaları ve giyim markaları için ideal.',

  images: {
    before: '/media/dress1.webp',
    style: '/media/dress2.webp',
    result: '/media/dress3.webp',
  },

  hero: {
    title: 'Müşterileriniz Kıyafeti Üzerlerinde Görmek İstiyor mu?',
    description:
      'Instagram DM üzerinden çalışan AI otomasyonu ile müşterilerinize kıyafetlerinizin üzerlerinde nasıl duracağını saniyeler içinde gösterin. Online satışlarınızı artırın.',
    cta: 'Otomasyonu Başlat',
  },

  features: [
    {
      icon: '⚡',
      title: 'Anında Deneme',
      description: 'Müşteri fotoğrafını gönderir, 5 saniye içinde kıyafetle görüntülenir.',
    },
    {
      icon: '👗',
      title: 'Tüm Kıyafet Tipleri',
      description: 'Elbise, gömlek, pantolon, ceket - her türlü giyim için destek.',
    },
    {
      icon: '📱',
      title: 'Instagram Entegrasyonu',
      description: 'Hiçbir uygulama indirmeden, doğrudan Instagram DM üzerinden çalışır.',
    },
    {
      icon: '💼',
      title: 'Gerçekçi Giyim',
      description: 'AI teknolojisi ile vücut oranları ve kumaş dokusuna uyumlu sonuçlar.',
    },
    {
      icon: '📊',
      title: 'Moda Analitiği',
      description: 'Hangi modeller daha çok deneniyor? Koleksiyon planlamasını optimize edin.',
    },
    {
      icon: '🔄',
      title: '7/24 Aktif',
      description: 'Mesai saatleri dışında bile müşteriler kıyafet deneme deneyimi yaşar.',
    },
  ],

  useCases: [
    {
      icon: '👗',
      title: 'Moda Mağazaları',
      description:
        'Müşterilere kıyafetleri üzerlerinde gösterin. "Üzerime yakışır mı?" endişesini ortadan kaldırın.',
    },
    {
      icon: '🛍️',
      title: 'Online Giyim Satıcıları',
      description:
        'E-ticaret sitenize sanal deneme özelliği ekleyin. İade oranlarını %40 azaltın.',
    },
    {
      icon: '✨',
      title: 'Moda Tasarımcıları',
      description: 'Yeni koleksiyonlarınızı müşterilere tanıtmadan önce görsel olarak test edin.',
    },
    {
      icon: '💍',
      title: 'Butik Mağazalar',
      description: 'Özel tasarım ve sınırlı sayıda ürünlerinizi müşterilere sanal olarak sunun.',
    },
  ],

  faq: [
    {
      question: 'Nasıl çalışır?',
      answer:
        'Müşteriniz Instagram DM üzerinden size mesaj atar. Otomasyon devreye girer ve vücut fotoğrafı ister. Müşteri fotoğrafını ve denemek istediği kıyafeti gönderir. AI saniyeler içinde kıyafeti müşteri üzerinde gösterir.',
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
        'Son nesil Stable Diffusion ve ControlNet teknolojisi kullanıyoruz. Vücut oranları, kumaş dokusu ve kıvrımlar korunarak %91+ gerçekçilik oranı sağlıyoruz.',
    },
    {
      question: 'Müşteri verileri güvende mi?',
      answer:
        'Tüm fotoğraflar şifreli olarak saklanır ve 30 gün sonra otomatik silinir. KVKK ve GDPR uyumlu çalışıyoruz.',
    },
    {
      question: 'Beden uyumu nasıl?',
      answer:
        'AI, vücut tipini analiz eder ve kıyafetin beden uyumunu otomatik hesaplar. Müşteriye en yakın görünümü sunar.',
    },
  ],

  chatPreview: [
    {
      id: 'msg-1',
      type: 'user',
      content: 'Merhaba, bir elbise denemek istiyorum',
    },
    {
      id: 'msg-2',
      type: 'bot',
      content: 'Harika! 👗 Lütfen tam boy fotoğrafınızı gönderin.',
    },
    {
      id: 'msg-3',
      type: 'user',
      content: '',
      image: '/media/dress1.webp',
    },
    {
      id: 'msg-4',
      type: 'bot',
      content: 'Süper! Şimdi denemek istediğiniz kıyafetin fotoğrafını gönderin 👚',
    },
    {
      id: 'msg-5',
      type: 'user',
      content: '',
      image: '/media/dress2.webp',
    },
    {
      id: 'msg-6',
      type: 'bot',
      content: 'AI kıyafeti giyiyor... ✨',
    },
    {
      id: 'msg-7',
      type: 'bot',
      content: 'İşte üzerinizdeki hali! 🌟',
      image: '/media/dress3.webp',
    },
    {
      id: 'msg-8',
      type: 'bot',
      content: 'Beğendiniz mi? Satın almak için tıklayın 🛒',
    },
  ],

  metadata: {
    keywords: [
      'sanal kıyafet deneme',
      'elbise AI',
      'Instagram otomasyon',
      'moda mağazası otomasyonu',
      'online giyim deneme',
      'fashion tech',
      'kıyafet simülasyonu',
    ],
    ogTitle: 'Elbise/Kıyafet Deneme AI - Instagram Otomasyonu | LookLab',
    ogDescription:
      'Müşterilerinize Instagram DM üzerinden AI ile kıyafetleri üzerlerinde anında gösterin. Moda mağazaları için profesyonel otomasyon çözümü.',
  },
};
