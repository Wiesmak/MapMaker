/**
 * @file keyboard.repository.ts
 * @description This module contains the KeyboardRepository class which is responsible for
 * handling keyboard events. It has methods for handling key down, key up, and key press events.
 * @module keyboard.repository
 */

import {KeyboardRepositoryInterface} from "./keyboard.interface.ts"

/**
 * @class KeyboardRepository
 * @description The KeyboardRepository class is responsible for handling keyboard events.
 * It has methods for handling key down, key up, and key press events.
 */
export class KeyboardRepository implements KeyboardRepositoryInterface {
  private keys: Map<string, boolean> = new Map()
  protected listeners: Map<string, Map<string, ((event: KeyboardEvent) => void)[]>> = new Map()

  constructor() {
    window.addEventListener('keydown', (event) => this.onKeyDown(event))
    window.addEventListener('keyup', (event) => this.onKeyUp(event))
  }

  /**
   * @method listen
   * @description Listens for a specific key event.
   * @param {string} key - The key to listen for.
   * @param {(event: KeyboardEvent) => void} listener - The listener to call when the event occurs.
   * @returns {string} The ID of the listener.
   */
  listen(key: string, listener: (event: KeyboardEvent) => void): string {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Map())
    }

    const id = Math.random().toString(36).substring(2, 15) // Generate a random id
    // @ts-ignore
    this.listeners.get(key)!.set(id, listener)

    return id
  }

  /**
   * @method unlisten
   * @description Stops listening for a specific key event.
   * @param {string} key - The key to stop listening for.
   * @param {string} id - The ID of the listener to remove.
   */
  unlisten(key: string, id: string): void {
    if (this.listeners.has(key)) {
      this.listeners.get(key)!.delete(id)
    }
  }

  /**
   * @method isKeyDown
   * @description Checks if a specific key is currently pressed down.
   * @param {string} key - The key to check.
   * @returns {boolean} Whether the key is currently pressed down.
   */
  public isKeyDown(key: string): boolean {
    return this.keys.get(key) || false
  }

  protected onKeyDown(event: KeyboardEvent) {
    this.keys.set(event.key, true)
  }

  protected onKeyUp(event: KeyboardEvent) {
    this.keys.set(event.key, false)
    this.onKeyPress(event)
  }

  protected onKeyPress(event: KeyboardEvent) {
    if (!this.listeners.has(event.key)) {
      console.log('no listeners for', event.key)
      return
    } else console.log ((`${this.listeners.get(event.key)!.size} listeners for ${event.key} found`))

    for (const listener of this.listeners.get(event.key)!.values()) {
      // @ts-ignore
      listener(event)
    }
  }
}