import { Provider } from './provider.component'
import { registerComponent } from '#lib/register/_register'

export const register = () => {
  registerComponent('mm-provider', Provider)
}
