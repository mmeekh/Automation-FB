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
  description: 'Kullanicilarin sac modellerini AI ile degistirir',
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
        messageText: 'Merhaba! Arabanizin rengini AI ile degistirebilirim.',
        imageUrl: null,
        buttons: [],
        statistics: {
          sent: 12,
          delivered: 12,
          deliveredRate: 100,
          opened: 11,
          openedRate: 91.7,
        },
      } as MessageNodeData,
    },
    {
      id: 'result-car',
      type: 'result',
      position: { x: 750, y: 200 },
      data: {
        label: 'Sonuc',
        icon: 'FIN',
        outputTemplate: 'Yeni renkteki araban hazir!',
        imageUrl: null,
        statistics: {
          sent: 10,
          delivered: 10,
          deliveredRate: 100,
          opened: 10,
          openedRate: 100,
        },
      } as ResultNodeData,
    },
  ] as FlowNode[],

  edges: [
    { id: 'e-trigger-welcome', source: 'trigger-car', target: 'message-car-welcome', type: 'default' },
    { id: 'e-welcome-result', source: 'message-car-welcome', target: 'result-car', type: 'default' },
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
      id: 'message-aesthetic-info',
      type: 'message',
      position: { x: 400, y: 200 },
      data: {
        label: 'Bilgi Mesaji',
        icon: 'MSG',
        messageText: 'Estetik cozumlerimiz icin AI sistemimiz hazir.',
        imageUrl: null,
        buttons: [],
        statistics: {
          sent: 0,
          delivered: 0,
          deliveredRate: 0,
          opened: 0,
          openedRate: 0,
        },
      } as MessageNodeData,
    },
  ] as FlowNode[],

  edges: [
    { id: 'e-trigger-info', source: 'trigger-aesthetic', target: 'message-aesthetic-info', type: 'default' },
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
        messageText: 'Evcil hayvaniniz icin tasma veya kiyafet denemek ister misiniz? 🐾',
        imageUrl: null,
        buttons: [
          { id: 'btn-pet-start', text: 'Evet!', type: 'whatsapp' },
          { id: 'btn-pet-cancel', text: 'Hayir', type: 'cancel' },
        ],
        statistics: { sent: 0, delivered: 0, deliveredRate: 0, opened: 0, openedRate: 0 },
      } as MessageNodeData,
    },
  ],
  edges: [
    { id: 'e-pet-1', source: 'trigger-pet', target: 'message-pet-welcome', animated: false },
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
        messageText: 'Arabaniza farkli jant veya lastik denemek ister misiniz? 🚗',
        imageUrl: null,
        buttons: [
          { id: 'btn-wheels-start', text: 'Evet!', type: 'whatsapp' },
          { id: 'btn-wheels-cancel', text: 'Hayir', type: 'cancel' },
        ],
        statistics: { sent: 0, delivered: 0, deliveredRate: 0, opened: 0, openedRate: 0 },
      } as MessageNodeData,
    },
  ],
  edges: [
    { id: 'e-wheels-1', source: 'trigger-wheels', target: 'message-wheels-welcome', animated: false },
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
        messageText: 'Duvarlariniza farkli renk veya desen denemek ister misiniz? 🎨',
        imageUrl: null,
        buttons: [
          { id: 'btn-wall-start', text: 'Evet!', type: 'whatsapp' },
          { id: 'btn-wall-cancel', text: 'Hayir', type: 'cancel' },
        ],
        statistics: { sent: 0, delivered: 0, deliveredRate: 0, opened: 0, openedRate: 0 },
      } as MessageNodeData,
    },
  ],
  edges: [
    { id: 'e-wall-1', source: 'trigger-wall', target: 'message-wall-welcome', animated: false },
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
        messageText: 'Odaniza farkli mobilyalar yerleştirmek ister misiniz? 🛋',
        imageUrl: null,
        buttons: [
          { id: 'btn-furniture-start', text: 'Evet!', type: 'whatsapp' },
          { id: 'btn-furniture-cancel', text: 'Hayir', type: 'cancel' },
        ],
        statistics: { sent: 0, delivered: 0, deliveredRate: 0, opened: 0, openedRate: 0 },
      } as MessageNodeData,
    },
  ],
  edges: [
    { id: 'e-furniture-1', source: 'trigger-furniture', target: 'message-furniture-welcome', animated: false },
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
        messageText: 'Farkli kiyafetleri sanal olarak denemek ister misiniz? 👗',
        imageUrl: null,
        buttons: [
          { id: 'btn-clothes-start', text: 'Evet!', type: 'whatsapp' },
          { id: 'btn-clothes-cancel', text: 'Hayir', type: 'cancel' },
        ],
        statistics: { sent: 15, delivered: 15, deliveredRate: 100, opened: 14, openedRate: 93 },
      } as MessageNodeData,
    },
  ],
  edges: [
    { id: 'e-clothes-1', source: 'trigger-clothes', target: 'message-clothes-welcome', animated: false },
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
        messageText: 'Farkli takilari sanal olarak denemek ister misiniz? 💍',
        imageUrl: null,
        buttons: [
          { id: 'btn-jewelry-start', text: 'Evet!', type: 'whatsapp' },
          { id: 'btn-jewelry-cancel', text: 'Hayir', type: 'cancel' },
        ],
        statistics: { sent: 8, delivered: 8, deliveredRate: 100, opened: 8, openedRate: 100 },
      } as MessageNodeData,
    },
  ],
  edges: [
    { id: 'e-jewelry-1', source: 'trigger-jewelry', target: 'message-jewelry-welcome', animated: false },
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
  return mockFlows.find((flow) => flow.id === id);
}

export function getMockFlowsByAccount(accountId: string): AutomationFlow[] {
  return mockFlows.filter((flow) => flow.instagramAccountId === accountId);
}

export function getActiveFlows(): AutomationFlow[] {
  return mockFlows.filter((flow) => flow.status === 'active');
}




