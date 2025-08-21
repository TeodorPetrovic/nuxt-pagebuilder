export interface PageComponent {
  id: string
  type: string
  data: Record<string, any>
  position: { x: number; y: number }
  size: { width: number; height: number }
  parentId?: string
  children?: string[]
  meta?: Record<string, any>
}

export interface Page {
  id: string
  title: string
  slug: string
  components: PageComponent[]
  meta: Record<string, any>
  seo: Record<string, any>
  status: 'draft' | 'published'
  version: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  publishedBy?: string
}

// Component Schema Definition
export interface ComponentOption {
  name: string
  label: string
  type: 'text' | 'number' | 'boolean' | 'select' | 'color' | 'image' | 'textarea' | 'json' | 'group' | 'spacingBox' | 'heading' | 'button' | 'columns'
  defaultValue?: any
  required?: boolean
  options?: { label: string; value: any }[] | ComponentOption[] // For select type or group type
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
  description?: string
}

export interface ComponentDefinition {
  name: string
  displayName: string
  category: string
  icon: string
  description?: string
  schema: ComponentOption[]
  defaultData: Record<string, any>
  component: any // Vue component
  preview?: string // Base64 image or component preview
  tags?: string[]
  version: string
  updateData?: (oldData: any, newData: any) => any
}

export interface ComponentInstance {
  id: string
  type: string
  data: Record<string, any>
  position: { x: number; y: number }
  size: { width: number; height: number }
  parentId?: string
  children?: string[]
  meta?: Record<string, any>
}

export interface PageBuilderState {
  currentPage: Page | null
  publishedPage: Page | null
  selectedComponent: string | null
  isEditing: boolean
  hasUnsavedChanges: boolean
  lastSavedAt: Date | null
}
