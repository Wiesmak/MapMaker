import {Grid, SelectBlock} from "@/components/_components.ts"

/**
 * SelectGrid class represents a selectable grid of blocks in the application.
 * It extends the Grid class and overrides some of its methods.
 *
 * @example
 * const selectGrid = new SelectGrid();
 * selectGrid.render();
 */
export class SelectGrid extends Grid {
  /**
   * Get the scale factor of the grid
   * @returns {number} The scale factor
   */
  get scaleFactor(): number {
    return 0.65
  }

  /**
   * Generate blocks for the grid
   * @param {number} sizeX The number of blocks along the x-axis
   * @param {number} sizeY The number of blocks along the y-axis
   * @param {number} sheetHeight The height of the sheet
   */
  protected generateBlocks(sizeX: number, sizeY: number, sheetHeight: number = 20) {
    Array.from({ length: sizeX * sizeY }).forEach(() =>
      this.appendChild(document.createElement('mm-select-block'))
    );

    Array.from({ length: sizeX }).forEach((_, y) =>
      Array.from({ length: sizeY }).forEach((_, x) => {
        const child = this.children[y * sizeY + x] as SelectBlock
        child.x = x
        child.y = y

        if (y >= sheetHeight) {
          child.x = x + sizeY
          child.y = y - sheetHeight
        }
      })
    );
  }

  /**
   * Constructor for the SelectGrid class
   */
  constructor() {
    super()
  }

  /**
   * Lifecycle method called when the grid is connected to the DOM
   */
  connectedCallback() {
    super.connectedCallback()
  }

  /**
   * Renders the grid
   */
  render() {
    super.render()
  }
}