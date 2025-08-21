import { createComponentDefinition, optionTypes } from '../core/componentBuilder'
import ImageBlock from '../components/media/ImageBlock.vue'

// Register Image Block Component
export const imageBlockDefinition = createComponentDefinition({
  name: 'image-block',
  displayName: 'Image Block',
  category: 'media',
  icon: 'i-lucide-image',
  description: 'Images with various display options',
  component: ImageBlock,
  schema: [
    optionTypes.image('image', 'Image', { description: 'Enter the URL of the image' })
  ],
  defaultData: {
    image: {
      url: '',
      alt: 'Image',
      caption: 'Image',
      width: 400,
      height: 300,
      borderRadius: 'lg',
      shadow: 'md',
      alignment: 'center',
    },
  }
})
