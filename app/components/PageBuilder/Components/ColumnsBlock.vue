<script setup lang="ts">
interface Column {
  id: string
  width: number
  components: any[]
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


</script>

<template>
  <div :class="containerClass">
    <div 
      v-for="(column, index) in data.columnsData" 
      :key="column.id"
      class="min-h-[200px]"
    >
      <div v-if="!column.components || column.components.length === 0" 
           class="h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 transition-all duration-200 hover:bg-gray-100 hover:border-gray-400">
        <div class="text-center">
          <UIcon name="i-lucide-columns" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p class="text-sm text-gray-500">Empty Column</p>
          <p class="text-xs text-gray-400">Column {{ index + 1 }}</p>
        </div>
      </div>
      
      <div v-else class="min-h-[200px]">
        <!-- This will be populated by the page builder when components are added -->
        <div class="text-gray-400 text-sm text-center py-4 italic">
          Column {{ index + 1 }} content
        </div>
      </div>
    </div>
  </div>
</template>

