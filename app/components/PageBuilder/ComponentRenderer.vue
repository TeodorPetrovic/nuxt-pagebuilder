<template>
  <component 
    :is="componentComponent" 
    :data="component.data"
    :options="component.options"
    @click="$emit('click')"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { componentRegistry } from '~/libs/pagebuilder/registry'
import type { ComponentInstance } from '~/libs/pagebuilder/types'

interface Props {
  component: ComponentInstance
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

const componentComponent = computed(() => {
  const definition = componentRegistry.get(props.component.type)
  return definition?.component
})
</script>
