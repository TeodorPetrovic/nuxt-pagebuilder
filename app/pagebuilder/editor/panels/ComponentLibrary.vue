<script setup lang="ts">
import { ref, computed } from 'vue'
import { componentRegistry } from '~/pagebuilder/core/registry'

interface Props {
  searchQuery: string
  collapsed: boolean
}

interface Emits {
  (e: 'toggle-collapse'): void
  (e: 'drag-start', event: DragEvent, block: any): void
  (e: 'update:search-query', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const activeTab = ref('blocks')

const tabs = [
  { id: 'blocks', label: 'Blocks' },
  { id: 'patterns', label: 'Patterns' }
]

// Get all components from registry
const allComponents = computed(() => componentRegistry.getAll())

// Filter components by search query
const filteredComponents = computed(() => {
  if (!props.searchQuery) return allComponents.value
  return componentRegistry.search(props.searchQuery)
})

// Group components by category
const componentsByCategory = computed(() => {
  const grouped: Record<string, any[]> = {}
  
  filteredComponents.value.forEach(component => {
    if (!grouped[component.category]) {
      grouped[component.category] = []
    }
    grouped[component.category].push({
      name: component.name,
      label: component.displayName,
      icon: component.icon,
      description: component.description
    })
  })
  
  return grouped
})

const onDragStart = (event: DragEvent, block: any) => {
  emit('drag-start', event, block)
}

const updateSearchQuery = (value: string) => {
  emit('update:search-query', value)
}

const toggleCollapse = () => {
  emit('toggle-collapse')
}

// Category display names
const categoryNames: Record<string, string> = {
  text: 'TEXT',
  media: 'MEDIA', 
  layout: 'LAYOUT',
  content: 'CONTENT',
  forms: 'FORMS',
  navigation: 'NAVIGATION'
}

const getCategoryDisplayName = (category: string) => {
  return categoryNames[category] || category.toUpperCase()
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    text: 'blue',
    media: 'green',
    layout: 'purple',
    content: 'orange',
    forms: 'red',
    navigation: 'gray'
  }
  return colors[category] || 'gray'
}
</script>

<template>
  <div :class="[
    collapsed ? 'w-12' : 'w-80',
    'bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out'
  ]">
    <div v-if="!collapsed">
      <!-- Header -->
      <div class="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 class="text-sm font-medium text-gray-900">Block Library</h3>
        <UButton 
          variant="ghost" 
          icon="i-lucide-chevron-left" 
          size="xs"
          @click="toggleCollapse" 
        />
      </div>

      <div class="flex-1 flex flex-col">
        <!-- Search Bar -->
        <div class="p-3 border-b border-gray-200">
          <UInput 
            :model-value="searchQuery" 
            placeholder="Search blocks..." 
            icon="i-lucide-search" 
            variant="outline"
            size="sm" 
            class="w-full"
            @update:model-value="updateSearchQuery"
          />
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-200">
          <button 
            v-for="tab in tabs" 
            :key="tab.id" 
            @click="activeTab = tab.id" 
            :class="[
              'flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Component Categories -->
        <div class="flex-1 overflow-y-auto p-3">
          <div v-if="activeTab === 'blocks'" class="space-y-4">
            <div 
              v-for="(components, category) in componentsByCategory" 
              :key="category"
              class="space-y-2"
            >
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {{ getCategoryDisplayName(category) }}
              </h3>
              <div class="space-y-1">
                <div 
                  v-for="block in components" 
                  :key="block.name"
                  class="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-move transition-colors group"
                  draggable="true" 
                  @dragstart="onDragStart($event, block)"
                >
                  <div
                    :class="[
                      'w-6 h-6 rounded flex items-center justify-center mr-2 transition-colors',
                      `bg-${getCategoryColor(category)}-100 group-hover:bg-${getCategoryColor(category)}-200`
                    ]"
                  >
                    <UIcon :name="block.icon" class="w-4 h-4" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 text-sm truncate">
                      {{ block.label }}
                    </div>
                    <div class="text-xs text-gray-500 truncate">
                      {{ block.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- No results -->
            <div v-if="Object.keys(componentsByCategory).length === 0" class="text-center py-8">
              <UIcon name="i-lucide-search-x" class="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p class="text-sm text-gray-500">No components found</p>
              <p class="text-xs text-gray-400">Try a different search term</p>
            </div>
          </div>

          <!-- Patterns tab (future functionality) -->
          <div v-else-if="activeTab === 'patterns'" class="text-center py-8">
            <UIcon name="i-lucide-layout-template" class="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p class="text-sm text-gray-500">Patterns coming soon</p>
            <p class="text-xs text-gray-400">Pre-built component layouts</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Collapsed State -->
    <div v-else class="flex flex-col items-center py-3">
      <UButton 
        variant="ghost" 
        icon="i-lucide-chevron-right" 
        size="xs"
        @click="toggleCollapse" 
        class="rotate-0 hover:bg-gray-100" 
      />
      <div class="mt-4 transform -rotate-90 text-xs font-medium text-gray-500 whitespace-nowrap">
        Blocks
      </div>
    </div>
  </div>
</template>
