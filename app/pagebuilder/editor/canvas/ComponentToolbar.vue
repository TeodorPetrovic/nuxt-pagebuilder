<script setup lang="ts">
interface Props {
  componentId: string
}

interface Emits {
  (e: 'select'): void
  (e: 'remove'): void
  (e: 'drag-start', event: MouseEvent): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const onSelect = () => {
  emit('select')
}

const onRemove = () => {
  emit('remove')
}

const onDragStart = (event: MouseEvent) => {
  emit('drag-start', event)
}
</script>

<template>
  <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
    <div class="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-sm p-1">
      <UButton 
        variant="ghost" 
        size="xs" 
        icon="i-lucide-move" 
        class="cursor-move"
        @mousedown="onDragStart"
        title="Move component"
      />
      <UButton 
        variant="ghost" 
        size="xs" 
        icon="i-lucide-settings"
        @click="onSelect"
        title="Edit component"
      />
      <UButton 
        variant="ghost" 
        size="xs" 
        icon="i-lucide-trash-2" 
        color="error"
        @click="onRemove"
        title="Delete component"
      />
    </div>
  </div>
</template>
