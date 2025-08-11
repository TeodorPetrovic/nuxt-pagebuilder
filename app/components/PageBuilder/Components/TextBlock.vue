<template>
  <div class="text-block" :class="alignmentClass">
    <div v-if="data.heading" class="text-block-heading mb-3">
      <h2 
        :class="`text-${data.headingSize || '2xl'} font-${data.headingWeight || 'bold'} text-${data.headingColor || 'gray-900'}`"
      >
        {{ data.heading }}
      </h2>
    </div>
    
    <div v-if="data.content" class="text-block-content">
      <p 
        :class="`text-${data.textSize || 'base'} text-${data.textColor || 'gray-700'} leading-${data.lineHeight || 'relaxed'}`"
      >
        {{ data.content }}
      </p>
    </div>
    
    <div v-if="data.buttonText" class="text-block-button mt-4">
      <UButton 
        :color="data.buttonColor || 'primary'"
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
    heading?: string
    headingSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
    headingWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
    headingColor?: string
    content?: string
    textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
    textColor?: string
    lineHeight?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
    buttonText?: string
    buttonColor?: string
    buttonVariant?: 'solid' | 'outline' | 'ghost'
    buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    alignment?: 'left' | 'center' | 'right' | 'justify'
  }
}

const props = defineProps<Props>()

const alignmentClass = computed(() => {
  const alignment = props.data.alignment || 'left'
  return `text-${alignment}`
})
</script>
