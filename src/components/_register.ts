import * as Components from '@/components/_components.ts'
import { registerComponent } from '@/components/_components.ts'

const registerComponents = () => {
  registerComponent('mm-grid', Components.Grid)
  registerComponent('mm-block', Components.Block)
  registerComponent('mm-select-block', Components.SelectBlock)
}

export default registerComponents