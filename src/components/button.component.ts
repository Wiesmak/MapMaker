import {FileRepository, FileRepositoryInterface} from "@/repositories/_repositories"
import {Clickable} from "@/interfaces/_interfaces"

/**
 * Button class represents a clickable button in the application.
 * It implements the Clickable interface.
 *
 * @example
 * const button = new Button();
 * button.click();
 */
export abstract class Button extends HTMLElement implements Clickable {
  protected fileRepository: FileRepositoryInterface

  /**
   * Abstract method to handle the click event on the button
   */
  public abstract click(): void;

  /**
   * Constructor for the Button class
   */
  protected constructor() {
    super()
    this.fileRepository = new FileRepository()
  }

  /**
   * Lifecycle method called when the button is connected to the DOM
   */
  connectedCallback() {
    this.attachShadow({mode: 'open'})
    this.render()
    this.shadowRoot!.querySelector('button')!.addEventListener('click', () => this.click())
  }

  /**
   * Lifecycle method called when the button is disconnected from the DOM
   */
  disconnectedCallback() {
    this.shadowRoot!.querySelector('button')!.removeEventListener('click', () => this.click())
  }

  /**
   * Renders the button
   */
  render() {
    // language=HTML
    this.shadowRoot!.innerHTML = `
        <button class="btn btn-primary">
            <slot></slot>
        </button>
    `
  }
}