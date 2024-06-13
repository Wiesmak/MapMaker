import {Block, Button, Grid} from "@/components/_components.ts"

export class ExportButton extends Button {
  protected async click() {
    const grid = document.querySelector('mm-grid') as Grid
    const blocks = Array.from(grid.querySelectorAll('mm-block'))
      .map(block => ({
        x: (block as Block).x,
        y: (block as Block).y,
        backgroundImage: (block as Block).backgroundImage
      }))
    await this.fileRepository.saveToFile(blocks)
  }
}