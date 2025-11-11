import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ============================================================================
  // AI PROMPT TEMPLATES
  // ============================================================================

  console.log('📝 Creating AI prompt templates...');

  const hairStyleTemplate = await prisma.aiPromptTemplate.upsert({
    where: { templateType: 'hair-style' },
    update: {},
    create: {
      templateType: 'hair-style',
      name: 'Hair Style Transformation',
      description: 'AI-powered hair style transformation using reference images',
      analysisModelNormal: 'gemini-2.0-flash-lite',
      analysisModelHigh: 'gemini-2.0-flash-lite',
      editModelNormal: 'gemini-2.0-flash-image-preview',
      editModelHigh: 'gemini-2.5-flash-image-preview',
      analysisPrompt: `You are a highly-specialized hair analysis AI. Inspect the supplied portrait and return a single JSON object with keys: hair_length, hair_style, bangs, texture, hair_color. Use precise, descriptive phrases. If bangs are absent, set bangs to 'none'. hair_color must include an approximate hex value in parentheses (e.g. 'ash brown (#7b6d5d)'). Respond with JSON only, no extra text.`,
      editTemplate: `Change the woman's hair to exactly match the description below. Never change the face, pose, or background. Only change the hair. Return exactly one image in PNG format and no text. Description: {{PROMPT}}`,
    },
  });

  const carColorTemplate = await prisma.aiPromptTemplate.upsert({
    where: { templateType: 'car-color' },
    update: {},
    create: {
      templateType: 'car-color',
      name: 'Car Color Change',
      description: 'AI-powered car color transformation',
      analysisModelNormal: 'gemini-2.0-flash-lite',
      analysisModelHigh: 'gemini-2.0-flash-lite',
      editModelNormal: 'gemini-2.0-flash-image-preview',
      editModelHigh: 'gemini-2.5-flash-image-preview',
      analysisPrompt: `You are a specialized car analysis AI. Inspect the supplied car image and return a single JSON object with keys: car_make, car_model, car_type, current_color, car_angle. Use precise descriptions. current_color must include hex value in parentheses. Respond with JSON only, no extra text.`,
      editTemplate: `Change the car's color to exactly match the description below. Never change the car model, background, or lighting. Only change the paint color. Return exactly one image in PNG format and no text. New color: {{PROMPT}}`,
    },
  });

  const furniturePlacementTemplate = await prisma.aiPromptTemplate.upsert({
    where: { templateType: 'furniture-placement' },
    update: {},
    create: {
      templateType: 'furniture-placement',
      name: 'Furniture Placement',
      description: 'AI-powered furniture placement in room',
      analysisModelNormal: 'gemini-2.0-flash-lite',
      analysisModelHigh: 'gemini-2.0-flash-lite',
      editModelNormal: 'gemini-2.0-flash-image-preview',
      editModelHigh: 'gemini-2.5-flash-image-preview',
      analysisPrompt: `You are a specialized interior design AI. Inspect the supplied room image and return a single JSON object with keys: room_type, room_style, lighting, wall_color, floor_type, existing_furniture. Use precise descriptions. Respond with JSON only, no extra text.`,
      editTemplate: `Add the furniture item described below to the room. Place it naturally in an appropriate location. Maintain the room's lighting, perspective, and style. Return exactly one image in PNG format and no text. Furniture: {{PROMPT}}`,
    },
  });

  const jewelryTemplate = await prisma.aiPromptTemplate.upsert({
    where: { templateType: 'jewelry' },
    update: {},
    create: {
      templateType: 'jewelry',
      name: 'Jewelry Virtual Try-On',
      description: 'AI-powered jewelry visualization on user',
      analysisModelNormal: 'gemini-2.0-flash-lite',
      analysisModelHigh: 'gemini-2.0-flash-lite',
      editModelNormal: 'gemini-2.0-flash-image-preview',
      editModelHigh: 'gemini-2.5-flash-image-preview',
      analysisPrompt: `You are a specialized jewelry analysis AI. Inspect the supplied jewelry image and return a single JSON object with keys: jewelry_type, material, style, color, design_elements. Use precise descriptions. Respond with JSON only, no extra text.`,
      editTemplate: `Add the jewelry described below to the person in the image. Place it naturally and realistically. Maintain proper perspective, lighting, and shadows. Never change the person's appearance. Return exactly one image in PNG format and no text. Jewelry: {{PROMPT}}`,
    },
  });

  const petProductsTemplate = await prisma.aiPromptTemplate.upsert({
    where: { templateType: 'pet-products' },
    update: {},
    create: {
      templateType: 'pet-products',
      name: 'Pet Products Visualization',
      description: 'AI-powered pet products on pets',
      analysisModelNormal: 'gemini-2.0-flash-lite',
      analysisModelHigh: 'gemini-2.0-flash-lite',
      editModelNormal: 'gemini-2.0-flash-image-preview',
      editModelHigh: 'gemini-2.5-flash-image-preview',
      analysisPrompt: `You are a specialized pet product analysis AI. Inspect the supplied pet image and return a single JSON object with keys: pet_type, pet_breed, pet_size, pet_color, pet_pose. Use precise descriptions. Respond with JSON only, no extra text.`,
      editTemplate: `Add the pet product described below to the pet in the image. Place it naturally and ensure proper fit. Maintain the pet's natural appearance and pose. Return exactly one image in PNG format and no text. Product: {{PROMPT}}`,
    },
  });

  const wallPaintTemplate = await prisma.aiPromptTemplate.upsert({
    where: { templateType: 'wall-paint' },
    update: {},
    create: {
      templateType: 'wall-paint',
      name: 'Wall Paint Visualization',
      description: 'AI-powered wall color transformation',
      analysisModelNormal: 'gemini-2.0-flash-lite',
      analysisModelHigh: 'gemini-2.0-flash-lite',
      editModelNormal: 'gemini-2.0-flash-image-preview',
      editModelHigh: 'gemini-2.5-flash-image-preview',
      analysisPrompt: `You are a specialized room analysis AI. Inspect the supplied room image and return a single JSON object with keys: room_type, current_wall_color, lighting_type, furniture_present, floor_type. Use precise descriptions. Respond with JSON only, no extra text.`,
      editTemplate: `Change the wall color to exactly match the description below. Maintain all furniture, lighting, shadows, and other elements. Only change the wall paint color. Return exactly one image in PNG format and no text. New wall color: {{PROMPT}}`,
    },
  });

  console.log('✅ Created 6 AI prompt templates');

  // ============================================================================
  // SUMMARY
  // ============================================================================

  const userCount = await prisma.user.count();
  const templateCount = await prisma.aiPromptTemplate.count();
  const accountCount = await prisma.instagramAccount.count();
  const flowCount = await prisma.automationFlow.count();

  console.log('\n📊 Database Seed Summary:');
  console.log(`  - Users: ${userCount}`);
  console.log(`  - Instagram Accounts: ${accountCount}`);
  console.log(`  - Automation Flows: ${flowCount}`);
  console.log(`  - AI Templates: ${templateCount}`);

  console.log('\n✅ Database seed completed!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
