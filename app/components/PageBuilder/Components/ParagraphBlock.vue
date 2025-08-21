<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: {
    content: {
      value?: string,
      size?: number
      color?: string
      bold?: boolean
      italic?: boolean
      underline?: boolean
    }
  }
}

const props = defineProps<Props>()

const textStyles = computed(() => {
  const styles: Record<string, string> = {
    fontSize: `${props.data.content.size || 16}px`,
    color: props.data.content.color || '#4b5563',
    lineHeight: '1.6',
    margin: '0'
  }
  if (props.data.content.bold) styles.fontWeight = 'bold'
  if (props.data.content.italic) styles.fontStyle = 'italic'
  if (props.data.content.underline) styles.textDecoration = 'underline'
  
  return styles
})

</script>

<template>
  <div class="w-full">
    <p :style="textStyles">
      {{ data.content.value}}
    </p>
  </div>
</template>