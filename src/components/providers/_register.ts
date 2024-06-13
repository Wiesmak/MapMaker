import * as Provider from '#lib/provider/_provider'
import { registerComponent } from '#lib/register/_register'
import * as Providers from './_providers'

/**
 * This function registers all the providers used in the application.
 *
 * @function register
 */
export const register = () => {
  Provider.register()
  // @ts-ignore
  registerComponent('mm-auto-repository-provider', Providers.AutoRepositoryProvider)
  // @ts-ignore
  registerComponent('mm-keyboard-repository-provider', Providers.KeyboardRepositoryProvider)
  // @ts-ignore
  registerComponent('mm-mouse-repository-provider', Providers.MouseRepositoryProvider)
  // @ts-ignore
  registerComponent('mm-history-repository-provider', Providers.HistoryRepositoryProvider)
  // @ts-ignore
  registerComponent('mm-file-repository-provider', Providers.FileRepositoryProvider)
}