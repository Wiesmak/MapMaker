export interface KeyboardListener {
  onKeyUp(event: KeyboardEvent): void
  onKeyDown(event: KeyboardEvent): void
}