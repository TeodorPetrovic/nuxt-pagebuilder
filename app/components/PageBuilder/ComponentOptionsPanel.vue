<template>
  <div class="space-y-6">
    <!-- Component Options -->
    <div v-if="component.schema && component.schema.length > 0" class="space-y-6">
      <div v-for="option in component.schema" :key="option.name">
        <label class="block text-sm text-gray-800 pb-1">
          {{ option.label }}
          <span v-if="option.required" class="text-red-500">*</span>
        </label>

        <!-- Text Input -->
        <UInput v-if="option.type === 'text'" v-model="component.data[option.name]" :placeholder="option.description"
          class="w-full" @update:model-value="updateOption(option.name, $event)" />

        <!-- Number Input -->
        <UInput v-else-if="option.type === 'number'" v-model="component.data[option.name]" type="number"
          :placeholder="option.description" class="w-full" @update:model-value="updateOption(option.name, $event)" />

        <!-- Boolean Switch -->
        <USwitch v-else-if="option.type === 'boolean'" v-model="component.data[option.name]" class="w-full"
          @update:model-value="updateOption(option.name, $event)" />

        <!-- Select Dropdown -->
        <USelect v-else-if="option.type === 'select' && option.options" v-model="component.data[option.name]"
          :items="option.options" :placeholder="option.description" class="w-full"
          @update:model-value="updateOption(option.name, $event)" />

        <!-- Color Picker -->
        <UInput v-else-if="option.type === 'color'" v-model="component.data[option.name]" type="color" class="w-full"
          @update:model-value="updateOption(option.name, $event)" />

        <!-- Textarea -->
        <UTextarea v-else-if="option.type === 'textarea'" v-model="component.data[option.name]"
          :placeholder="option.description" class="w-full" @update:model-value="updateOption(option.name, $event)" />

        <!-- JSON Editor -->
        <UTextarea v-else-if="option.type === 'json'" v-model="jsonString" :placeholder="option.description"
          class="w-full" @update:model-value="updateJsonOption(option.name, $event)" />

        <!-- Spacing Box -->
        <SpacingBox v-else-if="option.type === 'spacingBox'" :model-value="getSpacingValue(option.name)"
          @update:model-value="updateSpacingOption(option.name, $event)" />

        <!-- Default Text Input -->
        <UInput v-else v-model="component.data[option.name]" :placeholder="option.description" class="w-full"
          @update:model-value="updateOption(option.name, $event)" />

        <!-- Validation Error -->
        <p v-if="option.validation?.message" class="text-xs text-red-500">
          {{ option.validation.message }}
        </p>
      </div>
    </div>

    <!-- No Options Available -->
    <div v-else class="text-center text-gray-500 py-4">
      <p class="text-sm">No configurable options for this component</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentDefinition } from '~/libs/pagebuilder/types'
import SpacingBox from './SpacingBox.vue'

interface Props {
  component: ComponentDefinition & {
    id: string
    data: Record<string, any>
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [updates: Partial<{ data: Record<string, any> }>]
}>()

// JSON string representation for JSON type options
const jsonString = computed({
  get: () => {
    try {
      return JSON.stringify(props.component.data, null, 2)
    } catch {
      return '{}'
    }
  },
  set: (value: string) => {
    // This will be handled by updateJsonOption
  }
})

const updateOption = (name: string, value: any) => {
  const newData = {
    ...props.component.data,
    [name]: value
  }

  // Check if component has an updateData function for dynamic updates
  if (props.component.updateData) {
    const updatedData = props.component.updateData(props.component.data, newData)
    emit('update', {
      data: updatedData
    })
  } else {
    emit('update', {
      data: newData
    })
  }
}

const updateJsonOption = (name: string, value: string) => {
  try {
    const parsed = JSON.parse(value)
    updateOption(name, parsed)
  } catch (error) {
    // Invalid JSON, don't update
    console.warn('Invalid JSON:', error)
  }
}

const getSpacingValue = (name: string) => {
  const spacing = props.component.data[name]
  console.log('getSpacingValue called with:', name, 'data:', spacing, 'full component data:', props.component.data)
  
  if (spacing && typeof spacing === 'object') {
    return spacing
  }
  
  // Check if component has old individual spacing properties - migrate them
  const legacySpacing = {
    paddingTop: props.component.data.paddingTop || 0,
    paddingRight: props.component.data.paddingRight || 0,
    paddingBottom: props.component.data.paddingBottom || 0,
    paddingLeft: props.component.data.paddingLeft || 0,
    marginTop: props.component.data.marginTop || 0,
    marginRight: props.component.data.marginRight || 0,
    marginBottom: props.component.data.marginBottom || 0,
    marginLeft: props.component.data.marginLeft || 0
  }
  
  // If any legacy values exist, use them
  const hasLegacyValues = Object.values(legacySpacing).some(val => val > 0)
  if (hasLegacyValues) {
    console.log('Using legacy spacing values:', legacySpacing)
    return legacySpacing
  }
  
  // Return default spacing structure if not found
  const defaultSpacing = {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0
  }
  console.log('Using default spacing:', defaultSpacing)
  return defaultSpacing
}

const updateSpacingOption = (name: string, value: any) => {
  console.log('updateSpacingOption called with:', name, 'value:', value)
  updateOption(name, value)
}
</script>
