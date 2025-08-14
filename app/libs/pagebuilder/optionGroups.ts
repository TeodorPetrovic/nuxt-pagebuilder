import { optionTypes } from './componentBuilder'
import type { ComponentOption } from './types'

// ========================================
// ENHANCED OPTION BUILDERS WITH GROUPING
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
 * Simple boolean option
 */
export function simpleBooleanOption(name: string, label: string, defaultValue: boolean = false): ComponentOption {
  return optionTypes.boolean(name, label, {
    defaultValue,
    description: `Enable ${label.toLowerCase()}`
  })
}

/**
 * Alignment option
 */
export function alignmentOption(name: string = 'alignment', label: string = 'Alignment'): ComponentOption {
  return optionTypes.select(name, label, [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' }
  ], {
    defaultValue: 'left',
    description: 'Set text alignment'
  })
}

/**
 * Spacing option (for padding/margin)
 */
export function spacingOption(name: string, label: string, defaultValue: number = 0): ComponentOption {
  return optionTypes.number(name, label, {
    defaultValue,
    description: `Set ${label.toLowerCase()} in pixels`,
    validation: { min: 0, max: 200 }
  })
}

/**
 * Chrome DevTools-style spacing box option (combines all padding/margin into one visual component)
 */
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

/**
 * Heading styling group
 */
export function headingGroup(): ComponentOption[] {
  return [
    {
      type: 'group',
      name: 'headingGroup',
      label: 'Heading Style',
      description: 'Configure heading appearance',
      options: [
        pixelSizeOption('headingSize', 'Size (px)', 32),
        simpleBooleanOption('headingBold', 'Bold', true),
        simpleBooleanOption('headingItalic', 'Italic', false),
        simpleBooleanOption('headingUnderline', 'Underline', false),
        simpleColorOption('headingColor', 'Color', '#1f2937')
      ]
    } as any
  ]
}

/**
 * Text content styling group
 */
export function textGroup(): ComponentOption[] {
  return [
    {
      type: 'group',
      name: 'textGroup',
      label: 'Text Style',
      description: 'Configure text appearance',
      options: [
        pixelSizeOption('textSize', 'Size (px)', 16),
        simpleColorOption('textColor', 'Color', '#4b5563'),
        simpleBooleanOption('textBold', 'Bold', false),
        simpleBooleanOption('textItalic', 'Italic', false)
      ]
    } as any
  ]
}

/**
 * Button configuration group
 */
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
export function groupedTextBlockOptions(): ComponentOption[] {
  return [
    // === BASIC CONTENT ===
    simpleTextOption('heading', 'Heading', 'Enter heading'),
    alignmentOption('alignment', 'Content Alignment'),
    simpleTextareaOption('content', 'Text Content', 'Enter your text content'),
    
    // === HEADING STYLE ===
    pixelSizeOption('headingSize', 'Heading Size (px)', 32),
    simpleBooleanOption('headingBold', 'Heading Bold', true),
    simpleBooleanOption('headingItalic', 'Heading Italic', false),
    simpleBooleanOption('headingUnderline', 'Heading Underline', false),
    simpleColorOption('headingColor', 'Heading Color', '#1f2937'),
    
    // === TEXT STYLE ===
    pixelSizeOption('textSize', 'Text Size (px)', 16),
    simpleColorOption('textColor', 'Text Color', '#4b5563'),
    simpleBooleanOption('textBold', 'Text Bold', false),
    simpleBooleanOption('textItalic', 'Text Italic', false),
    
    // === BUTTON ===
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
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' }
    ], {
      defaultValue: 'md',
      description: 'Set button size'
    }),
    alignmentOption('buttonAlignment', 'Button Alignment'),
    
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
    pixelSizeOption('headingSize', 'Heading Size (px)', 32),
    simpleBooleanOption('headingBold', 'Heading Bold', true),
    simpleColorOption('headingColor', 'Heading Color', '#1f2937'),
    
    // Overall alignment
    alignmentOption('alignment', 'Content Alignment'),
    
    // Text content options
    simpleTextareaOption('content', 'Text Content', 'Enter your text content'),
    pixelSizeOption('textSize', 'Text Size (px)', 16),
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
