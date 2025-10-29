/**
 * Maps automation template IDs to their landing page slugs
 */
const TEMPLATE_SLUG_MAP: Record<string, string> = {
  'instagram-bald-to-haired': 'hair-style-change',
  'instagram-car-color-changer': 'car-color-change',
  'instagram-aesthetic-bald': 'aesthetic-ai',
  'pet-products': 'pet-products',
  'car-wheels': 'car-wheels',
  'wall-paint': 'wall-paint',
  'furniture-placement': 'furniture-placement',
  'clothes-tryon': 'clothes-tryon',
  'jewelry': 'jewelry',
};

/**
 * Get landing page slug from template ID
 */
export function getAutomationSlug(templateId: string): string {
  return TEMPLATE_SLUG_MAP[templateId] || templateId;
}

/**
 * Get landing page URL from template ID
 */
export function getAutomationLandingUrl(templateId: string): string {
  const slug = getAutomationSlug(templateId);
  return `/automations/${slug}`;
}

