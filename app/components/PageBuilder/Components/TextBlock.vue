<template>
  <div class="relative" :style="componentStyles">
    <div v-if="isEditing" class="absolute inset-0 bg-blue-50 border-2 border-blue-200 opacity-0 hover:opacity-100 transition-opacity">
      <div class="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">Text Block</div>
    </div>
    
    <div class="p-4" :class="alignmentClass" :style="textStyles">
      <h1 v-if="data.heading" class="text-2xl font-bold mb-2">{{ data.heading }}</h1>
      <p v-if="data.content" class="text-base leading-relaxed">{{ data.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentInstance } from '../../../libs/pagebuilder/types'

interface Props {
  component: ComponentInstance
  isEditing?: boolean
}

const props = defineProps<Props>()

const data = computed(() => props.component.data)
const isEditing = computed(() => props.isEditing || false)

const componentStyles = computed(() => ({
  width: `${props.component.size.width}px`,
  height: `${props.component.size.height}px`,
  position: 'relative'
}))

const textStyles = computed(() => ({
  fontSize: `${data.value.fontSize || 16}px`,
  color: data.value.textColor || '#000000',
  fontWeight: data.value.bold ? 'bold' : 'normal',
  fontStyle: data.value.italic ? 'italic' : 'normal'
}))

const alignmentClass = computed(() => {
  switch (data.value.alignment) {
    case 'center': return 'text-center'
    case 'right': return 'text-right'
    default: return 'text-left'
  }
})
</script>
