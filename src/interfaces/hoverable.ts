/**
 * The Hoverable interface represents a UI element that can be hovered over.
 *
 * @interface Hoverable
 */
export interface Hoverable {
  /**
   * Handles the hover event on the UI element
   */
  hover(): void;

  /**
   * Handles the unhover event on the UI element
   */
  unhover(): void;
}