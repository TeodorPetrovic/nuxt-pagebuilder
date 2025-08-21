# Page Builder System Documentation

A comprehensive Vue.js page builder system with drag-and-drop functionality, component registration, and customizable option fields.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Creating Components](#creating-components)
3. [Component Registration](#component-registration)
4. [Option Fields](#option-fields)
5. [Nested Components](#nested-components)
6. [Implementing isEditing](#implementing-isediting)
7. [Custom Option Fields](#custom-option-fields)
8. [Examples](#examples)

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
