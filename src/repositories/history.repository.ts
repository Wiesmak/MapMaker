/**
 * @file history.repository.ts
 * @description This module implements the HistoryRepositoryInterface from history.interface.ts.
 * It manages a history of actions that can be undone and redone. It also listens for 'z' and 'y' key events to undo and redo actions, respectively.
 * @module history.repository
 */

import { HistoryRepositoryInterface,  KeyboardRepository,  KeyboardRepositoryInterface } from "@/repositories/_repositories.ts"

/**
 * @type HistoryItem
 * @description A history item contains an undo action and a redo action.
 * The undo action is called when the action is undone, and the redo action is called when the action is redone.
 * @property {() => void} undoAction - The action to undo.
 * @property {() => void} redoAction - The action to redo.
 * @example
 * const historyItem: HistoryItem = {
 *  undoAction: () => console.log('Undo action'),
 *  redoAction: () => console.log('Redo action')
 *  }
 */
type HistoryItem = {
  undoAction: () => void;
  redoAction: () => void;
};

export class HistoryRepository implements HistoryRepositoryInterface {
  private history: HistoryItem[] = [];
  private currentStep = -1;
  protected keyboardRepository: KeyboardRepositoryInterface;

  constructor() {
    this.keyboardRepository = new KeyboardRepository()
    this.keyboardRepository.listen('z' , () => {
      if (this.keyboardRepository.isKeyDown('Control')) {
        this.undo()
      }
    })
    this.keyboardRepository.listen('y' , () => {
      if (this.keyboardRepository.isKeyDown('Control')) {
        this.redo()
      }
    })
  }

  addToHistory(undoAction: () => void, redoAction: () => void): void {
    this.history = this.history.slice(0, this.currentStep + 1);
    this.history.push({ undoAction, redoAction });
    this.currentStep++;
  }

  undo(): void {
    if (this.currentStep < 0) return;
    this.history[this.currentStep].undoAction();
    this.currentStep--;
  }

  redo(): void {
    if (this.currentStep >= this.history.length - 1) return;
    this.currentStep++;
    this.history[this.currentStep].redoAction();
  }
}