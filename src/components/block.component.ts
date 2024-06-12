import Selectable from '@/interfaces/selectable'
import Clickable from "@/interfaces/clickable"

enum BorderColor {
  White = 'border-white',
  Red = 'border-red-700',
}

export class Block extends HTMLElement implements Clickable, Selectable {
  protected _borderColor: BorderColor = BorderColor.White
  protected _selected: boolean = false
  protected _backgroundImage: string = ''

  get selected(): boolean {
    return this._selected
  }

  set selected(value: boolean) {
    this._selected = value
    this._borderColor = value ? BorderColor.Red : BorderColor.White
    this.render()
  }

  get backgroundImage(): string {
    return this._backgroundImage
  }

  set backgroundImage(value: string) {
    this._backgroundImage = value
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
        background-image: url(${this._backgroundImage});
        background-position: center;
        background-size: cover;
      }
    </style>
  `
    this.className = `border border-dotted ${this._borderColor} w-[3vh] h-[3vh]`
  }
}