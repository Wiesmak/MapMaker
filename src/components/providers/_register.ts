import * as Provider from '#lib/provider/_provider'
import { registerComponent } from '#lib/register/_register'
import { AutoRepositoryProvider, KeyboardRepositoryProvider } from './_providers'

export const register = () => {
  Provider.register()
  registerComponent('mm-auto-repository-provider', AutoRepositoryProvider)
  registerComponent('mm-keyboard-repository-provider', KeyboardRepositoryProvider)
}