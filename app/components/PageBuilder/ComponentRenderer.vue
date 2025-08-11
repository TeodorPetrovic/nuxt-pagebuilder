<template>
  <component
    :is="componentDefinition?.component"
    :component="component"
    :is-editing="isEditing"
    v-if="componentDefinition"
  />
  <div v-else class="w-full h-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
    <div class="flex items-center space-x-2 text-red-600">
      <span class="text-lg">⚠️</span>
      <span class="text-sm font-medium">Component "{{ component.type }}" not found</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { componentRegistry } from '../../libs/pagebuilder/registry'
import type { ComponentInstance } from '../../libs/pagebuilder/types'

interface Props {
  component: ComponentInstance
  isEditing?: boolean
}

const props = defineProps<Props>()

const componentDefinition = computed(() => 
  componentRegistry.get(props.component.type)
)
</script>
