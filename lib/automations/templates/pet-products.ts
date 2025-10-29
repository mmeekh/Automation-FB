import { AutomationTemplate } from '../types';

export const petProductsTemplate: AutomationTemplate = {
  id: 'pet-products',
  name: 'Evcil Hayvan Ürünleri AI',
  description: 'Evcil hayvanlara tasma ve kiyafet sanal deneme. Pet shop ve veteriner klinikleri için ideal.',
  category: 'Pet Products',
  gradient: 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500',
  accentColor: 'text-amber-600',
  installs: 892,
  flow: {
    steps: [
      { id: 's1', type: 'message', content: 'Evcil hayvaninizin fotografini gonderin 🐾', delay: 0 },
      { id: 's2', type: 'image_request', content: 'Hayvan fotografı bekleniyor...', requiresInput: true },
      { id: 's3', type: 'message', content: 'Harika! Simdi denemek istediginiz tasma/kiyafeti gonderin 👕', delay: 1000 },
      { id: 's4', type: 'image_request', content: 'Urun fotografı bekleniyor...', requiresInput: true },
      { id: 's5', type: 'ai_processing', content: 'AI ile urun deneniyor...', delay: 3000 },
      { id: 's6', type: 'result', content: '🎉 Harika gorunuyor!', delay: 500 },
      { id: 's7', type: 'cta', content: '🛒 Satin Al', metadata: { action: 'purchase' } },
    ],
    setupInstructions: ['AI model endpoint ayarla', 'E-ticaret entegrasyonu yap'],
    requiredVariables: ['AI_MODEL_ENDPOINT', 'SHOP_URL'],
  },
  metadata: {
    version: '1.0.0',
    author: 'LookLab Team',
    tags: ['pet', 'ecommerce', 'ai'],
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15',
  },
};
