import {Grid, SelectBlock} from "@/components/_components.ts"

export class SelectGrid extends Grid {
  constructor() {
    super()
  }


  protected generateBlocks(sizeX: number, sizeY: number) {
    Array.from({ length: sizeX * sizeY }).forEach(() =>
      this.appendChild(document.createElement('mm-select-block'))
    );

    Array.from({ length: sizeX }).forEach((_, x) =>
      Array.from({ length: sizeY }).forEach((_, y) => {
        const child = this.children[x * sizeY + y] as SelectBlock
        child.px = y
        child.py = x
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