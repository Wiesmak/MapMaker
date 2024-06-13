import {MouseRepositoryInterface} from "./mouse.interface.ts"
import {KeyboardRepositoryInterface, KeyboardRepository} from "@/repositories/_repositories.ts"

export class MouseRepository implements MouseRepositoryInterface {
  protected selectListeners: Map<string, Map<DOMRect, () => void>> = new Map()
  protected deselectListeners: Map<string, Map<DOMRect, () => void>> = new Map()
  protected isSelecting: boolean = false
  protected startSelectPosition: { x: number, y: number } = { x: 0, y: 0 }
  protected endSelectPosition: { x: number, y: number } = { x: 0, y: 0 }
  protected keyboardRepository: KeyboardRepositoryInterface

  constructor() {
    document.addEventListener('mousedown', this.startSelect.bind(this))
    document.addEventListener('mouseup', this.endSelect.bind(this))
    const keyboardRepositoryProvider = document.querySelector('mm-keyboard-repository-provider') as KeyboardRepository
    this.keyboardRepository = keyboardRepositoryProvider.getRepository()
  }

  protected startSelect(event: MouseEvent): void {
    this.isSelecting = true
    this.startSelectPosition = { x: event.clientX, y: event.clientY }
  }

  protected endSelect(event: MouseEvent): void {
    if (!this.isSelecting) return
    this.isSelecting = false
    this.endSelectPosition = { x: event.clientX, y: event.clientY }
    this.dispatchSelect()
  }

  private dispatchSelect(): void {
    const selectRect = new DOMRect(
      Math.min(this.startSelectPosition.x, this.endSelectPosition.x),
      Math.min(this.startSelectPosition.y, this.endSelectPosition.y),
      Math.abs(this.startSelectPosition.x - this.endSelectPosition.x),
      Math.abs(this.startSelectPosition.y - this.endSelectPosition.y)
    )

    if (selectRect.width < 10 || selectRect.height < 10) return

    this.selectListeners.forEach((listeners, _) => {
      for (const [rect, listener] of listeners) {
        if (rect[0].left <= selectRect.right && rect[0].right >= selectRect.left && rect[0].top <= selectRect.bottom && rect[0].bottom >= selectRect.top) {
          listener()
        }
      }
    })

    if (this.keyboardRepository.isKeyDown('Control')) return
    this.deselectListeners.forEach((listeners, _) => {
      for (const [rect, listener] of listeners) {
        if (rect[0].right < selectRect.left || rect[0].left > selectRect.right || rect[0].bottom < selectRect.top || rect[0].top > selectRect.bottom) {
          listener()
        }
      }
    })
  }

  listenSelect(rect: DOMRect, listener: () => void): string {
    const id = Math.random().toString(36).substring(7)
    if (!this.selectListeners.has(id)) {
      this.selectListeners.set(id, new Map())
    }
    this.selectListeners.get(id)!.set(rect, listener)
    return id
  }

  unlistenSelect(id: string): void {
    this.selectListeners.delete(id)
  }

  listenDeselect(rect: DOMRect, listener: () => void): string {
    const id = Math.random().toString(36).substring(7)
    if (!this.deselectListeners.has(id)) {
      this.deselectListeners.set(id, new Map())
    }
    this.deselectListeners.get(id)!.set(rect, listener)
    return id
  }

  unlistenDeselect(id: string): void {
    this.deselectListeners.delete(id)
  }
}