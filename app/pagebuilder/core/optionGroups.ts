import { optionTypes } from './componentBuilder'
import type { ComponentOption } from './types'

// ========================================
// ENHANCED OPTION BUILDERS WITH GROUPING
// ========================================

export function pixelSizeOption(name: string, label: string, defaultValue: number = 16): ComponentOption {
  return optionTypes.number(name, label, {
    defaultValue,
    description: `Set ${label.toLowerCase()} in pixels`,
    validation: { min: 8, max: 200 }
  })
}

export function simpleColorOption(name: string, label: string, defaultValue: string = '#000000'): ComponentOption {
  return optionTypes.color(name, label, {
    defaultValue,
    description: `Set ${label.toLowerCase()}`
  })
}

export function simpleTextOption(name: string, label: string, placeholder: string = ''): ComponentOption {
  return optionTypes.text(name, label, {
    description: `Enter ${label.toLowerCase()}`,
    defaultValue: placeholder
  })
}

export function simpleHeadingOption(name: string, label: string, placeholder: string = ''): ComponentOption {
  return optionTypes.heading(name, label, {
    description: `Enter ${label.toLowerCase()}`,
    defaultValue: placeholder
  })
}

export function simpleTextContentOption(name: string, label: string, placeholder: string = ''): ComponentOption {
  return optionTypes.text(name, label, {
    description: `Enter ${label.toLowerCase()}`,
    defaultValue: placeholder
  })
}

export function simpleButtonOption(name: string, label: string, placeholder: string = ''): ComponentOption {
  return optionTypes.button(name, label, {
    description: `Configure ${label.toLowerCase()}`,
    defaultValue: placeholder
  })
}

export function simpleTextareaOption(name: string, label: string, placeholder: string = ''): ComponentOption {
  return optionTypes.textarea(name, label, {
    description: `Enter ${label.toLowerCase()}`,
    defaultValue: placeholder
  })
}

export function simpleBooleanOption(name: string, label: string, defaultValue: boolean = false): ComponentOption {
  return optionTypes.boolean(name, label, {
    defaultValue,
    description: `Enable ${label.toLowerCase()}`
  })
}

export function alignmentOption(name: string = 'alignment', label: string = 'Alignment'): ComponentOption {
  return optionTypes.select(name, label, [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' },
    { label: 'Justify', value: 'justify' }
  ], {
    defaultValue: 'left',
    description: 'Set text alignment'
  })
}

export function spacingOption(name: string, label: string, defaultValue: number = 0): ComponentOption {
  return optionTypes.number(name, label, {
    defaultValue,
    description: `Set ${label.toLowerCase()} in pixels`,
    validation: { min: 0, max: 200 }
  })
}

export function spacingBoxOption(name: string = 'spacing', label: string = 'Spacing'): ComponentOption {
  return optionTypes.spacingBox(name, label, {
    defaultValue: {
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0
    },
    description: 'Configure padding and margin using a visual box model'
  })
}

// ========================================
// OPTION GROUPS (Mini-Components)
// ========================================


export function buttonGroup(): ComponentOption[] {
  return [
    {
      type: 'group',
      name: 'buttonGroup',
      label: 'Button',
      description: 'Configure button settings',
      options: [
        simpleTextOption('buttonText', 'Button Text', ''),
        optionTypes.select('buttonVariant', 'Variant', [
          { label: 'Solid', value: 'solid' },
          { label: 'Outline', value: 'outline' },
          { label: 'Ghost', value: 'ghost' }
        ], {
          defaultValue: 'solid',
          description: 'Set button style'
        }),
        optionTypes.select('buttonSize', 'Size', [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' }
        ], {
          defaultValue: 'md',
          description: 'Set button size'
        }),
        alignmentOption('buttonAlignment', 'Alignment')
      ]
    } as any
  ]
}

/**
 * Spacing group (Chrome DevTools style with visual box editor)
 */
export function spacingGroup(): ComponentOption[] {
  return [
    spacingBoxOption('spacing', 'Spacing')
  ]
}

// ========================================
// COMPLETE TEXTBLOCK WITH GROUPS
// ========================================

/**
 * TextBlock options organized into logical sections
 */
export function groupedMiniHereBlockOptions(): ComponentOption[] {
  return [
    // === BASIC CONTENT ===
    simpleHeadingOption('heading', 'Heading', 'Enter heading'),
    alignmentOption('alignment', 'Content Alignment'),
    simpleTextContentOption('content', 'Text Content', 'Enter your text content'),
    
    // === BUTTON ===
    simpleButtonOption('button', 'Button', 'Configure button'),
    
    // === SPACING ===
    spacingBoxOption('spacing', 'Spacing')
  ]
}

// ========================================
// LEGACY FLAT OPTIONS (for backward compatibility)
// ========================================

/**
 * Flat TextBlock options (original structure)
 */
export function flatTextBlockOptions(): ComponentOption[] {
  return [
    // Heading options
    simpleTextOption('heading', 'Heading', 'Enter heading'),
    simpleBooleanOption('headingBold', 'Heading Bold', true),
    simpleColorOption('headingColor', 'Heading Color', '#1f2937'),
    
    // Overall alignment
    alignmentOption('alignment', 'Content Alignment'),
    
    // Text content options
    simpleTextareaOption('content', 'Text Content', 'Enter your text content'),
    simpleColorOption('textColor', 'Text Color', '#4b5563'),
    
    // Button options
    simpleTextOption('buttonText', 'Button Text', ''),
    optionTypes.select('buttonVariant', 'Button Variant', [
      { label: 'Solid', value: 'solid' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' }
    ], {
      defaultValue: 'solid',
      description: 'Set button style'
    }),
    optionTypes.select('buttonSize', 'Button Size', [
      { label: 'Extra Small', value: 'xs' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' }
    ], {
      defaultValue: 'md',
      description: 'Set button size'
    }),
    alignmentOption('buttonAlignment', 'Button Alignment')
  ]
}
