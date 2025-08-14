<template>
  <div class="text-block" :class="alignmentClass" :style="containerStyles">
    <div v-if="data.heading" class="text-block-heading mb-3">
      <h2 :style="headingStyles">
        {{ data.heading }}
      </h2>
    </div>
    
    <div v-if="data.content" class="text-block-content">
      <p :style="textStyles">
        {{ data.content }}
      </p>
    </div>
    
    <div v-if="data.buttonText" class="text-block-button mt-4" :class="buttonAlignmentClass">
      <UButton 
        :color="getButtonColor(data.buttonColor)"
        :variant="data.buttonVariant || 'solid'"
        :size="data.buttonSize || 'md'"
      >
        {{ data.buttonText }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: {
    // Basic content
    heading?: string
    content?: string
    alignment?: 'left' | 'center' | 'right' | 'justify'
    
    // Heading group
    headingSize?: number
    headingBold?: boolean
    headingItalic?: boolean
    headingUnderline?: boolean
    headingColor?: string
    
    // Text group
    textSize?: number
    textColor?: string
    textBold?: boolean
    textItalic?: boolean
    
    // Button group
    buttonText?: string
    buttonColor?: string
    buttonVariant?: 'solid' | 'outline' | 'ghost'
    buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    buttonAlignment?: 'left' | 'center' | 'right'
    
    // Spacing group
    spacing?: {
      paddingTop?: number
      paddingRight?: number
      paddingBottom?: number
      paddingLeft?: number
      marginTop?: number
      marginRight?: number
      marginBottom?: number
      marginLeft?: number
    }
  }
}

const props = defineProps<Props>()

// Content alignment
const alignmentClass = computed(() => {
  const alignment = props.data.alignment || 'left'
  switch (alignment) {
    case 'left':
      return 'text-left'
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    case 'justify':
      return 'text-justify'
    default:
      return 'text-left'
  }
})

// Button alignment (can override content alignment)
const buttonAlignmentClass = computed(() => {
  const alignment = props.data.buttonAlignment || props.data.alignment || 'left'
  switch (alignment) {
    case 'left':
      return 'text-left'
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    default:
      return 'text-left'
  }
})

// Container styles (spacing)
const containerStyles = computed(() => {
  const spacing = props.data.spacing || {}
  return {
    paddingTop: `${spacing.paddingTop || 0}px`,
    paddingRight: `${spacing.paddingRight || 0}px`,
    paddingBottom: `${spacing.paddingBottom || 0}px`,
    paddingLeft: `${spacing.paddingLeft || 0}px`,
    marginTop: `${spacing.marginTop || 0}px`,
    marginRight: `${spacing.marginRight || 0}px`,
    marginBottom: `${spacing.marginBottom || 0}px`,
    marginLeft: `${spacing.marginLeft || 0}px`
  }
})

// Heading styles (with full typography control)
const headingStyles = computed(() => {
  const styles: Record<string, string> = {
    fontSize: `${props.data.headingSize || 32}px`,
    color: props.data.headingColor || '#1f2937',
    margin: '0',
    lineHeight: '1.2'
  }
  
  // Font weight
  if (props.data.headingBold) styles.fontWeight = 'bold'
  
  // Font style
  if (props.data.headingItalic) styles.fontStyle = 'italic'
  
  // Text decoration
  let textDecoration = 'none'
  if (props.data.headingUnderline) textDecoration = 'underline'
  if (textDecoration !== 'none') styles.textDecoration = textDecoration
  
  return styles
})

// Text styles (with full typography control)
const textStyles = computed(() => {
  const styles: Record<string, string> = {
    fontSize: `${props.data.textSize || 16}px`,
    color: props.data.textColor || '#4b5563',
    lineHeight: '1.6',
    margin: '0'
  }
  
  // Font weight
  if (props.data.textBold) styles.fontWeight = 'bold'
  
  // Font style
  if (props.data.textItalic) styles.fontStyle = 'italic'
  
  return styles
})

const getButtonColor = (color?: string) => {
  if (color === 'primary') return 'primary'
  if (color === 'secondary') return 'secondary'
  if (color === 'success') return 'success'
  if (color === 'error') return 'error'
  if (color === 'warning') return 'warning'
  if (color === 'info') return 'info'
  if (color === 'neutral') return 'neutral'
  return 'primary' // Default color
}
</script>


