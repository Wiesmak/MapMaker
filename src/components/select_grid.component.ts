import {Grid, SelectBlock} from "@/components/_components.ts"

export class SelectGrid extends Grid {
  constructor() {
    super()
  }

  get scaleFactor(): number {
    return 0.65
  }

  protected generateBlocks(sizeX: number, sizeY: number, sheetHeight = 20) {
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

  connectedCallback() {
    super.connectedCallback()
  }

  render() {
    super.render()
  }
}