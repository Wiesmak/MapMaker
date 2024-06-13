export type Position = {
  x: number
  y: number
}

export interface AutoRepositoryInterface {
  getAutoMode(): boolean
  setAutoMode(value: boolean): void
  toggleAutoMode(): void
  nextAutoEvent(grid: HTMLElement, position: Position, event: (block: HTMLElement) => void): void
}