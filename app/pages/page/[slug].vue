<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComponentInstance } from '~/pagebuilder/core/types'
import ComponentRenderer from '~/pagebuilder/editor/ComponentRenderer.vue'

// Get the slug from the route
const route = useRoute()
const slug = route.params.slug as string

// Page data (in a real app, you'd fetch this from an API)
const pageData = ref<{
  metadata: {
    title: string
    slug: string
    template: string
    createdAt: string
    updatedAt: string
  }
  components: ComponentInstance[]
} | null>(null)

const notFound = ref(false)

const loadPageData = () => {
  const savedData = localStorage.getItem(`page-${slug}`)
  
  if (savedData) {
    try {
      pageData.value = JSON.parse(savedData)
      return
    } catch (error) {
      console.error('Error parsing saved page data:', error)
      notFound.value = true
      return
    }
  }
  
  // If no saved data exists, create empty page
  pageData.value = {
    metadata: {
      title: 'Demo Page',
      slug: slug,
      template: 'default',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    components: []
  }
}

// Load data immediately
loadPageData()

// Also listen for storage changes (when data is saved in another tab)
window.addEventListener('storage', (e) => {
  if (e.key === `page-${slug}` && e.newValue) {
    try {
      pageData.value = JSON.parse(e.newValue)
    } catch (error) {
      console.error('Error parsing updated page data:', error)
    }
  }
})

// Computed page title
const pageTitle = computed(() => {
  return pageData.value?.metadata.title || 'Page Not Found'
})

// Template classes
const templateClass = computed(() => {
  switch (pageData.value?.metadata.template) {
    case 'full-width':
      return 'max-w-none'
    case 'sidebar':
      return 'max-w-6xl mx-auto px-4'
    default:
      return 'max-w-4xl mx-auto px-4'
  }
})

// Back to editor function
const backToEditor = () => {
  navigateTo('/pagebuilder')
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <div class="bg-gray-50 border-b border-gray-200 py-4">
      <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ pageTitle }}</h1>
          <p class="text-sm text-gray-600 mt-1">Slug: {{ slug }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <UButton variant="outline" @click="backToEditor">
            Back to Editor
          </UButton>
          <div class="text-xs text-gray-500">
            {{ pageData?.metadata.template }} template
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-if="notFound" class="flex items-center justify-center py-20">
      <div class="text-center">
        <UIcon name="i-lucide-file-x" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
        <p class="text-gray-600 mb-6">The page "{{ slug }}" could not be found.</p>
        <UButton @click="backToEditor">Go to Page Builder</UButton>
      </div>
    </div>

    <!-- No Components State -->
    <div v-else-if="!pageData?.components?.length" class="py-20">
      <div :class="templateClass">
        <div class="text-center">
          <UIcon name="i-lucide-layout" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Empty Page</h2>
          <p class="text-gray-600 mb-6">This page doesn't have any components yet.</p>
          <p class="text-sm text-gray-500 mb-6">
            Go to the page builder and add some components, then save the page to see them here.
          </p>
          <UButton @click="backToEditor">Add Components</UButton>
        </div>
      </div>
    </div>

    <!-- Page Content -->
    <div v-else class="py-8">
      <div :class="templateClass">
        <div class="space-y-6">
          <div v-for="component in pageData.components" :key="component.id">
            <ComponentRenderer :component="component" />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-gray-50 border-t border-gray-200 py-6 mt-16">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-sm text-gray-500">
          Page created with Page Builder • 
          Last updated: {{ pageData?.metadata.updatedAt ? new Date(pageData.metadata.updatedAt).toLocaleDateString() : 'Never' }}
        </p>
      </div>
    </div>
  </div>
</template>
