<template>
  <div class="relative" :style="componentStyles">
    <div v-if="isEditing" class="absolute inset-0 bg-green-50 border-2 border-green-200 opacity-0 hover:opacity-100 transition-opacity">
      <div class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Image Block</div>
    </div>
    
    <div class="h-full w-full" :class="alignmentClass">
      <img 
        v-if="data.imageUrl" 
        :src="data.imageUrl" 
        :alt="data.altText"
        class="max-w-full max-h-full"
        :style="imageStyles"
      />
      <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500 text-sm">No image selected</span>
      </div>
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

const imageStyles = computed(() => ({
  objectFit: data.value.objectFit || 'cover',
  borderRadius: data.value.borderRadius ? `${data.value.borderRadius}px` : '0'
}))

const alignmentClass = computed(() => {
  switch (data.value.alignment) {
    case 'center': return 'flex justify-center items-center'
    case 'left': return 'flex justify-start items-center'
    case 'right': return 'flex justify-end items-center'
    default: return 'flex justify-center items-center'
  }
})
</script>

<style scoped>
</style>
