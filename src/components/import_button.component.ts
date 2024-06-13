import {Block, Button, Grid} from "@/components/_components"

type data = {
  x: number,
  y: number,
  backgroundImage: string
}

/**
 * ImportButton class represents a button that imports the grid data.
 * It extends the Button class and overrides the click method.
 *
 * @example
 * const importButton = new ImportButton();
 * importButton.click();
 */
export class ImportButton extends Button {
  /**
   * Handles the click event on the button
   */
  public async click() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files![0];
      const blocks = await this.fileRepository.loadFromFile(file);
      console.log(blocks)
      const grid = document.querySelector('mm-grid') as Grid;
      grid.querySelectorAll('mm-block').forEach(block => {
        const blockElement = block as Block;
        // @ts-ignore
        blockElement.backgroundImage = blocks.find((b: data) => b.x === blockElement.x && b.y === blockElement.y)?.backgroundImage ?? '';
      });
    };
    input.click();
  }
}