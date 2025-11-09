import { AutomationTemplate } from '../types';

export const carWheelsTemplate: AutomationTemplate = {
  id: 'car-wheels',
  name: 'Araba Jant/Lastik AI',
  description: 'Arabaya jant veya lastik sanal deneme. Oto galeri ve lastik satıcıları için.',
  category: 'Automotive',
  gradient: 'bg-gradient-to-br from-slate-400 via-gray-500 to-zinc-600',
  accentColor: 'text-slate-600',
  installs: 1243,
  icon: '🛞',
  flow: {
    steps: [
      { id: 's1', type: 'message', content: 'Arabanizin fotografini gonderin 🚗', delay: 0 },
      { id: 's2', type: 'image_request', content: 'Araba fotografı bekleniyor...', requiresInput: true },
      { id: 's3', type: 'message', content: 'Simdi denemek istediginiz janti gonderin ⚙️', delay: 1000 },
      { id: 's4', type: 'image_request', content: 'Jant fotografı bekleniyor...', requiresInput: true },
      { id: 's5', type: 'ai_processing', content: 'Jantlar takiliyor...', delay: 3000 },
      { id: 's6', type: 'result', content: '✨ Arabaniz yeni jantlariyla!', delay: 500 },
      { id: 's7', type: 'cta', content: '📅 Randevu Al', metadata: { action: 'book' } },
    ],
    setupInstructions: ['AI model endpoint ayarla', 'Randevu sistemi entegre et'],
    requiredVariables: ['AI_MODEL_ENDPOINT', 'BOOKING_URL'],
  },
  metadata: {
    version: '1.0.0',
    author: 'LookLab Team',
    tags: ['automotive', 'wheels', 'ai'],
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
  },
};
