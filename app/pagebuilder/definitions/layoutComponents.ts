import { createComponentDefinition, optionTypes } from '../core/componentBuilder'
import ColumnsBlock from '../components/layout/ColumnsBlock.vue'
import GridBlock from '../components/layout/GridBlock.vue'
import ContainerBlock from '../components/layout/ContainerBlock.vue'

// Register Columns Block Component
export const columnsBlockDefinition = createComponentDefinition({
  name: 'columns-block',
  displayName: 'Columns',
  category: 'layout',
  icon: 'i-lucide-columns',
  description: 'Multi-column layout with customizable columns',
  component: ColumnsBlock,
  schema: [
    optionTypes.columns('columns', 'Column Settings', { description: 'Configure column count and spacing' })
  ],
  defaultData: {
    columns: {
      columnCount: 2,
      gap: 'md'
    },
    columnsData: [
      { id: 'col-1', width: 50, components: [] },
      { id: 'col-2', width: 50, components: [] }
    ]
  },
  // Custom data updater for dynamic column changes
  updateData: (oldData: any, newData: any) => {
    const oldCount = oldData.columns?.columnCount || oldData.columnCount || 2
    const newCount = newData.columns?.columnCount || newData.columnCount || 2
    
    if (oldCount !== newCount) {
      // Generate new columns array based on new count
      const newColumnsData = []
      for (let i = 0; i < newCount; i++) {
        const existingColumn = oldData.columnsData?.[i] || oldData.columns?.[i]
        newColumnsData.push({
          id: existingColumn?.id || `col-${i + 1}`,
          width: existingColumn?.width || Math.floor(100 / newCount),
          components: existingColumn?.components || []
        })
      }
      newData.columnsData = newColumnsData
    }
    
    return newData
  }
})

// Register Grid Block Component
export const gridBlockDefinition = createComponentDefinition({
  name: 'grid-block',
  displayName: 'Grid',
  category: 'layout',
  icon: 'i-lucide-grid-3x3',
  description: 'Flexible grid layout with customizable cells',
  component: GridBlock,
  schema: [
    optionTypes.select('rows', 'Number of Rows', [
      { label: '1 Row', value: 1 },
      { label: '2 Rows', value: 2 },
      { label: '3 Rows', value: 3 },
      { label: '4 Rows', value: 4 }
    ]),
    optionTypes.select('columns', 'Number of Columns', [
      { label: '1 Column', value: 1 },
      { label: '2 Columns', value: 2 },
      { label: '3 Columns', value: 3 },
      { label: '4 Columns', value: 4 }
    ]),
    optionTypes.select('gap', 'Grid Gap', [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' }
    ]),
    optionTypes.select('alignment', 'Alignment', [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' }
    ]),
    optionTypes.boolean('autoFit', 'Auto-fit Columns', { description: 'Automatically fit columns to available space' }),
    optionTypes.boolean('fullWidth', 'Full Width', { description: 'Make grid span full width' })
  ],
  defaultData: {
    cells: [
      { id: 'cell-1', row: 1, col: 1, rowSpan: 1, colSpan: 1, components: [] },
      { id: 'cell-2', row: 1, col: 2, rowSpan: 1, colSpan: 1, components: [] }
    ],
    rows: 1,
    columns: 2,
    gap: 'md',
    alignment: 'center',
    fullWidth: false,
    autoFit: false
  },
  // Custom data updater for dynamic row/column changes
  updateData: (oldData: any, newData: any) => {
    const oldRows = oldData.rows || 1
    const oldColumns = oldData.columns || 2
    const newRows = newData.rows || 1
    const newColumns = newData.columns || 2
    
    if (oldRows !== newRows || oldColumns !== newColumns) {
      // Generate new cells array based on new dimensions
      const newCells = []
      let cellId = 1
      
      for (let row = 1; row <= newRows; row++) {
        for (let col = 1; col <= newColumns; col++) {
          const existingCell = oldData.cells?.find((c: any) => c.row === row && c.col === col)
          newCells.push({
            id: existingCell?.id || `cell-${cellId}`,
            row,
            col,
            rowSpan: existingCell?.rowSpan || 1,
            colSpan: existingCell?.colSpan || 1,
            components: existingCell?.components || []
          })
          cellId++
        }
      }
      newData.cells = newCells
    }
    
    return newData
  }
})

// Register Container Block Component
export const containerBlockDefinition = createComponentDefinition({
  name: 'container-block',
  displayName: 'Container',
  category: 'layout',
  icon: 'i-lucide-box',
  description: 'Container with spacing, background, and border options',
  component: ContainerBlock,
  schema: [
    optionTypes.select('padding', 'Padding', [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' }
    ]),
    optionTypes.select('margin', 'Margin', [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' }
    ]),
    optionTypes.color('backgroundColor', 'Background Color'),
    optionTypes.color('borderColor', 'Border Color'),
    optionTypes.select('borderRadius', 'Border Radius', [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: 'Full', value: 'full' }
    ]),
    optionTypes.select('borderWidth', 'Border Width', [
      { label: 'None', value: 'none' },
      { label: 'Thin', value: 'thin' },
      { label: 'Medium', value: 'medium' },
      { label: 'Thick', value: 'thick' }
    ]),
    optionTypes.select('shadow', 'Shadow', [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: '2XL', value: '2xl' }
    ]),
    optionTypes.boolean('fullWidth', 'Full Width', { description: 'Make container span full width' }),
    optionTypes.select('maxWidth', 'Max Width', [
      { label: 'Extra Small', value: 'xs' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: '2XL', value: '2xl' },
      { label: '3XL', value: '3xl' },
      { label: '4XL', value: '4xl' },
      { label: '5XL', value: '5xl' },
      { label: '6XL', value: '6xl' },
      { label: '7XL', value: '7xl' },
      { label: 'Full', value: 'full' }
    ])
  ],
  defaultData: {
    components: [],
    padding: 'md',
    margin: 'none',
    backgroundColor: 'transparent',
    borderColor: '#d1d5db',
    borderRadius: 'none',
    borderWidth: 'none',
    shadow: 'none',
    fullWidth: false,
    maxWidth: '4xl'
  }
})
