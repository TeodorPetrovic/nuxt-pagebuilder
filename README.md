# Page Builder - Nuxt 4

A powerful, extensible page builder built with Nuxt 4, Vue 3, and TypeScript. Create beautiful pages with drag-and-drop components, real-time editing, and a sophisticated draft/publish system.

## 🚀 Features

- **Drag & Drop Interface** - Intuitive component placement
- **Component Registry System** - Easy to add custom components
- **Draft vs Published** - Work on drafts without affecting live content
- **Real-time Editing** - See changes as you make them
- **Component Options Panel** - Dynamic property editing based on component schema
- **Auto-save** - Automatic draft saving every 30 seconds
- **Responsive Design** - Mobile-friendly interface
- **TypeScript Support** - Full type safety throughout

## 🏗️ Architecture

### Core Components

- **PageBuilder** - Main editor interface
- **ComponentRegistry** - Manages available components
- **usePageState** - Per-page state management
- **ComponentRenderer** - Dynamic component rendering

### Component System

Every component follows a standardized interface:

```typescript
interface ComponentDefinition {
  name: string
  displayName: string
  category: string
  icon: string
  schema: ComponentOption[]
  defaultData: Record<string, any>
  component: any // Vue component
}
```

## 🎯 Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Run Development Server

```bash
bun run dev
```

### 3. Access Page Builder

Navigate to `/pagebuilder` to start building pages.

## 📝 Creating Custom Components

### 1. Create Your Component

```vue
<template>
  <div class="my-component">
    <h2>{{ data.title }}</h2>
    <p>{{ data.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ComponentInstance } from '~/libs/pagebuilder/types'

interface Props {
  component: ComponentInstance
  isEditing?: boolean
}

const props = defineProps<Props>()
const data = computed(() => props.component.data)
</script>
```

### 2. Register Your Component

```typescript
import { componentRegistry } from '~/libs/pagebuilder/registry'
import { createComponentDefinition, optionTypes } from '~/libs/pagebuilder/componentBuilder'
import MyComponent from './MyComponent.vue'

componentRegistry.register(createComponentDefinition({
  name: 'my-component',
  displayName: 'My Component',
  category: 'Custom',
  icon: '🎯',
  description: 'A custom component for special content',
  schema: [
    optionTypes.text('title', 'Title', { 
      defaultValue: 'Default Title',
      description: 'Component title'
    }),
    optionTypes.textarea('description', 'Description', { 
      defaultValue: 'Default description text',
      description: 'Component description'
    })
  ],
  defaultData: {
    title: 'Default Title',
    description: 'Default description text'
  },
  component: MyComponent,
  tags: ['custom', 'content'],
  version: '1.0.0'
}))
```

## 🔧 Available Option Types

- `text` - Single line text input
- `textarea` - Multi-line text input
- `number` - Numeric input with validation
- `boolean` - Checkbox input
- `select` - Dropdown selection
- `color` - Color picker
- `image` - Image URL input
- `json` - JSON data input

## 📊 Page Management

### Draft System

- **Draft Status** - Work on changes without affecting published content
- **Auto-save** - Automatic saving every 30 seconds
- **Publish** - Make draft live when ready
- **Discard** - Revert to published version

### State Management

Each page instance has its own state:
- Current page (draft or published)
- Published version (original)
- Component selection
- Editing mode
- Unsaved changes tracking

## 🎨 Styling

The page builder uses Tailwind CSS for styling. All components are styled with utility classes and can be customized through the component schema.

## 🔌 Plugin System (Future)

The architecture is designed to support a plugin system:
- Dynamic component loading
- API extensions
- Hook system for extensibility
- Component marketplace

## 🚧 Development

### Project Structure

```
pagebuilder/
├── libs/pagebuilder/          # Core engine
│   ├── types.ts              # TypeScript interfaces
│   ├── registry.ts           # Component registry
│   ├── componentBuilder.ts   # Helper utilities
│   ├── usePageState.ts       # State management
│   └── components.ts         # Component registration
├── components/PageBuilder/    # UI components
│   ├── PageBuilder.vue       # Main editor
│   ├── PageBuilderCanvas.vue # Canvas workspace
│   ├── ComponentRenderer.vue # Dynamic rendering
│   └── Components/           # Example components
└── pages/                    # Demo pages
```

### Adding New Features

1. **New Component Types** - Add to `optionTypes` in `componentBuilder.ts`
2. **New UI Elements** - Create Vue components in `components/PageBuilder/`
3. **New Functionality** - Extend `usePageState.ts` composable

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For questions and support:
- Create an issue on GitHub
- Check the documentation
- Review the example components

---

Built with ❤️ using Nuxt 4, Vue 3, and TypeScript
