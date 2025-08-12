<template>
  <div class="w-full">
    <div class="w-full grid gap-4" :style="containerStyles">
      <div 
        v-for="(column, index) in data.columns" 
        :key="column.id"
        class="h-full min-h-[200px] relative"
        :class="getColumnClass(index)"
        :style="getColumnStyles(index)"
      >
        <div class="h-full min-h-[200px] relative">
          <div v-if="!column.components || column.components.length === 0" 
               class="h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 transition-all duration-200 hover:bg-gray-100 hover:border-gray-400">
            <div class="text-center">
              <UIcon name="i-lucide-plus" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p class="text-sm text-gray-500">Empty Column</p>
              <p class="text-xs text-gray-400">Add components here</p>
            </div>
          </div>
          <div v-else class="min-h-[200px]">
            <!-- This will be populated by the page builder when components are added -->
            <div class="text-gray-400 text-sm text-center py-4 italic">
              Column {{ index + 1 }} content
            </div>
          </div>
          
          <!-- Drop zone for this column -->
          <div class="absolute bottom-0 left-0 right-0 h-10 bg-blue-100/30 border-2 border-dashed border-blue-400 rounded-md flex items-center justify-center opacity-30 transition-all duration-200 cursor-pointer z-10 hover:opacity-100 hover:bg-blue-200/40" 
               @dragover.prevent 
               @drop="onColumnDrop($event, index)"
               @dragenter="onColumnDragEnter($event, index)"
               @dragleave="onColumnDragLeave">
            <div class="flex items-center gap-2 text-blue-600">
              <UIcon name="i-lucide-plus" class="w-6 h-6 text-gray-400" />
              <span class="text-sm text-gray-500">Drop components here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

interface Column {
  id: string
  width: number
  components: any[]
}

interface Props {
  data: {
    columns: Column[]
    columnCount: number
    gap: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'column-drop': [columnIndex: number, componentData: any]
}>()

const containerStyles = computed(() => ({
  gridTemplateColumns: `repeat(${props.data.columnCount}, 1fr)`,
  gap: getGapValue(props.data.gap)
}))

const getGapValue = (gap: string) => {
  switch (gap) {
    case 'none': return '0'
    case 'sm': return '0.5rem'
    case 'md': return '1rem'
    case 'lg': return '1.5rem'
    case 'xl': return '2rem'
    default: return '1rem'
  }
}

const getColumnClass = (index: number) => {
  const classes = ['h-full']
  
  // Add responsive classes
  if (props.data.columnCount === 1) {
    classes.push('col-span-1')
  } else if (props.data.columnCount === 2) {
    classes.push('col-span-1 md:col-span-1')
  } else if (props.data.columnCount === 3) {
    classes.push('col-span-1 md:col-span-1')
  } else if (props.data.columnCount === 4) {
    classes.push('col-span-2 md:col-span-1')
  }
  
  return classes.join(' ')
}

const getColumnStyles = (index: number) => {
  const column = props.data.columns[index]
  if (!column) return {}
  
  return {
    width: column.width ? `${column.width}%` : 'auto'
  }
}

// Column drop zone handlers
const onColumnDrop = (event: DragEvent, columnIndex: number) => {
  event.preventDefault()
  const componentData = event.dataTransfer?.getData('block-type')
  if (componentData) {
    emit('column-drop', columnIndex, componentData)
  }
}

const onColumnDragEnter = (event: DragEvent, columnIndex: number) => {
  event.preventDefault()
  // Add visual feedback for drag enter
}

const onColumnDragLeave = (event: DragEvent) => {
  event.preventDefault()
  // Remove visual feedback for drag leave
}

// Watch for column count changes and update columns array accordingly
watch(() => props.data.columnCount, (newCount, oldCount) => {
  if (newCount !== oldCount) {
    // This will be handled by the page builder when the property changes
    // The columns array should be updated by the parent component
  }
}, { immediate: true })
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr !important;
  }
  
  .min-h-\[200px\] {
    margin-bottom: 1rem;
  }
}
</style>


