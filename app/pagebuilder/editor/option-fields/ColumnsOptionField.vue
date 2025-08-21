<script lang="ts" setup>

interface ColumnsProps {
  columnCount: number
  gap: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = defineProps<{
  modelValue: ColumnsProps
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: ColumnsProps): void
}>()

const columnCountOptions = [
  { label: '1 Column', value: 1, icon: 'i-lucide-square' },
  { label: '2 Columns', value: 2, icon: 'i-lucide-columns-2' },
  { label: '3 Columns', value: 3, icon: 'i-lucide-columns-3' },
  { label: '4 Columns', value: 4, icon: 'i-lucide-columns-4' }
]

const gapOptions = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' }
]

const updateColumnCount = (value: number) => {
  emits('update:modelValue', { ...props.modelValue, columnCount: value })
}

const updateGap = (value: string) => {
  emits('update:modelValue', { ...props.modelValue, gap: value as any })
}

</script>

<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Number of Columns</label>
      <div class="grid grid-cols-2 gap-2">
        <UButton 
          v-for="option in columnCountOptions" 
          :key="option.value"
          :variant="props.modelValue.columnCount === option.value ? 'solid' : 'outline'"
          :color="props.modelValue.columnCount === option.value ? 'primary' : 'neutral'"
          :icon="option.icon"
          :label="option.label"
          size="sm"
          @click="updateColumnCount(option.value)"
          class="justify-start"
        />
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Column Gap</label>
      <USelect 
        :model-value="props.modelValue.gap"
        :items="gapOptions"
        @update:model-value="updateGap"
        class="w-full"
        placeholder="Select gap size"
      />
    </div>
  </div>
</template>
