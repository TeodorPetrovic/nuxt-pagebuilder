<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <!-- Top Toolbar -->
    <div class="flex items-center justify-between p-3 bg-white border-b border-gray-200">
      <div class="flex items-center space-x-4">
        <h1 class="text-lg font-semibold text-gray-800">Page Builder</h1>
        <div class="flex items-center space-x-2">
          <UButton
            :variant="isEditing ? 'solid' : 'outline'"
            color="primary"
            size="sm"
            @click="toggleEditing"
          >
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
        <!-- Search Bar -->
        <div class="p-4 border-b border-gray-200">
          <UInput
            v-model="searchQuery"
            placeholder="Search blocks..."
            icon="i-lucide-search"
            variant="outline"
            size="sm"
          />
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-200">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Block Categories -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="activeTab === 'blocks'" class="space-y-6">
            <!-- Text Category -->
            <div class="space-y-3">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">TEXT</h3>
              <div class="space-y-2">
                <div
                  v-for="block in textBlocks"
                  :key="block.name"
                  class="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-move transition-colors group"
                  draggable="true"
                  @dragstart="onDragStart($event, block)"
                >
                  <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <span class="text-blue-600 text-sm font-semibold">{{ block.icon }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="font-medium text-gray-900">{{ block.label }}</div>
                    <div class="text-xs text-gray-500">{{ block.description }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Media Category -->
            <div class="space-y-3">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">MEDIA</h3>
              <div class="space-y-2">
                <div
                  v-for="block in mediaBlocks"
                  :key="block.name"
                  class="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-move transition-colors group"
                  draggable="true"
                  @dragstart="onDragStart($event, block)"
                >
                  <div class="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <span class="text-green-600 text-sm font-semibold">{{ block.icon }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="font-medium text-gray-900">{{ block.label }}</div>
                    <div class="text-xs text-gray-500">{{ block.description }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Layout Category -->
            <div class="space-y-3">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">LAYOUT</h3>
              <div class="space-y-2">
                <div
                  v-for="block in layoutBlocks"
                  :key="block.name"
                  class="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-move transition-colors group"
                  draggable="true"
                  @dragstart="onDragStart($event, block)"
                >
                  <div class="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                    <span class="text-purple-600 text-sm font-semibold">{{ block.icon }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="font-medium text-gray-900">{{ block.label }}</div>
                    <div class="text-xs text-gray-500">{{ block.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Patterns Tab -->
          <div v-else-if="activeTab === 'patterns'" class="space-y-4">
            <div class="text-center text-gray-500 py-8">
              <UIcon name="i-lucide-layout-grid" class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p class="text-sm">No patterns available yet</p>
              <p class="text-xs text-gray-400">Patterns will appear here</p>
            </div>
          </div>
        </div>

        <!-- Bottom Info -->
        <div class="p-3 border-t border-gray-200 bg-gray-50">
          <div class="text-xs text-gray-500">
            <div class="flex items-center justify-between">
              <span>Document</span>
              <span>→</span>
              <span>Paragraph</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Center Canvas -->
      <div class="flex-1 bg-white relative overflow-auto">
        <div class="min-h-full p-8">
          <!-- Page Title -->
          <div class="max-w-4xl mx-auto mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Say Hello to the New Editor</h1>
            
            <!-- Text Block Toolbar -->
            <div class="flex items-center space-x-2 mb-4 p-2 bg-gray-50 rounded-lg">
              <UButton variant="ghost" size="xs" icon="i-lucide-align-left" />
              <UButton variant="ghost" size="xs" icon="i-lucide-align-center" />
              <UButton variant="ghost" size="xs" icon="i-lucide-align-right" />
              <div class="w-px h-4 bg-gray-300 mx-2"></div>
              <UButton variant="ghost" size="xs" icon="i-lucide-bold" />
              <UButton variant="ghost" size="xs" icon="i-lucide-italic" />
              <UButton variant="ghost" size="xs" icon="i-lucide-link" />
            </div>
            
            <p class="text-lg text-gray-600 leading-relaxed">
              We call the new editor Gutenberg. The entire editing experience has been rebuilt for media rich pages and posts. Experience the flexibility that blocks will bring, whether you are building your first site, or write code for a living.
            </p>
          </div>

          <!-- Feature Blocks -->
          <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-gray-800 text-white p-6 rounded-lg">
              <div class="flex items-center mb-3">
                <UIcon name="i-lucide-heart" class="w-6 h-6 text-red-400 mr-2" />
                <UIcon name="i-lucide-heart" class="w-6 h-6 text-red-400 mr-2" />
                <UIcon name="i-lucide-heart" class="w-6 h-6 text-red-400 mr-2" />
              </div>
              <h3 class="text-lg font-semibold mb-2">Do more with fewer plugins.</h3>
            </div>
            
            <div class="bg-gray-800 text-white p-6 rounded-lg">
              <UIcon name="i-lucide-bar-chart-3" class="w-6 h-6 text-blue-400 mb-3" />
              <h3 class="text-lg font-semibold mb-2">Create modern, multimedia-heavy layouts.</h3>
            </div>
            
            <div class="bg-gray-800 text-white p-6 rounded-lg">
              <UIcon name="i-lucide-smartphone" class="w-6 h-6 text-green-400 mb-3" />
              <h3 class="text-lg font-semibold mb-2">Work across all screen sizes and devices.</h3>
            </div>
            
            <div class="bg-gray-800 text-white p-6 rounded-lg">
              <UIcon name="i-lucide-file-bar-chart" class="w-6 h-6 text-yellow-400 mb-3" />
              <h3 class="text-lg font-semibold mb-2">Trust that your editor looks like your website.</h3>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="max-w-4xl mx-auto text-center">
            <UButton size="lg" color="primary" class="mb-4">
              Try it Today in WordPress
            </UButton>
            <p class="text-sm text-gray-500">
              Gutenberg is available as part of WordPress 5.0 and later. The Classic Editor plugin allows users to switch back to the previous editor if needed. Future development will continue in the Gutenberg plugin.
            </p>
          </div>
        </div>
      </div>

      <!-- Right Sidebar - Properties Panel -->
      <div v-if="isEditing" class="w-80 bg-white border-l border-gray-200 flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <div class="flex space-x-1">
            <button
              v-for="tab in propertyTabs"
              :key="tab.id"
              @click="activePropertyTab = tab.id"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                activePropertyTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
          <UButton variant="ghost" icon="i-lucide-x" size="sm" />
        </div>

        <!-- Properties Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Document Tab -->
          <div v-if="activePropertyTab === 'document'" class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-sm font-medium text-gray-900">Page Attributes</h3>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                  <UInput v-model="pageTitle" placeholder="Enter page title" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <UInput v-model="pageSlug" placeholder="page-slug" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Template</label>
                  <USelect
                    v-model="pageTemplate"
                    :options="templateOptions"
                    placeholder="Select template"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Block Tab -->
          <div v-else-if="activePropertyTab === 'block'" class="space-y-6">
            <!-- Block Info -->
            <div class="flex items-start space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                <span class="text-blue-600 text-lg font-semibold">¶</span>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-medium text-gray-800">Paragraph</h4>
                <p class="text-sm text-gray-600">Start with the building block of all narrative.</p>
              </div>
            </div>

            <!-- Typography Settings -->
            <div class="space-y-4">
              <h5 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Typography</h5>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Font size</label>
                  <div class="flex items-center space-x-2">
                    <UButton variant="outline" size="sm" class="flex-1">Default</UButton>
                    <UButton variant="outline" size="sm" class="flex-1">Custom</UButton>
                  </div>
                  <UButton variant="ghost" size="xs" class="mt-2">Reset</UButton>
                </div>
              </div>
            </div>

            <!-- Color Settings -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h5 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Color settings</h5>
                <UButton variant="ghost" icon="i-lucide-chevron-down" size="xs" />
              </div>
            </div>

            <!-- Text Settings -->
            <div class="space-y-4">
              <h5 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Text settings</h5>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700">Drop cap</label>
                    <p class="text-xs text-gray-500">Toggle to show a large initial letter.</p>
                  </div>
                  <USwitch v-model="dropCap" />
                </div>
              </div>
            </div>

            <!-- Advanced Settings -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h5 class="text-sm font-medium text-gray-700 uppercase tracking-wide">Advanced</h5>
                <UButton variant="ghost" icon="i-lucide-chevron-down" size="xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Set the layout for this page
definePageMeta({
  layout: 'pagebuilder'
})

// State
const isEditing = ref(true)
const searchQuery = ref('')
const activeTab = ref('blocks')
const activePropertyTab = ref('block')
const pageTitle = ref('Say Hello to the New Editor')
const pageSlug = ref('say-hello-to-the-new-editor')
const pageTemplate = ref('default')
const dropCap = ref(false)

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

// Block definitions
const textBlocks = [
  { name: 'paragraph', label: 'Paragraph', description: 'Start with the building block of all narrative.', icon: '¶' },
  { name: 'heading', label: 'Heading', description: 'Introduce new sections and organize content.', icon: 'H' },
  { name: 'list', label: 'List', description: 'Create a bulleted or numbered list.', icon: '•' },
  { name: 'quote', label: 'Quote', description: 'Give quoted text visual emphasis.', icon: '"' },
  { name: 'code', label: 'Code', description: 'Display code snippets that respect your spacing.', icon: '{}' },
  { name: 'classic', label: 'Classic', description: 'Use the classic WordPress editor.', icon: 'W' },
  { name: 'preformatted', label: 'Preformatted', description: 'Add text that respects your spacing and tabs.', icon: '␣' },
  { name: 'pullquote', label: 'Pullquote', description: 'Give quoted text visual emphasis.', icon: '❝' },
  { name: 'table', label: 'Table', description: 'Insert a table to organize content.', icon: '⊞' },
  { name: 'verse', label: 'Verse', description: 'Insert poetry. Use special spacing formats.', icon: '☰' }
]

const mediaBlocks = [
  { name: 'image', label: 'Image', description: 'Insert an image to make a visual statement.', icon: '🖼' },
  { name: 'gallery', label: 'Gallery', description: 'Display multiple images in a rich gallery.', icon: '🖼️' },
  { name: 'audio', label: 'Audio', description: 'Embed a simple audio player.', icon: '🎵' }
]

const layoutBlocks = [
  { name: 'columns', label: 'Columns', description: 'Add a block that displays content in multiple columns.', icon: '⊞' },
  { name: 'group', label: 'Group', description: 'Group blocks together.', icon: '⊟' },
  { name: 'spacer', label: 'Spacer', description: 'Add space between blocks.', icon: '↕' }
]

// Methods
const toggleEditing = () => {
  isEditing.value = !isEditing.value
}

const onDragStart = (event: DragEvent, block: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('block-type', block.name)
  }
}
</script>
