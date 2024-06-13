import { Scalable } from "@/interfaces/_interfaces";

export class Grid extends HTMLElement implements Scalable {
  get scaleFactor(): number {
    return 0.9
  }

  protected generateBlocks(sizeX: number, sizeY: number) {
    Array.from({ length: sizeX * sizeY }).forEach(() =>
      this.appendChild(document.createElement('mm-block'))
    );
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const sizeX = parseInt(this.getAttribute('sx') || '0')
    const sizeY = parseInt(this.getAttribute('sy') || '0')
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: grid;
          gap: 2px;
          grid-template-columns: repeat(${sizeY}, 1fr);
          grid-template-rows: repeat(${sizeX}, 1fr);
          width: calc(${(sizeY * 96 * this.scaleFactor) / 32}vh + ${sizeY * 2}px);
          height: calc(${(sizeX * 96 * this.scaleFactor) / 32}vh + ${sizeX * 2}px);
        }
      </style>
      <slot></slot>
    `

    this.generateBlocks(sizeX, sizeY)
  }
}