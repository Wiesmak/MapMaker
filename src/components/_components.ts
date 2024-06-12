//export * from './grid.component'
export * from './block.component'

export function registerComponent(componentName: string, componentClass: typeof HTMLElement) {
  if (!customElements.get(componentName)) {
    customElements.define(componentName, componentClass)
  }
}