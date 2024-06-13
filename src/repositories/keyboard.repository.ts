import {KeyboardRepositoryInterface} from "./keyboard.interface.ts"

export class KeyboardRepository implements KeyboardRepositoryInterface {
  private keys: Map<string, boolean> = new Map()

  constructor() {
    window.addEventListener('keydown', (event) => this.onKeyDown(event))
    window.addEventListener('keyup', (event) => this.onKeyUp(event))
  }

  public isKeyDown(key: string): boolean {
    return this.keys.get(key) || false
  }

  protected onKeyDown(event: KeyboardEvent) {
    this.keys.set(event.key, true)
  }

  protected onKeyUp(event: KeyboardEvent) {
    this.keys.set(event.key, false)
  }
}