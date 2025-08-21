<template>
  <div class="h-screen flex flex-col bg-gray-50" @dragend="onDragEnd">
    <!-- Top Toolbar -->
    <div class="flex items-center justify-between p-3 bg-white border-b border-gray-200">
      <div class="flex items-center space-x-4">
        <h1 class="text-lg font-semibold text-gray-800">Page Builder</h1>
        <div class="flex items-center space-x-2">
          <UButton :variant="isEditing ? 'solid' : 'outline'" color="primary" size="sm" @click="toggleEditing">
            {{ isEditing ? 'Preview' : 'Edit' }}
          </UButton>
          <UButton color="success" size="sm" @click="savePage">
            Save Page
          </UButton>
          <UButton variant="outline" size="sm" @click="viewPage" :disabled="!pageSlug">
            View Page
          </UButton>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar - Block Library -->
      <div v-if="isEditing" :class="[
        leftSidebarCollapsed ? 'w-12' : 'w-80',
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out'
      ]">
        <div v-if="!leftSidebarCollapsed">
          <!-- Header with collapse button -->
          <div class="flex items-center justify-between p-3 border-b border-gray-200">
            <h3 class="text-sm font-medium text-gray-900">Block Library</h3>
            <UButton variant="ghost" icon="i-lucide-chevron-left" size="xs"
              @click="leftSidebarCollapsed = !leftSidebarCollapsed" />
          </div>

          <div class="flex-1 flex flex-col">
            <!-- Search Bar -->
            <div class="p-3 border-b border-gray-200">
              <UInput v-model="searchQuery" placeholder="Search blocks..." icon="i-lucide-search" variant="outline"
                size="sm" class="w-full" />
            </div>

            <!-- Tabs -->
            <div class="flex border-b border-gray-200">
              <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                'flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]">
                {{ tab.label }}
              </button>
            </div>

            <!-- Block Categories -->
            <div class="flex-1 overflow-y-auto p-3">
              <div v-if="activeTab === 'blocks'" class="space-y-4">
                <!-- Text Category -->
                <div class="space-y-2">
                  <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">TEXT</h3>
                  <div class="space-y-1">
                    <div v-for="block in filteredTextBlocks" :key="block.name"
                      class="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-move transition-colors group"
                      draggable="true" @dragstart="onDragStart($event, block)">
                      <div
                        class="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mr-2 group-hover:bg-blue-200 transition-colors">
                        <UIcon :name="block.icon" class="w-6 h-6" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 text-sm truncate">{{ block.label }}</div>
                        <div class="text-xs text-gray-500 truncate">{{ block.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Media Category -->
                <div class="space-y-2">
                  <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">MEDIA</h3>
                  <div class="space-y-1">
                    <div v-for="block in filteredMediaBlocks" :key="block.name"
                      class="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-move transition-colors group"
                      draggable="true" @dragstart="onDragStart($event, block)">
                      <div
                        class="w-6 h-6 bg-green-100 rounded flex items-center justify-center mr-2 group-hover:bg-green-200 transition-colors">
                        <UIcon :name="block.icon" class="w-4 h-4 text-green-600" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 text-sm truncate">{{ block.label }}</div>
                        <div class="text-xs text-gray-500 truncate">{{ block.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Layout Category -->
                <div class="space-y-2">
                  <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">LAYOUT</h3>
                  <div class="space-y-1">
                    <div v-for="block in filteredLayoutBlocks" :key="block.name"
                      class="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-move transition-colors group"
                      draggable="true" @dragstart="onDragStart($event, block)">
                      <div
                        class="w-6 h-6 bg-purple-100 rounded flex items-center justify-center mr-2 group-hover:bg-purple-200 transition-colors">
                        <UIcon :name="block.icon" class="w-4 h-4 text-purple-600" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-gray-900 text-sm truncate">{{ block.label }}</div>
                        <div class="text-xs text-gray-500 truncate">{{ block.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Patterns Tab -->
              <div v-else-if="activeTab === 'patterns'" class="space-y-4">
                <div class="text-center text-gray-500 py-6">
                  <UIcon name="i-lucide-layout-grid" class="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p class="text-sm">No patterns available yet</p>
                  <p class="text-xs text-gray-400">Patterns will appear here</p>
                </div>
              </div>
            </div>

            <!-- Bottom Info -->
            <div class="p-2 border-t border-gray-200 bg-gray-50">
              <div class="text-xs text-gray-500">
                <div class="flex items-center justify-between">
                  <span>Document</span>
                  <span>→</span>
                  <span>Paragraph</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Collapsed State -->
        <div v-else class="flex flex-col items-center py-3">
          <UButton variant="ghost" icon="i-lucide-chevron-right" size="xs"
            @click="leftSidebarCollapsed = !leftSidebarCollapsed" class="rotate-0 hover:bg-gray-100" />
          <div class="mt-4 transform -rotate-90 text-xs font-medium text-gray-500 whitespace-nowrap">
            Blocks
          </div>
        </div>
      </div>

      <!-- Center Canvas -->
      <div class="flex-1 bg-white relative overflow-auto" @click="clearSelection">
        <div class="min-h-full p-8">
          <!-- Functional Editor Canvas -->
          <div class="max-w-4xl mx-auto">
            <!-- Drop Zone Instructions -->
            <div v-if="pageComponents.length === 0"
              class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 transition-all duration-200 cursor-pointer"
              :class="dragTarget === 'initial' ? 'border-blue-400 bg-blue-50' : isDragging ? 'hover:border-blue-400 hover:bg-blue-50' : ''"
              @dragover.prevent @drop="onDrop" @dragenter="onDragEnter('initial')" @dragleave="onDragLeave">
              <div v-if="dragTarget === 'initial'" class="space-y-4">
                <UIcon name="i-lucide-plus-circle" class="w-16 h-16 mx-auto text-blue-500" />
                <h3 class="text-xl font-semibold text-blue-700">Drop your block here!</h3>
                <p class="text-blue-600">Release to add your first component</p>
              </div>
              <div v-else class="space-y-4">
                <UIcon name="i-lucide-plus-circle" class="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">Start building your page</h3>
                <p class="text-gray-500">Drag blocks from the left sidebar to start creating your content</p>
              </div>
            </div>

            <!-- Page Components -->
            <div v-else class="space-y-4">
              <div v-for="(component, index) in pageComponents" :key="component.id" class="relative group">
                <!-- Component Content with Drop Zones -->
                <div class="relative">
                  <!-- Top Drop Zone -->
                  <div v-if="isDragging"
                    class="absolute top-0 left-0 right-0 h-[30px] z-10 transition-all duration-200 cursor-pointer"
                    :class="dragTarget === `${index}-above` ? 'bg-blue-50 border-2 border-blue-400 border-dashed' : isDragging ? 'hover:bg-gray-50' : ''"
                    @dragover.prevent @drop="onDrop($event, index)" @dragenter="onDragEnter(`${index}-above`)">
                    <div v-if="dragTarget === `${index}-above`" class="flex items-center justify-center h-full">
                      <div class="flex items-center space-x-2 text-blue-600 text-sm font-medium">
                        <UIcon name="i-lucide-plus" class="w-4 h-4" />
                        <span>Insert above</span>
                      </div>
                    </div>
                  </div>

                  <!-- Bottom Drop Zone -->
                  <div v-if="isDragging"
                    class="absolute bottom-0 left-0 right-0 h-[30px] z-10 transition-all duration-200 cursor-pointer"
                    :class="dragTarget === `${index}-below` ? 'bg-blue-50 border-2 border-blue-400 border-dashed' : isDragging ? 'hover:bg-gray-50' : ''"
                    @dragover.prevent @drop="onDrop($event, index + 1)" @dragenter="onDragEnter(`${index}-below`)">
                    <div v-if="dragTarget === `${index}-below`" class="flex items-center justify-center h-full">
                      <div class="flex items-center space-x-2 text-blue-600 text-sm font-medium">
                        <UIcon name="i-lucide-plus" class="w-4 h-4" />
                        <span>Insert below</span>
                      </div>
                    </div>
                  </div>

                  <!-- Component Content -->
                  <div
                    class="border-2 border-transparent hover:border-blue-300 rounded-lg p-4 transition-colors cursor-pointer"
                    :class="{ 'border-blue-500': selectedComponentId === component.id }" 
                    draggable="true"
                    @dragstart="onComponentDragStart($event, component, index)" 
                    @click="handleComponentClick($event, component.id)">
                    <ComponentRenderer 
                      :component="component" 
                      :isEditing="isEditing"
                      @component-add="onNestedComponentAdd"
                      @component-update="onNestedComponentUpdate"
                      @component-remove="onNestedComponentRemove"
                      @component-select="selectComponent"
                    />
                  </div>
                </div>

                <!-- Component Toolbar -->
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <div class="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-sm p-1">
                    <UButton variant="ghost" size="xs" icon="i-lucide-move" class="cursor-move"
                      @mousedown="startDrag(component.id, $event)" />
                    <UButton variant="ghost" size="xs" icon="i-lucide-settings"
                      @click="selectComponent(component.id)" />
                    <UButton variant="ghost" size="xs" icon="i-lucide-trash-2" color="error"
                      @click="removeComponent(index)" />
                  </div>
                </div>
              </div>

              <!-- Final Drop Zone -->
              <div
                class="h-8 mt-4 transition-all duration-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer"
                :class="dragTarget === `${pageComponents.length}-below` ? 'border-blue-400 bg-blue-50' : isDragging ? 'hover:border-blue-400 hover:bg-blue-50' : ''"
                @dragover.prevent @drop="onDrop($event, pageComponents.length)"
                @dragenter="onDragEnter(`${pageComponents.length}-below`)">
                <div v-if="dragTarget === `${pageComponents.length}-below`"
                  class="flex items-center space-x-2 text-blue-600 text-sm font-medium">
                  <UIcon name="i-lucide-plus" class="w-4 h-4" />
                  <span>Add new component here</span>
                </div>
                <div v-else class="flex items-center space-x-2 text-gray-500 text-sm">
                  <UIcon name="i-lucide-plus" class="w-4 h-4" />
                  <span>Drop here to add new component</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Properties Panel -->
      <div v-if="isEditing" :class="[
        rightSidebarCollapsed ? 'w-12' : 'w-80',
        'bg-white border-l border-gray-200 flex flex-col transition-all duration-300 ease-in-out h-full'
      ]">
        <div v-if="!rightSidebarCollapsed" class="flex flex-col h-full min-h-0">
          <!-- Header with tabs and collapse button -->
          <div class="flex items-center justify-between p-3 border-b border-gray-200">
            <h3 class="text-sm font-medium text-gray-900">
              {{ selectedComponent ? `${selectedComponent.displayName} Properties` : 'Properties' }}
            </h3>
            <div class="flex items-center space-x-2">
              <UButton v-if="selectedComponent" variant="ghost" icon="i-lucide-x" size="xs" @click="clearSelection"
                title="Close Properties" />
              <UButton variant="ghost" icon="i-lucide-chevron-right" size="xs"
                @click="rightSidebarCollapsed = !rightSidebarCollapsed" />
            </div>
          </div>

          <!-- Property Tabs -->
          <div class="flex border-b border-gray-200">
            <button v-for="tab in propertyTabs" :key="tab.id" @click="activePropertyTab = tab.id" :class="[
              'flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors',
              activePropertyTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]">
              {{ tab.label }}
            </button>
          </div>

          <div class="flex-1 flex flex-col overflow-hidden min-h-0">
            <!-- Properties Content -->
            <div class="flex-1 overflow-y-auto px-5 py-3 min-h-0 max-h-full">
              <!-- Document Tab -->
              <div v-if="activePropertyTab === 'document'" class="space-y-4">
                <h3 class="text-sm font-medium text-gray-900">Page Attributes</h3>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                    <UInput v-model="pageTitle" placeholder="Enter page title" class="w-full" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <UInput v-model="pageSlug" placeholder="page-slug" class="w-full" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Template</label>
                    <USelect v-model="pageTemplate" :options="templateOptions" placeholder="Select template"
                      class="w-full" />
                  </div>
                </div>
              </div>

              <!-- Block Tab -->
              <div v-else-if="activePropertyTab === 'block'">
                <div v-if="selectedComponent" class="space-y-6">
                  <!-- Block Info -->
                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <UIcon :name="selectedComponent.icon" class="w-6 h-6 text-blue-600" />
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-gray-800">{{ selectedComponent.displayName }}</h4>
                      <p class="text-sm text-gray-600 mt-1">{{ selectedComponent.description }}</p>
                    </div>
                  </div>
                    <ComponentOptionsPanel :component="selectedComponent" @update="updateComponent" />
                </div>

                <!-- No Selection -->
                <div v-else class="text-center text-gray-500 py-8">
                  <UIcon name="i-lucide-mouse-pointer" class="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p class="text-sm">Select a component to edit its properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Collapsed State -->
        <div v-else class="flex flex-col items-center py-3">
          <UButton variant="ghost" icon="i-lucide-chevron-left" size="xs"
            @click="rightSidebarCollapsed = !rightSidebarCollapsed" class="rotate-0 hover:bg-gray-100" />
          <div class="mt-4 transform rotate-90 text-xs font-medium text-gray-500 whitespace-nowrap">
            Properties
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { componentRegistry } from '~/libs/pagebuilder/registry'
import type { ComponentDefinition, ComponentInstance } from '~/libs/pagebuilder/types'
import { deepClone } from '~/libs/pagebuilder/utils'
import ComponentRenderer from '~/components/PageBuilder/ComponentRenderer.vue'
import ComponentOptionsPanel from '~/components/PageBuilder/ComponentOptionsPanel.vue'

// Set the layout for this page
definePageMeta({
  layout: 'pagebuilder'
})

// Component Registry
const componentRegistryInstance = componentRegistry

// State
const isEditing = ref(true)
const searchQuery = ref('')
const activeTab = ref('blocks')
const activePropertyTab = ref('document')
const pageTitle = ref('Say Hello to the New Editor')
const pageSlug = ref('say-hello-to-the-new-editor')
const pageTemplate = ref('default')
const leftSidebarCollapsed = ref(false)
const rightSidebarCollapsed = ref(false)
const selectedComponentId = ref<string | null>(null)
const pageComponents = ref<ComponentInstance[]>([])
const dragTarget = ref<string | null>(null)
const isDragging = ref(false)

// Load saved page data on mount (for persistence across page refreshes)
onMounted(() => {
  // Try to load the current page being edited
  const currentPageKey = localStorage.getItem('current-page-editor')
  if (currentPageKey) {
    const savedData = localStorage.getItem(currentPageKey)
    if (savedData) {
      try {
        const pageData = JSON.parse(savedData)
        if (pageData.metadata && pageData.components) {
          // Restore page metadata
          pageTitle.value = pageData.metadata.title || pageTitle.value
          pageSlug.value = pageData.metadata.slug || pageSlug.value
          pageTemplate.value = pageData.metadata.template || pageTemplate.value
          
          // Restore components
          pageComponents.value = pageData.components || []
          
          console.log('📥 Restored page from localStorage:', pageData.metadata.title)
        }
      } catch (error) {
        console.error('Error loading saved page:', error)
      }
    }
  }
})

// Auto-save functionality - save to localStorage whenever data changes
watch([pageComponents, pageTitle, pageSlug, pageTemplate], () => {
  if (pageSlug.value) {
    const pageData = {
      metadata: {
        title: pageTitle.value,
        slug: pageSlug.value,
        template: pageTemplate.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      components: pageComponents.value
    }
    
    const pageKey = `page-${pageSlug.value}`
    localStorage.setItem(pageKey, JSON.stringify(pageData))
    localStorage.setItem('current-page-editor', pageKey)
  }
}, { deep: true })

// Tabs
const tabs = [
  { id: 'blocks', label: 'Blocks' },
  { id: 'patterns', label: 'Patterns' }
]

const propertyTabs = [
  { id: 'document', label: 'Document' },
  { id: 'block', label: 'Block' }
]

// Template options
const templateOptions = [
  { label: 'Default Template', value: 'default' },
  { label: 'Full Width', value: 'full-width' },
  { label: 'Sidebar', value: 'sidebar' }
]

// Block definitions from registry - only use the components we actually implemented
const textBlocks = computed(() => [
  { name: 'mini-hero', label: 'Mini Hero', description: 'Rich text content with formatting options.', icon: 'i-lucide-newspaper' },
  { name: 'paragraph-block', label: 'Paragraph', description: 'Simple paragraph text with basic styling.', icon: 'i-lucide-file-text' }
])

const mediaBlocks = computed(() => [
  { name: 'image-block', label: 'Image Block', description: 'Images with various display options.', icon: 'i-lucide-image' }
])

const layoutBlocks = computed(() => [
  { name: 'columns-block', label: 'Columns', description: 'Multi-column layout with customizable columns.', icon: 'i-lucide-columns' },
  { name: 'grid-block', label: 'Grid', description: 'Flexible grid layout with customizable cells.', icon: 'i-lucide-grid-3x3' },
  { name: 'container-block', label: 'Container', description: 'Container with spacing, background, and border options.', icon: 'i-lucide-box' }
])

// Filtered blocks based on search
const filteredTextBlocks = computed(() =>
  textBlocks.value.filter(block =>
    block.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    block.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const filteredMediaBlocks = computed(() =>
  mediaBlocks.value.filter(block =>
    block.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    block.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const filteredLayoutBlocks = computed(() =>
  layoutBlocks.value.filter(block =>
    block.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    block.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

// Helper function to find any component by ID (including nested ones)
const findComponentById = (id: string): ComponentInstance | null => {
  // First check top-level components
  const topLevelComponent = pageComponents.value.find(c => c.id === id)
  if (topLevelComponent) return topLevelComponent

  // Then check nested components in layout components
  for (const component of pageComponents.value) {
    if (component.type === 'columns-block' && component.data.columnsData) {
      for (const column of component.data.columnsData) {
        if (column.components) {
          const nestedComponent = column.components.find((c: ComponentInstance) => c.id === id)
          if (nestedComponent) return nestedComponent
        }
      }
    }
    // Add other layout types here when needed (grid-block, container-block, etc.)
  }

  return null
}

// Selected component
const selectedComponent = computed(() => {
  if (!selectedComponentId.value) return null

  const component = findComponentById(selectedComponentId.value)
  if (!component) return null

  const definition = componentRegistryInstance.get(component.type)
  if (!definition) return null

  // Return a properly typed object with component data merged
  // This is what ComponentOptionsPanel expects
  return {
    ...definition,
    id: component.id,
    type: component.type,
    data: component.data,
    position: component.position,
    size: component.size
  }
})

// Methods
const toggleEditing = () => {
  isEditing.value = !isEditing.value
}

// Simple drag and drop handlers
const onDragStart = (event: DragEvent, block: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('block-type', block.name)
    event.dataTransfer.effectAllowed = 'copy'
  }
  isDragging.value = true
}

const onDragEnter = (target: string) => {
  dragTarget.value = target
}

const onDragLeave = () => {
  // Only clear if we're not entering another drop zone
  setTimeout(() => {
    if (dragTarget.value && !document.querySelector(':hover')?.closest('[data-drop-zone]')) {
      dragTarget.value = null
    }
  }, 10)
}

const onDrop = (event: DragEvent, index?: number) => {
  event.preventDefault()

  // Check if this is a component reorder or new block
  const componentId = event.dataTransfer?.getData('component-id')
  const blockType = event.dataTransfer?.getData('block-type')

  if (componentId && index !== undefined) {
    // Component reordering
    const componentIndex = pageComponents.value.findIndex(c => c.id === componentId)
    if (componentIndex === -1) return

    const [movedComponent] = pageComponents.value.splice(componentIndex, 1)
    if (movedComponent) {
      // Adjust index if we're moving from before the target position
      const adjustedIndex = componentIndex < index ? index - 1 : index
      pageComponents.value.splice(adjustedIndex, 0, movedComponent)

      // Clear drag state and select moved component
      dragTarget.value = null
      selectComponent(movedComponent.id)
    }
  } else if (blockType) {
    // New block creation
    const definition = componentRegistryInstance.get(blockType)
    if (!definition) return

    const newComponent: ComponentInstance = {
      id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: blockType,
      data: deepClone(definition.defaultData),
      position: { x: 0, y: 0 },
      size: { width: 100, height: 100 }
    }

    if (index !== undefined) {
      pageComponents.value.splice(index, 0, newComponent)
    } else {
      pageComponents.value.push(newComponent)
    }

    // Clear drag state and select new component
    dragTarget.value = null
    selectComponent(newComponent.id)
  }
}

const selectComponent = (id: string) => {
  selectedComponentId.value = id
  activePropertyTab.value = 'block'
}

const handleComponentClick = (event: Event, componentId: string) => {
  // Always select the clicked component, regardless of nesting
  event.stopPropagation()
  selectComponent(componentId)
}

const clearSelection = () => {
  selectedComponentId.value = null
  activePropertyTab.value = 'document'
}

const removeComponent = (index: number) => {
  pageComponents.value.splice(index, 1)
  if (selectedComponentId.value === pageComponents.value[index]?.id) {
    selectedComponentId.value = null
  }
}

const updateComponent = (updates: Partial<ComponentInstance>) => {
  if (!selectedComponentId.value) return

  // First try to find and update in top-level components
  const topLevelIndex = pageComponents.value.findIndex(c => c.id === selectedComponentId.value)
  if (topLevelIndex !== -1) {
    const currentComponent = pageComponents.value[topLevelIndex]
    if (currentComponent) {
      pageComponents.value[topLevelIndex] = {
        ...currentComponent,
        ...updates,
        // Ensure required properties are always present, but use updated data if provided
        id: currentComponent.id,
        type: currentComponent.type,
        data: updates.data || currentComponent.data,
        position: updates.position || currentComponent.position,
        size: updates.size || currentComponent.size
      }
    }
    return
  }

  // If not found at top level, search in nested components
  for (const component of pageComponents.value) {
    if (component.type === 'columns-block' && component.data.columnsData) {
      for (const column of component.data.columnsData) {
        if (column.components) {
          const nestedIndex = column.components.findIndex((c: ComponentInstance) => c.id === selectedComponentId.value)
          if (nestedIndex !== -1) {
            const currentComponent = column.components[nestedIndex]
            column.components[nestedIndex] = {
              ...currentComponent,
              ...updates,
              // Ensure required properties are always present, but use updated data if provided
              id: currentComponent.id,
              type: currentComponent.type,
              data: updates.data || currentComponent.data,
              position: updates.position || currentComponent.position,
              size: updates.size || currentComponent.size
            }
            return
          }
        }
      }
    }
    // Add other layout types here when needed (grid-block, container-block, etc.)
  }
}

const startDrag = (id: string, event: MouseEvent) => {
  // Implement drag and drop reordering logic here
  console.log('Start drag for component:', id)
}

// Global drag end handler to reset dragging state
const onDragEnd = () => {
  isDragging.value = false
  dragTarget.value = null
}

// Nested component handlers
const onNestedComponentAdd = (componentId: string, columnIndex: number, blockType: string) => {
  const parentComponent = pageComponents.value.find(c => c.id === componentId)
  if (!parentComponent || parentComponent.type !== 'columns-block') return

  const definition = componentRegistryInstance.get(blockType)
  if (!definition) return

  const newComponent: ComponentInstance = {
    id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: blockType,
    data: deepClone(definition.defaultData),
    position: { x: 0, y: 0 },
    size: { width: 100, height: 100 }
  }

  // Add component to the specific column
  if (!parentComponent.data.columnsData[columnIndex].components) {
    parentComponent.data.columnsData[columnIndex].components = []
  }
  parentComponent.data.columnsData[columnIndex].components.push(newComponent)

  // Select the new component
  selectComponent(newComponent.id)
}

const onNestedComponentUpdate = (componentId: string, columnIndex: number, nestedComponentId: string, updates: any) => {
  const parentComponent = pageComponents.value.find(c => c.id === componentId)
  if (!parentComponent || parentComponent.type !== 'columns-block') return

  const columnComponents = parentComponent.data.columnsData[columnIndex]?.components
  if (!columnComponents) return

  const componentIndex = columnComponents.findIndex((c: ComponentInstance) => c.id === nestedComponentId)
  if (componentIndex === -1) return

  const currentComponent = columnComponents[componentIndex]
  columnComponents[componentIndex] = {
    ...currentComponent,
    ...updates,
    // Ensure required properties are always present
    id: currentComponent.id,
    type: currentComponent.type,
    data: updates.data || currentComponent.data,
    position: updates.position || currentComponent.position,
    size: updates.size || currentComponent.size
  }
}

const onNestedComponentRemove = (componentId: string, columnIndex: number, nestedComponentId: string) => {
  const parentComponent = pageComponents.value.find(c => c.id === componentId)
  if (!parentComponent || parentComponent.type !== 'columns-block') return

  const columnComponents = parentComponent.data.columnsData[columnIndex]?.components
  if (!columnComponents) return

  const componentIndex = columnComponents.findIndex((c: ComponentInstance) => c.id === nestedComponentId)
  if (componentIndex !== -1) {
    columnComponents.splice(componentIndex, 1)
  }

  // Clear selection if removed component was selected
  if (selectedComponentId.value === nestedComponentId) {
    selectedComponentId.value = null
  }
}

// Component drag start handler for reordering
const onComponentDragStart = (event: DragEvent, component: ComponentInstance, index: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('component-id', component.id)
    event.dataTransfer.effectAllowed = 'move'
  }
  isDragging.value = true
}

// Save page functionality
const savePage = () => {
  const pageData = {
    metadata: {
      title: pageTitle.value,
      slug: pageSlug.value,
      template: pageTemplate.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    components: pageComponents.value
  }
  
  // Pretty print the JSON to console
  console.log('=== SAVED PAGE DATA ===')
  console.log(JSON.stringify(pageData, null, 2))
  
  // Save to localStorage for demo purposes
  if (pageSlug.value) {
    const pageKey = `page-${pageSlug.value}`
    localStorage.setItem(pageKey, JSON.stringify(pageData))
    // Also track this as the current page being edited
    localStorage.setItem('current-page-editor', pageKey)
  }
  
  // Show a notification with the data
  alert(`Page saved! 
  
📄 Title: ${pageTitle.value}
🔗 Slug: ${pageSlug.value}
📋 Template: ${pageTemplate.value}
🧩 Components: ${pageComponents.value.length}

Check the browser console to see the full JSON data.`)
  
  // In a real app, you would send this to your API:
  // await $fetch('/api/pages', { method: 'POST', body: pageData })
}

// View page functionality
const viewPage = () => {
  if (pageSlug.value) {
    // Navigate to the page viewer
    navigateTo(`/page/${pageSlug.value}`)
  }
}


</script>
