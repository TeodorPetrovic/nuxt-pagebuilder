<script setup lang="ts">
interface Props {
  isActive?: boolean
  isDragging?: boolean
  position?: 'top' | 'bottom' | 'final' | 'initial'
}

interface Emits {
  (e: 'drop', event: DragEvent): void
  (e: 'drag-enter'): void
  (e: 'drag-leave'): void
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  isDragging: false,
  position: 'initial'
})

const emit = defineEmits<Emits>()

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  emit('drop', event)
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDragEnter = () => {
  emit('drag-enter')
}

const onDragLeave = () => {
  emit('drag-leave')
}

const getPositionClasses = () => {
  const base = 'transition-all duration-200 cursor-pointer'
  
  switch (props.position) {
    case 'top':
      return `${base} absolute top-0 left-0 right-0 h-[30px] z-10`
    case 'bottom':
      return `${base} absolute bottom-0 left-0 right-0 h-[30px] z-10`
    case 'final':
      return `${base} h-8 mt-4 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50`
    case 'initial':
    default:
      return `${base} border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50`
  }
}

const getActiveClasses = () => {
  if (!props.isActive) return ''
  
  switch (props.position) {
    case 'top':
    case 'bottom':
      return 'bg-blue-50 border-2 border-blue-400 border-dashed'
    case 'final':
      return 'border-blue-400 bg-blue-50'
    case 'initial':
    default:
      return 'border-blue-400 bg-blue-50'
  }
}

const getHoverClasses = () => {
  if (!props.isDragging || props.isActive) return ''
  
  switch (props.position) {
    case 'top':
    case 'bottom':
      return 'hover:bg-gray-50'
    case 'final':
      return 'hover:border-blue-400 hover:bg-blue-50'
    case 'initial':
    default:
      return 'hover:border-blue-400 hover:bg-blue-50'
  }
}
</script>

<template>
  <div
    :class="[
      getPositionClasses(),
      getActiveClasses(),
      getHoverClasses()
    ]"
    @dragover="onDragOver"
    @drop="onDrop"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <div v-if="isActive" class="flex items-center justify-center h-full">
      <slot name="active" />
    </div>
    <div v-else class="flex items-center justify-center h-full">
      <slot />
    </div>
  </div>
</template>
