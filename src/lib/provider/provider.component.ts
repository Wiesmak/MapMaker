/**
 * @file <filename>.ts
 * @description This module imports the ProviderElement interface and defines an abstract Provider class that extends HTMLElement and implements ProviderElement.
 */

// Import the ProviderElement interface from the provider module
import { ProviderElement } from "#lib/provider/provider"

/**
 * @class Provider
 * @description The Provider class is an abstract class that extends HTMLElement and implements the ProviderElement interface.
 * It provides a base implementation for a provider that can provide a repository of type T.
 * @extends {HTMLElement}
 * @implements {ProviderElement<T>}
 */
export abstract class Provider<T> extends HTMLElement implements ProviderElement<T>{
  // The repository of type T that this provider provides
  protected readonly repository: T

  /**
   * @constructor
   * @description The constructor for the Provider class.
   * It initializes the repository with the provided repository of type T.
   * @param {T} repository - The repository of type T to be provided by this provider.
   */
  protected constructor(repository: T) {
    super();
    this.repository = repository
  }

  /**
   * @method connectedCallback
   * @description This method is called when the provider is connected to the DOM.
   * It sets the display style of the provider to 'none'.
   */
  connectedCallback(): void {
    this.style.display = 'none'
  }

  /**
   * @method getRepository
   * @description This method retrieves the repository provided by this provider.
   * @returns {T} The repository of type T provided by this provider.
   */
  getRepository(): T {
    return this.repository
  }
}