<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: {
    imageUrl?: string
    altText?: string
    caption?: string
    width?: number
    height?: number
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    alignment?: 'left' | 'center' | 'right'
    linkUrl?: string
  }
}

const props = defineProps<Props>()

const alignmentClass = computed(() => {
  const alignment = props.data.alignment || 'center'
  switch (alignment) {
    case 'left':
      return 'flex justify-start'
    case 'right':
      return 'flex justify-end'
    case 'center':
    default:
      return 'flex justify-center'
  }
})

const imageStyles = computed(() => ({
  width: props.data.width ? `${props.data.width}px` : '100%',
  height: props.data.height ? `${props.data.height}px` : 'auto',
  objectFit: 'cover' as const
}))

const placeholderStyles = computed(() => ({
  width: props.data.width ? `${props.data.width}px` : '400px',
  height: props.data.height ? `${props.data.height}px` : '300px',
  maxWidth: '100%'
}))
</script>

<template>
  <div class="image-block" :class="alignmentClass">
    <div v-if="data.imageUrl" class="image-container">
      <img 
        :src="data.imageUrl" 
        :alt="data.altText || 'Image'"
        :class="`rounded-${data.borderRadius || 'lg'} shadow-${data.shadow || 'md'}`"
        :style="imageStyles"
      />
      
      <div v-if="data.caption" class="image-caption mt-2 text-center">
        <p class="text-sm text-gray-600">{{ data.caption }}</p>
      </div>
    </div>
    
    <div v-else class="image-placeholder">
      <div class="placeholder-container" :style="placeholderStyles">
        <div class="text-center text-gray-500">
          <UIcon name="i-lucide-image" class="w-12 h-12 mx-auto mb-2" />
          <p class="text-sm">No image selected</p>
          <p class="text-xs text-gray-400 mt-1">{{ data.width || 400 }} × {{ data.height || 300 }}px</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-block {
  width: 100%;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: inherit;
}

.image-container img {
  max-width: 100%;
  height: auto;
}

.placeholder-container {
  background-color: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

.placeholder-container:hover {
  background-color: #e5e7eb;
  border-color: #9ca3af;
}
</style>