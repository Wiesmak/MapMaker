/**
 * @file mouse.interface.ts
 * @description This module defines an interface for a mouse repository.
 * The interface includes methods for listening to select and deselect events,
 * and for removing those listeners.
 * @module mouse.interface
 */

export interface MouseRepositoryInterface {
  listenSelect(rect: DOMRect, listener: () => void): string
  unlistenSelect(id: string): void
  listenDeselect(rect: DOMRect, listener: () => void): string
  unlistenDeselect(id: string): void
}