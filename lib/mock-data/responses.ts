import { AutomationResponse, ConversationMessage } from '../types/response';

/**
 * Sample automation responses
 */
export const mockResponses: AutomationResponse[] = [
  {
    id: 'resp-1',
    flowId: 'flow-hair-restoration-1',
    flowName: 'Saç Restorasyon AI',

    userId: 'user-1',
    username: '3lfi',
    profilePicture: 'https://i.pravatar.cc/150?img=11',

    inputImage1: '/media/hairchange1.webp',
    inputImage2: '/media/hairchange2.webp',
    outputImage: '/media/hairchange3.webp',

    status: 'completed',

    conversationLog: [
      {
        id: 'msg-1',
        sender: 'user',
        type: 'text',
        content: 'saç',
        timestamp: '2024-01-20T10:15:00Z',
      },
      {
        id: 'msg-2',
        sender: 'bot',
        type: 'text',
        content: 'Merhaba! 👋 Saç modelinizi AI ile değiştirebilirim.',
        timestamp: '2024-01-20T10:15:01Z',
        nodeId: 'message-welcome',
      },
      {
        id: 'msg-3',
        sender: 'user',
        type: 'button_click',
        content: 'Hadi Başlayalım! 🚀',
        timestamp: '2024-01-20T10:15:10Z',
      },
      {
        id: 'msg-4',
        sender: 'bot',
        type: 'text',
        content: 'Lütfen mevcut saç fotoğrafınızı gönderin 📸',
        timestamp: '2024-01-20T10:15:11Z',
        nodeId: 'image-req-1',
      },
      {
        id: 'msg-5',
        sender: 'user',
        type: 'image',
        content: '/media/hairchange1.webp',
        timestamp: '2024-01-20T10:16:00Z',
      },
      {
        id: 'msg-6',
        sender: 'bot',
        type: 'text',
        content: 'Harika! Şimdi hangi saç stilini denemek istersiniz?',
        timestamp: '2024-01-20T10:16:01Z',
        nodeId: 'message-style',
      },
      {
        id: 'msg-7',
        sender: 'user',
        type: 'button_click',
        content: 'Sarı Saç',
        timestamp: '2024-01-20T10:16:15Z',
      },
      {
        id: 'msg-8',
        sender: 'bot',
        type: 'text',
        content: 'Fotoğrafınız AI tarafından işleniyor... ✨',
        timestamp: '2024-01-20T10:16:16Z',
        nodeId: 'message-processing',
      },
      {
        id: 'msg-9',
        sender: 'bot',
        type: 'image',
        content: '/media/hairchange3.webp',
        timestamp: '2024-01-20T10:16:30Z',
        nodeId: 'result-final',
      },
      {
        id: 'msg-10',
        sender: 'bot',
        type: 'text',
        content: 'İşte yeni saç modeliniz! 💖',
        timestamp: '2024-01-20T10:16:31Z',
        nodeId: 'result-final',
      },
      {
        id: 'msg-11',
        sender: 'user',
        type: 'button_click',
        content: 'Randevu Al 📅',
        timestamp: '2024-01-20T10:17:00Z',
      },
    ],

    startedAt: '2024-01-20T10:15:00Z',
    completedAt: '2024-01-20T10:17:00Z',
    duration: 120,
    retriesCount: 0,

    buttonClicks: {
      'btn-start': 1,
      'btn-blonde': 1,
      'appointment-btn': 1,
    },
  },

  {
    id: 'resp-2',
    flowId: 'flow-hair-restoration-1',
    flowName: 'Saç Restorasyon AI',

    userId: 'user-2',
    username: 'ayse_beauty',
    profilePicture: 'https://i.pravatar.cc/150?img=12',

    inputImage1: 'https://picsum.photos/400/600?random=1',
    inputImage2: 'https://picsum.photos/400/600?random=2',
    outputImage: 'https://picsum.photos/400/600?random=3',

    status: 'completed',

    conversationLog: [],

    startedAt: '2024-01-20T11:30:00Z',
    completedAt: '2024-01-20T11:32:00Z',
    duration: 120,
    retriesCount: 1,

    buttonClicks: {
      'btn-start': 1,
      'btn-red': 1,
    },
  },

  {
    id: 'resp-3',
    flowId: 'flow-hair-restoration-1',
    flowName: 'Saç Restorasyon AI',

    userId: 'user-3',
    username: 'burcu_yilmaz',
    profilePicture: 'https://i.pravatar.cc/150?img=13',

    inputImage1: 'https://picsum.photos/400/600?random=4',
    inputImage2: 'https://picsum.photos/400/600?random=5',
    outputImage: 'https://picsum.photos/400/600?random=6',

    status: 'in_progress',

    conversationLog: [],

    startedAt: '2024-01-20T12:00:00Z',
    duration: undefined,
    retriesCount: 0,

    buttonClicks: {
      'btn-start': 1,
    },
  },

  {
    id: 'resp-4',
    flowId: 'flow-hair-restoration-1',
    flowName: 'Saç Restorasyon AI',

    userId: 'user-4',
    username: 'mehmet_k',
    profilePicture: 'https://i.pravatar.cc/150?img=14',

    inputImage1: 'https://picsum.photos/400/600?random=7',
    inputImage2: 'https://picsum.photos/400/600?random=8',
    outputImage: '',

    status: 'failed',
    failureReason: 'User sent text instead of image after 3 retries',

    conversationLog: [],

    startedAt: '2024-01-20T13:15:00Z',
    completedAt: '2024-01-20T13:17:00Z',
    duration: 120,
    retriesCount: 3,

    buttonClicks: {},
  },

  {
    id: 'resp-5',
    flowId: 'flow-hair-restoration-1',
    flowName: 'Saç Restorasyon AI',

    userId: 'user-5',
    username: 'zeynep_style',
    profilePicture: 'https://i.pravatar.cc/150?img=15',

    inputImage1: 'https://picsum.photos/400/600?random=9',
    inputImage2: 'https://picsum.photos/400/600?random=10',
    outputImage: 'https://picsum.photos/400/600?random=11',

    status: 'completed',

    conversationLog: [],

    startedAt: '2024-01-20T14:00:00Z',
    completedAt: '2024-01-20T14:02:30Z',
    duration: 150,
    retriesCount: 0,

    buttonClicks: {
      'btn-start': 1,
      'btn-dark': 1,
      'appointment-btn': 1,
    },
  },
];

/**
 * Get response by ID
 */
export function getMockResponseById(id: string): AutomationResponse | undefined {
  return mockResponses.find((resp) => resp.id === id);
}

/**
 * Get responses by flow ID
 */
export function getMockResponsesByFlow(flowId: string): AutomationResponse[] {
  return mockResponses.filter((resp) => resp.flowId === flowId);
}

/**
 * Get responses with pagination
 */
export function getMockResponsesPaginated(page: number = 1, pageSize: number = 10) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    responses: mockResponses.slice(start, end),
    pagination: {
      page,
      pageSize,
      total: mockResponses.length,
      totalPages: Math.ceil(mockResponses.length / pageSize),
    },
  };
}

/**
 * Filter responses
 */
export function filterMockResponses(filters: {
  status?: string;
  username?: string;
  flowId?: string;
}): AutomationResponse[] {
  return mockResponses.filter((resp) => {
    if (filters.status && resp.status !== filters.status) return false;
    if (filters.username && !resp.username.includes(filters.username)) return false;
    if (filters.flowId && resp.flowId !== filters.flowId) return false;
    return true;
  });
}
