<template>
  <div class="space-y-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
    <!-- Button Text -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
      <UInput 
        v-model="textValue" 
        @update:model-value="updateText"
        placeholder="Enter button text"
        class="w-full" 
      />
    </div>

    <!-- Button Properties Row -->
    <div class="grid grid-cols-3 gap-3">
      <!-- Variant -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Style</label>
        <USelect
          v-model="variantValue"
          @update:model-value="updateVariant"
          :options="variantOptions"
          class="w-full"
        />
      </div>

      <!-- Size -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Size</label>
        <USelect
          v-model="sizeValue"
          @update:model-value="updateSize"
          :options="sizeOptions"
          class="w-full"
        />
      </div>

      <!-- Color -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Color</label>
        <USelect
          v-model="colorValue"
          @update:model-value="updateColor"
          :options="colorOptions"
          class="w-full"
        />
      </div>
    </div>

    <!-- Alignment -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
      <UButtonGroup class="w-full">
        <UButton
          v-for="align in alignmentOptions"
          :key="align.value"
          :variant="alignmentValue === align.value ? 'solid' : 'outline'"
          :color="alignmentValue === align.value ? 'primary' : 'gray'"
          @click="updateAlignment(align.value)"
          class="flex-1"
          size="sm"
        >
          {{ align.label }}
        </UButton>
      </UButtonGroup>
    </div>

    <!-- Preview -->
    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Preview</label>
      <div 
        class="p-3 bg-white border border-gray-200 rounded-md"
        :class="`text-${alignmentValue}`"
      >
        <UButton
          :color="colorValue"
          :variant="variantValue"
          :size="sizeValue"
        >
          {{ textValue || 'Button Text' }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  value: string
  color: string
  variant: 'solid' | 'outline' | 'ghost'
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  alignment: 'left' | 'center' | 'right'
}

const props = defineProps<{
  modelValue: ButtonProps
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: ButtonProps): void
}>()

// Option definitions
const variantOptions = [
  { label: 'Solid', value: 'solid' },
  { label: 'Outline', value: 'outline' },
  { label: 'Ghost', value: 'ghost' }
]

const sizeOptions = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' }
]

const colorOptions = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'gray' },
  { label: 'Success', value: 'green' },
  { label: 'Warning', value: 'yellow' },
  { label: 'Error', value: 'red' },
  { label: 'Info', value: 'blue' }
]

const alignmentOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' }
]

// Computed values for v-model
const textValue = computed({
  get: () => props.modelValue?.value || '',
  set: (value: string) => updateText(value)
})

const variantValue = computed({
  get: () => props.modelValue?.variant || 'solid',
  set: (value: string) => updateVariant(value)
})

const sizeValue = computed({
  get: () => props.modelValue?.size || 'md',
  set: (value: string) => updateSize(value)
})

const colorValue = computed({
  get: () => props.modelValue?.color || 'primary',
  set: (value: string) => updateColor(value)
})

const alignmentValue = computed({
  get: () => props.modelValue?.alignment || 'left',
  set: (value: string) => updateAlignment(value)
})

// Update functions
const updateText = (value: string) => {
  emits('update:modelValue', { ...props.modelValue, value })
}

const updateVariant = (value: string) => {
  emits('update:modelValue', { ...props.modelValue, variant: value as any })
}

const updateSize = (value: string) => {
  emits('update:modelValue', { ...props.modelValue, size: value as any })
}

const updateColor = (value: string) => {
  emits('update:modelValue', { ...props.modelValue, color: value })
}

const updateAlignment = (value: string) => {
  emits('update:modelValue', { ...props.modelValue, alignment: value as any })
}
</script>
