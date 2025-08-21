<script lang="ts" setup>

interface ImageProps {
    url: string
    alt: string
    caption: string
    width: number
    height: number
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    alignment: 'left' | 'center' | 'right'
}

const props = defineProps<{
    modelValue: ImageProps
}>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: ImageProps): void
}>()

const alignmentOptions = [
    { icon: 'i-lucide-align-left', value: 'left' },
    { icon: 'i-lucide-align-center', value: 'center' },
    { icon: 'i-lucide-align-right', value: 'right' }
]

const updateAlignment = (value: string) => {
    emits('update:modelValue', { ...props.modelValue, alignment: value as any })
}

//TODO: Image library and edit options before pasting
//TODO: Add list of default aspect ratios, with image size options
//TODO: Additional IMage options
</script>

<template>
    <div class="space-y-3">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <UInput class="w-full" autoresize v-model="props.modelValue.url" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image Alt</label>
            <UInput class="w-full" autoresize v-model="props.modelValue.alt" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image Caption</label>
            <UInput class="w-full" autoresize v-model="props.modelValue.caption" />
        </div>
        <div class="mt-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
            <div class="flex items-center gap-2">
            <UInputNumber class="w-1/2" size="sm" v-model="props.modelValue.width" />
            <UInputNumber class="w-1/2" size="sm" v-model="props.modelValue.height" />
            </div>
        </div>
        <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
            <UButtonGroup class="flex-1" size="lg">
                <UButton v-for="align in alignmentOptions" :key="align.value"
                    :variant="props.modelValue.alignment === align.value ? 'solid' : 'outline'"
                    :color="props.modelValue.alignment === align.value ? 'primary' : 'neutral'" :icon="align.icon"
                    @click="updateAlignment(align.value)">
                </UButton>
            </UButtonGroup>
        </div>
    </div>
</template>