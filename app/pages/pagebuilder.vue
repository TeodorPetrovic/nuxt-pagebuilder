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
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <UButton variant="outline" color="neutral" size="sm">
          Save Draft
        </UButton>
        <UButton color="primary" size="sm">
          Publish
        </UButton>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar - Block Library -->
      <div v-if="isEditing" class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <!-- Header with collapse button -->
        <div class="flex items-center justify-between p-3 border-b border-gray-200">
          <h3 class="text-sm font-medium text-gray-900">Block Library</h3>
          <UButton variant="ghost" :icon="leftSidebarCollapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
            size="xs" @click="leftSidebarCollapsed = !leftSidebarCollapsed" />
        </div>

        <div v-if="!leftSidebarCollapsed" class="flex-1 flex flex-col">
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
                      <span class="text-blue-600 text-xs font-semibold">{{ block.icon }}</span>
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
                      <span class="text-green-600 text-xs font-semibold">{{ block.icon }}</span>
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
                      <span class="text-purple-600 text-xs font-semibold">{{ block.icon }}</span>
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

      <!-- Center Canvas -->
      <div class="flex-1 bg-white relative overflow-auto">
        <div class="min-h-full p-8">
          <!-- Page Title - Removed as requested -->

          <!-- Functional Editor Canvas -->
          <div class="max-w-4xl mx-auto">
            <!-- Drop Zone Instructions -->
            <div v-if="pageComponents.length === 0"
              class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 transition-all duration-200"
              :class="dragTarget === 'initial' ? 'border-blue-400 bg-blue-50' : 'hover:border-blue-400 hover:bg-blue-50'"
              @dragover.prevent @drop="onDrop" @dragenter.prevent="onDragEnterInitial"
              @dragleave.prevent="onDragLeaveInitial">
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
                  <!-- Top Drop Zone (30% of component height) -->
                  <div class="absolute top-0 left-0 right-0 h-[30%] z-10 transition-all duration-200"
                    :class="dragTarget === `${index}-above` ? 'bg-blue-50 border-2 border-blue-400 border-dashed' : ''"
                    @dragover.prevent @drop="onDrop($event, index)"
                    @dragenter.prevent="onDragEnter($event, index, 'above')"
                    @dragleave.prevent="onDragLeave($event, index, 'above')">
                    <div v-if="dragTarget === `${index}-above`" class="flex items-center justify-center h-full">
                      <div class="flex items-center space-x-2 text-blue-600 text-sm font-medium">
                        <UIcon name="i-lucide-plus" class="w-4 h-4" />
                        <span>Insert above</span>
                      </div>
                    </div>
                  </div>

                  <!-- Bottom Drop Zone (30% of component height) -->
                  <div class="absolute bottom-0 left-0 right-0 h-[30%] z-10 transition-all duration-200"
                    :class="dragTarget === `${index}-below` ? 'bg-blue-50 border-2 border-blue-400 border-dashed' : ''"
                    @dragover.prevent @drop="onDrop($event, index + 1)"
                    @dragenter.prevent="onDragEnter($event, index, 'below')"
                    @dragleave.prevent="onDragLeave($event, index, 'below')">
                    <div v-if="dragTarget === `${index}-below`" class="flex items-center justify-center h-full">
                      <div class="flex items-center space-x-2 text-blue-600 text-sm font-medium">
                        <UIcon name="i-lucide-plus" class="w-4 h-4" />
                        <span>Insert below</span>
                      </div>
                    </div>
                  </div>

                  <!-- Component Content -->
                  <div class="border-2 border-transparent hover:border-blue-300 rounded-lg p-4 transition-colors"
                    :class="{ 'border-blue-500': selectedComponentId === component.id }">
                    <ComponentRenderer :component="component" @click="selectComponent(component.id)" />
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

              <!-- Final Drop Zone - Always visible and more prominent -->
              <div
                class="h-8 mt-4 transition-all duration-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50"
                :class="dragTarget === `${pageComponents.length}-below` ? 'border-blue-400 bg-blue-50' : 'hover:border-blue-400 hover:bg-blue-50'"
                @dragover.prevent @drop="onDrop($event, pageComponents.length)"
                @dragenter="onDragEnter($event, pageComponents.length, 'below')"
                @dragleave="onDragLeave($event, pageComponents.length, 'below')">
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
      <div v-if="isEditing" class="w-80 bg-white border-l border-gray-200 flex flex-col">
        <!-- Header with collapse button -->
        <div class="flex items-center justify-between p-3 border-b border-gray-200">
          <h3 class="text-sm font-medium text-gray-900">
            {{ selectedComponent ? `${selectedComponent.displayName} Properties` : 'Properties' }}
          </h3>
          <div class="flex items-center space-x-2">
            <UButton v-if="selectedComponent" variant="ghost" icon="i-lucide-x" size="xs" @click="clearSelection"
              title="Close Properties" />
            <UButton variant="ghost" :icon="rightSidebarCollapsed ? 'i-lucide-chevron-left' : 'i-lucide-chevron-right'"
              size="xs" @click="rightSidebarCollapsed = !rightSidebarCollapsed" />
          </div>
        </div>

        <div v-if="!rightSidebarCollapsed" class="flex-1 flex flex-col overflow-hidden">
          <!-- Properties Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Document Tab -->
            <div v-if="activePropertyTab === 'document'" class="space-y-6">
              <div class="space-y-4">
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
            </div>

            <!-- Block Tab -->
            <div v-else-if="activePropertyTab === 'block'" class="space-y-6">
              <!-- Block Info -->
              <div v-if="selectedComponent" class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span class="text-blue-600 text-xl font-semibold">{{ selectedComponent.icon }}</span>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-xl font-semibold text-gray-800">{{ selectedComponent.displayName }}</h4>
                    <p class="text-base text-gray-600 mt-1">{{ selectedComponent.description }}</p>
                  </div>
                </div>

                <!-- Component Options -->
                <div class="border-t border-gray-200 pt-6 animate-in slide-in-from-bottom-2 duration-300">
                  <ComponentOptionsPanel :component="selectedComponent" @update="updateComponent" />
                </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { componentRegistry } from '~/libs/pagebuilder/registry'
import type { ComponentDefinition, ComponentInstance } from '~/libs/pagebuilder/types'
import ComponentRenderer from '~/components/PageBuilder/ComponentRenderer.vue'
import ComponentOptionsPanel from '~/components/PageBuilder/ComponentOptionsPanel.vue'

// Set the layout for this page
definePageMeta({
  layout: 'pagebuilder'
})

// Component Registry
const componentRegistryInstance = componentRegistry

// Components are automatically registered when the app loads

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
const draggedComponentId = ref<string | null>(null)
const dragTarget = ref<string | null>(null)

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
  { name: 'text-block', label: 'Text Block', description: 'Rich text content with formatting options.', icon: '¶' }
])

const mediaBlocks = computed(() => [
  { name: 'image-block', label: 'Image Block', description: 'Images with various display options.', icon: '🖼' }
])

const layoutBlocks = computed(() => [
  // Empty for now since we haven't implemented layout components yet
] as Array<{ name: string; label: string; description: string; icon: string }>)

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

// Selected component
const selectedComponent = computed(() => {
  if (!selectedComponentId.value) return null

  const component = pageComponents.value.find(c => c.id === selectedComponentId.value)
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

const onDragStart = (event: DragEvent, block: any) => {
  console.log('Drag start:', block)
  if (event.dataTransfer) {
    event.dataTransfer.setData('block-type', block.name)
    event.dataTransfer.effectAllowed = 'copy'
    console.log('Set drag data:', block.name)
  }
}

const onDrop = (event: DragEvent, index?: number) => {
  event.preventDefault()
  event.stopPropagation()

  console.log('Drop event triggered', { index, dragTarget: dragTarget.value })

  const blockType = event.dataTransfer?.getData('block-type')
  console.log('Block type:', blockType)

  if (!blockType) {
    console.log('No block type found')
    return
  }

  const definition = componentRegistryInstance.get(blockType)
  console.log('Component definition:', definition)

  if (!definition) {
    console.log('No component definition found')
    return
  }

  const newComponent: ComponentInstance = {
    id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: blockType,
    data: { ...definition.defaultData },
    position: { x: 0, y: 0 },
    size: { width: 100, height: 100 }
  }

  console.log('Creating new component:', newComponent)

  if (index !== undefined) {
    console.log('Inserting at index:', index)
    pageComponents.value.splice(index, 0, newComponent)
  } else {
    console.log('Adding to end')
    pageComponents.value.push(newComponent)
  }

  console.log('Updated pageComponents:', pageComponents.value)

  // Clear drag state immediately after drop
  dragTarget.value = null

  // Select the new component
  selectComponent(newComponent.id)
}

const selectComponent = (id: string) => {
  selectedComponentId.value = id
  activePropertyTab.value = 'block'
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
  const index = pageComponents.value.findIndex(c => c.id === selectedComponentId.value)
  if (index !== -1 && selectedComponentId.value) {
    const currentComponent = pageComponents.value[index]
    if (currentComponent) {
      pageComponents.value[index] = {
        ...currentComponent,
        ...updates,
        // Ensure required properties are always present
        id: currentComponent.id,
        type: currentComponent.type,
        data: currentComponent.data,
        position: currentComponent.position,
        size: currentComponent.size
      }
    }
  }
}

const startDrag = (id: string, event: MouseEvent) => {
  draggedComponentId.value = id
  // Implement drag and drop reordering logic here
}

const onDragEnter = (event: DragEvent, index: number, position: 'above' | 'below') => {
  // Prevent event bubbling to avoid flickering
  event.stopPropagation()
  event.preventDefault()
  dragTarget.value = `${index}-${position}`
}

const onDragLeave = (event: DragEvent, index: number, position: 'above' | 'below') => {
  // Prevent event bubbling to avoid flickering
  event.stopPropagation()
  event.preventDefault()
  // Only clear if we're actually leaving the drop zone
  if (dragTarget.value === `${index}-${position}`) {
    dragTarget.value = null
  }
}

const onDragEnterInitial = (event: DragEvent) => {
  // Prevent event bubbling to avoid flickering
  event.stopPropagation()
  dragTarget.value = 'initial'
}

const onDragLeaveInitial = (event: DragEvent) => {
  // Prevent event bubbling to avoid flickering
  event.stopPropagation()
  // Only clear if we're actually leaving the initial drop zone
  if (dragTarget.value === 'initial') {
    dragTarget.value = null
  }
}

// Global drag end handler to clear any stuck drag states
const onDragEnd = () => {
  dragTarget.value = null
}
</script>
