import { AutomationTemplate } from '../types';

export const jewelryTemplate: AutomationTemplate = {
  id: 'jewelry',
  name: 'Taki Deneme AI',
  description: 'Kolye, kupe, bileklik sanal deneme. Kuyumcular ve taki markalari icin.',
  category: 'Jewelry',
  gradient: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500',
  accentColor: 'text-yellow-600',
  installs: 3245,
  icon: '💎',
  flow: {
    steps: [
      { id: 's1', type: 'message', content: 'Fotografinizi gonderin 💍', delay: 0 },
      { id: 's2', type: 'image_request', content: 'Fotografınız bekleniyor...', requiresInput: true },
      { id: 's3', type: 'message', content: 'Denemek istediginiz takiyi gonderin ✨', delay: 1000 },
      { id: 's4', type: 'image_request', content: 'Taki fotografı bekleniyor...', requiresInput: true },
      { id: 's5', type: 'ai_processing', content: 'Taki takiliyor...', delay: 3000 },
      { id: 's6', type: 'result', content: '💎 Muhteşem gorunuyor!', delay: 500 },
      { id: 's7', type: 'cta', content: '🛒 Satin Al', metadata: { action: 'purchase' } },
    ],
    setupInstructions: ['AI model endpoint ayarla', 'E-ticaret bagla'],
    requiredVariables: ['AI_MODEL_ENDPOINT', 'SHOP_URL'],
  },
  metadata: {
    version: '1.0.0',
    author: 'LookLab Team',
    tags: ['jewelry', 'accessories', 'fashion', 'ai'],
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
  },
};
