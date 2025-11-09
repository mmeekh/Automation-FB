import { AutomationTemplate } from '../types';

export const furniturePlacementTemplate: AutomationTemplate = {
  id: 'furniture-placement',
  name: 'Mobilya Yerlestirme AI',
  description: 'Odaya mobilya sanal yerlestirme. Mobilya magazalari ve ic mimarlar icin ideal.',
  category: 'Interior Design',
  gradient: 'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500',
  accentColor: 'text-teal-600',
  installs: 1876,
  icon: '🛋️',
  flow: {
    steps: [
      { id: 's1', type: 'message', content: 'Odanizin fotografini gonderin 🛋️', delay: 0 },
      { id: 's2', type: 'image_request', content: 'Oda fotografı bekleniyor...', requiresInput: true },
      { id: 's3', type: 'message', content: 'Yerlestirmek istediginiz mobilyayi gonderin 🪑', delay: 1000 },
      { id: 's4', type: 'image_request', content: 'Mobilya fotografı bekleniyor...', requiresInput: true },
      { id: 's5', type: 'ai_processing', content: 'Mobilya yerlestiriliyor...', delay: 3000 },
      { id: 's6', type: 'result', content: '✨ Odanizin yeni hali!', delay: 500 },
      { id: 's7', type: 'cta', content: '🛒 Satin Al', metadata: { action: 'purchase' } },
    ],
    setupInstructions: ['AI model endpoint ayarla', 'E-ticaret baglantisi yap'],
    requiredVariables: ['AI_MODEL_ENDPOINT', 'SHOP_URL'],
  },
  metadata: {
    version: '1.0.0',
    author: 'LookLab Team',
    tags: ['furniture', 'interior', 'ar', 'ai'],
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
  },
};
