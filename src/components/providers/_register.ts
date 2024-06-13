import * as Provider from '#lib/provider/_provider'
import { registerComponent } from '#lib/register/_register'
import * as Providers from './_providers'

export const register = () => {
  Provider.register()
  registerComponent('mm-auto-repository-provider', Providers.AutoRepositoryProvider)
  registerComponent('mm-keyboard-repository-provider', Providers.KeyboardRepositoryProvider)
  registerComponent('mm-mouse-repository-provider', Providers.MouseRepositoryProvider)
  registerComponent('mm-history-repository-provider', Providers.HistoryRepositoryProvider)
  registerComponent('mm-file-repository-provider', Providers.FileRepositoryProvider)
}