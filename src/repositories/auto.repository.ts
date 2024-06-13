import {AutoRepositoryInterface, Position} from "./auto.interface.ts"
import {Block, Grid} from "@/components/_components.ts"

export class AutoRepository implements AutoRepositoryInterface {
  private autoMode: boolean = false

  getAutoMode(): boolean {
    return this.autoMode
  }

  setAutoMode(value: boolean): void {
    this.autoMode = value
  }

  toggleAutoMode(): void {
    this.autoMode = !this.autoMode
  }

  nextAutoEvent(grid: Grid, position: Position, event: (block: Block) => void): void {
    if (!this.autoMode) return
    const arr: Block[] = Array.prototype.map.call(grid.querySelectorAll('mm-block') as Block, (block: Element) => block as Block)
    const block = arr.filter((block) => block.y === position.y + 1 && block.x === position.x)[0] ||
      arr.filter((block) => block.y === 0 && block.x === position.x + 1)[0]
    if (block) {
      event(block as Block)
    } else {
      console.log('[AutoRepository] no block found at position', 0, position.y + 1)
    }
  }
}