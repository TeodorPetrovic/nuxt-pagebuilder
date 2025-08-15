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

const createOptionType = (type: ComponentOption['type']) => 
  (name: string, label: string, config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type,
    ...config
  })

export const optionTypes = {
  heading: createOptionType('heading'),
  text: createOptionType('text'),
  number: createOptionType('number'),
  boolean: createOptionType('boolean'),
  color: createOptionType('color'),
  image: createOptionType('image'),
  textarea: createOptionType('textarea'),
  json: createOptionType('json'),
  spacingBox: createOptionType('spacingBox'),
  button: createOptionType('button'),
  columns: createOptionType('columns'),
  
  select: (name: string, label: string, options: { label: string; value: any }[], config: Partial<ComponentOption> = {}): ComponentOption => ({
    name,
    label,
    type: 'select',
    options,
    ...config
  })
}
