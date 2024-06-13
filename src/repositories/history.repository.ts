import { HistoryRepositoryInterface,  KeyboardRepository,  KeyboardRepositoryInterface } from "@/repositories/_repositories.ts"

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