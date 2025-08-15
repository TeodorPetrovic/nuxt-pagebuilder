<script lang="ts" setup>

interface TextProps {
  value: string
  size: number
  color: string
  bold: boolean
  italic: boolean
  underline: boolean
}

const props = defineProps<{
  modelValue: TextProps
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: TextProps): void
}>()

const bold = ref(props.modelValue.bold)
const italic = ref(props.modelValue.italic)
const underline = ref(props.modelValue.underline)

</script>

<template>
  <div>
    <UTextarea class="w-full" :maxrows="6" autoresize v-model="props.modelValue.value" />
    <div class="flex items-center gap-2 mt-1">
      <UButtonGroup>
        <UButton :color="props.modelValue.bold ? 'primary' : 'neutral'" square icon="i-lucide-bold"
          :aria-pressed="props.modelValue.bold" @click="props.modelValue.bold = !props.modelValue.bold" />
        <UButton :color="props.modelValue.italic ? 'primary' : 'neutral'" square icon="i-lucide-italic"
          :aria-pressed="props.modelValue.italic" @click="props.modelValue.italic = !props.modelValue.italic" />
        <UButton :color="props.modelValue.underline ? 'primary' : 'neutral'" square icon="i-lucide-underline"
          :aria-pressed="props.modelValue.underline"
          @click="props.modelValue.underline = !props.modelValue.underline" />
      </UButtonGroup>
      <UInputNumber class="w-1/4 mt-[1px]" size="sm" v-model="props.modelValue.size" orientation="vertical" />
      <UPopover>
        <UButton label="Choose color" color="neutral" variant="outline" size="sm" class="mt-[1px]">
          <template #leading>
            <span :style="{ backgroundColor: props.modelValue.color }" class="size-3 rounded-full" />
          </template>
        </UButton>

        <template #content>
          <UColorPicker v-model="props.modelValue.color" class="p-2" />
          <UInput v-model="props.modelValue.color" class="p-2" />
        </template>
      </UPopover>
    </div>
  </div>
</template>