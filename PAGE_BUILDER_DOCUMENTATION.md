# Page Builder System - Complete Documentation

A comprehensive Vue.js page builder system with drag-and-drop functionality, component registration, and customizable option fields.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Creating Components](#creating-components)
3. [Component Registration](#component-registration)
4. [Option Fields](#option-fields)
5. [Nested Components](#nested-components)
6. [Implementing isEditing](#implementing-isediting)
7. [Custom Option Fields](#custom-option-fields)
8. [Advanced Features](#advanced-features)
9. [Examples](#examples)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

## Quick Start

### Installation
```bash
npm install
npm run dev
```

### Basic Usage
The page builder is available at `/pagebuilder` route. It provides:
- Drag-and-drop component library
- Live editing with preview mode
- Properties panel for component configuration
- Auto-save functionality

## Creating Components

### 1. Create a Vue Component

First, create your Vue component in `app/components/PageBuilder/Components/`:

```vue
<!-- app/components/PageBuilder/Components/MyCustomBlock.vue -->
<script setup lang="ts">
interface Props {
  data: {
    title: string
    description: string
    backgroundColor: string
  }
  isEditing?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div 
    class="p-4 rounded-lg"
    :style="{ backgroundColor: data.backgroundColor }"
  >
    <h2 class="text-xl font-bold mb-2">{{ data.title }}</h2>
    <p class="text-gray-600">{{ data.description }}</p>
  </div>
</template>
```

### 2. Define Component Schema

Create a component definition using the `createComponentDefinition` helper:

```typescript
// app/libs/pagebuilder/components.ts
import { createComponentDefinition, optionTypes } from './componentBuilder'
import MyCustomBlock from '~/components/PageBuilder/Components/MyCustomBlock.vue'

const myCustomBlockDefinition = createComponentDefinition({
  name: 'my-custom-block',
  displayName: 'My Custom Block',
  category: 'content',
  icon: 'i-lucide-square',
  description: 'A custom block with title and description',
  component: MyCustomBlock,
  schema: [
    optionTypes.text('title', 'Title', { 
      defaultValue: 'Default Title',
      description: 'Enter the block title' 
    }),
    optionTypes.textarea('description', 'Description', { 
      defaultValue: 'Default description text',
      description: 'Enter the block description' 
    }),
    optionTypes.color('backgroundColor', 'Background Color', { 
      defaultValue: '#f3f4f6',
      description: 'Choose background color' 
    })
  ],
  defaultData: {
    title: 'Default Title',
    description: 'Default description text',
    backgroundColor: '#f3f4f6'
  }
})
```

## Component Registration

### Manual Registration

Add your component to the registry in `app/libs/pagebuilder/components.ts`:

```typescript
// Register your component
export function registerComponents() {
  componentRegistry.register(textBlockDefinition)
  componentRegistry.register(paragraphBlockDefinition)
  componentRegistry.register(myCustomBlockDefinition) // Add your component
  // ... other components
}
```

### Component Categories

Components are organized by categories:
- `text` - Text-based components
- `media` - Images, videos, etc.
- `layout` - Structural components (columns, grids)
- `content` - General content blocks
- `forms` - Form elements
- `navigation` - Menu and navigation components

## Option Fields

### Available Option Types

The system provides several built-in option types:

```typescript
// Text input
optionTypes.text('fieldName', 'Display Label', { 
  defaultValue: 'default text',
  description: 'Helper text' 
})

// Number input
optionTypes.number('fieldName', 'Display Label', { 
  defaultValue: 0,
  validation: { min: 0, max: 100 }
})

// Boolean switch
optionTypes.boolean('fieldName', 'Display Label', { 
  defaultValue: false 
})

// Select dropdown
optionTypes.select('fieldName', 'Display Label', [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' }
], { defaultValue: 'option1' })

// Color picker
optionTypes.color('fieldName', 'Display Label', { 
  defaultValue: '#000000' 
})

// Image upload
optionTypes.image('fieldName', 'Display Label', { 
  description: 'Upload or enter image URL' 
})

// Textarea
optionTypes.textarea('fieldName', 'Display Label', { 
  defaultValue: 'default text' 
})

// Heading field (with typography options)
optionTypes.heading('fieldName', 'Display Label', { 
  description: 'Configure heading text and styling' 
})

// Button field (with button configuration)
optionTypes.button('fieldName', 'Display Label', { 
  description: 'Configure button appearance and behavior' 
})

// Spacing box (visual padding/margin editor)
optionTypes.spacingBox('fieldName', 'Display Label', { 
  description: 'Configure spacing using visual box model' 
})

// Columns configuration
optionTypes.columns('fieldName', 'Display Label', { 
  description: 'Configure column layout' 
})
```

### Option Field Properties

Each option field supports these properties:

```typescript
interface ComponentOption {
  name: string           // Field identifier
  label: string          // Display label
  type: string          // Field type
  defaultValue?: any    // Default value
  required?: boolean    // Whether field is required
  description?: string  // Helper text
  validation?: {        // Validation rules
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
  options?: Array       // For select fields
}
```

## Nested Components

### Layout Components

Layout components can contain other components. Here's how to implement them:

```vue
<!-- ColumnsBlock.vue -->
<script setup lang="ts">
import ComponentRenderer from '../ComponentRenderer.vue'
import type { ComponentInstance } from '~/libs/pagebuilder/types'

interface Column {
  id: string
  width: number
  components: ComponentInstance[]
}

interface Props {
  data: {
    columns: {
      columnCount: number
      gap: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    }
    columnsData: Column[]
  }
  isEditing?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'component-add': [columnIndex: number, componentData: any]
  'component-update': [columnIndex: number, componentId: string, updates: any]
  'component-remove': [columnIndex: number, componentId: string]
  'component-select': [componentId: string]
}>()

const onComponentClick = (event: Event, componentId: string) => {
  if (props.isEditing) {
    event.stopPropagation()
    emit('component-select', componentId)
  }
}
</script>

<template>
  <div class="grid gap-4" :class="`grid-cols-${data.columns.columnCount}`">
    <div v-for="(column, index) in data.columnsData" :key="column.id">
      <!-- Empty column state -->
      <div v-if="!column.components?.length" 
           :class="[
             'min-h-[200px] flex items-center justify-center',
             isEditing ? 'border-2 border-dashed border-gray-300 rounded-lg' : ''
           ]">
        <div v-if="isEditing" class="text-center text-gray-500">
          Drop components here
        </div>
      </div>
      
      <!-- Column with components -->
      <div v-else class="space-y-2">
        <div v-for="component in column.components" :key="component.id">
          <div 
            :class="isEditing ? 'border border-transparent hover:border-blue-300 rounded' : ''"
            @click="onComponentClick($event, component.id)"
          >
            <ComponentRenderer 
              :component="component"
              :isEditing="isEditing"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

### Nested Component Events

Layout components must emit events for nested component management:

```typescript
// Required events for layout components
const emit = defineEmits<{
  'component-add': [columnIndex: number, componentData: any]
  'component-update': [columnIndex: number, componentId: string, updates: any]
  'component-remove': [columnIndex: number, componentId: string]
  'component-select': [componentId: string]
}>()
```

## Implementing isEditing

The `isEditing` prop controls whether components show editor-specific features.

### 1. Add isEditing to Component Props

```typescript
interface Props {
  data: ComponentData
  isEditing?: boolean  // Add this prop
}
```

### 2. Conditional Editor Features

Use `isEditing` to conditionally show:
- Selection borders
- Hover effects
- Toolbars
- Drop zones
- Empty state indicators

```vue
<template>
  <div>
    <!-- Editor-only border -->
    <div :class="[
      isEditing ? 'border border-transparent hover:border-blue-300' : ''
    ]">
      <!-- Component content -->
    </div>
    
    <!-- Editor-only toolbar -->
    <div v-if="isEditing" class="absolute top-1 right-1 opacity-0 group-hover:opacity-100">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>
</template>
```

### 3. Pass isEditing to Child Components

```vue
<ComponentRenderer 
  :component="component"
  :isEditing="isEditing"
/>
```

## Custom Option Fields

### Creating a Custom Option Field

1. Create the option field component:

```vue
<!-- app/components/PageBuilder/option-fields/CustomOptionField.vue -->
<script setup lang="ts">
interface Props {
  modelValue: any
}

interface Emits {
  (e: 'update:modelValue', value: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const updateValue = (newValue: any) => {
  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium">Custom Field</label>
    <input 
      :value="modelValue" 
      @input="updateValue($event.target.value)"
      class="w-full p-2 border rounded"
    />
  </div>
</template>
```

2. Register the option type:

```typescript
// Add to optionTypes in componentBuilder.ts
export const optionTypes = {
  // ... existing types
  custom: createOptionType('custom')
}
```

3. Add to ComponentOptionsPanel:

```vue
<!-- In ComponentOptionsPanel.vue -->
<CustomOptionField 
  v-else-if="option.type === 'custom'" 
  :modelValue="getOptionValues(option.name)"
  @update:modelValue="updateOptionValues(option.name, $event)" 
/>
```

### Complex Option Fields

For complex fields with multiple sub-properties:

```vue
<!-- HeadingOptionField.vue -->
<script setup lang="ts">
interface HeadingData {
  value: string
  size: number
  color: string
  bold: boolean
  italic: boolean
  underline: boolean
}

interface Props {
  modelValue: HeadingData
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: HeadingData] }>()

const updateValue = (key: keyof HeadingData, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script>

<template>
  <div class="space-y-3">
    <div>
      <label>Heading Text</label>
      <input 
        :value="modelValue.value" 
        @input="updateValue('value', $event.target.value)"
      />
    </div>
    
    <div>
      <label>Font Size</label>
      <input 
        type="number"
        :value="modelValue.size" 
        @input="updateValue('size', Number($event.target.value))"
      />
    </div>
    
    <div class="flex gap-2">
      <label class="flex items-center">
        <input 
          type="checkbox"
          :checked="modelValue.bold"
          @change="updateValue('bold', $event.target.checked)"
        />
        Bold
      </label>
      
      <label class="flex items-center">
        <input 
          type="checkbox"
          :checked="modelValue.italic"
          @change="updateValue('italic', $event.target.checked)"
        />
        Italic
      </label>
    </div>
  </div>
</template>
```

## Advanced Features

### Dynamic Data Updates

For components that need to update their data structure when options change:

```typescript
const componentDefinition = createComponentDefinition({
  // ... other properties
  updateData: (oldData: any, newData: any) => {
    // Example: Update columns when column count changes
    if (oldData.columnCount !== newData.columnCount) {
      const newColumns = []
      for (let i = 0; i < newData.columnCount; i++) {
        newColumns.push({
          id: `col-${i + 1}`,
          width: Math.floor(100 / newData.columnCount),
          components: oldData.columns?.[i]?.components || []
        })
      }
      newData.columns = newColumns
    }
    return newData
  }
})
```

### Component Categories and Search

Components support categorization and search:

```typescript
const componentDefinition = createComponentDefinition({
  name: 'my-component',
  displayName: 'My Component',
  category: 'content',
  description: 'A searchable component',
  tags: ['custom', 'content', 'text'], // For search
  // ... other properties
})
```

### Component Versioning

```typescript
const componentDefinition = createComponentDefinition({
  // ... other properties
  version: '2.1.0',
})
```

## Examples

### Simple Text Component

```typescript
// 1. Create component definition
const textComponentDefinition = createComponentDefinition({
  name: 'simple-text',
  displayName: 'Simple Text',
  category: 'text',
  icon: 'i-lucide-type',
  description: 'Simple text with basic formatting',
  component: SimpleTextComponent,
  schema: [
    optionTypes.text('content', 'Text Content', { 
      defaultValue: 'Enter your text' 
    }),
    optionTypes.select('fontSize', 'Font Size', [
      { label: 'Small', value: '14px' },
      { label: 'Medium', value: '16px' },
      { label: 'Large', value: '20px' }
    ]),
    optionTypes.color('textColor', 'Text Color', { 
      defaultValue: '#000000' 
    }),
    optionTypes.boolean('bold', 'Bold Text')
  ],
  defaultData: {
    content: 'Enter your text',
    fontSize: '16px',
    textColor: '#000000',
    bold: false
  }
})

// 2. Register component
componentRegistry.register(textComponentDefinition)
```

### Layout Component with Nested Content

```typescript
// 1. Create layout component definition
const cardComponentDefinition = createComponentDefinition({
  name: 'card-layout',
  displayName: 'Card Layout',
  category: 'layout',
  icon: 'i-lucide-square',
  description: 'Card container for other components',
  component: CardLayoutComponent,
  schema: [
    optionTypes.color('backgroundColor', 'Background Color'),
    optionTypes.select('padding', 'Padding', [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' }
    ]),
    optionTypes.boolean('showBorder', 'Show Border')
  ],
  defaultData: {
    components: [], // Container for nested components
    backgroundColor: '#ffffff',
    padding: 'md',
    showBorder: true
  }
})
```

### Component with Custom Option Field

```typescript
// 1. Create component with custom field
const socialLinksDefinition = createComponentDefinition({
  name: 'social-links',
  displayName: 'Social Links',
  category: 'content',
  component: SocialLinksComponent,
  schema: [
    optionTypes.custom('socialLinks', 'Social Links', {
      description: 'Configure social media links'
    })
  ],
  defaultData: {
    socialLinks: [
      { platform: 'facebook', url: '', icon: 'i-lucide-facebook' },
      { platform: 'twitter', url: '', icon: 'i-lucide-twitter' }
    ]
  }
})
```

## Best Practices

1. **Always implement isEditing** - Ensure your components respect edit/preview modes
2. **Use TypeScript interfaces** - Define clear prop interfaces for type safety
3. **Handle empty states** - Provide meaningful empty states for layout components
4. **Event propagation** - Use `event.stopPropagation()` in nested components
5. **Consistent naming** - Use kebab-case for component names and camelCase for options
6. **Default values** - Always provide sensible default values
7. **Validation** - Add validation rules for numeric and text inputs
8. **Accessibility** - Include proper ARIA labels and semantic HTML

## Troubleshooting

### Component Not Appearing
- Check if component is registered in `registerComponents()`
- Verify component import path
- Check for console errors during registration

### Selection Issues
- Ensure `isEditing` prop is passed down
- Check for conflicting click handlers
- Verify event propagation handling

### Option Fields Not Working
- Check ComponentOptionsPanel has handler for your option type
- Verify option field component is properly imported
- Check props interface matches expected structure

### Nested Components Issues
- Ensure ComponentRenderer receives `isEditing` prop
- Check that layout component emits required events
- Verify nested component data structure

This documentation provides a complete guide to working with the page builder system. For additional examples, refer to the existing components in the `app/components/PageBuilder/Components/` directory.
