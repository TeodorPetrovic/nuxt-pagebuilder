<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
    value: string
    color: string
    variant: 'solid' | 'outline' | 'ghost'
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    alignment: 'left' | 'center' | 'right'
    newTab: boolean
    url: string
}

const props = defineProps<{
    modelValue: ButtonProps
}>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: ButtonProps): void
}>()

// Option definitions
const variantOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Outline', value: 'outline' },
    { label: 'Ghost', value: 'ghost' }
]

const sizeOptions = [
    { label: 'Extra Small', value: 'xs' },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' }
]

const colorOptions = [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Error', value: 'error' },
    { label: 'Info', value: 'info' },
    { label: 'Neutral', value: 'neutral' }
]

const alignmentOptions = [
    { icon: 'i-lucide-align-left', value: 'left' },
    { icon: 'i-lucide-align-center', value: 'center' },
    { icon: 'i-lucide-align-right', value: 'right' }
]

const alignmentValue = computed({
    get: () => props.modelValue?.alignment || 'left',
    set: (value: string) => updateAlignment(value)
})

const updateAlignment = (value: string) => {
    emits('update:modelValue', { ...props.modelValue, alignment: value as any })
}
</script>

<template>
    <div class="space-y-3 p-2 border border-gray-200 rounded-lg bg-gray-50">
        <!-- Button Text -->
        <div>
            <UInput v-model="props.modelValue.value" placeholder="Enter button text" class="w-full" />
        </div>

        <div class="flex items-center gap-2 justify-between">
            <!-- Variant -->
            <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Style</label>
                <USelect v-model="props.modelValue.variant"  :items="variantOptions" class="w-full" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <USelect v-model="props.modelValue.size" :items="sizeOptions" class="w-full" />
            </div>
        </div>

        <div class="flex items-center gap-2">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <USelect v-model="props.modelValue.color" :items="colorOptions" class="w-full" />
            </div>
            <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
                <UButtonGroup class="flex-1" size="lg">
                    <UButton v-for="align in alignmentOptions" :key="align.value"
                        :variant="alignmentValue === align.value ? 'solid' : 'outline'"
                        :color="alignmentValue === align.value ? 'primary' : 'neutral'" :icon="align.icon"
                        @click="updateAlignment(align.value)" >
                    </UButton>
                </UButtonGroup>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <UCheckbox v-model="props.modelValue.newTab" label="New Tab"/>
            <UInput v-model="props.modelValue.url" placeholder="Enter URL" />
        </div>

    </div>
</template>