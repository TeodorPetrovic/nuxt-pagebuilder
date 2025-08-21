import { createComponentDefinition, optionTypes } from '../core/componentBuilder'
import { groupedMiniHereBlockOptions, simpleTextContentOption } from '../core/optionGroups'
import MiniHero from '../components/text/MiniHero.vue'
import ParagraphBlock from '../components/text/ParagraphBlock.vue'

// Register Text Block Component
export const textBlockDefinition = createComponentDefinition({
  name: 'mini-hero',
  displayName: 'Mini Hero',
  category: 'text',
  icon: 'i-lucide-newspaper',
  description: 'Rich text content with formatting options',
  component: MiniHero,
  schema: groupedMiniHereBlockOptions(),
  defaultData: {
    // Basic content
    alignment: 'left',
    
    // Heading group
    heading: {
      value: 'Welcome to Our Page',
      size: 32,
      bold: true,
      italic: false,
      underline: false,
      color: '#1f2937'
    },
    
    // Text group
    content: {
      value: 'This is a sample text block. You can customize the content, styling, and layout to match your design needs.',
      size: 16,
      color: '#4b5563',
      bold: false,
      italic: false,
      underline: false
    },
    
    // Button group
    button: {
      value: 'Learn More',
      color: 'primary',
      variant: 'solid',
      size: 'md',
      alignment: 'left',
      newTab: false,
      url: ''
    },
    
    // Spacing group
    spacing: {
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0
    }
  }
})

// Register Paragraph Block Component
export const paragraphBlockDefinition = createComponentDefinition({
  name: 'paragraph-block',
  displayName: 'Paragraph',
  category: 'text',
  icon: 'i-lucide-file-text',
  description: 'Simple paragraph text with basic styling',
  component: ParagraphBlock,
  schema: [
    simpleTextContentOption('content', 'Content', 'Enter your paragraph text'),
  ],
  defaultData: {
    content: {
      value: 'This is a sample text block. You can customize the content, styling, and layout to match your design needs.',
      size: 16,
      color: '#4b5563',
      bold: false,
      italic: false,
      underline: false
    },
  }
})
