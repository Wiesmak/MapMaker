import Selectable from '@/interfaces/selectable'
import Clickable from "@/interfaces/clickable"

enum BorderColor {
  White = 'border-white',
  Red = 'border-red-500',
}

export class Block extends HTMLElement implements Clickable, Selectable {
  protected _borderColor: BorderColor = BorderColor.White
  protected _selected: boolean = false

  get selected(): boolean {
    return this._selected
  }

  set selected(value: boolean) {
    this._selected = value
    this._borderColor = value ? BorderColor.Red : BorderColor.White
    this.render()
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
    this.toggle()
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.addEventListener('click', this.click)
    this.render()
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.click)
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>
    `
    this.className = `border border-dotted ${this._borderColor} w-8 h-8`
  }
}