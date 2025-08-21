<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: {
    image: {
      url: string
      alt: string
      caption: string
      width: number
      height: number
      borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
      shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
      alignment: 'left' | 'center' | 'right'
    }
  }
}

const props = defineProps<Props>()

const alignmentClass = computed(() => `flex justify-${props.data.image.alignment || 'center'}`)

const imageStyles = computed(() => ({
  width: props.data.image.width ? `${props.data.image.width}px` : '100%',
  height: props.data.image.height ? `${props.data.image.height}px` : 'auto',
  objectFit: 'cover' as const
}))

const placeholderStyles = computed(() => ({
  width: props.data.image.width ? `${props.data.image.width}px` : '400px',
  height: props.data.image.height ? `${props.data.image.height}px` : '300px',
  maxWidth: '100%'
}))
</script>

<template>
  <div class="w-full" :class="alignmentClass">
    <div class="flex flex-col">
      <img
        v-if="data.image.url"
        :src="data.image.url" 
        :alt="data.image.alt || 'Image'"
        :class="`rounded-${data.image.borderRadius || 'lg'} shadow-${data.image.shadow || 'md'} max-w-full h-auto object-cover`"
        :style="imageStyles"
      />
      <div v-else class="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-gray-200 hover:border-gray-400" :style="placeholderStyles">
        <div class="text-center text-gray-500">
          <UIcon name="i-lucide-image" class="w-12 h-12 mx-auto mb-2" />
          <p class="text-sm">No image selected</p>
          <p class="text-xs text-gray-400 mt-1">{{ data.image.width || 400 }} × {{ data.image.height || 300 }}px</p>
        </div>
      </div>
      
      <div v-if="data.image.caption" class="mt-2 text-center">
        <p class="text-sm text-gray-600">{{ data.image.caption }}</p>
      </div>
    </div>
  </div>
</template>