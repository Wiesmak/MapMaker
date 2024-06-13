import { Scalable } from "@/interfaces/_interfaces";
import {Block} from "@/components/block.component.ts"

/**
 * Grid class represents a grid of blocks in the application.
 * It implements the Scalable interface.
 *
 * @example
 * const grid = new Grid();
 * grid.render();
 */
export class Grid extends HTMLElement implements Scalable {
  /**
   * Get the scale factor of the grid
   * @returns {number} The scale factor
   */
  get scaleFactor(): number {
    return 0.9
  }

  /**
   * Generate blocks for the grid
   * @param {number} sizeX The number of blocks along the x-axis
   * @param {number} sizeY The number of blocks along the y-axis
   */
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

  /**
   * Constructor for the Grid class
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.generateBlocks(parseInt(this.getAttribute('sx') || '0'), parseInt(this.getAttribute('sy') || '0'))
  }

  /**
   * Lifecycle method called when the grid is connected to the DOM
   */
  connectedCallback() {
    this.render()
  }

  /**
   * Renders the grid
   */
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
  }
}