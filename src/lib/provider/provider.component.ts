import { ProviderElement } from "#lib/provider/provider.ts"

export abstract class Provider<T> extends HTMLElement implements ProviderElement<T>{
  protected readonly repository: T

  protected constructor(repository: T) {
    super()
    this.repository = repository
  }

  connectedCallback(): void {
    this.style.display = 'none'
  }

  getRepository(): T {
    return this.repository
  }
}