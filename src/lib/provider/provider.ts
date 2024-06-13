/**
 * The ProviderElement interface represents an element that can provide a repository of type T.
 *
 * @interface ProviderElement
 */
export interface ProviderElement<T> {
  /**
   * Retrieves the repository of type T
   */
  getRepository(): T;
}