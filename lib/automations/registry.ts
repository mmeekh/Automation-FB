import { AutomationTemplate, TemplateRegistry } from './types';
import {
  hairRestorationTemplate,
  aestheticAITemplate,
  nailTransformationTemplate,
  carColorChangerTemplate,
} from './templates';

/**
 * Central automation template registry
 * Manages all available automation templates
 */
class AutomationRegistryImpl implements TemplateRegistry {
  private templates: Map<string, AutomationTemplate>;

  constructor() {
    this.templates = new Map();
    this.initializeTemplates();
  }

  /**
   * Initialize with default templates
   */
  private initializeTemplates(): void {
    this.registerTemplate(hairRestorationTemplate);
    this.registerTemplate(aestheticAITemplate);
    this.registerTemplate(nailTransformationTemplate);
    this.registerTemplate(carColorChangerTemplate);
  }

  /**
   * Get a template by ID
   */
  getTemplate(id: string): AutomationTemplate | undefined {
    return this.templates.get(id);
  }

  /**
   * Get all templates
   */
  getAllTemplates(): AutomationTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Get templates by category
   */
  getTemplatesByCategory(category: string): AutomationTemplate[] {
    return this.getAllTemplates().filter(
      (template) => template.category === category
    );
  }

  /**
   * Register a new template
   */
  registerTemplate(template: AutomationTemplate): void {
    if (this.templates.has(template.id)) {
      console.warn(
        `Template with ID "${template.id}" already exists. Overwriting...`
      );
    }
    this.templates.set(template.id, template);
  }

  /**
   * Get all unique categories
   */
  getAllCategories(): string[] {
    const categories = new Set<string>();
    this.getAllTemplates().forEach((template) => {
      categories.add(template.category);
    });
    return Array.from(categories).sort();
  }

  /**
   * Search templates by name or description
   */
  searchTemplates(query: string): AutomationTemplate[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllTemplates().filter(
      (template) =>
        template.name.toLowerCase().includes(lowerQuery) ||
        template.description.toLowerCase().includes(lowerQuery) ||
        template.metadata?.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerQuery)
        )
    );
  }

  /**
   * Get most popular templates
   */
  getPopularTemplates(limit: number = 5): AutomationTemplate[] {
    return this.getAllTemplates()
      .sort((a, b) => b.installs - a.installs)
      .slice(0, limit);
  }
}

// Singleton instance
let registryInstance: AutomationRegistryImpl | null = null;

/**
 * Get the automation registry instance (singleton)
 */
export function getAutomationRegistry(): AutomationRegistryImpl {
  if (!registryInstance) {
    registryInstance = new AutomationRegistryImpl();
  }
  return registryInstance;
}

/**
 * Export the registry instance for direct use
 */
export const AutomationRegistry = getAutomationRegistry();
