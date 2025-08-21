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

</script>

<template>
  <div>
    <UTextarea 
      class="w-full" 
      :maxrows="6" 
      autoresize 
      :model-value="props.modelValue.value" 
      @update:model-value="emits('update:modelValue', { ...props.modelValue, value: $event })" 
    />
    <div class="flex items-center gap-2 mt-1">
      <UButtonGroup>
        <UButton 
          :color="props.modelValue.bold ? 'primary' : 'neutral'" 
          square 
          icon="i-lucide-bold"
          :aria-pressed="props.modelValue.bold" 
          @click="emits('update:modelValue', { ...props.modelValue, bold: !props.modelValue.bold })" 
        />
        <UButton 
          :color="props.modelValue.italic ? 'primary' : 'neutral'" 
          square 
          icon="i-lucide-italic"
          :aria-pressed="props.modelValue.italic" 
          @click="emits('update:modelValue', { ...props.modelValue, italic: !props.modelValue.italic })" 
        />
        <UButton 
          :color="props.modelValue.underline ? 'primary' : 'neutral'" 
          square 
          icon="i-lucide-underline"
          :aria-pressed="props.modelValue.underline"
          @click="emits('update:modelValue', { ...props.modelValue, underline: !props.modelValue.underline })" 
        />
      </UButtonGroup>
      <UInputNumber 
        class="w-1/4 mt-[1px]" 
        size="sm" 
        :model-value="props.modelValue.size" 
        @update:model-value="emits('update:modelValue', { ...props.modelValue, size: $event })"
        orientation="vertical" 
      />
      <UPopover>
        <UButton label="Choose color" color="neutral" variant="outline" size="sm" class="mt-[1px]">
          <template #leading>
            <span :style="{ backgroundColor: props.modelValue.color || '#4b5563' }" class="size-3 rounded-full" />
          </template>
        </UButton>

        <template #content>
          <UColorPicker 
            :model-value="props.modelValue.color || '#4b5563'" 
            @update:model-value="emits('update:modelValue', { ...props.modelValue, color: $event as string })"
            class="p-2" 
          />
          <UInput 
            :model-value="props.modelValue.color || '#4b5563'" 
            @update:model-value="emits('update:modelValue', { ...props.modelValue, color: $event as string })"
            class="p-2" 
          />
        </template>
      </UPopover>
    </div>
  </div>
</template>