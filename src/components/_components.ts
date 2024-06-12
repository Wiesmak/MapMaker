export * from './grid.component'
export * from './block.component'
export * from './select_grid.component'
export * from './select_block.component'

export function registerComponent(componentName: string, componentClass: typeof HTMLElement) {
  if (!customElements.get(componentName)) {
    customElements.define(componentName, componentClass)
  }
}