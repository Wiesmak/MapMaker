import {FileRepository, FileRepositoryInterface} from "@/repositories/_repositories"
import {Clickable} from "@/interfaces/_interfaces"

export abstract class Button extends HTMLElement implements Clickable {
  protected fileRepository: FileRepositoryInterface

  public click(): void;

  protected constructor() {
    super()
    this.fileRepository = new FileRepository()
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'})
    this.render()
    this.shadowRoot!.querySelector('button')!.addEventListener('click', () => this.click())
  }

  disconnectedCallback() {
    this.shadowRoot!.querySelector('button')!.removeEventListener('click', () => this.click())
  }

  render() {
    // language=HTML
    this.shadowRoot!.innerHTML = `
      <button class="btn btn-primary">
        <slot></slot>
      </button>
    `
  }
}