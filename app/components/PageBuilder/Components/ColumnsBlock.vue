<script setup lang="ts">
import { computed } from 'vue'
import ComponentRenderer from '../ComponentRenderer.vue'
import type { ComponentInstance } from '~/libs/pagebuilder/types'

interface Column {
  id: string
  width: number
  components: ComponentInstance[]
}

interface Props {
  data: {
    columns: {
      columnCount: number
      gap: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    }
    columnsData: Column[]
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'component-add': [columnIndex: number, componentData: any]
  'component-update': [columnIndex: number, componentId: string, updates: any]
  'component-remove': [columnIndex: number, componentId: string]
  'component-select': [componentId: string]
}>()

const containerClass = computed(() => {
  const gapClass = {
    'none': 'gap-0',
    'sm': 'gap-2', 
    'md': 'gap-4',
    'lg': 'gap-6',
    'xl': 'gap-8'
  }[props.data.columns.gap] || 'gap-4'
  
  return `w-full grid ${gapClass} grid-cols-1 sm:grid-cols-${Math.min(props.data.columns.columnCount, 2)} md:grid-cols-${props.data.columns.columnCount}`
})

// Drag and drop handlers
const onColumnDrop = (event: DragEvent, columnIndex: number) => {
  event.preventDefault()
  const blockType = event.dataTransfer?.getData('block-type')
  if (blockType) {
    emit('component-add', columnIndex, blockType)
  }
}

const onColumnDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onComponentClick = (event: Event, componentId: string) => {
  event.stopPropagation()
  emit('component-select', componentId)
}

const onComponentRemove = (event: Event, columnIndex: number, componentId: string) => {
  event.stopPropagation()
  emit('component-remove', columnIndex, componentId)
}

</script>

<template>
  <div :class="containerClass">
    <div 
      v-for="(column, index) in data.columnsData" 
      :key="column.id"
      class="min-h-[200px]"
    >
      <div class="h-full min-h-[200px] relative">
        <!-- Empty Column State -->
        <div v-if="!column.components || column.components.length === 0" 
             class="h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 transition-all duration-200 hover:bg-gray-100 hover:border-gray-400"
             @dragover="onColumnDragOver"
             @drop="onColumnDrop($event, index)">
          <div class="text-center">
            <UIcon name="i-lucide-columns" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p class="text-sm text-gray-500">Empty Column</p>
            <p class="text-xs text-gray-400">Drop components here</p>
          </div>
        </div>
        
        <!-- Column with Components -->
        <div v-else class="min-h-[200px] space-y-2">
          <div v-for="component in column.components" :key="component.id" class="relative group">
            <div class="border border-transparent rounded-lg hover:border-blue-300 transition-colors"
                 @click="onComponentClick($event, component.id)">
              <ComponentRenderer 
                :component="component"
              />
            </div>
            
            <!-- Component Toolbar -->
            <div class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div class="flex items-center space-x-1 bg-white border border-gray-200 rounded shadow-sm p-1">
                <UButton variant="ghost" size="xs" icon="i-lucide-settings"
                  @click="onComponentClick($event, component.id)" />
                <UButton variant="ghost" size="xs" icon="i-lucide-trash-2" color="error"
                  @click="onComponentRemove($event, index, component.id)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

