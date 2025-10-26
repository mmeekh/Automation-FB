import { AutomationTemplate } from '../types';

export const aestheticAITemplate: AutomationTemplate = {
  id: 'instagram-aesthetic-bald',
  name: 'Instagram Bald-to-Haired Transformation (Premium)',
  description: 'Advanced hair restoration preview for high-end aesthetic clinics. Same powerful AI transformation with premium positioning.',
  category: 'Aesthetic AI',
  gradient: 'bg-gradient-to-br from-teal-400 via-cyan-500 to-teal-500',
  accentColor: 'text-teal-600',
  installs: 3614,

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
          validation: ['face_detection', 'quality_check', 'aesthetic_analysis'],
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
          premiumMode: true,
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
        content: 'Processing premium hair transformation...',
        delay: 4000,
        metadata: {
          aiModel: 'hair-transformation-premium',
          processingType: 'advanced_style_transfer',
          quality: 'ultra_high',
        },
      },
      {
        id: 'step-7',
        type: 'result',
        content: '🌟 Your Transformation is Ready!',
        delay: 500,
        metadata: {
          showImage: true,
          premiumBadge: true,
        },
      },
      {
        id: 'step-8',
        type: 'cta',
        content: '📅 Randevu Al',
        metadata: {
          buttonColor: 'teal-cyan',
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
      'Configure premium AI model endpoint',
      'Set up high-end clinic appointment system',
      'Add Instagram Business account credentials',
      'Configure premium branding elements',
      'Test with high-quality sample images',
    ],
    requiredVariables: [
      'AI_PREMIUM_MODEL_ENDPOINT',
      'APPOINTMENT_BOOKING_URL',
      'INSTAGRAM_BUSINESS_USERNAME',
      'INSTAGRAM_BUSINESS_PASSWORD',
      'CLINIC_BRANDING_LOGO',
    ],
  },

  metadata: {
    version: '1.8.0',
    author: 'Automation-FB Team',
    tags: ['hair', 'transformation', 'aesthetic', 'premium', 'ai'],
    createdAt: '2024-03-10',
    updatedAt: '2024-10-22',
  },
};
