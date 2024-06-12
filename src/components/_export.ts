import * as Components from '@/components/_components.ts'
import { registerComponent } from '@/components/_components.ts'

const registerComponents = () => {
  registerComponent('mm-block', Components.Block)
}

export default registerComponents