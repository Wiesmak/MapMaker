export interface KeyboardListener {
  onKeyUp(event: KeyboardEvent): void
  onKeyDown(key: string, event: KeyboardEvent): void
}