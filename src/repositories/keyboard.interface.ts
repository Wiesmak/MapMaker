/**
 * @file keyboard.interface.ts
 * @description This module defines an interface for a keyboard repository.
 * The interface includes methods for checking if a key is down, listening for a key event, and removing a key event listener.
 * @module keyboard.interface
 */

export interface KeyboardRepositoryInterface {
  isKeyDown(key: string): boolean
  listen(key: string, listener: (event: KeyboardEvent) => void): string
  unlisten(key: string, id: string): void
}