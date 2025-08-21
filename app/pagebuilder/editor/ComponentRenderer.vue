<script setup lang="ts">
import { computed } from 'vue'
import { componentRegistry } from '~/pagebuilder/core/registry'
import type { ComponentInstance } from '~/pagebuilder/core/types'

interface Props {
  component: ComponentInstance
  isEditing?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: []
  'component-add': [componentId: string, columnIndex: number, blockType: string]
  'component-update': [componentId: string, columnIndex: number, nestedComponentId: string, updates: any]
  'component-remove': [componentId: string, columnIndex: number, nestedComponentId: string]
  'component-select': [componentId: string]
}>()

const componentComponent = computed(() => {
  const definition = componentRegistry.get(props.component.type)
  return definition?.component
})

// Handler functions for nested component events
const onNestedComponentAdd = (columnIndex: number, blockType: string) => {
  emit('component-add', props.component.id, columnIndex, blockType)
}

const onNestedComponentUpdate = (columnIndex: number, nestedComponentId: string, updates: any) => {
  emit('component-update', props.component.id, columnIndex, nestedComponentId, updates)
}

const onNestedComponentRemove = (columnIndex: number, nestedComponentId: string) => {
  emit('component-remove', props.component.id, columnIndex, nestedComponentId)
}

const onNestedComponentSelect = (componentId: string) => {
  emit('component-select', componentId)
}
</script>

<template>
  <component 
    :is="componentComponent" 
    :data="component.data"
    :isEditing="isEditing"
    @click="$emit('click')"
    @component-add="onNestedComponentAdd"
    @component-update="onNestedComponentUpdate"
    @component-remove="onNestedComponentRemove"
    @component-select="onNestedComponentSelect"
  />
</template>