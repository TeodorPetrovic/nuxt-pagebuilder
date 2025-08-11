import type { ComponentDefinition, ComponentOption } from './types'

export class ComponentRegistry {
  private static instance: ComponentRegistry
  private components = new Map<string, ComponentDefinition>()
  private categories = new Set<string>()

  static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry()
    }
    return ComponentRegistry.instance
  }

  // Register a new component
  register(definition: ComponentDefinition): void {
    // Validate the component definition
    this.validateComponentDefinition(definition)
    
    // Add to registry
    this.components.set(definition.name, definition)
    this.categories.add(definition.category)
    
    console.log(`✅ Component registered: ${definition.displayName} (${definition.name})`)
  }

  // Get component by name
  get(name: string): ComponentDefinition | undefined {
    return this.components.get(name)
  }

  // Get all components
  getAll(): ComponentDefinition[] {
    return Array.from(this.components.values())
  }

  // Get components by category
  getByCategory(category: string): ComponentDefinition[] {
    return this.getAll().filter(c => c.category === category)
  }

  // Get all categories
  getCategories(): string[] {
    return Array.from(this.categories).sort()
  }

  // Search components
  search(query: string): ComponentDefinition[] {
    const searchTerm = query.toLowerCase()
    return this.getAll().filter(component => 
      component.displayName.toLowerCase().includes(searchTerm) ||
      component.description?.toLowerCase().includes(searchTerm) ||
      component.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      component.category.toLowerCase().includes(searchTerm)
    )
  }

  // Validate component definition
  private validateComponentDefinition(definition: ComponentDefinition): void {
    if (!definition.name || !definition.displayName || !definition.category) {
      throw new Error('Component must have name, displayName, and category')
    }
    
    if (!definition.component) {
      throw new Error('Component must have a Vue component')
    }
    
    if (!Array.isArray(definition.schema)) {
      throw new Error('Component must have a schema array')
    }
    
    // Validate schema options
    definition.schema.forEach((option, index) => {
      if (!option.name || !option.label || !option.type) {
        throw new Error(`Schema option ${index} must have name, label, and type`)
      }
    })
  }

  // Clear registry (useful for testing)
  clear(): void {
    this.components.clear()
    this.categories.clear()
  }
}

export const componentRegistry = ComponentRegistry.getInstance()
