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
 * Spacing group (Chrome DevTools style)
 */
export function spacingGroup(): ComponentOption[] {
  return [
    {
      type: 'group',
      name: 'spacingGroup',
      label: 'Spacing',
      description: 'Configure padding and margin',
      options: [
        // Padding
        spacingOption('paddingTop', 'Padding Top', 0),
        spacingOption('paddingRight', 'Padding Right', 0),
        spacingOption('paddingBottom', 'Padding Bottom', 0),
        spacingOption('paddingLeft', 'Padding Left', 0),
        
        // Margin
        spacingOption('marginTop', 'Margin Top', 0),
        spacingOption('marginRight', 'Margin Right', 0),
        spacingOption('marginBottom', 'Margin Bottom', 0),
        spacingOption('marginLeft', 'Margin Left', 0)
      ]
    } as any
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
    spacingOption('paddingTop', 'Padding Top (px)', 0),
    spacingOption('paddingRight', 'Padding Right (px)', 0),
    spacingOption('paddingBottom', 'Padding Bottom (px)', 0),
    spacingOption('paddingLeft', 'Padding Left (px)', 0),
    spacingOption('marginTop', 'Margin Top (px)', 0),
    spacingOption('marginRight', 'Margin Right (px)', 0),
    spacingOption('marginBottom', 'Margin Bottom (px)', 0),
    spacingOption('marginLeft', 'Margin Left (px)', 0)
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
