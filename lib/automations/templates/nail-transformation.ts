import { AutomationTemplate } from '../types';

export const nailTransformationTemplate: AutomationTemplate = {
  id: 'instagram-nail-transformation',
  name: 'Instagram Nail Transformation Automation',
  description: 'Transforms plain nails into stunning manicure designs instantly. Perfect for nail salons and beauty studios wanting to showcase nail art previews via DM.',
  category: 'Nail Transformation',
  gradient: 'bg-gradient-to-br from-rose-400 via-fuchsia-500 to-rose-500',
  accentColor: 'text-rose-600',
  installs: 4187,

  flow: {
    steps: [
      {
        id: 'step-1',
        type: 'message',
        content: 'Please send your hand photo 📸',
        delay: 0,
      },
      {
        id: 'step-2',
        type: 'image_request',
        content: 'Waiting for hand photo...',
        requiresInput: true,
        metadata: {
          imageType: 'hand',
          validation: ['hand_detection', 'nail_detection', 'quality_check'],
        },
      },
      {
        id: 'step-3',
        type: 'message',
        content: 'Great! Now send the nail design you want 💅',
        delay: 1000,
      },
      {
        id: 'step-4',
        type: 'image_request',
        content: 'Waiting for desired nail design...',
        requiresInput: true,
        metadata: {
          imageType: 'nail_design',
        },
      },
      {
        id: 'step-5',
        type: 'message',
        content: 'Your nails are being prepared... ✨',
        delay: 1500,
      },
      {
        id: 'step-6',
        type: 'ai_processing',
        content: 'Processing nail transformation with AI...',
        delay: 3500,
        metadata: {
          aiModel: 'nail-transformation-v1',
          processingType: 'design_transfer',
        },
      },
      {
        id: 'step-7',
        type: 'result',
        content: '🌟 Your Transformation is Ready!',
        delay: 500,
        metadata: {
          showImage: true,
        },
      },
      {
        id: 'step-8',
        type: 'cta',
        content: '📅 Randevu Al',
        metadata: {
          buttonColor: 'rose-fuchsia',
          action: 'book_appointment',
        },
      },
      {
        id: 'step-9',
        type: 'message',
        content: 'Perfect match! 💅',
        delay: 1000,
      },
    ],
    setupInstructions: [
      'Configure AI model endpoint for nail transformation',
      'Set up salon appointment booking integration',
      'Add your Instagram account credentials',
      'Configure nail design catalog',
      'Test with sample hand images',
    ],
    requiredVariables: [
      'AI_MODEL_ENDPOINT',
      'APPOINTMENT_BOOKING_URL',
      'INSTAGRAM_USERNAME',
      'INSTAGRAM_PASSWORD',
      'NAIL_DESIGN_CATALOG_URL',
    ],
  },

  metadata: {
    version: '1.5.0',
    author: 'Automation-FB Team',
    tags: ['nails', 'transformation', 'beauty', 'manicure', 'ai'],
    createdAt: '2024-02-20',
    updatedAt: '2024-10-22',
  },
};
