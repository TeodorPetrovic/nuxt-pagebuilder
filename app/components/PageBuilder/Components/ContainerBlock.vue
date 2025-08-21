<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: {
    components: any[]
    padding: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    margin: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    backgroundColor: string
    borderColor: string
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    borderWidth: 'none' | 'thin' | 'medium' | 'thick'
    shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    fullWidth: boolean
    maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
  }
  isEditing?: boolean
}

const props = defineProps<Props>()

const containerClass = computed(() => {
  const classes = ['w-full']
  
  if (!props.data.fullWidth) {
    classes.push(`max-w-${props.data.maxWidth || '4xl'}`)
    classes.push('mx-auto')
  }
  
  return classes.join(' ')
})

const containerStyles = computed(() => {
  const styles: any = {}
  
  // Padding
  const paddingValue = getSpacingValue(props.data.padding)
  if (paddingValue !== '0') {
    styles.padding = paddingValue
  }
  
  // Margin
  const marginValue = getSpacingValue(props.data.margin)
  if (marginValue !== '0') {
    styles.margin = marginValue
  }
  
  // Background color
  if (props.data.backgroundColor && props.data.backgroundColor !== 'transparent') {
    styles.backgroundColor = props.data.backgroundColor
  }
  
  // Border
  if (props.data.borderWidth && props.data.borderWidth !== 'none') {
    const borderWidth = getBorderWidthValue(props.data.borderWidth)
    const borderColor = props.data.borderColor || '#d1d5db'
    styles.border = `${borderWidth} solid ${borderColor}`
  }
  
  // Border radius
  if (props.data.borderRadius && props.data.borderRadius !== 'none') {
    styles.borderRadius = getBorderRadiusValue(props.data.borderRadius)
  }
  
  // Shadow
  if (props.data.shadow && props.data.shadow !== 'none') {
    styles.boxShadow = getShadowValue(props.data.shadow)
  }
  
  return styles
})

const getSpacingValue = (spacing: string) => {
  switch (spacing) {
    case 'none': return '0'
    case 'sm': return '0.5rem'
    case 'md': return '1rem'
    case 'lg': return '1.5rem'
    case 'xl': return '2rem'
    default: return '1rem'
  }
}

const getBorderWidthValue = (width: string) => {
  switch (width) {
    case 'thin': return '1px'
    case 'medium': return '2px'
    case 'thick': return '4px'
    default: return '1px'
  }
}

const getBorderRadiusValue = (radius: string) => {
  switch (radius) {
    case 'sm': return '0.25rem'
    case 'md': return '0.375rem'
    case 'lg': return '0.5rem'
    case 'xl': return '0.75rem'
    case 'full': return '9999px'
    default: return '0.375rem'
  }
}

const getShadowValue = (shadow: string) => {
  switch (shadow) {
    case 'sm': return '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    case 'md': return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    case 'lg': return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    case 'xl': return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    case '2xl': return '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    default: return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }
}
</script>

<template>
  <div class="w-full" :class="containerClass" :style="containerStyles">
    <div class="w-full min-h-[100px]">
      <div v-if="!data.components || data.components.length === 0" 
           :class="[
             'h-full min-h-[100px] flex items-center justify-center',
             isEditing 
               ? 'border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 transition-all duration-200 hover:bg-gray-100 hover:border-gray-400'
               : 'bg-transparent'
           ]">
        <div v-if="isEditing" class="text-center">
          <UIcon name="i-lucide-box" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p class="text-sm text-gray-500">Container</p>
          <p class="text-xs text-gray-400">Add components here</p>
        </div>
      </div>
      <div v-else class="min-h-[100px]">
        <!-- This will be populated by the page builder when components are added -->
        <div class="text-gray-400 text-sm text-center py-4 italic">
          Container content
        </div>
      </div>
    </div>
  </div>
</template>