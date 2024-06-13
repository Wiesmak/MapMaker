export interface KeyboardRepositoryInterface {
  isKeyDown(key: string): boolean
  listen(key: string, listener: (event: KeyboardEvent) => void): string
  unlisten(key: string, id: string): void
}