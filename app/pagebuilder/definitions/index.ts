import { componentRegistry } from '../core/registry'
import { textBlockDefinition, paragraphBlockDefinition } from './textComponents'
import { imageBlockDefinition } from './mediaComponents'
import { columnsBlockDefinition, gridBlockDefinition, containerBlockDefinition } from './layoutComponents'

// Register all components
export function registerComponents() {
  componentRegistry.register(textBlockDefinition)
  componentRegistry.register(paragraphBlockDefinition)
  componentRegistry.register(imageBlockDefinition)
  componentRegistry.register(columnsBlockDefinition)
  componentRegistry.register(gridBlockDefinition)
  componentRegistry.register(containerBlockDefinition)
}

// Auto-register components when this module is imported
registerComponents()

// Export component definitions for direct use
export {
  textBlockDefinition,
  paragraphBlockDefinition,
  imageBlockDefinition,
  columnsBlockDefinition,
  gridBlockDefinition,
  containerBlockDefinition
}
