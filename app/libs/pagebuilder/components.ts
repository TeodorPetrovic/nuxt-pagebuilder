import { componentRegistry } from './registry'
import { createComponentDefinition, optionTypes } from './componentBuilder'
import TextBlock from '../../components/PageBuilder/Components/TextBlock.vue'
import ImageBlock from '../../components/PageBuilder/Components/ImageBlock.vue'

// Register Text Block Component
componentRegistry.register(createComponentDefinition({
  name: 'text-block',
  displayName: 'Text Block',
  category: 'Content',
  icon: '📝',
  description: 'A simple text block with heading and content',
  schema: [
    optionTypes.text('heading', 'Heading', { 
      defaultValue: 'Welcome to our page',
      description: 'Main heading text'
    }),
    optionTypes.textarea('content', 'Content', { 
      defaultValue: 'This is a sample text block. You can edit this content to add your own text.',
      description: 'Main content text'
    }),
    optionTypes.select('alignment', 'Text Alignment', [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' }
    ], { defaultValue: 'left' }),
    optionTypes.number('fontSize', 'Font Size', { 
      defaultValue: 16,
      validation: { min: 12, max: 72 }
    }),
    optionTypes.color('textColor', 'Text Color', { defaultValue: '#000000' }),
    optionTypes.boolean('bold', 'Bold Text', { defaultValue: false }),
    optionTypes.boolean('italic', 'Italic Text', { defaultValue: false })
  ],
  defaultData: {
    heading: 'Welcome to our page',
    content: 'This is a sample text block. You can edit this content to add your own text.',
    alignment: 'left',
    fontSize: 16,
    textColor: '#000000',
    bold: false,
    italic: false
  },
  component: TextBlock,
  tags: ['text', 'content', 'typography'],
  version: '1.0.0'
}))

// Register Image Block Component
componentRegistry.register(createComponentDefinition({
  name: 'image-block',
  displayName: 'Image Block',
  category: 'Media',
  icon: '🖼️',
  description: 'Display images with customizable options',
  schema: [
    optionTypes.image('imageUrl', 'Image URL', { 
      required: true,
      description: 'URL of the image to display'
    }),
    optionTypes.text('altText', 'Alt Text', { 
      defaultValue: '',
      description: 'Alternative text for accessibility'
    }),
    optionTypes.select('alignment', 'Image Alignment', [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' }
    ], { defaultValue: 'center' }),
    optionTypes.select('objectFit', 'Image Fit', [
      { label: 'Cover', value: 'cover' },
      { label: 'Contain', value: 'contain' },
      { label: 'Fill', value: 'fill' }
    ], { defaultValue: 'cover' }),
    optionTypes.number('borderRadius', 'Border Radius', { 
      defaultValue: 0,
      validation: { min: 0, max: 50 }
    })
  ],
  defaultData: {
    imageUrl: '',
    altText: '',
    alignment: 'center',
    objectFit: 'cover',
    borderRadius: 0
  },
  component: ImageBlock,
  tags: ['image', 'media', 'visual'],
  version: '1.0.0'
}))

// Export for use in other parts of the app
export { componentRegistry }
