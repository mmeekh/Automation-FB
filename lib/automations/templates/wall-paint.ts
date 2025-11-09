import { AutomationTemplate } from '../types';

export const wallPaintTemplate: AutomationTemplate = {
  id: 'wall-paint',
  name: 'Duvar Rengi/Duvar Kağıdı AI',
  description: 'Duvar rengini veya desenini sanal olarak degistirme. Boya markalari ve ic mimarlar icin.',
  category: 'Interior Design',
  gradient: 'bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-500',
  accentColor: 'text-rose-600',
  installs: 2156,
  icon: '🎨',
  flow: {
    steps: [
      { id: 's1', type: 'message', content: 'Odanizin fotografini gonderin 🏠', delay: 0 },
      { id: 's2', type: 'image_request', content: 'Oda fotografı bekleniyor...', requiresInput: true },
      { id: 's3', type: 'message', content: 'Istediginiz renk veya deseni gonderin 🎨', delay: 1000 },
      { id: 's4', type: 'image_request', content: 'Renk/desen bekleniyor...', requiresInput: true },
      { id: 's5', type: 'ai_processing', content: 'Duvarlar boyaniyor...', delay: 3000 },
      { id: 's6', type: 'result', content: '🌟 Yeni duvar goruntunuz!', delay: 500 },
      { id: 's7', type: 'cta', content: '🛒 Urun Bilgisi', metadata: { action: 'info' } },
    ],
    setupInstructions: ['AI model endpoint ayarla', 'Urun katalog entegre et'],
    requiredVariables: ['AI_MODEL_ENDPOINT', 'CATALOG_URL'],
  },
  metadata: {
    version: '1.0.0',
    author: 'LookLab Team',
    tags: ['interior', 'paint', 'design', 'ai'],
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
  },
};
