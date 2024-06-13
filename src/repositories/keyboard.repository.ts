import {KeyboardRepositoryInterface} from "./keyboard.interface.ts"

export class KeyboardRepository implements KeyboardRepositoryInterface {
  private keys: Map<string, boolean> = new Map()
  protected listeners: Map<string, Map<string, ((event: KeyboardEvent) => void)[]>> = new Map()

  constructor() {
    window.addEventListener('keydown', (event) => this.onKeyDown(event))
    window.addEventListener('keyup', (event) => this.onKeyUp(event))
  }

  listen(key: string, listener: (event: KeyboardEvent) => void): string {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Map())
    }

    const id = Math.random().toString(36).substring(2, 15) // Generate a random id
    this.listeners.get(key)!.set(id, listener)

    return id
  }

  unlisten(key: string, id: string): void {
    if (this.listeners.has(key)) {
      this.listeners.get(key)!.delete(id)
    }
  }

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
      listener(event)
    }

  }
}