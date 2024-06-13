import { Clickable, Hoverable,  Selectable, Scalable } from '@/interfaces/_interfaces'
import {KeyboardRepositoryInterface, MouseRepositoryInterface} from "@/repositories/_repositories.ts"
import {KeyboardRepositoryProvider} from "@/components/providers/keyboard_repository.provider.ts"
import {MouseRepositoryProvider} from "@/components/providers/mouse_repository.provider.ts"
import {Grid} from "@/components/grid.component.ts"

enum BorderColor {
  White = 'border-on-surface',
  Red = 'border-red-700',
}

export class Block extends HTMLElement implements Clickable, Hoverable, Selectable, Scalable {
  protected _x: number = 0
  protected _y: number = 0
  protected _borderColor: BorderColor = BorderColor.White
  protected _selected: boolean = false
  protected _hovered: boolean = false
  protected _backgroundImage: string = ''
  protected keyboardRepository: KeyboardRepositoryInterface
  protected mouseRepository: MouseRepositoryInterface
  protected keyboardListeners: Map<string, string> = new Map()
  protected mouseListeners: Map<string, string> = new Map()


  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  set x(value: number) {
    this._x = value
    void this.render()
  }

  set y(value: number) {
    this._y = value
    void this.render()
  }

  get selected(): boolean {
    return this._selected
  }

  set selected(value: boolean) {
    this._selected = value
    this._borderColor = value ? BorderColor.Red : BorderColor.White
    this.render()
  }

  get hovered(): boolean {
    return this._hovered
  }

  set hovered(value: boolean) {
    this._hovered = value
    this._borderColor = value ? BorderColor.Red : this.selected ? BorderColor.Red : BorderColor.White
    this.render()
  }

  get backgroundImage(): string {
    return this._backgroundImage
  }

  set backgroundImage(value: string) {
    this._backgroundImage = value
    this.render()
  }

  get scaleFactor(): number {
    return 0.9
  }

  public select(): void {
    this.selected = true
  }

  public deselect(): void {
    this.selected = false
  }

  public toggle(): void {
    this.selected = !this.selected
  }

  public click(): void {
    if (this.keyboardRepository.isKeyDown('Control') || this.keyboardRepository.isKeyDown('Meta')) {
      if (this.selected) this.deselect()
      else this.select()
    } else {
      const grid = document.querySelector('mm-grid') as Grid
      const blocks = grid.querySelectorAll('mm-block') as Block[]
      blocks.forEach(block => block.deselect())
      this.select()
    }
  }

  public hover() {
    this.hovered = true
  }

  public unhover() {
    this.hovered = false
  }

  protected delete() {
    if (this.selected) {
      this.deselect()
      this.backgroundImage = ''
    }
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const keyboardProvider = document.querySelector('mm-keyboard-repository-provider') as KeyboardRepositoryProvider
    this.keyboardRepository = keyboardProvider.getRepository()
    const mouseProvider = document.querySelector('mm-mouse-repository-provider') as MouseRepositoryProvider
    this.mouseRepository = mouseProvider.getRepository()
  }

  connectedCallback() {
    this.addEventListener('click', this.click)
    this.addEventListener('mouseenter', () => this.hover())
    this.addEventListener('mouseleave', () => this.unhover())
    this.keyboardListeners.set('Delete', this.keyboardRepository.listen('Delete', (_) => this.delete()))
    this.mouseListeners.set(
      this.mouseRepository.listenSelect(this.getClientRects(), () => this.select()),
      this.mouseRepository.listenDeselect(this.getClientRects(), () => this.deselect())
    )
    this.render()
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.click)
    this.removeEventListener('mouseenter', () => this.hovered = true)
    this.removeEventListener('mouseleave', () => this.hovered = false)
    this.keyboardListeners.forEach((id, key) => this.keyboardRepository.unlisten(key, id))
    this.mouseListeners.forEach((select, deselect) =>  {
      this.mouseRepository.unlistenSelect(select)
      this.mouseRepository.unlistenDeselect(deselect)
    })
  }

  render() {
    this.shadowRoot!.innerHTML = `
    <style>
      :host {
        display: block;
        background-image: url(${this._backgroundImage});
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: ${3 * this.scaleFactor}vh;
        height: ${3 * this.scaleFactor}vh;
       
        ${ this._hovered ? 'box-shadow: 0 0 2px 0 orange;' : ''}
        ${ this._selected ? 'box-shadow: 0 0 2px 0 red;' : '' }
      }
    </style>
  `
    this.className = `border border-dotted ${this._borderColor}`
  }
}