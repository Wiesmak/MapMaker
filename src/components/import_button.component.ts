import {Block, Button, Grid} from "@/components/_components.ts"

type data = {
  x: number,
  y: number,
  backgroundImage: string
}

export class ImportButton extends Button {
  public async click() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files![0];
      const blocks = await this.fileRepository.loadFromFile(file);
      const grid = document.querySelector('mm-grid') as Grid;
      grid.querySelectorAll('mm-block').forEach(block => {
        const blockElement = block as Block;
        blockElement.backgroundImage = blocks.find((b: data) => b.x === blockElement.x && b.y === blockElement.y)?.backgroundImage ?? '';
      });
    };
    input.click();
  }
}