import { Scalable } from "@/interfaces/_interfaces";
import {Block} from "@/components/block.component.ts"

export class Grid extends HTMLElement implements Scalable {
  get scaleFactor(): number {
    return 0.9
  }

  protected generateBlocks(sizeX: number, sizeY: number) {
    for (let x = 0; x < sizeX; x++) {
      for (let y = 0; y < sizeY; y++) {
        const block = document.createElement('mm-block') as Block
        block.x = x
        block.y = y
        this.appendChild(block)
      }
    }
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