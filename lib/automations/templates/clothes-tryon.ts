import { AutomationTemplate } from '../types';

export const clothesTryOnTemplate: AutomationTemplate = {
  id: 'clothes-tryon',
  name: 'Elbise/Kiyafet Deneme AI',
  description: 'Kiyafet ve elbise sanal deneme. Moda markalari ve e-ticaret icin.',
  category: 'Fashion',
  gradient: 'bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500',
  accentColor: 'text-purple-600',
  installs: 4521,
  icon: '👗',
  flow: {
    steps: [
      { id: 's1', type: 'message', content: 'Fotografinizi gonderin 👗', delay: 0 },
      { id: 's2', type: 'image_request', content: 'Fotografınız bekleniyor...', requiresInput: true },
      { id: 's3', type: 'message', content: 'Denemek istediginiz kiyafeti gonderin 👕', delay: 1000 },
      { id: 's4', type: 'image_request', content: 'Kiyafet fotografı bekleniyor...', requiresInput: true },
      { id: 's5', type: 'ai_processing', content: 'Kiyafet giydirilyor...', delay: 3000 },
      { id: 's6', type: 'result', content: '✨ Size cok yakisti!', delay: 500 },
      { id: 's7', type: 'cta', content: '🛍️ Satin Al', metadata: { action: 'purchase' } },
    ],
    setupInstructions: ['AI model endpoint ayarla', 'E-ticaret bagla'],
    requiredVariables: ['AI_MODEL_ENDPOINT', 'SHOP_URL'],
  },
  metadata: {
    version: '1.0.0',
    author: 'LookLab Team',
    tags: ['fashion', 'clothes', 'tryon', 'ai'],
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
  },
};
