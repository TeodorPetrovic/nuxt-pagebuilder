<template>
  <div class="relative w-full h-full">
    <div class="relative w-full h-full">
      <div
        v-for="component in components"
        :key="component.id"
        class="relative border-2 border-transparent"
        :class="{ 'border-blue-500': isSelected(component.id) }"
        :style="getComponentStyle(component)"
        @click.stop="selectComponent(component.id)"
      >
        <ComponentRenderer 
          :component="component"
          :is-editing="isEditing"
          @update="handleComponentUpdate"
        />
        
        <!-- Resize handles -->
        <div v-if="isEditing" class="absolute inset-0 pointer-events-none">
          <div class="absolute w-3 h-3 bg-blue-500 rounded-full pointer-events-auto top-0 left-0 cursor-nw-resize" @mousedown="startResize($event, component.id, 'nw')"></div>
          <div class="absolute w-3 h-3 bg-blue-500 rounded-full pointer-events-auto top-0 right-0 cursor-ne-resize" @mousedown="startResize($event, component.id, 'ne')"></div>
          <div class="absolute w-3 h-3 bg-blue-500 rounded-full pointer-events-auto bottom-0 left-0 cursor-sw-resize" @mousedown="startResize($event, component.id, 'sw')"></div>
          <div class="absolute w-3 h-3 bg-blue-500 rounded-full pointer-events-auto bottom-0 right-0 cursor-se-resize" @mousedown="startResize($event, component.id, 'se')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PageComponent } from '../../libs/pagebuilder/types'
import ComponentRenderer from './ComponentRenderer.vue'

interface Props {
  components: PageComponent[]
  isEditing: boolean
}

interface Emits {
  (e: 'component-click', componentId: string): void
  (e: 'component-update', componentId: string, updates: Partial<PageComponent>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedComponentId = ref<string | null>(null)

const isSelected = (componentId: string) => componentId === selectedComponentId.value

const getComponentStyle = (component: PageComponent) => ({
  position: 'absolute',
  left: `${component.position.x}px`,
  top: `${component.position.y}px`,
  width: `${component.size.width}px`,
  height: `${component.size.height}px`,
  cursor: props.isEditing ? 'move' : 'default'
})

const selectComponent = (componentId: string) => {
  selectedComponentId.value = componentId
  emit('component-click', componentId)
}

const handleComponentUpdate = (componentId: string, updates: Partial<PageComponent>) => {
  emit('component-update', componentId, updates)
}

const startResize = (event: MouseEvent, componentId: string, handle: string) => {
  // TODO: Implement resize functionality
  console.log('Start resize:', componentId, handle)
}
</script>
