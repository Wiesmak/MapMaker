/**
 * Registers a custom HTML element with a given name and class if it hasn't been registered yet.
 *
 * @param componentName - The name of the custom HTML element
 * @param componentClass - The class of the custom HTML element
 */
export function registerComponent(componentName: string, componentClass: typeof HTMLElement) {
  if (!customElements.get(componentName)) {
    customElements.define(componentName, componentClass);
  }
}