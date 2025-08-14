import { optionTypes } from './componentBuilder'
import type { ComponentOption } from './types'

// ========================================
// SIMPLE OPTION BUILDERS FOR TEXTBLOCK
// ========================================

/**
 * Pixel-based text size option
 */
export function pixelSizeOption(name: string, label: string, defaultValue: number = 16): ComponentOption {
  return optionTypes.number(name, label, {
    defaultValue,
    description: `Set ${label.toLowerCase()} in pixels`,
    validation: { min: 8, max: 200 }
  })
}

/**
 * Simple color option
 */
export function simpleColorOption(name: string, label: string, defaultValue: string = '#000000'): ComponentOption {
  return optionTypes.color(name, label, {
    defaultValue,
    description: `Set ${label.toLowerCase()}`
  })
}

/**
 * Simple text content option
 */
export function simpleTextOption(name: string, label: string, placeholder: string = ''): ComponentOption {
  return optionTypes.text(name, label, {
    description: `Enter ${label.toLowerCase()}`,
    defaultValue: placeholder
  })
}

/**
 * Simple textarea content option
 */
export function simpleTextareaOption(name: string, label: string, placeholder: string = ''): ComponentOption {
  return optionTypes.textarea(name, label, {
    description: `Enter ${label.toLowerCase()}`,
    defaultValue: placeholder
  })
}

/**
 * Simple boolean option (for bold/not bold)
 */
export function simpleBooleanOption(name: string, label: string, defaultValue: boolean = false): ComponentOption {
  return optionTypes.boolean(name, label, {
    defaultValue,
    description: `Enable ${label.toLowerCase()}`
  })
}

/**
 * Text alignment option
 */
export function alignmentOption(name: string = 'alignment', label: string = 'Alignment'): ComponentOption {
  return optionTypes.select(name, label, [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
  ], {
    defaultValue: 'left',
    description: 'Set text alignment'
  })
}

/**
 * Button variant option
 */
export function buttonVariantOption(): ComponentOption {
  return optionTypes.select('buttonVariant', 'Button Variant', [
    { label: 'Solid', value: 'solid' },
    { label: 'Outline', value: 'outline' },
    { label: 'Ghost', value: 'ghost' }
  ], {
    defaultValue: 'solid',
    description: 'Set button style'
  })
}

/**
 * Button size option
 */
export function buttonSizeOption(): ComponentOption {
  return optionTypes.select('buttonSize', 'Button Size', [
    { label: 'Extra Small', value: 'xs' },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' }
  ], {
    defaultValue: 'md',
    description: 'Set button size'
  })
}

/**
 * Button alignment option (separate from text alignment)
 */
export function buttonAlignmentOption(): ComponentOption {
  return optionTypes.select('buttonAlignment', 'Button Alignment', [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' }
  ], {
    defaultValue: 'left',
    description: 'Set button alignment (overrides text alignment)'
  })
}

// ========================================
// COMPLETE TEXTBLOCK OPTIONS
// ========================================

export function textBlockOptions(): ComponentOption[] {
  return [
    // Heading options
    simpleTextOption('heading', 'Heading', 'Enter heading'),
    pixelSizeOption('headingSize', 'Heading Size (px)', 32),
    simpleBooleanOption('headingBold', 'Heading Bold', true),
    simpleColorOption('headingColor', 'Heading Color', '#1f2937'),
    
    // Overall alignment (moved below heading color)
    alignmentOption('alignment', 'Content Alignment'),
    
    // Text content options
    simpleTextareaOption('content', 'Text Content', 'Enter your text content'),
    pixelSizeOption('textSize', 'Text Size (px)', 16),
    simpleColorOption('textColor', 'Text Color', '#4b5563'),
    
    // Button options
    simpleTextOption('buttonText', 'Button Text', ''),
    buttonVariantOption(),
    buttonSizeOption(),
    buttonAlignmentOption()
  ]
}
