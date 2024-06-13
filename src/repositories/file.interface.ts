/**
 * @file file.interface.ts
 * @description This module defines an interface for a file repository.
 * The interface includes methods for saving to a file, loading from a file, and binding a load event.
 * @module file.interface
 */

export interface FileRepositoryInterface {
  saveToFile(data: object): void
  loadFromFile(file: File): object
  bindLoad(callback: (data: object) => void): void
}