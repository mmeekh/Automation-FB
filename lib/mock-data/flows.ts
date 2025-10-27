import {
  AutomationFlow,
  FlowNode,
  FlowEdge,
  TriggerNodeData,
  MessageNodeData,
  ImageRequestNodeData,
  ResultNodeData,
} from '../types/flow';

/**
 * Sample Hair Restoration Flow
 */
export const hairRestorationFlow: AutomationFlow = {
  id: 'flow-instagram-bald-to-haired',
  name: 'Saç Restorasyon AI',
  description: 'Kullanıcıların saç modellerini AI ile dönüştürür',
  templateId: 'instagram-bald-to-haired',
  instagramAccountId: 'acc-1',

  status: 'active',
  testUsers: ['test_user1', 'test_user2'],

  trigger: {
    keywords: ['saç', 'sac', 'SAÇ', 'hair'],
    exactMatch: false,
  },

  nodes: [
    // 1. Trigger Node
    {
      id: 'trigger-1',
      type: 'trigger',
      position: { x: 50, y: 150 },
      data: {
        label: 'Kullanıcı "saç" yazdı',
        icon: '⚡',
        keywords: ['saç', 'sac', 'SAÇ', 'hair'],
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

    // 2. Welcome Message
    {
      id: 'message-welcome',
      type: 'message',
      position: { x: 450, y: 150 },
      data: {
        label: 'Hoşgeldin Mesajı',
        icon: '💬',
        messageText:
          'Merhaba! 👋 Saç modelinizi AI ile değiştirebilirim.\n\nSize farklı saç stilleri göstereceğim! 💇‍♀️✨',
        imageUrl: null,
        buttons: [
          {
            id: 'btn-start',
            text: 'Hadi Başlayalım! 🚀',
            type: 'whatsapp',
          },
          {
            id: 'btn-cancel',
            text: 'İptal',
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

    // 3. Request First Image
    {
      id: 'image-req-1',
      type: 'image_request',
      position: { x: 250, y: 500 },
      data: {
        label: 'İlk Fotoğraf İsteği',
        icon: '🖼️',
        requestMessage: 'Lütfen mevcut saç fotoğrafınızı gönderin 📸',
        errorMessage: '⚠️ Hata! Lütfen bir fotoğraf gönderin (yazı değil)',
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

    // 4. Ask for Style Preference
    {
      id: 'message-style',
      type: 'message',
      position: { x: 250, y: 750 },
      data: {
        label: 'Stil Seçimi',
        icon: '💅',
        messageText: 'Harika! Şimdi hangi saç stilini denemek istersiniz?',
        imageUrl: '/media/hairchange2.webp',
        buttons: [
          {
            id: 'btn-blonde',
            text: 'Sarı Saç',
            type: 'whatsapp',
          },
          {
            id: 'btn-red',
            text: 'Kızıl Saç',
            type: 'whatsapp',
          },
          {
            id: 'btn-dark',
            text: 'Koyu Renk',
            type: 'whatsapp',
          },
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

    // 5. Processing Message
    {
      id: 'message-processing',
      type: 'message',
      position: { x: 250, y: 1050 },
      data: {
        label: 'İşleniyor Mesajı',
        icon: '⏳',
        messageText: 'Fotoğrafınız AI tarafından işleniyor... ✨\n\nBu 10-15 saniye sürebilir.',
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

    // 6. Result with Appointment
    {
      id: 'result-final',
      type: 'result',
      position: { x: 250, y: 1350 },
      data: {
        label: 'Sonuç & Randevu',
        icon: '🎨',
        outputTemplate:
          'İşte yeni saç modeliniz! 💖\n\nBeğendiniz mi? Salonumuza gelerek bu görünümü elde edebilirsiniz! 💇‍♀️',
        imageUrl: '/media/hairchange3.webp',
        appointmentButton: {
          text: 'Randevu Al 📅',
          phoneNumber: '905449422355',
          autoMessage: 'Merhaba! Saç değişimi için randevu almak istiyorum 💇‍♀️',
        },
        delayedMessages: [
          {
            delay: 2,
            text: '🌟 Salon Adı: SwordNest Hair Studio',
          },
          {
            delay: 3,
            text: '📍 Adres: İstanbul, Kadıköy\n⏰ Çalışma saatleri: 09:00 - 19:00',
          },
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
    {
      id: 'e-trigger-welcome',
      source: 'trigger-1',
      target: 'message-welcome',
      type: 'default',
    },
    {
      id: 'e-welcome-img1',
      source: 'message-welcome',
      target: 'image-req-1',
      type: 'default',
    },
    {
      id: 'e-img1-style',
      source: 'image-req-1',
      target: 'message-style',
      type: 'default',
    },
    {
      id: 'e-style-processing',
      source: 'message-style',
      target: 'message-processing',
      type: 'default',
    },
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

/**
 * Sample Car Color Changer Flow
 */
export const carColorChangerFlow: AutomationFlow = {
  id: 'flow-instagram-car-color-changer',
  name: 'Araba Renk Değiştirme AI',
  description: 'Arabanızın rengini AI ile değiştirin',
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
      position: { x: 100, y: 100 },
      data: {
        label: 'Kullanıcı "araba" yazdı',
        icon: '🚗',
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
      position: { x: 100, y: 250 },
      data: {
        label: 'Hoşgeldin Mesajı',
        icon: '💬',
        messageText: 'Merhaba! 🚗 Arabanızın rengini AI ile değiştirebilirim.',
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
      position: { x: 100, y: 450 },
      data: {
        label: 'Sonuç',
        icon: '🎨',
        outputTemplate: 'İşte yeni renkteki arabanız! 🚗✨',
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
    {
      id: 'e-trigger-welcome',
      source: 'trigger-car',
      target: 'message-car-welcome',
      type: 'default',
    },
    {
      id: 'e-welcome-result',
      source: 'message-car-welcome',
      target: 'result-car',
      type: 'default',
    },
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

/**
 * Sample Aesthetic AI Flow
 */
export const aestheticAIFlow: AutomationFlow = {
  id: 'flow-instagram-aesthetic-bald',
  name: 'Aesthetic AI',
  description: 'Estetik AI dönüşümleri',
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
      position: { x: 100, y: 100 },
      data: {
        label: 'Kullanıcı "estetik" yazdı',
        icon: '✨',
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
      position: { x: 100, y: 250 },
      data: {
        label: 'Bilgi Mesajı',
        icon: '💬',
        messageText: 'Estetik dönüşümler için AI sistemimiz çalışıyor! ✨',
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
    {
      id: 'e-trigger-info',
      source: 'trigger-aesthetic',
      target: 'message-aesthetic-info',
      type: 'default',
    },
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

/**
 * Sample Nail Transformation Flow
 */
export const nailTransformationFlow: AutomationFlow = {
  id: 'flow-instagram-nail-transformation',
  name: 'Tırnak Tasarım AI',
  description: 'Tırnak tasarımlarınızı AI ile dönüştürün',
  templateId: 'instagram-nail-transformation',
  instagramAccountId: 'acc-4',

  status: 'inactive',
  testUsers: [],

  trigger: {
    keywords: ['tırnak', 'nail', 'manikür'],
    exactMatch: false,
  },

  nodes: [
    {
      id: 'trigger-nail',
      type: 'trigger',
      position: { x: 100, y: 100 },
      data: {
        label: 'Kullanıcı "tırnak" yazdı',
        icon: '💅',
        keywords: ['tırnak', 'nail', 'manikür'],
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
      id: 'message-nail-welcome',
      type: 'message',
      position: { x: 100, y: 250 },
      data: {
        label: 'Hoşgeldin Mesajı',
        icon: '💬',
        messageText: 'Tırnak tasarımlarınızı AI ile değiştirebilirim! 💅✨',
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
    {
      id: 'e-trigger-welcome',
      source: 'trigger-nail',
      target: 'message-nail-welcome',
      type: 'default',
    },
  ] as FlowEdge[],

  settings: {
    followerOnly: false,
    dailyQuota: 800,
    usedQuota: 0,
    quotaResetPeriod: 'daily',
  },

  createdAt: '2024-02-15T11:00:00Z',
  updatedAt: new Date().toISOString(),

  totalInteractions: 0,
  totalCompletions: 0,
  averageCompletionTime: 0,
};

/**
 * All mock flows
 */
export const mockFlows: AutomationFlow[] = [
  hairRestorationFlow,
  carColorChangerFlow,
  aestheticAIFlow,
  nailTransformationFlow,
];

/**
 * Get flow by ID
 */
export function getMockFlowById(id: string): AutomationFlow | undefined {
  return mockFlows.find((flow) => flow.id === id);
}

/**
 * Get flows by account ID
 */
export function getMockFlowsByAccount(accountId: string): AutomationFlow[] {
  return mockFlows.filter((flow) => flow.instagramAccountId === accountId);
}

/**
 * Get active flows only
 */
export function getActiveFlows(): AutomationFlow[] {
  return mockFlows.filter((flow) => flow.status === 'active');
}
