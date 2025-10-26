import { AutomationTemplate } from '../types';

export const carColorChangerTemplate: AutomationTemplate = {
  id: 'instagram-car-color-changer',
  name: 'Instagram Car Color Transformation Automation',
  description: 'Transform car colors instantly with AI. Perfect for auto dealerships, detailing shops, and car customization services to showcase color options.',
  category: 'Car Color Changer',
  gradient: 'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500',
  accentColor: 'text-blue-600',
  installs: 3847,

  flow: {
    steps: [
      {
        id: 'step-1',
        type: 'message',
        content: 'Please send a photo of your car 🚗',
        delay: 0,
      },
      {
        id: 'step-2',
        type: 'image_request',
        content: 'Waiting for customer car photo...',
        requiresInput: true,
        metadata: {
          imageType: 'car_photo',
          validation: ['car_detection', 'quality_check'],
        },
      },
      {
        id: 'step-3',
        type: 'message',
        content: 'Great! Now please send the desired color or a reference car 🎨',
        delay: 1000,
      },
      {
        id: 'step-4',
        type: 'image_request',
        content: 'Waiting for desired color reference...',
        requiresInput: true,
        metadata: {
          imageType: 'color_reference',
        },
      },
      {
        id: 'step-5',
        type: 'message',
        content: 'Your car is being painted... 🎨',
        delay: 1500,
      },
      {
        id: 'step-6',
        type: 'ai_processing',
        content: 'Processing color transformation with AI...',
        delay: 3000,
        metadata: {
          aiModel: 'car-color-transformation-v2',
          processingType: 'color_transfer',
        },
      },
      {
        id: 'step-7',
        type: 'result',
        content: '🌟 Your Color Transformation is Ready!',
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
          buttonColor: 'blue-purple',
          action: 'book_appointment',
        },
      },
      {
        id: 'step-9',
        type: 'message',
        content: 'Looks amazing in the new color, doesn\'t it? 🚗✨',
        delay: 1000,
      },
    ],
    setupInstructions: [
      'Configure AI model endpoint for car color transformation',
      'Set up appointment booking system integration',
      'Add your Instagram account credentials',
      'Test with sample car images',
    ],
    requiredVariables: [
      'AI_MODEL_ENDPOINT',
      'APPOINTMENT_BOOKING_URL',
      'INSTAGRAM_USERNAME',
      'INSTAGRAM_PASSWORD',
    ],
  },

  metadata: {
    version: '1.0.0',
    author: 'Automation-FB Team',
    tags: ['car', 'color', 'transformation', 'automotive', 'ai'],
    createdAt: '2024-10-26',
    updatedAt: '2024-10-26',
  },
};
