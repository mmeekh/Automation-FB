import { AutomationTemplate } from '../types';

export const hairRestorationTemplate: AutomationTemplate = {
  id: 'instagram-bald-to-haired',
  name: 'Instagram Bald-to-Haired Transformation Automation',
  description: 'Converts bald or thinning hair selfies into realistic full-hair previews. Built for barbers and hair transplant centers wanting instant DM wow-factor.',
  category: 'Hair Restoration',
  gradient: 'bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500',
  accentColor: 'text-amber-600',
  installs: 5293,

  flow: {
    steps: [
      {
        id: 'step-1',
        type: 'message',
        content: 'Please send your selfie photo 📸',
        delay: 0,
      },
      {
        id: 'step-2',
        type: 'image_request',
        content: 'Waiting for customer selfie...',
        requiresInput: true,
        metadata: {
          imageType: 'selfie',
          validation: ['face_detection', 'quality_check'],
        },
      },
      {
        id: 'step-3',
        type: 'message',
        content: 'Great! Now please send the hair style you want 💇‍♂️',
        delay: 1000,
      },
      {
        id: 'step-4',
        type: 'image_request',
        content: 'Waiting for desired hair style...',
        requiresInput: true,
        metadata: {
          imageType: 'hair_reference',
        },
      },
      {
        id: 'step-5',
        type: 'message',
        content: 'Your hair is being prepared... ✨',
        delay: 1500,
      },
      {
        id: 'step-6',
        type: 'ai_processing',
        content: 'Processing hair transformation with AI...',
        delay: 3000,
        metadata: {
          aiModel: 'hair-transformation-v2',
          processingType: 'style_transfer',
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
          buttonColor: 'amber-orange',
          action: 'book_appointment',
        },
      },
      {
        id: 'step-9',
        type: 'message',
        content: 'Looks much better, doesn\'t it? 😊',
        delay: 1000,
      },
    ],
    setupInstructions: [
      'Configure AI model endpoint for hair transformation',
      'Set up appointment booking system integration',
      'Add your Instagram account credentials',
      'Test with sample images',
    ],
    requiredVariables: [
      'AI_MODEL_ENDPOINT',
      'APPOINTMENT_BOOKING_URL',
      'INSTAGRAM_USERNAME',
      'INSTAGRAM_PASSWORD',
    ],
  },

  metadata: {
    version: '2.1.0',
    author: 'Automation-FB Team',
    tags: ['hair', 'transformation', 'beauty', 'ai'],
    createdAt: '2024-01-15',
    updatedAt: '2024-10-22',
  },
};
