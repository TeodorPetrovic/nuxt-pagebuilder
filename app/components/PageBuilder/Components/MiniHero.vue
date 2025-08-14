<template>
  <div class="text-block" :class="alignmentClass" :style="containerStyles">
    <div v-if="data.heading?.value" class="text-block-heading mb-3">
      <h2 :style="headingStyles">
        {{ data.heading.value }}
      </h2>
    </div>
    
    <div v-if="data.content.value" class="text-block-content">
      <p :style="textStyles">
        {{ data.content.value }}
      </p>
    </div>
    
    <div v-if="data.button?.value" class="text-block-button mt-4" :class="buttonAlignmentClass">
      <UButton 
        :color="getButtonColor(data.button.color)"
        :variant="data.button.variant || 'solid'"
        :size="data.button.size || 'md'"
      >
        {{ data.button.value }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  data: {
    // Basic content
    alignment?: 'left' | 'center' | 'right' | 'justify'
    
    // Heading group
    heading?: {
      value?: string,
      size?: number,
      color?: string,
      bold?: boolean,
      italic?: boolean,
      underline?: boolean
    },

    // Text group
    content: {
      value?: string,
      size?: number
      color?: string
      bold?: boolean
      italic?: boolean
    }
    
    // Button group
    button?: {
      value?: string
      color?: string
      variant?: 'solid' | 'outline' | 'ghost'
      size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      alignment?: 'left' | 'center' | 'right'
    }
    
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
const alignmentClass = computed(() => `text-${props.data.alignment || 'left'}`)

// Button alignment (can override content alignment)
const buttonAlignmentClass = computed(() => `text-${props.data.button?.alignment || props.data.alignment || 'left'}`)

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
    fontSize: `${props.data.heading?.size || 32}px`,
    color: props.data.heading?.color || '#1f2937',
    margin: '0',
    lineHeight: '1.2'
  }
  
  // Font weight
  if (props.data.heading?.bold) styles.fontWeight = 'bold'
  
  // Font style
  if (props.data.heading?.italic) styles.fontStyle = 'italic'
  
  // Text decoration
  let textDecoration = 'none'
  if (props.data.heading?.underline) textDecoration = 'underline'
  if (textDecoration !== 'none') styles.textDecoration = textDecoration
  
  return styles
})

// Text styles (with full typography control)
const textStyles = computed(() => {
  const styles: Record<string, string> = {
    fontSize: `${props.data.content.size || 16}px`,
    color: props.data.content.color || '#4b5563',
    lineHeight: '1.6',
    margin: '0'
  }
  
  // Font weight
  if (props.data.content.bold) styles.fontWeight = 'bold'
  
  // Font style
  if (props.data.content.italic) styles.fontStyle = 'italic'
  
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


