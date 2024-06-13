/**
 * @file auto.interface.ts
 * @description This module defines an interface for an auto repository.
 * The interface includes methods for getting and setting the auto mode, toggling the auto mode, and handling the next auto event.
 * @module auto.interface
 */

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