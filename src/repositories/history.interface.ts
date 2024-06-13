export interface HistoryRepositoryInterface {
  addToHistory(undoAction: () => void, redoAction: () => void): void;
  undo(): void;
  redo(): void;
}