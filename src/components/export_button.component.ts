import {Block, Button, Grid} from "@/components/_components.ts"

/**
 * ExportButton class represents a button that exports the grid data.
 * It extends the Button class and overrides the click method.
 *
 * @example
 * const exportButton = new ExportButton();
 * exportButton.click();
 */
export class ExportButton extends Button {
  /**
   * Handles the click event on the button
   */
  public async click() {
    const grid = document.querySelector('mm-grid') as Grid
    const blocks = Array.from(grid.querySelectorAll('mm-block'))
      .map(block => ({
        x: (block as Block).x,
        y: (block as Block).y,
        backgroundImage: (block as Block).backgroundImage
      }))
    this.fileRepository.saveToFile(blocks)
  }
}