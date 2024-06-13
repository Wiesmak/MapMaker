/**
 * @file history.interface.ts
 * @description This module defines an interface for a history repository.
 * The interface includes methods for adding actions to the history, undoing the last action, and redoing the last undone action.
 * @module history.interface
 */

export interface HistoryRepositoryInterface {
  addToHistory(undoAction: () => void, redoAction: () => void): void;
  undo(): void;
  redo(): void;
}