export interface MouseRepositoryInterface {
  listenSelect(rect: DOMRect, listener: () => void): string
  unlistenSelect(id: string): void
  listenDeselect(rect: DOMRect, listener: () => void): string
  unlistenDeselect(id: string): void
}