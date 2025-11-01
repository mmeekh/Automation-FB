import {
  AutomationFlow,
  FlowNode,
  FlowEdge,
  TriggerNodeData,
  MessageNodeData,
  ImageRequestNodeData,
  ResultNodeData,
} from '../types/flow';

// ---------------------------------------------------------------------------
// Hair Restoration Flow
// ---------------------------------------------------------------------------

export const hairRestorationFlow: AutomationFlow = {
  id: 'flow-instagram-bald-to-haired',
  name: 'Sac Restorasyon AI',
  description: 'Kullanicilarin sac modelini istedigi sac modeli ile degistirmesini saglar',
  templateId: 'instagram-bald-to-haired',
  instagramAccountId: 'acc-1',

  status: 'active',
  testUsers: ['test_user1', 'test_user2'],

  trigger: {
    keywords: ['sac', 'hair'],
    exactMatch: false,
  },

  nodes: [
    {
      id: 'trigger-1',
      type: 'trigger',
      position: { x: 50, y: 200 },
      data: {
        label: 'Kullanici "sac" yazdi',
        icon: 'TR',
        keywords: ['sac', 'hair'],
        exactMatch: false,
        statistics: {
          sent: 0,
          delivered: 0,
          deliveredRate: 0,
          opened: 0,
          openedRate: 0,
        },
      } as TriggerNodeData,
    },
    {
      id: 'message-welcome',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Hosgeldin Mesaji',
        icon: 'MSG',
        messageText:
          'Merhaba! Sac modelinizi AI ile degistirebilirim.\n\nFarkli stiller denemek ister misiniz?',
        imageUrl: null,
        buttons: [
          {
            id: 'btn-start',
            text: 'Baslayalim',
            type: 'whatsapp',
          },
          {
            id: 'btn-cancel',
            text: 'Iptal',
            type: 'cancel',
          },
        ],
        statistics: {
          sent: 33,
          delivered: 33,
          deliveredRate: 100,
          opened: 32,
          openedRate: 97,
        },
      } as MessageNodeData,
    },
    {
      id: 'image-req-1',
      type: 'image_request',
      position: { x: 750, y: 200 },
      data: {
        label: 'Ilk Fotograf Istegi',
        icon: 'CAM',
        requestMessage: 'Lutfen mevcut sac fotografini gonder.',
        errorMessage: 'Lutfen fotograf gonder, metin kabul edilmiyor.',
        retryCount: 3,
        statistics: {
          sent: 30,
          delivered: 30,
          deliveredRate: 100,
          opened: 29,
          openedRate: 96.7,
        },
      } as ImageRequestNodeData,
    },
    {
      id: 'message-style',
      type: 'message',
      position: { x: 1100, y: 200 },
      data: {
        label: 'Stil Sorusu',
        icon: 'ART',
        messageText: 'Harika! Hangi sac stilini denemek istersiniz?',
        imageUrl: '/media/hairchange2.webp',
        buttons: [
          { id: 'btn-blonde', text: 'Sari', type: 'whatsapp' },
          { id: 'btn-red', text: 'Kizil', type: 'whatsapp' },
          { id: 'btn-dark', text: 'Koyu Renk', type: 'whatsapp' },
        ],
        statistics: {
          sent: 28,
          delivered: 28,
          deliveredRate: 100,
          opened: 27,
          openedRate: 96.4,
        },
      } as MessageNodeData,
    },
    {
      id: 'message-processing',
      type: 'message',
      position: { x: 1450, y: 200 },
      data: {
        label: 'Isleniyor',
        icon: 'WAIT',
        messageText: 'Fotografin AI tarafindan isleniyor. Bu 10-15 saniye surebilir.',
        imageUrl: null,
        buttons: [],
        statistics: {
          sent: 25,
          delivered: 25,
          deliveredRate: 100,
          opened: 25,
          openedRate: 100,
        },
      } as MessageNodeData,
    },
    {
      id: 'result-final',
      type: 'result',
      position: { x: 1800, y: 200 },
      data: {
        label: 'Sonuc ve Randevu',
        icon: 'FIN',
        outputTemplate:
          'Yeni sac modelin hazir! Salonumuzda bu gorunumu gercege donusturebiliriz.',
        imageUrl: '/media/hairchange3.webp',
        appointmentButton: {
          text: 'Randevu Al',
          phoneNumber: '905449422355',
          autoMessage: 'Merhaba! Sac degisimi icin randevu almak istiyorum.',
        },
        delayedMessages: [
          { delay: 2, text: 'Salon: SwordNest Hair Studio' },
          { delay: 3, text: 'Adres: Istanbul, Kadikoy. Calisma saatleri 09:00 - 19:00.' },
        ],
        statistics: {
          sent: 24,
          delivered: 24,
          deliveredRate: 100,
          opened: 24,
          openedRate: 100,
          clicked: 18,
          clickRate: 75,
        },
      } as ResultNodeData,
    },
  ] as FlowNode[],

  edges: [
    { id: 'e-trigger-welcome', source: 'trigger-1', target: 'message-welcome', type: 'default' },
    { id: 'e-welcome-img1', source: 'message-welcome', target: 'image-req-1', type: 'default' },
    { id: 'e-img1-style', source: 'image-req-1', target: 'message-style', type: 'default' },
    { id: 'e-style-processing', source: 'message-style', target: 'message-processing', type: 'default' },
    {
      id: 'e-processing-result',
      source: 'message-processing',
      target: 'result-final',
      type: 'default',
      animated: true,
    },
  ] as FlowEdge[],

  settings: {
    followerOnly: false,
    dailyQuota: 1000,
    usedQuota: 750,
    quotaResetPeriod: 'daily',
  },

  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: new Date().toISOString(),
  totalInteractions: 3420,
  totalCompletions: 2890,
  averageCompletionTime: 45,
};

// ---------------------------------------------------------------------------
// Car Color Changer Flow
// ---------------------------------------------------------------------------

export const carColorChangerFlow: AutomationFlow = {
  id: 'flow-instagram-car-color-changer',
  name: 'Araba Renk Degistirme AI',
  description: 'Arabanin rengini AI ile degistir.',
  templateId: 'instagram-car-color-changer',
  instagramAccountId: 'acc-2',

  status: 'test',
  testUsers: ['test_user1'],

  trigger: {
    keywords: ['araba', 'car', 'renk'],
    exactMatch: false,
  },

  nodes: [
    {
      id: 'trigger-car',
      type: 'trigger',
      position: { x: 50, y: 200 },
      data: {
        label: 'Kullanici "araba" yazdi',
        icon: 'TR',
        keywords: ['araba', 'car', 'renk'],
        exactMatch: false,
        statistics: {
          sent: 0,
          delivered: 0,
          deliveredRate: 0,
          opened: 0,
          openedRate: 0,
        },
      } as TriggerNodeData,
    },
    {
      id: 'message-car-welcome',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Hosgeldin Mesaji',
        icon: 'MSG',
        messageText: 'Merhaba! Arabanizin rengini 30 saniyede AI ile degistirebilirim. Hazir misiniz?',
        imageUrl: '/media/carcolor1.webp',
        buttons: [
          { id: 'btn-car-start', text: 'Baslayalim', type: 'whatsapp' },
          { id: 'btn-car-faq', text: 'SSS', type: 'whatsapp' },
          { id: 'btn-car-cancel', text: 'Iptal', type: 'cancel' },
        ],
        statistics: {
          sent: 52,
          delivered: 50,
          deliveredRate: 96,
          opened: 44,
          openedRate: 88,
        },
      } as MessageNodeData,
    },
    {
      id: 'image-car-request',
      type: 'image_request',
      position: { x: 750, y: 200 },
      data: {
        label: 'Arac Fotografi Istegi',
        icon: 'CAM',
        requestMessage: 'Lutfen aracinizin mevcut rengini gosteren guncel bir fotograf gonderin.',
        errorMessage: 'Fotograf algilanamadi. Lutfen aydinlik bir arac fotografi gonderin.',
        retryCount: 3,
        statistics: {
          sent: 44,
          delivered: 44,
          deliveredRate: 100,
          opened: 42,
          openedRate: 95,
        },
      } as ImageRequestNodeData,
    },
    {
      id: 'message-car-options',
      type: 'message',
      position: { x: 1100, y: 200 },
      data: {
        label: 'Renk Secimi',
        icon: 'CLR',
        messageText: 'Harika! Metalik, mat veya iki tonlu hangi rengi denemek istersiniz?',
        imageUrl: '/media/carcolor2.webp',
        buttons: [
          { id: 'btn-car-metallic', text: 'Metalik', type: 'whatsapp' },
          { id: 'btn-car-matte', text: 'Mat', type: 'whatsapp' },
          { id: 'btn-car-two-tone', text: 'Iki Tonlu', type: 'whatsapp' },
        ],
        statistics: {
          sent: 40,
          delivered: 40,
          deliveredRate: 100,
          opened: 39,
          openedRate: 97,
        },
      } as MessageNodeData,
    },
    {
      id: 'message-car-processing',
      type: 'message',
      position: { x: 1450, y: 200 },
      data: {
        label: 'Isleniyor',
        icon: 'WAIT',
        messageText: 'Seciminiz AI tarafindan isleniyor. Boya katmanlari 15 saniyede hazir.',
        imageUrl: null,
        buttons: [],
        statistics: {
          sent: 38,
          delivered: 38,
          deliveredRate: 100,
          opened: 38,
          openedRate: 100,
        },
      } as MessageNodeData,
    },
    {
      id: 'result-car-final',
      type: 'result',
      position: { x: 1800, y: 200 },
      data: {
        label: 'Yeni Renk Goruntusu',
        icon: 'FIN',
        outputTemplate: 'Yeni renk hazir! Ayni gun boya randevusu planlamak icin tiklayin.',
        imageUrl: '/media/carcolor3.webp',
        appointmentButton: {
          text: 'Randevu Al',
          phoneNumber: '905301112233',
          autoMessage: 'Merhaba! Arac rengimi degistirmek icin randevu almak istiyorum.',
        },
        delayedMessages: [
          { delay: 2, text: 'Servis: LookLab Garage - Istanbul' },
          { delay: 3, text: 'Süre: Ortalama 3 saat, teslimat ayni gun.' },
        ],
        statistics: {
          sent: 36,
          delivered: 36,
          deliveredRate: 100,
          opened: 36,
          openedRate: 100,
          clicked: 22,
          clickRate: 61,
        },
      } as ResultNodeData,
    },
  ] as FlowNode[],

  edges: [
    { id: 'e-trigger-welcome', source: 'trigger-car', target: 'message-car-welcome', type: 'default' },
    { id: 'e-car-welcome-request', source: 'message-car-welcome', target: 'image-car-request', type: 'default' },
    { id: 'e-car-request-options', source: 'image-car-request', target: 'message-car-options', type: 'default' },
    { id: 'e-car-options-processing', source: 'message-car-options', target: 'message-car-processing', type: 'default' },
    { id: 'e-car-processing-result', source: 'message-car-processing', target: 'result-car-final', type: 'default' },
  ] as FlowEdge[],

  settings: {
    followerOnly: true,
    dailyQuota: 500,
    usedQuota: 120,
    quotaResetPeriod: 'daily',
  },

  createdAt: '2024-02-01T14:20:00Z',
  updatedAt: new Date().toISOString(),
  totalInteractions: 450,
  totalCompletions: 380,
  averageCompletionTime: 35,
};

// ---------------------------------------------------------------------------
// Aesthetic Flow
// ---------------------------------------------------------------------------

export const aestheticAIFlow: AutomationFlow = {
  id: 'flow-instagram-aesthetic-bald',
  name: 'Aesthetic AI',
  description: 'Estetik danismanligi icin otomatik akis.',
  templateId: 'instagram-aesthetic-bald',
  instagramAccountId: 'acc-3',

  status: 'inactive',
  testUsers: [],

  trigger: {
    keywords: ['aesthetic', 'estetik'],
    exactMatch: false,
  },

  nodes: [
    {
      id: 'trigger-aesthetic',
      type: 'trigger',
      position: { x: 50, y: 200 },
      data: {
        label: 'Kullanici "estetik" yazdi',
        icon: 'TR',
        keywords: ['aesthetic', 'estetik'],
        exactMatch: false,
        statistics: {
          sent: 0,
          delivered: 0,
          deliveredRate: 0,
          opened: 0,
          openedRate: 0,
        },
      } as TriggerNodeData,
    },
    {
      id: 'message-aesthetic-welcome',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Hosgeldin Mesaji',
        icon: 'MSG',
        messageText: 'LookLab Estetik AI asistaniyla hayalinizdeki gorunumu saniyeler icinde gorebilirsiniz.',
        imageUrl: '/media/kel1.webp',
        buttons: [
          { id: 'btn-aesthetic-start', text: 'Yeni Stil Dene', type: 'whatsapp' },
          { id: 'btn-aesthetic-trends', text: 'Trendler', type: 'whatsapp' },
          { id: 'btn-aesthetic-cancel', text: 'Vazgec', type: 'cancel' },
        ],
        statistics: {
          sent: 61,
          delivered: 60,
          deliveredRate: 98,
          opened: 55,
          openedRate: 91,
        },
      } as MessageNodeData,
    },
    {
      id: 'image-aesthetic-request',
      type: 'image_request',
      position: { x: 760, y: 200 },
      data: {
        label: 'Selfie Istegi',
        icon: 'CAM',
        requestMessage: 'Lutfen guncel bir selfie veya portre fotografi yukleyin. Dogal isik tercih edilir.',
        errorMessage: 'Fotograf algilanamadi. Lutfen yuzunuzun net oldugu bir selfie gonderin.',
        retryCount: 3,
        statistics: {
          sent: 55,
          delivered: 55,
          deliveredRate: 100,
          opened: 52,
          openedRate: 94,
        },
      } as ImageRequestNodeData,
    },
    {
      id: 'message-aesthetic-style',
      type: 'message',
      position: { x: 1120, y: 200 },
      data: {
        label: 'Stil Secimi',
        icon: 'ART',
        messageText: 'Hangi estetik tarzini denemek istersiniz? Dogal glam, soft-contour veya dramatic.',
        imageUrl: '/media/kel2.webp',
        buttons: [
          { id: 'btn-aesthetic-natural', text: 'Dogal Glam', type: 'whatsapp' },
          { id: 'btn-aesthetic-soft', text: 'Soft Contour', type: 'whatsapp' },
          { id: 'btn-aesthetic-drama', text: 'Dramatic', type: 'whatsapp' },
        ],
        statistics: {
          sent: 50,
          delivered: 50,
          deliveredRate: 100,
          opened: 48,
          openedRate: 96,
        },
      } as MessageNodeData,
    },
    {
      id: 'message-aesthetic-processing',
      type: 'message',
      position: { x: 1480, y: 200 },
      data: {
        label: 'Isleniyor',
        icon: 'WAIT',
        messageText: 'AI, yuz hatlarinizi analiz ediyor ve secilen makyaj stilini uyguluyor. 12 saniye bekleyin.',
        imageUrl: null,
        buttons: [],
        statistics: {
          sent: 48,
          delivered: 48,
          deliveredRate: 100,
          opened: 48,
          openedRate: 100,
        },
      } as MessageNodeData,
    },
    {
      id: 'result-aesthetic',
      type: 'result',
      position: { x: 1840, y: 200 },
      data: {
        label: 'Final Gorunumu',
        icon: 'FIN',
        outputTemplate: 'Secilen makyaj stili hazir! Danismanimiz ile 15 dakikalik online gorusme planlayin.',
        imageUrl: '/media/kel3.webp',
        appointmentButton: {
          text: 'Danismanla Goruş',
          phoneNumber: '905309876543',
          autoMessage: 'Merhaba! Estetik danismanligi icin gorusme talep ediyorum.',
        },
        delayedMessages: [
          { delay: 2, text: 'Paket: Premium Glow, 45 dakika uygulama' },
          { delay: 4, text: 'Adres: LookLab Estetik Studio, Nisantasi' },
        ],
        statistics: {
          sent: 47,
          delivered: 47,
          deliveredRate: 100,
          opened: 47,
          openedRate: 100,
          clicked: 28,
          clickRate: 59,
        },
      } as ResultNodeData,
    },
  ] as FlowNode[],

  edges: [
    { id: 'e-trigger-aesthetic-welcome', source: 'trigger-aesthetic', target: 'message-aesthetic-welcome', type: 'default' },
    { id: 'e-aesthetic-welcome-request', source: 'message-aesthetic-welcome', target: 'image-aesthetic-request', type: 'default' },
    { id: 'e-aesthetic-request-style', source: 'image-aesthetic-request', target: 'message-aesthetic-style', type: 'default' },
    { id: 'e-aesthetic-style-processing', source: 'message-aesthetic-style', target: 'message-aesthetic-processing', type: 'default' },
    { id: 'e-aesthetic-processing-result', source: 'message-aesthetic-processing', target: 'result-aesthetic', type: 'default' },
  ] as FlowEdge[],

  settings: {
    followerOnly: false,
    dailyQuota: 1000,
    usedQuota: 0,
    quotaResetPeriod: 'daily',
  },

  createdAt: '2024-02-10T09:15:00Z',
  updatedAt: new Date().toISOString(),
  totalInteractions: 0,
  totalCompletions: 0,
  averageCompletionTime: 0,
};

// ---------------------------------------------------------------------------
// Pet Products Flow
// ---------------------------------------------------------------------------

export const petProductsFlow: AutomationFlow = {
  id: 'flow-pet-products',
  name: 'Evcil Hayvan Ürünleri AI',
  description: 'Evcil hayvanlara tasma ve kiyafet deneme',
  templateId: 'pet-products',
  instagramAccountId: 'acc-1',
  status: 'inactive',
  testUsers: [],
  trigger: {
    keywords: ['tasma', 'kıyafet', 'pet', 'köpek', 'kedi'],
    exactMatch: false,
  },
  nodes: [
    {
      id: 'trigger-pet',
      type: 'trigger',
      position: { x: 50, y: 200 },
      data: {
        label: 'Kullanici "pet" yazdi',
        icon: 'TR',
        keywords: ['tasma', 'kıyafet', 'pet'],
        exactMatch: false,
        statistics: { sent: 0, delivered: 0, deliveredRate: 0, opened: 0, openedRate: 0 },
      } as TriggerNodeData,
    },
    {
      id: 'message-pet-welcome',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Evcil Hayvan Mesaji',
        icon: 'MSG',
        messageText: 'Pati stilistimiz hazir! Tasma, kiyafet veya aksesuar denemek ister misiniz? 🐾',
        imageUrl: '/media/pet1.webp',
        buttons: [
          { id: 'btn-pet-start', text: 'Baslayalim', type: 'whatsapp' },
          { id: 'btn-pet-accessories', text: 'Aksesuar', type: 'whatsapp' },
          { id: 'btn-pet-cancel', text: 'Iptal', type: 'cancel' },
        ],
        statistics: { sent: 48, delivered: 48, deliveredRate: 100, opened: 44, openedRate: 92 },
      } as MessageNodeData,
    },
    {
      id: 'image-pet-request',
      type: 'image_request',
      position: { x: 750, y: 200 },
      data: {
        label: 'Fotoğraf Istegi',
        icon: 'CAM',
        requestMessage: 'Evcil hayvaninizin net bir fotografini yukleyin. Kumandali oyuncaklari da ekleyebilirsiniz.',
        errorMessage: 'Fotoğraf algilanmadi. Lutfen hayvaninizin yuzunun net oldugu bir fotograf gonderin.',
        retryCount: 3,
        statistics: { sent: 44, delivered: 44, deliveredRate: 100, opened: 42, openedRate: 95 },
      } as ImageRequestNodeData,
    },
    {
      id: 'message-pet-style',
      type: 'message',
      position: { x: 1100, y: 200 },
      data: {
        label: 'Stil Secimi',
        icon: 'ART',
        messageText: 'Harika! Tasma, kiyafet veya aksesuar seciniz. Her stil icin ozellestirilmis bedenler mevcuttur.',
        imageUrl: '/media/pet2.webp',
        buttons: [
          { id: 'btn-pet-leash', text: 'Tasma', type: 'whatsapp' },
          { id: 'btn-pet-outfit', text: 'Kiyafet', type: 'whatsapp' },
          { id: 'btn-pet-accessory', text: 'Aksesuar', type: 'whatsapp' },
        ],
        statistics: { sent: 40, delivered: 40, deliveredRate: 100, opened: 39, openedRate: 97 },
      } as MessageNodeData,
    },
    {
      id: 'message-pet-processing',
      type: 'message',
      position: { x: 1450, y: 200 },
      data: {
        label: 'Isleniyor',
        icon: 'WAIT',
        messageText: 'Seçilen aksesuar ai tarafindan uygulanıyor. 12 saniye suruyor.',
        imageUrl: null,
        buttons: [],
        statistics: { sent: 38, delivered: 38, deliveredRate: 100, opened: 38, openedRate: 100 },
      } as MessageNodeData,
    },
    {
      id: 'result-pet',
      type: 'result',
      position: { x: 1800, y: 200 },
      data: {
        label: 'Sonuc ve Siparis',
        icon: 'FIN',
        outputTemplate: 'Yeni stil hazir! Birlikte en uygun bedeni ve teslim tarihini belirleyelim.',
        imageUrl: '/media/pet3.webp',
        appointmentButton: {
          text: 'Siparis Ver',
          phoneNumber: '905321001122',
          autoMessage: 'Merhaba! Evcil hayvanim icin denedigimiz stili siparis etmek istiyorum.',
        },
        delayedMessages: [
          { delay: 2, text: 'Not: Ölçü tablosu DM olarak gonderildi.' },
          { delay: 4, text: 'Kargo: 2 is gunu, 399 TL uzeri ucretsiz.' },
        ],
        statistics: {
          sent: 36,
          delivered: 36,
          deliveredRate: 100,
          opened: 36,
          openedRate: 100,
          clicked: 21,
          clickRate: 58,
        },
      } as ResultNodeData,
    },
  ],
  edges: [
    { id: 'e-pet-1', source: 'trigger-pet', target: 'message-pet-welcome', animated: false },
    { id: 'e-pet-2', source: 'message-pet-welcome', target: 'image-pet-request', animated: false },
    { id: 'e-pet-3', source: 'image-pet-request', target: 'message-pet-style', animated: false },
    { id: 'e-pet-4', source: 'message-pet-style', target: 'message-pet-processing', animated: false },
    { id: 'e-pet-5', source: 'message-pet-processing', target: 'result-pet', animated: false },
  ],
  createdAt: '2025-01-15T10:00:00Z',
  updatedAt: '2025-01-15T10:00:00Z',
  settings: {
    followerOnly: false,
    dailyQuota: 1000,
    usedQuota: 0,
    quotaResetPeriod: 'daily',
  },
  totalInteractions: 0,
  totalCompletions: 0,
  averageCompletionTime: 0,
};

// ---------------------------------------------------------------------------
// Car Wheels Flow
// ---------------------------------------------------------------------------

export const carWheelsFlow: AutomationFlow = {
  id: 'flow-car-wheels',
  name: 'Araba Jant/Lastik AI',
  description: 'Arabaya jant veya lastik deneme',
  templateId: 'car-wheels',
  instagramAccountId: 'acc-1',
  status: 'inactive',
  testUsers: [],
  trigger: {
    keywords: ['jant', 'lastik', 'wheels', 'tires'],
    exactMatch: false,
  },
  nodes: [
    {
      id: 'trigger-wheels',
      type: 'trigger',
      position: { x: 50, y: 200 },
      data: {
        label: 'Kullanici "jant" yazdi',
        icon: 'TR',
        keywords: ['jant', 'lastik'],
        exactMatch: false,
        statistics: { sent: 0, delivered: 0, deliveredRate: 0, opened: 0, openedRate: 0 },
      } as TriggerNodeData,
    },
    {
      id: 'message-wheels-welcome',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Jant Mesaji',
        icon: 'MSG',
        messageText: 'Performance Wheels AI asistani hazir! Jant veya lastik kombinasyonlarini saniyede deneyin. 🚗',
        imageUrl: '/media/rim1.webp',
        buttons: [
          { id: 'btn-wheels-start', text: 'Yeni Jant Dene', type: 'whatsapp' },
          { id: 'btn-wheels-size', text: 'Ölçü Sec', type: 'whatsapp' },
          { id: 'btn-wheels-cancel', text: 'Iptal', type: 'cancel' },
        ],
        statistics: { sent: 58, delivered: 57, deliveredRate: 98, opened: 53, openedRate: 93 },
      } as MessageNodeData,
    },
    {
      id: 'image-wheels-request',
      type: 'image_request',
      position: { x: 750, y: 200 },
      data: {
        label: 'Arac Fotografı',
        icon: 'CAM',
        requestMessage: 'Aracinizin yan profilden fotografini yukleyin. Jantlar net gorsun lutfen.',
        errorMessage: 'Fotograf net degil. Lutfen daha yakin ve net bir yan profil fotografi gonderin.',
        retryCount: 3,
        statistics: { sent: 51, delivered: 51, deliveredRate: 100, opened: 49, openedRate: 96 },
      } as ImageRequestNodeData,
    },
    {
      id: 'message-wheels-style',
      type: 'message',
      position: { x: 1100, y: 200 },
      data: {
        label: 'Stil Secimi',
        icon: 'RIM',
        messageText: 'Harika! Hangi jant/lastik setini denemek istersiniz?',
        imageUrl: '/media/rim2.webp',
        buttons: [
          { id: 'btn-wheels-sport', text: 'Sport', type: 'whatsapp' },
          { id: 'btn-wheels-classic', text: 'Classic', type: 'whatsapp' },
          { id: 'btn-wheels-offroad', text: 'Off-road', type: 'whatsapp' },
        ],
        statistics: { sent: 46, delivered: 46, deliveredRate: 100, opened: 45, openedRate: 97 },
      } as MessageNodeData,
    },
    {
      id: 'message-wheels-processing',
      type: 'message',
      position: { x: 1450, y: 200 },
      data: {
        label: 'Isleniyor',
        icon: 'WAIT',
        messageText: 'Secilen jant seti AI tarafindan uygulanıyor. Fren capaklari ve tire fit analiz ediliyor.',
        imageUrl: null,
        buttons: [],
        statistics: { sent: 44, delivered: 44, deliveredRate: 100, opened: 44, openedRate: 100 },
      } as MessageNodeData,
    },
    {
      id: 'result-wheels',
      type: 'result',
      position: { x: 1800, y: 200 },
      data: {
        label: 'Yeni Jant Görüntüsü',
        icon: 'FIN',
        outputTemplate: 'Yeni kombinasyon hazir! Montaj icin servis randevusu planlamak ister misiniz?',
        imageUrl: '/media/rim3.webp',
        appointmentButton: {
          text: 'Montaj Randevusu',
          phoneNumber: '905307770000',
          autoMessage: 'Merhaba! AI ile denedigimiz jant seti icin montaj randevusu almak istiyorum.',
        },
        delayedMessages: [
          { delay: 2, text: 'Servis: LookLab Wheels Garage, Maslak' },
          { delay: 4, text: 'Montaj suresi 45 dakika, balans dahil.' },
        ],
        statistics: { sent: 42, delivered: 42, deliveredRate: 100, opened: 42, openedRate: 100, clicked: 26, clickRate: 62 },
      } as ResultNodeData,
    },
  ],
  edges: [
    { id: 'e-wheels-1', source: 'trigger-wheels', target: 'message-wheels-welcome', animated: false },
    { id: 'e-wheels-2', source: 'message-wheels-welcome', target: 'image-wheels-request', animated: false },
    { id: 'e-wheels-3', source: 'image-wheels-request', target: 'message-wheels-style', animated: false },
    { id: 'e-wheels-4', source: 'message-wheels-style', target: 'message-wheels-processing', animated: false },
    { id: 'e-wheels-5', source: 'message-wheels-processing', target: 'result-wheels', animated: false },
  ],
  createdAt: '2025-01-15T11:00:00Z',
  updatedAt: '2025-01-15T11:00:00Z',
  settings: {
    followerOnly: false,
    dailyQuota: 1000,
    usedQuota: 0,
    quotaResetPeriod: 'daily',
  },
  totalInteractions: 0,
  totalCompletions: 0,
  averageCompletionTime: 0,
};

// ---------------------------------------------------------------------------
// Wall Paint Flow
// ---------------------------------------------------------------------------

export const wallPaintFlow: AutomationFlow = {
  id: 'flow-wall-paint',
  name: 'Duvar Rengi/Duvar Kağıdı AI',
  description: 'Duvar rengini veya desenini degistirme',
  templateId: 'wall-paint',
  instagramAccountId: 'acc-2',
  status: 'inactive',
  testUsers: [],
  trigger: {
    keywords: ['duvar', 'boya', 'wallpaper', 'wall'],
    exactMatch: false,
  },
  nodes: [
    {
      id: 'trigger-wall',
      type: 'trigger',
      position: { x: 50, y: 200 },
      data: {
        label: 'Kullanici "duvar" yazdi',
        icon: 'TR',
        keywords: ['duvar', 'boya'],
        exactMatch: false,
        statistics: { sent: 0, delivered: 0, deliveredRate: 0, opened: 0, openedRate: 0 },
      } as TriggerNodeData,
    },
    {
      id: 'message-wall-welcome',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Duvar Mesaji',
        icon: 'MSG',
        messageText: 'LookLab Decor AI ile duvarinizi saniyeler icinde yeni renkle gorun. 🎨',
        imageUrl: '/media/wall1.webp',
        buttons: [
          { id: 'btn-wall-start', text: 'Renk Dene', type: 'whatsapp' },
          { id: 'btn-wall-texture', text: 'Doku Sec', type: 'whatsapp' },
          { id: 'btn-wall-cancel', text: 'Iptal', type: 'cancel' },
        ],
        statistics: { sent: 62, delivered: 61, deliveredRate: 98, opened: 56, openedRate: 92 },
      } as MessageNodeData,
    },
    {
      id: 'image-wall-request',
      type: 'image_request',
      position: { x: 750, y: 200 },
      data: {
        label: 'Oda Fotografı',
        icon: 'CAM',
        requestMessage: 'Duvarin dogrudan gorundugu bir fotograf yukleyin. Gündüz isigi tercih edilir.',
        errorMessage: 'Fotograf uygun degil. Lutfen duvarin tumunu gosteren bir fotograf gonderin.',
        retryCount: 3,
        statistics: { sent: 57, delivered: 57, deliveredRate: 100, opened: 54, openedRate: 95 },
      } as ImageRequestNodeData,
    },
    {
      id: 'message-wall-style',
      type: 'message',
      position: { x: 1100, y: 200 },
      data: {
        label: 'Renk / Doku Secimi',
        icon: 'CLR',
        messageText: 'Hangi uygulamayi denemek istersiniz? Tek renk, dokulu boya veya duvar kagidi.',
        imageUrl: '/media/wall2.webp',
        buttons: [
          { id: 'btn-wall-solid', text: 'Tek Renk', type: 'whatsapp' },
          { id: 'btn-wall-textured', text: 'Dokulu', type: 'whatsapp' },
          { id: 'btn-wall-wallpaper', text: 'Duvar Kagidi', type: 'whatsapp' },
        ],
        statistics: { sent: 52, delivered: 52, deliveredRate: 100, opened: 51, openedRate: 98 },
      } as MessageNodeData,
    },
    {
      id: 'message-wall-processing',
      type: 'message',
      position: { x: 1450, y: 200 },
      data: {
        label: 'Isleniyor',
        icon: 'WAIT',
        messageText: 'Seciminiz AI tarafindan uygulanıyor. Aydinlik / gölge dengesi hesaplanıyor.',
        imageUrl: null,
        buttons: [],
        statistics: { sent: 50, delivered: 50, deliveredRate: 100, opened: 50, openedRate: 100 },
      } as MessageNodeData,
    },
    {
      id: 'result-wall',
      type: 'result',
      position: { x: 1800, y: 200 },
      data: {
        label: 'Yeni Duvar Görünümü',
        icon: 'FIN',
        outputTemplate: 'Yeni renk/doku uygulandi! Usta ekibimizle uygulama planlamak ister misiniz?',
        imageUrl: '/media/wall3.webp',
        appointmentButton: {
          text: 'Usta Cagir',
          phoneNumber: '905301234567',
          autoMessage: 'Merhaba! AI ile denedigimiz duvar rengini uygulamak istiyorum.',
        },
        delayedMessages: [
          { delay: 2, text: 'Servis: LookLab Decor, Kadikoy' },
          { delay: 4, text: 'Teklif: Metrekareye gore fiyat DM olarak gonderildi.' },
        ],
        statistics: { sent: 48, delivered: 48, deliveredRate: 100, opened: 48, openedRate: 100, clicked: 24, clickRate: 50 },
      } as ResultNodeData,
    },
  ],
  edges: [
    { id: 'e-wall-1', source: 'trigger-wall', target: 'message-wall-welcome', animated: false },
    { id: 'e-wall-2', source: 'message-wall-welcome', target: 'image-wall-request', animated: false },
    { id: 'e-wall-3', source: 'image-wall-request', target: 'message-wall-style', animated: false },
    { id: 'e-wall-4', source: 'message-wall-style', target: 'message-wall-processing', animated: false },
    { id: 'e-wall-5', source: 'message-wall-processing', target: 'result-wall', animated: false },
  ],
  createdAt: '2025-01-15T12:00:00Z',
  updatedAt: '2025-01-15T12:00:00Z',
  settings: {
    followerOnly: false,
    dailyQuota: 1000,
    usedQuota: 0,
    quotaResetPeriod: 'daily',
  },
  totalInteractions: 0,
  totalCompletions: 0,
  averageCompletionTime: 0,
};

// ---------------------------------------------------------------------------
// Furniture Placement Flow
// ---------------------------------------------------------------------------

export const furniturePlacementFlow: AutomationFlow = {
  id: 'flow-furniture-placement',
  name: 'Mobilya Yerleştirme AI',
  description: 'Odaya mobilya yerleştirme ve deneme',
  templateId: 'furniture-placement',
  instagramAccountId: 'acc-2',
  status: 'inactive',
  testUsers: [],
  trigger: {
    keywords: ['mobilya', 'koltuk', 'masa', 'furniture'],
    exactMatch: false,
  },
  nodes: [
    {
      id: 'trigger-furniture',
      type: 'trigger',
      position: { x: 50, y: 200 },
      data: {
        label: 'Kullanici "mobilya" yazdi',
        icon: 'TR',
        keywords: ['mobilya', 'koltuk'],
        exactMatch: false,
        statistics: { sent: 0, delivered: 0, deliveredRate: 0, opened: 0, openedRate: 0 },
      } as TriggerNodeData,
    },
    {
      id: 'message-furniture-welcome',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Mobilya Mesaji',
        icon: 'MSG',
        messageText: 'LookLab Interior AI ile odaniza mobilya yerlestirelim mi? 🛋',
        imageUrl: '/media/furniture1.webp',
        buttons: [
          { id: 'btn-furniture-start', text: 'Oda Deneme', type: 'whatsapp' },
          { id: 'btn-furniture-style', text: 'Stil Seç', type: 'whatsapp' },
          { id: 'btn-furniture-cancel', text: 'Iptal', type: 'cancel' },
        ],
        statistics: { sent: 54, delivered: 53, deliveredRate: 98, opened: 49, openedRate: 92 },
      } as MessageNodeData,
    },
    {
      id: 'image-furniture-room',
      type: 'image_request',
      position: { x: 750, y: 200 },
      data: {
        label: 'Oda Fotoğrafı',
        icon: 'CAM',
        requestMessage: 'Lutfen mobilya yerlestirmek istediginiz odanin fotografini yukleyin. Perspektif dik olmalı.',
        errorMessage: 'Fotograf yeterince net degil. Lutfen duz acili bir oda fotografi gonderin.',
        retryCount: 3,
        statistics: { sent: 49, delivered: 49, deliveredRate: 100, opened: 47, openedRate: 96 },
      } as ImageRequestNodeData,
    },
    {
      id: 'message-furniture-style',
      type: 'message',
      position: { x: 1100, y: 200 },
      data: {
        label: 'Stil Seçimi',
        icon: 'ART',
        messageText: 'Hangi yerlesim stilini denemek istersiniz? Minimal, modern veya sıcak nordic?',
        imageUrl: '/media/furniture2.webp',
        buttons: [
          { id: 'btn-furniture-minimal', text: 'Minimal', type: 'whatsapp' },
          { id: 'btn-furniture-modern', text: 'Modern', type: 'whatsapp' },
          { id: 'btn-furniture-nordic', text: 'Nordic', type: 'whatsapp' },
        ],
        statistics: { sent: 45, delivered: 45, deliveredRate: 100, opened: 44, openedRate: 98 },
      } as MessageNodeData,
    },
    {
      id: 'message-furniture-processing',
      type: 'message',
      position: { x: 1450, y: 200 },
      data: {
        label: 'Isleniyor',
        icon: 'WAIT',
        messageText: 'AI mobilya oranlarini hesapliyor ve odaniza yerlestiriyor. Kisa bir sure bekleyin.',
        imageUrl: null,
        buttons: [],
        statistics: { sent: 43, delivered: 43, deliveredRate: 100, opened: 43, openedRate: 100 },
      } as MessageNodeData,
    },
    {
      id: 'result-furniture',
      type: 'result',
      position: { x: 1800, y: 200 },
      data: {
        label: 'Yeni Yerleşim',
        icon: 'FIN',
        outputTemplate: 'Yeni mobilya yerleşimi hazir! Proje dosyasini ve fiyatlandirmayi paylasalim mi?',
        imageUrl: '/media/furniture3.webp',
        appointmentButton: {
          text: 'Dekorasyon Danismanligi',
          phoneNumber: '905305551212',
          autoMessage: 'Merhaba! AI ile hazirlanan mobilya yerlesimini hayata gecirmek istiyorum.',
        },
        delayedMessages: [
          { delay: 2, text: 'Paket: 3D Render + Uygulama ekibi' },
          { delay: 4, text: 'Teslim: 10 gun icinde proje baslangici' },
        ],
        statistics: { sent: 41, delivered: 41, deliveredRate: 100, opened: 41, openedRate: 100, clicked: 23, clickRate: 56 },
      } as ResultNodeData,
    },
  ],
  edges: [
    { id: 'e-furniture-1', source: 'trigger-furniture', target: 'message-furniture-welcome', animated: false },
    { id: 'e-furniture-2', source: 'message-furniture-welcome', target: 'image-furniture-room', animated: false },
    { id: 'e-furniture-3', source: 'image-furniture-room', target: 'message-furniture-style', animated: false },
    { id: 'e-furniture-4', source: 'message-furniture-style', target: 'message-furniture-processing', animated: false },
    { id: 'e-furniture-5', source: 'message-furniture-processing', target: 'result-furniture', animated: false },
  ],
  createdAt: '2025-01-15T13:00:00Z',
  updatedAt: '2025-01-15T13:00:00Z',
  settings: {
    followerOnly: false,
    dailyQuota: 1000,
    usedQuota: 0,
    quotaResetPeriod: 'daily',
  },
  totalInteractions: 0,
  totalCompletions: 0,
  averageCompletionTime: 0,
};

// ---------------------------------------------------------------------------
// Clothes Try-On Flow
// ---------------------------------------------------------------------------

export const clothesTryOnFlow: AutomationFlow = {
  id: 'flow-clothes-tryon',
  name: 'Elbise/Kıyafet Deneme AI',
  description: 'Kiyafet ve elbise sanal deneme',
  templateId: 'clothes-tryon',
  instagramAccountId: 'acc-3',
  status: 'active',
  testUsers: [],
  trigger: {
    keywords: ['elbise', 'kıyafet', 'clothes', 'dress'],
    exactMatch: false,
  },
  nodes: [
    {
      id: 'trigger-clothes',
      type: 'trigger',
      position: { x: 50, y: 200 },
      data: {
        label: 'Kullanici "elbise" yazdi',
        icon: 'TR',
        keywords: ['elbise', 'kıyafet'],
        exactMatch: false,
        statistics: { sent: 15, delivered: 15, deliveredRate: 100, opened: 14, openedRate: 93 },
      } as TriggerNodeData,
    },
    {
      id: 'message-clothes-welcome',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Kiyafet Mesaji',
        icon: 'MSG',
        messageText: 'AI Gardrop asistani hazir! Sanal olarak elbise denemek ister misiniz? 👗',
        imageUrl: '/media/dress1.webp',
        buttons: [
          { id: 'btn-clothes-start', text: 'Elbise Dene', type: 'whatsapp' },
          { id: 'btn-clothes-style', text: 'Stil Sec', type: 'whatsapp' },
          { id: 'btn-clothes-cancel', text: 'Iptal', type: 'cancel' },
        ],
        statistics: { sent: 38, delivered: 38, deliveredRate: 100, opened: 36, openedRate: 95 },
      } as MessageNodeData,
    },
    {
      id: 'image-clothes-request',
      type: 'image_request',
      position: { x: 750, y: 200 },
      data: {
        label: 'Vucut Fotografı',
        icon: 'CAM',
        requestMessage: 'Lutfen boydan cekilmis bir fotograf yukleyin. Arka plan sade olursa AI daha iyi calisir.',
        errorMessage: 'Fotograf uygunsuz. Lutfen dik ayakta, net bir fotograf gonderin.',
        retryCount: 3,
        statistics: { sent: 34, delivered: 34, deliveredRate: 100, opened: 32, openedRate: 94 },
      } as ImageRequestNodeData,
    },
    {
      id: 'message-clothes-style',
      type: 'message',
      position: { x: 1100, y: 200 },
      data: {
        label: 'Stil Secimi',
        icon: 'ART',
        messageText: 'Harika! Hangi kategoriyi denemek istersiniz? Gece elbisesi, günlük veya ofis.',
        imageUrl: '/media/dress2.webp',
        buttons: [
          { id: 'btn-clothes-evening', text: 'Gece', type: 'whatsapp' },
          { id: 'btn-clothes-casual', text: 'Günlük', type: 'whatsapp' },
          { id: 'btn-clothes-office', text: 'Ofis', type: 'whatsapp' },
        ],
        statistics: { sent: 32, delivered: 32, deliveredRate: 100, opened: 31, openedRate: 97 },
      } as MessageNodeData,
    },
    {
      id: 'message-clothes-processing',
      type: 'message',
      position: { x: 1450, y: 200 },
      data: {
        label: 'Isleniyor',
        icon: 'WAIT',
        messageText: 'AI beden oraninizi ve pozunuzu analiz ediyor. Kiyafet saniyeler icinde uygulanacak.',
        imageUrl: null,
        buttons: [],
        statistics: { sent: 31, delivered: 31, deliveredRate: 100, opened: 31, openedRate: 100 },
      } as MessageNodeData,
    },
    {
      id: 'result-clothes',
      type: 'result',
      position: { x: 1800, y: 200 },
      data: {
        label: 'Sanal Deneme Sonucu',
        icon: 'FIN',
        outputTemplate: 'Yeni kombin hazir! Sepete eklemek veya beden degistirmek ister misiniz?',
        imageUrl: '/media/dress3.webp',
        appointmentButton: {
          text: 'Satın Al',
          phoneNumber: '905308889999',
          autoMessage: 'Merhaba! AI ile denedigimiz elbiseyi satin almak istiyorum.',
        },
        delayedMessages: [
          { delay: 2, text: 'Bel/kalca oranı AI raporu DM olarak gonderildi.' },
          { delay: 4, text: 'İade garantisi 30 gün.' },
        ],
        statistics: { sent: 30, delivered: 30, deliveredRate: 100, opened: 30, openedRate: 100, clicked: 19, clickRate: 63 },
      } as ResultNodeData,
    },
  ],
  edges: [
    { id: 'e-clothes-1', source: 'trigger-clothes', target: 'message-clothes-welcome', animated: false },
    { id: 'e-clothes-2', source: 'message-clothes-welcome', target: 'image-clothes-request', animated: false },
    { id: 'e-clothes-3', source: 'image-clothes-request', target: 'message-clothes-style', animated: false },
    { id: 'e-clothes-4', source: 'message-clothes-style', target: 'message-clothes-processing', animated: false },
    { id: 'e-clothes-5', source: 'message-clothes-processing', target: 'result-clothes', animated: false },
  ],
  createdAt: '2025-01-15T14:00:00Z',
  updatedAt: '2025-01-15T14:00:00Z',
  settings: {
    followerOnly: false,
    dailyQuota: 1000,
    usedQuota: 15,
    quotaResetPeriod: 'daily',
  },
  totalInteractions: 15,
  totalCompletions: 12,
  averageCompletionTime: 180,
};

// ---------------------------------------------------------------------------
// Jewelry Flow
// ---------------------------------------------------------------------------

export const jewelryFlow: AutomationFlow = {
  id: 'flow-jewelry',
  name: 'Takı Deneme AI',
  description: 'Kolye, küpe, bileklik sanal deneme',
  templateId: 'jewelry',
  instagramAccountId: 'acc-3',
  status: 'active',
  testUsers: [],
  trigger: {
    keywords: ['takı', 'kolye', 'küpe', 'jewelry'],
    exactMatch: false,
  },
  nodes: [
    {
      id: 'trigger-jewelry',
      type: 'trigger',
      position: { x: 50, y: 200 },
      data: {
        label: 'Kullanici "takı" yazdi',
        icon: 'TR',
        keywords: ['takı', 'kolye'],
        exactMatch: false,
        statistics: { sent: 8, delivered: 8, deliveredRate: 100, opened: 8, openedRate: 100 },
      } as TriggerNodeData,
    },
    {
      id: 'message-jewelry-welcome',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Taki Mesaji',
        icon: 'MSG',
        messageText: 'LookLab Jewel AI ile kolye, küpe, yüzük saniyede deneyin. 💍',
        imageUrl: '/media/jewel1.webp',
        buttons: [
          { id: 'btn-jewelry-start', text: 'Kolye Dene', type: 'whatsapp' },
          { id: 'btn-jewelry-earring', text: 'Küpe Dene', type: 'whatsapp' },
          { id: 'btn-jewelry-cancel', text: 'Iptal', type: 'cancel' },
        ],
        statistics: { sent: 26, delivered: 26, deliveredRate: 100, opened: 25, openedRate: 96 },
      } as MessageNodeData,
    },
    {
      id: 'image-jewelry-request',
      type: 'image_request',
      position: { x: 750, y: 200 },
      data: {
        label: 'Portre Fotoğrafı',
        icon: 'CAM',
        requestMessage: 'Takiyi uygulamak icin yuzunuzun net goruldugu bir fotograf yukleyin.',
        errorMessage: 'Fotograf yetersiz. Lutfen omuz üstü net bir portre gonderin.',
        retryCount: 3,
        statistics: { sent: 24, delivered: 24, deliveredRate: 100, opened: 23, openedRate: 96 },
      } as ImageRequestNodeData,
    },
    {
      id: 'message-jewelry-style',
      type: 'message',
      position: { x: 1100, y: 200 },
      data: {
        label: 'Takı Kategorisi',
        icon: 'ART',
        messageText: 'Harika! Kolye, küpe veya yüzükten birini secin. Her biri icin cesitli stiller var.',
        imageUrl: '/media/jewel2.webp',
        buttons: [
          { id: 'btn-jewelry-necklace', text: 'Kolye', type: 'whatsapp' },
          { id: 'btn-jewelry-earrings', text: 'Küpe', type: 'whatsapp' },
          { id: 'btn-jewelry-ring', text: 'Yüzük', type: 'whatsapp' },
        ],
        statistics: { sent: 23, delivered: 23, deliveredRate: 100, opened: 22, openedRate: 96 },
      } as MessageNodeData,
    },
    {
      id: 'message-jewelry-processing',
      type: 'message',
      position: { x: 1450, y: 200 },
      data: {
        label: 'Isleniyor',
        icon: 'WAIT',
        messageText: 'AI yuz hatlarinizi analiz edip takiyi yerlestiriyor. Lutfen 8 saniye bekleyin.',
        imageUrl: null,
        buttons: [],
        statistics: { sent: 22, delivered: 22, deliveredRate: 100, opened: 22, openedRate: 100 },
      } as MessageNodeData,
    },
    {
      id: 'result-jewelry',
      type: 'result',
      position: { x: 1800, y: 200 },
      data: {
        label: 'Takı Deneme Sonucu',
        icon: 'FIN',
        outputTemplate: 'Secilen takı sizde boyle duruyor! Sepete eklemek veya farkli renk denemek ister misiniz?',
        imageUrl: '/media/jewel3.webp',
        appointmentButton: {
          text: 'Satın Al',
          phoneNumber: '905309990606',
          autoMessage: 'Merhaba! AI ile denedigimiz takiyi satin almak istiyorum.',
        },
        delayedMessages: [
          { delay: 2, text: 'Alerji testi ve sertifika bilgisi DM olarak gonderildi.' },
          { delay: 4, text: 'Kargo: 24 saat icinde, ücretsiz degisim 14 gün.' },
        ],
        statistics: { sent: 21, delivered: 21, deliveredRate: 100, opened: 21, openedRate: 100, clicked: 13, clickRate: 62 },
      } as ResultNodeData,
    },
  ],
  edges: [
    { id: 'e-jewelry-1', source: 'trigger-jewelry', target: 'message-jewelry-welcome', animated: false },
    { id: 'e-jewelry-2', source: 'message-jewelry-welcome', target: 'image-jewelry-request', animated: false },
    { id: 'e-jewelry-3', source: 'image-jewelry-request', target: 'message-jewelry-style', animated: false },
    { id: 'e-jewelry-4', source: 'message-jewelry-style', target: 'message-jewelry-processing', animated: false },
    { id: 'e-jewelry-5', source: 'message-jewelry-processing', target: 'result-jewelry', animated: false },
  ],
  createdAt: '2025-01-15T15:00:00Z',
  updatedAt: '2025-01-15T15:00:00Z',
  settings: {
    followerOnly: false,
    dailyQuota: 1000,
    usedQuota: 8,
    quotaResetPeriod: 'daily',
  },
  totalInteractions: 8,
  totalCompletions: 7,
  averageCompletionTime: 150,
};

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

export const mockFlows: AutomationFlow[] = [
  hairRestorationFlow,
  carColorChangerFlow,
  aestheticAIFlow,
  petProductsFlow,
  carWheelsFlow,
  wallPaintFlow,
  furniturePlacementFlow,
  clothesTryOnFlow,
  jewelryFlow,
];

export function getMockFlowById(id: string): AutomationFlow | undefined {
  return mockFlows.find(
    (flow) => flow.id === id || flow.templateId === id
  );
}

export function getMockFlowByTemplateId(templateId: string): AutomationFlow | undefined {
  return mockFlows.find((flow) => flow.templateId === templateId);
}

export function getMockFlowsByAccount(accountId: string): AutomationFlow[] {
  return mockFlows.filter((flow) => flow.instagramAccountId === accountId);
}

export function getActiveFlows(): AutomationFlow[] {
  return mockFlows.filter((flow) => flow.status === 'active');
}




