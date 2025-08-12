<template>
  <div class="w-full" :class="containerClass">
    <div class="w-full grid gap-2" :style="gridStyles">
      <div 
        v-for="(cell, index) in data.cells" 
        :key="cell.id"
        class="relative min-h-[200px] h-full"
        :class="getCellClass(index)"
        :style="getCellStyles(cell)"
      >
        <div class="h-full min-h-[200px] relative">
          <div v-if="!cell.components || cell.components.length === 0" 
               class="h-full min-h-[200px] border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50 transition-all duration-200 hover:bg-gray-100 hover:border-gray-400">
            <div class="text-center">
              <UIcon name="i-lucide-grid" class="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p class="text-xs text-gray-500">Cell {{ index + 1 }}</p>
            </div>
          </div>
          <div v-else class="min-h-[200px]">
            <!-- This will be populated by the page builder when components are added -->
            <div class="text-gray-400 text-xs text-center py-2 italic">
              Cell content
            </div>
          </div>
          
          <!-- Drop zone for this cell -->
          <div class="absolute bottom-0 left-0 right-0 h-8 bg-blue-100/30 border-2 border-dashed border-blue-400 rounded flex items-center justify-center opacity-30 transition-all duration-200 cursor-pointer z-10 hover:opacity-100 hover:bg-blue-200/40" 
               @dragover.prevent 
               @drop="onCellDrop($event, index)"
               @dragenter="onCellDragEnter($event, index)"
               @dragleave="onCellDragLeave">
            <div class="flex items-center gap-1 text-blue-600">
              <UIcon name="i-lucide-plus" class="w-4 h-4 text-gray-400" />
              <span class="text-xs text-gray-500">Drop here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

interface GridCell {
  id: string
  row: number
  col: number
  rowSpan: number
  colSpan: number
  components: any[]
}

interface Props {
  data: {
    cells: GridCell[]
    rows: number
    columns: number
    gap: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    alignment: 'left' | 'center' | 'right'
    fullWidth: boolean
    autoFit: boolean
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'cell-drop': [cellIndex: number, componentData: any]
}>()

const containerClass = computed(() => {
  const classes = ['w-full']
  if (props.data.fullWidth) {
    classes.push('max-w-none')
  } else {
    classes.push('max-w-7xl mx-auto')
  }
  return classes.join(' ')
})

const gridStyles = computed(() => {
  const styles: any = {
    gap: getGapValue(props.data.gap)
  }
  
  if (props.data.autoFit) {
    styles.gridTemplateColumns = `repeat(auto-fit, minmax(200px, 1fr))`
  } else {
    styles.gridTemplateColumns = `repeat(${props.data.columns}, 1fr)`
    styles.gridTemplateRows = `repeat(${props.data.rows}, minmax(200px, auto))`
  }
  
  return styles
})

const getGapValue = (gap: string) => {
  switch (gap) {
    case 'none': return '0'
    case 'sm': return '0.25rem'
    case 'md': return '0.5rem'
    case 'lg': return '1rem'
    case 'xl': return '1.5rem'
    default: return '0.5rem'
  }
}

const getCellClass = (index: number) => {
  return ['h-full', 'min-h-[200px]']
}

const getCellStyles = (cell: GridCell) => {
  if (props.data.autoFit) {
    return {}
  }
  
  return {
    gridRow: `${cell.row} / span ${cell.rowSpan}`,
    gridColumn: `${cell.col} / span ${cell.colSpan}`
  }
}

// Cell drop zone handlers
const onCellDrop = (event: DragEvent, cellIndex: number) => {
  event.preventDefault()
  const componentData = event.dataTransfer?.getData('block-type')
  if (componentData) {
    emit('cell-drop', cellIndex, componentData)
  }
}

const onCellDragEnter = (event: DragEvent, cellIndex: number) => {
  event.preventDefault()
  // Add visual feedback for drag enter
}

const onCellDragLeave = (event: DragEvent) => {
  event.preventDefault()
  // Remove visual feedback for drag leave
}

// Watch for row/column changes and update cells array accordingly
watch([() => props.data.rows, () => props.data.columns], ([newRows, newColumns], [oldRows, oldColumns]) => {
  if (newRows !== oldRows || newColumns !== oldColumns) {
    // This will be handled by the page builder when the properties change
    // The cells array should be updated by the parent component
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
    margin-bottom: 0.5rem;
  }
}
</style>


