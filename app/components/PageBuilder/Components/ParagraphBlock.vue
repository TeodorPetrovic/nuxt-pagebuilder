<template>
  <div class="w-full" :class="alignmentClass">
    <p 
      :class="`text-${data.textSize || 'base'} text-${data.textColor || 'gray-700'} leading-${data.lineHeight || 'relaxed'}`"
    >
      {{ data.content || 'Enter your paragraph text here...' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: {
    content?: string
    textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
    textColor?: string
    lineHeight?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
    alignment?: 'left' | 'center' | 'right' | 'justify'
  }
}

const props = defineProps<Props>()

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
</script>


