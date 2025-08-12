import type { ComponentDefinition, ComponentOption } from './types'

// Helper function to create component definitions easily
export function createComponentDefinition(config: {
  name: string
  displayName: string
  category: string
  icon: string
  description?: string
  schema: ComponentOption[]
  defaultData: Record<string, any>
  component: any
  preview?: string
  tags?: string[]
  version?: string
  updateData?: (oldData: any, newData: any) => any
}): ComponentDefinition {
  return {
    name: config.name,
    displayName: config.displayName,
    category: config.category,
    icon: config.icon,
    description: config.description,
    schema: config.schema,
    defaultData: config.defaultData,
    component: config.component,
    preview: config.preview,
    tags: config.tags || [],
    version: config.version || '1.0.0',
    updateData: config.updateData
  }
}

// Predefined option types for common use cases
export const optionTypes = {
  text: (name: string, label: string, config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type: 'text',
    ...config
  }),
  
  number: (name: string, label: string, config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type: 'number',
    ...config
  }),
  
  boolean: (name: string, label: string, config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type: 'boolean',
    ...config
  }),
  
  select: (name: string, label: string, options: { label: string; value: any }[], config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type: 'select',
    options,
    ...config
  }),
  
  color: (name: string, label: string, config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type: 'color',
    ...config
  }),
  
  image: (name: string, label: string, config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type: 'image',
    ...config
  }),
  
  textarea: (name: string, label: string, config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type: 'textarea',
    ...config
  }),
  
  json: (name: string, label: string, config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type: 'json',
    ...config
  })
}
