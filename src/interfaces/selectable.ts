/**
 * The Selectable interface represents a UI element that can be selected.
 * It provides methods to select, deselect and toggle the selection state.
 *
 * @interface Selectable
 */
export interface Selectable {
  /**
   * Indicates whether the UI element is selected
   */
  selected: boolean;

  /**
   * Handles the selection of the UI element
   */
  select(): void;

  /**
   * Handles the deselection of the UI element
   */
  deselect(): void;

  /**
   * Toggles the selection state of the UI element
   */
  toggle(): void;
}