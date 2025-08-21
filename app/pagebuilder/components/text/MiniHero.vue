<script setup lang="ts">
import { computed } from 'vue'

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
      underline?: boolean
    }
    
    // Button group
    button?: {
      value?: string
      color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
      variant?: 'solid' | 'outline' | 'ghost'
      size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      alignment?: 'left' | 'center' | 'right'
      newTab?: boolean
      url?: string
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

const alignmentClass = computed(() => {
  const alignment = props.data.alignment || 'left'
  return `text-${alignment}`
})

// Button container styles (for proper alignment)
const buttonContainerStyles = computed(() => {
  const buttonAlignment = props.data.button?.alignment || props.data.alignment || 'left'
  return {
    textAlign: buttonAlignment as 'left' | 'center' | 'right' | 'justify'
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
    fontSize: `${props.data.heading?.size || 32}px`,
    color: props.data.heading?.color || '#1f2937',
    margin: '0',
    lineHeight: '1.2',
    textAlign: props.data.alignment || 'left'
  }
  if (props.data.heading?.bold) styles.fontWeight = 'bold'
  if (props.data.heading?.italic) styles.fontStyle = 'italic'
  if (props.data.heading?.underline) styles.textDecoration = 'underline'
  
  return styles
})

// Text styles (with full typography control)
const textStyles = computed(() => {
  const styles: Record<string, string> = {
    fontSize: `${props.data.content.size || 16}px`,
    color: props.data.content.color || '#4b5563',
    lineHeight: '1.6',
    margin: '0',
    textAlign: props.data.alignment || 'left'
  }
  if (props.data.content.bold) styles.fontWeight = 'bold'
  if (props.data.content.italic) styles.fontStyle = 'italic'
  
  return styles
})

// URL validation helper
const isValidUrl = (url?: string) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

</script>

<template>
  <div :style="containerStyles">
    <div v-if="data.heading?.value" class="mb-3">
      <h2 :style="headingStyles">
        {{ data.heading.value }}
      </h2>
    </div>
    
    <div v-if="data.content.value">
      <p :style="textStyles">
        {{ data.content.value }}
      </p>
    </div>
    
    <div v-if="data.button?.value" class="mt-4" :style="buttonContainerStyles">
      <!-- Link Button (valid URL only) -->
      <UButton
        v-if="isValidUrl(data.button.url)"
        :to="data.button.url"
        :target="data.button.newTab ? '_blank' : '_self'"
        :external="data.button.newTab"
        :color="data.button.color"
        :variant="data.button.variant || 'solid'"
        :size="data.button.size || 'md'"
      >
        {{ data.button.value }}
      </UButton>
      
      <!-- Regular Button (invalid/empty URL) -->
      <UButton
        v-else
        :color="data.button.color"
        :variant="data.button.variant || 'solid'"
        :size="data.button.size || 'md'"
      >
        {{ data.button.value }}
      </UButton>
    </div>
  </div>
</template>
