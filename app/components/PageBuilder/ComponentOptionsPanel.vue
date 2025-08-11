<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-between items-center p-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">Component Options</h3>
      <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4">
      <div v-if="componentDefinition" class="space-y-6">
        <div class="flex items-start space-x-3">
          <span class="text-2xl">{{ componentDefinition.icon }}</span>
          <div class="flex-1">
            <h4 class="text-lg font-medium text-gray-800 mb-1">{{ componentDefinition.displayName }}</h4>
            <p class="text-sm text-gray-600">{{ componentDefinition.description }}</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <h5 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Properties</h5>
          <div class="space-y-4">
            <div 
              v-for="option in componentDefinition.schema" 
              :key="option.name"
              class="space-y-2"
            >
              <label class="block text-sm font-medium text-gray-700">
                {{ option.label }}
                <span v-if="option.required" class="text-red-500 ml-1">*</span>
              </label>
              
              <!-- Text Input -->
              <input
                v-if="option.type === 'text'"
                v-model="componentData[option.name]"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :placeholder="option.description"
                @input="updateComponentData(option.name, ($event.target as HTMLInputElement).value)"
              />
              
              <!-- Number Input -->
              <input
                v-else-if="option.type === 'number'"
                v-model.number="componentData[option.name]"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :min="option.validation?.min"
                :max="option.validation?.max"
                @input="updateComponentData(option.name, ($event.target as HTMLInputElement).value)"
              />
              
              <!-- Boolean Input -->
              <div v-else-if="option.type === 'boolean'" class="flex items-center space-x-2">
                <input
                  v-model="componentData[option.name]"
                  type="checkbox"
                  :id="`option-${option.name}`"
                  @change="updateComponentData(option.name, ($event.target as HTMLInputElement).checked)"
                />
                <label :for="`option-${option.name}`" class="text-sm text-gray-700 cursor-pointer">
                  {{ option.label }}
                </label>
              </div>
              
              <!-- Select Input -->
              <select
                v-else-if="option.type === 'select'"
                v-model="componentData[option.name]"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @change="updateComponentData(option.name, ($event.target as HTMLSelectElement).value)"
              >
                <option v-for="opt in option.options" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
              
              <!-- Color Input -->
              <input
                v-else-if="option.type === 'color'"
                v-model="componentData[option.name]"
                type="color"
                class="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
                @input="updateComponentData(option.name, ($event.target as HTMLInputElement).value)"
              />
              
              <!-- Image Input -->
              <div v-else-if="option.type === 'image'" class="space-y-2">
                <input
                  v-model="componentData[option.name]"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter image URL"
                  @input="updateComponentData(option.name, ($event.target as HTMLInputElement).value)"
                />
                <button @click="openImagePicker" class="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  Choose Image
                </button>
              </div>
              
              <!-- Textarea Input -->
              <textarea
                v-else-if="option.type === 'textarea'"
                v-model="componentData[option.name]"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                :placeholder="option.description"
                rows="3"
                @input="updateComponentData(option.name, ($event.target as HTMLTextAreaElement).value)"
              />
              
              <!-- Description -->
              <p v-if="option.description" class="text-xs text-gray-500 mt-1">
                {{ option.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center text-gray-500 py-8">
        <p>No component selected</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { componentRegistry } from '../../libs/pagebuilder/registry'
import type { PageComponent, ComponentDefinition } from '../../libs/pagebuilder/types'

interface Props {
  component: PageComponent | null
}

interface Emits {
  (e: 'update', componentId: string, updates: Partial<PageComponent>): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const componentData = ref<Record<string, any>>({})

// Watch for component changes and update local data
watch(() => props.component, (newComponent) => {
  if (newComponent) {
    componentData.value = { ...newComponent.data }
  }
}, { immediate: true })

const componentDefinition = computed(() => {
  if (!props.component) return null
  return componentRegistry.get(props.component.type)
})

const updateComponentData = (key: string, value: any) => {
  if (!props.component) return
  
  componentData.value[key] = value
  
  // Emit update to parent
  emit('update', props.component.id, {
    data: { ...componentData.value }
  })
}

const openImagePicker = () => {
  // TODO: Implement image picker
  console.log('Open image picker')
}
</script>
