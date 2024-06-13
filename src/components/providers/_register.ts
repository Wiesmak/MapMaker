import * as Provider from '#lib/provider/_provider'
import { registerComponent } from '#lib/register/_register'
import { AutoRepositoryProvider } from './auto_repository.provider'

export const register = () => {
  Provider.register()
  registerComponent('mm-auto-repository-provider', AutoRepositoryProvider)
}