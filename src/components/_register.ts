import { registerComponent } from '#lib/register/_register'
import * as Components from '@/components/_components'
import * as Providers from '@/components/providers/_providers'

/**
 * This function registers all the components used in the application.
 *
 * @function registerComponents
 */
const registerComponents = () => {
  registerComponent('mm-grid', Components.Grid)
  registerComponent('mm-block', Components.Block)
  registerComponent('mm-select-grid', Components.SelectGrid)
  registerComponent('mm-select-block', Components.SelectBlock)
  registerComponent('mm-auto-switch', Components.AutoSwitch)
  // @ts-ignore
  registerComponent('mm-export-button', Components.ExportButton)
  // @ts-ignore
  registerComponent('mm-import-button', Components.ImportButton)
  Providers.register()
}

export default registerComponents