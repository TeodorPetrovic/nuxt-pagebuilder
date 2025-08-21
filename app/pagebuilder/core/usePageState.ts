import { ref, computed, watch, onUnmounted, readonly } from 'vue'
import type { Page, PageVersion, PageBuilderState, PageComponent } from './types'

export function usePageState(pageId?: string) {
  // Reactive state for this specific page instance
  const state = ref<PageBuilderState>({
    currentPage: null,
    publishedPage: null,
    selectedComponent: null,
    isEditing: false,
    hasUnsavedChanges: false,
    lastSavedAt: null
  })

  // Computed properties
  const isDraft = computed(() => 
    state.value.currentPage?.status === 'draft'
  )
  
  const isPublished = computed(() => 
    state.value.currentPage?.status === 'published'
  )
  
  const hasPublishedVersion = computed(() => 
    !!state.value.publishedPage
  )
  
  const canPublish = computed(() => 
    isDraft.value && state.value.hasUnsavedChanges
  )

  // Methods
  const loadPage = async (id: string) => {
    try {
      // For now, just create a new page since we don't have a backend
      // TODO: Implement actual API calls when backend is ready
      console.log('Loading page:', id)
      
      // Create a sample page for demonstration
      const samplePage: Page = {
        id,
        title: 'Sample Page',
        slug: 'sample-page',
        components: [],
        meta: {},
        seo: {},
        status: 'published',
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
        publishedBy: 'demo-user'
      }
      
      state.value.publishedPage = samplePage
      state.value.currentPage = samplePage
      state.value.hasUnsavedChanges = false
      state.value.lastSavedAt = new Date()
    } catch (error) {
      console.error('Failed to load page:', error)
      // Create a new page if loading fails
      createNewPage()
    }
  }

  const createNewPage = () => {
    const newPage: Page = {
      id: generateId(),
      title: 'Untitled Page',
      slug: 'untitled-page',
      components: [],
      meta: {},
      seo: {},
      status: 'draft',
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    state.value.currentPage = newPage
    state.value.publishedPage = null
    state.value.hasUnsavedChanges = false
    state.value.lastSavedAt = null
  }

  const saveDraft = async () => {
    if (!state.value.currentPage || !state.value.hasUnsavedChanges) return
    
    try {
      const updatedPage = {
        ...state.value.currentPage,
        updatedAt: new Date()
      }
      
      // For now, just update local state
      // TODO: Implement actual API calls when backend is ready
      console.log('Saving draft:', updatedPage)
      
      state.value.currentPage = updatedPage
      state.value.hasUnsavedChanges = false
      state.value.lastSavedAt = new Date()
      
      return updatedPage
    } catch (error) {
      console.error('Failed to save draft:', error)
      throw error
    }
  }

  const publishPage = async () => {
    if (!state.value.currentPage || !canPublish.value) return
    
    try {
      const publishedPage = {
        ...state.value.currentPage,
        status: 'published',
        publishedAt: new Date(),
        publishedBy: 'current-user', // TODO: Get from auth
        updatedAt: new Date()
      }
      
      // For now, just update local state
      // TODO: Implement actual API calls when backend is ready
      console.log('Publishing page:', publishedPage)
      
      // Update local state
      state.value.currentPage = publishedPage
      state.value.publishedPage = publishedPage
      state.value.hasUnsavedChanges = false
      state.value.lastSavedAt = new Date()
      
      return publishedPage
    } catch (error) {
      console.error('Failed to publish page:', error)
      throw error
    }
  }

  const discardDraft = async () => {
    if (!state.value.publishedPage) return
    
    // Reload the published version
    await loadPage(state.value.publishedPage.id)
  }

  const updateComponent = (componentId: string, updates: Partial<PageComponent>) => {
    if (!state.value.currentPage) return
    
    const index = state.value.currentPage.components.findIndex(c => c.id === componentId)
    if (index !== -1) {
      state.value.currentPage.components[index] = {
        ...state.value.currentPage.components[index],
        ...updates
      }
      state.value.hasUnsavedChanges = true
    }
  }

  const addComponent = (component: PageComponent) => {
    if (!state.value.currentPage) return
    
    state.value.currentPage.components.push(component)
    state.value.hasUnsavedChanges = true
  }

  const removeComponent = (componentId: string) => {
    if (!state.value.currentPage) return
    
    state.value.currentPage.components = state.value.currentPage.components.filter(
      c => c.id !== componentId
    )
    state.value.hasUnsavedChanges = true
  }

  const selectComponent = (componentId: string | null) => {
    state.value.selectedComponent = componentId
  }

  const toggleEditing = () => {
    state.value.isEditing = !state.value.isEditing
  }

  // Watch for changes to mark as unsaved
  watch(
    () => state.value.currentPage,
    () => {
      if (state.value.currentPage && state.value.lastSavedAt) {
        state.value.hasUnsavedChanges = true
      }
    },
    { deep: true }
  )

  // Auto-save draft every 30 seconds if there are unsaved changes
  let autoSaveInterval: NodeJS.Timeout | null = null
  
  const startAutoSave = () => {
    autoSaveInterval = setInterval(async () => {
      if (state.value.hasUnsavedChanges && isDraft.value) {
        await saveDraft()
      }
    }, 30000)
  }
  
  const stopAutoSave = () => {
    if (autoSaveInterval) {
      clearInterval(autoSaveInterval)
      autoSaveInterval = null
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stopAutoSave()
  })

  return {
    // State
    state: readonly(state),
    
    // Computed
    isDraft,
    isPublished,
    hasPublishedVersion,
    canPublish,
    hasUnsavedChanges: computed(() => state.value.hasUnsavedChanges),
    
    // Methods
    loadPage,
    createNewPage,
    saveDraft,
    publishPage,
    discardDraft,
    updateComponent,
    addComponent,
    removeComponent,
    selectComponent,
    toggleEditing,
    startAutoSave,
    stopAutoSave
  }
}

function generateId(): string {
  return `page_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
