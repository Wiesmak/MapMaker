/**
 * @file auto.repository.ts
 * @description This module implements the AutoRepositoryInterface from auto.interface.ts.
 * It provides methods for getting and setting the auto mode, toggling the auto mode, and handling the next auto event.
 * @module auto.repository
 */

import {AutoRepositoryInterface, Position} from "./auto.interface.ts"
import {Block, Grid} from "@/components/_components.ts"

/**
 * @class AutoRepository
 * @description The AutoRepository class implements the AutoRepositoryInterface.
 * It provides methods for getting and setting the auto mode, toggling the auto mode, and handling the next auto event.
 */
export class AutoRepository implements AutoRepositoryInterface {
  private autoMode: boolean = false

  /**
   * @method getAutoMode
   * @description Returns the current auto mode.
   * @returns {boolean} The current auto mode.
   */
  getAutoMode(): boolean {
    return this.autoMode
  }

  /**
   * @method setAutoMode
   * @description Sets the auto mode to a specific value.
   * @param {boolean} value - The value to set the auto mode to.
   */
  setAutoMode(value: boolean): void {
    this.autoMode = value
  }

  /**
   * @method toggleAutoMode
   * @description Toggles the auto mode.
   */
  toggleAutoMode(): void {
    this.autoMode = !this.autoMode
  }

  /**
   * @method nextAutoEvent
   * @description Handles the next auto event.
   * @param {Grid} grid - The grid to use for the auto event.
   * @param {Position} position - The position to use for the auto event.
   * @param {(block: Block) => void} event - The event to handle.
   */
  nextAutoEvent(grid: Grid, position: Position, event: (block: Block) => void): void {
    if (!this.autoMode) return
    // @ts-ignore
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