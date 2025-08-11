import { componentRegistry } from './registry'
import { createComponentDefinition, optionTypes } from './componentBuilder'
import TextBlock from '~/components/PageBuilder/Components/TextBlock.vue'
import ImageBlock from '~/components/PageBuilder/Components/ImageBlock.vue'

// Register Text Block Component
const textBlockDefinition = createComponentDefinition({
  name: 'text-block',
  displayName: 'Text Block',
  category: 'text',
  icon: '¶',
  description: 'Rich text content with formatting options',
  component: TextBlock,
  schema: [
    optionTypes.text('heading', 'Heading', { description: 'Enter a heading for this text block' }),
    optionTypes.select('headingSize', 'Heading Size', [
      { label: 'Extra Small', value: 'xs' },
      { label: 'Small', value: 'sm' },
      { label: 'Base', value: 'base' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: '2XL', value: '2xl' },
      { label: '3XL', value: '3xl' },
      { label: '4XL', value: '4xl' }
    ]),
    optionTypes.select('headingWeight', 'Heading Weight', [
      { label: 'Normal', value: 'normal' },
      { label: 'Medium', value: 'medium' },
      { label: 'Semibold', value: 'semibold' },
      { label: 'Bold', value: 'bold' },
      { label: 'Extrabold', value: 'extrabold' }
    ]),
    optionTypes.color('headingColor', 'Heading Color'),
    optionTypes.textarea('content', 'Content', { description: 'Enter the main text content' }),
    optionTypes.select('textSize', 'Text Size', [
      { label: 'Extra Small', value: 'xs' },
      { label: 'Small', value: 'sm' },
      { label: 'Base', value: 'base' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: '2XL', value: '2xl' }
    ]),
    optionTypes.color('textColor', 'Text Color'),
    optionTypes.select('lineHeight', 'Line Height', [
      { label: 'Tight', value: 'tight' },
      { label: 'Snug', value: 'snug' },
      { label: 'Normal', value: 'normal' },
      { label: 'Relaxed', value: 'relaxed' },
      { label: 'Loose', value: 'loose' }
    ]),
    optionTypes.text('buttonText', 'Button Text', { description: 'Optional button text' }),
    optionTypes.select('buttonColor', 'Button Color', [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Success', value: 'success' },
      { label: 'Warning', value: 'warning' },
      { label: 'Error', value: 'error' }
    ]),
    optionTypes.select('buttonVariant', 'Button Variant', [
      { label: 'Solid', value: 'solid' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' }
    ]),
    optionTypes.select('buttonSize', 'Button Size', [
      { label: 'Extra Small', value: 'xs' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' }
    ]),
    optionTypes.select('alignment', 'Alignment', [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
      { label: 'Justify', value: 'justify' }
    ])
  ],
  defaultData: {
    heading: 'Welcome to Our Page',
    headingSize: '2xl',
    headingWeight: 'bold',
    headingColor: 'gray-900',
    content: 'This is a sample text block. You can customize the content, styling, and layout to match your design needs.',
    textSize: 'base',
    textColor: 'gray-700',
    lineHeight: 'relaxed',
    buttonText: 'Learn More',
    buttonColor: 'primary',
    buttonVariant: 'solid',
    buttonSize: 'md',
    alignment: 'left'
  }
})

// Register Image Block Component
const imageBlockDefinition = createComponentDefinition({
  name: 'image-block',
  displayName: 'Image Block',
  category: 'media',
  icon: '🖼',
  description: 'Images with various display options',
  component: ImageBlock,
  schema: [
    optionTypes.text('imageUrl', 'Image URL', { description: 'Enter the URL of the image' }),
    optionTypes.text('altText', 'Alt Text', { description: 'Alternative text for accessibility' }),
    optionTypes.text('caption', 'Caption', { description: 'Optional caption below the image' }),
    optionTypes.number('width', 'Width', { description: 'Image width in pixels' }),
    optionTypes.number('height', 'Height', { description: 'Image height in pixels' }),
    optionTypes.select('borderRadius', 'Border Radius', [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: 'Full', value: 'full' }
    ]),
    optionTypes.select('shadow', 'Shadow', [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: '2XL', value: '2xl' }
    ]),
    optionTypes.select('alignment', 'Alignment', [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' }
    ]),
    optionTypes.text('linkUrl', 'Link URL', { description: 'Optional URL to link the image to' })
  ],
  defaultData: {
    imageUrl: '',
    altText: 'Image',
    caption: '',
    width: 400,
    height: 300,
    borderRadius: 'lg',
    shadow: 'md',
    alignment: 'center',
    linkUrl: ''
  }
})

// Register all components
export function registerComponents() {
  componentRegistry.register(textBlockDefinition)
  componentRegistry.register(imageBlockDefinition)
}

// Auto-register components when this module is imported
registerComponents()
