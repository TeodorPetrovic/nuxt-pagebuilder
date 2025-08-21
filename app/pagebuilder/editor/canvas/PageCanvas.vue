<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComponentInstance } from '~/pagebuilder/core/types'
import ComponentRenderer from '../ComponentRenderer.vue'
import DropZone from './DropZone.vue'
import ComponentToolbar from './ComponentToolbar.vue'

interface Props {
  components: ComponentInstance[]
  isEditing: boolean
  selectedComponentId: string | null
  isDragging: boolean
  dragTarget: string | null
}

interface Emits {
  (e: 'component-select', componentId: string): void
  (e: 'component-remove', index: number): void
  (e: 'drag-start', event: DragEvent, component: ComponentInstance, index: number): void
  (e: 'drop', event: DragEvent, index?: number): void
  (e: 'drag-enter', target: string): void
  (e: 'drag-leave'): void
  (e: 'clear-selection'): void
  (e: 'nested-component-add', componentId: string, columnIndex: number, blockType: string): void
  (e: 'nested-component-update', componentId: string, columnIndex: number, nestedComponentId: string, updates: any): void
  (e: 'nested-component-remove', componentId: string, columnIndex: number, nestedComponentId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleComponentClick = (event: Event, componentId: string) => {
  event.stopPropagation()
  emit('component-select', componentId)
}

const onComponentDragStart = (event: DragEvent, component: ComponentInstance, index: number) => {
  emit('drag-start', event, component, index)
}

const onDrop = (event: DragEvent, index?: number) => {
  emit('drop', event, index)
}

const onDragEnter = (target: string) => {
  emit('drag-enter', target)
}

const onDragLeave = () => {
  emit('drag-leave')
}

const onNestedComponentAdd = (componentId: string, columnIndex: number, blockType: string) => {
  emit('nested-component-add', componentId, columnIndex, blockType)
}

const onNestedComponentUpdate = (componentId: string, columnIndex: number, nestedComponentId: string, updates: any) => {
  emit('nested-component-update', componentId, columnIndex, nestedComponentId, updates)
}

const onNestedComponentRemove = (componentId: string, columnIndex: number, nestedComponentId: string) => {
  emit('nested-component-remove', componentId, columnIndex, nestedComponentId)
}
</script>

<template>
  <div class="flex-1 bg-white relative overflow-auto" @click="$emit('clear-selection')">
    <div class="min-h-full p-8">
      <!-- Canvas Content -->
      <div class="max-w-4xl mx-auto">
        <!-- Empty State -->
        <DropZone
          v-if="components.length === 0"
          :is-active="dragTarget === 'initial'"
          :is-dragging="isDragging"
          @drop="onDrop"
          @drag-enter="onDragEnter('initial')"
          @drag-leave="onDragLeave"
        >
          <template #default>
            <div class="space-y-4">
              <UIcon name="i-lucide-plus-circle" class="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">Start building your page</h3>
              <p class="text-gray-500">Drag blocks from the left sidebar to start creating your content</p>
            </div>
          </template>
          
          <template #active>
            <div class="space-y-4">
              <UIcon name="i-lucide-plus-circle" class="w-16 h-16 mx-auto text-blue-500" />
              <h3 class="text-xl font-semibold text-blue-700">Drop your block here!</h3>
              <p class="text-blue-600">Release to add your first component</p>
            </div>
          </template>
        </DropZone>

        <!-- Page Components -->
        <div v-else class="space-y-4">
          <div 
            v-for="(component, index) in components" 
            :key="component.id" 
            class="relative group"
          >
            <!-- Top Drop Zone -->
            <DropZone
              v-if="isDragging"
              :is-active="dragTarget === `${index}-above`"
              :is-dragging="isDragging"
              position="top"
              @drop="onDrop($event, index)"
              @drag-enter="onDragEnter(`${index}-above`)"
            >
              <template #active>
                <div class="flex items-center space-x-2 text-blue-600 text-sm font-medium">
                  <UIcon name="i-lucide-plus" class="w-4 h-4" />
                  <span>Insert above</span>
                </div>
              </template>
            </DropZone>

            <!-- Bottom Drop Zone -->
            <DropZone
              v-if="isDragging"
              :is-active="dragTarget === `${index}-below`"
              :is-dragging="isDragging"
              position="bottom"
              @drop="onDrop($event, index + 1)"
              @drag-enter="onDragEnter(`${index}-below`)"
            >
              <template #active>
                <div class="flex items-center space-x-2 text-blue-600 text-sm font-medium">
                  <UIcon name="i-lucide-plus" class="w-4 h-4" />
                  <span>Insert below</span>
                </div>
              </template>
            </DropZone>

            <!-- Component Content -->
            <div
              class="border-2 border-transparent hover:border-blue-300 rounded-lg p-4 transition-colors cursor-pointer"
              :class="{ 'border-blue-500': selectedComponentId === component.id }" 
              draggable="true"
              @dragstart="onComponentDragStart($event, component, index)" 
              @click="handleComponentClick($event, component.id)"
            >
              <ComponentRenderer 
                :component="component" 
                :isEditing="isEditing"
                @component-add="onNestedComponentAdd"
                @component-update="onNestedComponentUpdate"
                @component-remove="onNestedComponentRemove"
                @component-select="$emit('component-select', $event)"
              />
            </div>

            <!-- Component Toolbar -->
            <ComponentToolbar
              v-if="isEditing"
              :component-id="component.id"
              @select="$emit('component-select', component.id)"
              @remove="$emit('component-remove', index)"
              @drag-start="onComponentDragStart($event, component, index)"
            />
          </div>

          <!-- Final Drop Zone -->
          <DropZone
            :is-active="dragTarget === `${components.length}-below`"
            :is-dragging="isDragging"
            position="final"
            @drop="onDrop($event, components.length)"
            @drag-enter="onDragEnter(`${components.length}-below`)"
          >
            <template #default>
              <div class="flex items-center space-x-2 text-gray-500 text-sm">
                <UIcon name="i-lucide-plus" class="w-4 h-4" />
                <span>Drop here to add new component</span>
              </div>
            </template>
            
            <template #active>
              <div class="flex items-center space-x-2 text-blue-600 text-sm font-medium">
                <UIcon name="i-lucide-plus" class="w-4 h-4" />
                <span>Add new component here</span>
              </div>
            </template>
          </DropZone>
        </div>
      </div>
    </div>
  </div>
</template>
