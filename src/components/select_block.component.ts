import {Block} from "@/components/_components.ts"
import Sprites from "@/resources/sprites.png"

export class SelectBlock extends Block {
  get scaleFactor(): number {
    return 0.65
  }

  set px(value: number) {
    this.setAttribute('px', value.toString())
    void this.render()
  }

  set py(value: number) {
    this.setAttribute('py', value.toString())
    void this.render()
  }

  private calculateBackgroundPosition(spriteX: number, spriteY: number): string {
    const spriteSize = 47
    const padding = 1
    const x = (spriteSize + padding) * spriteX + padding
    const y = (spriteSize + padding) * spriteY + padding
    return `-${x}px -${y}px`
  }
  
  private loadSpriteImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  private scaleSprite(img: HTMLImageElement, position: string, width: number, height: number): string {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    const [x, y] = position.split(' ').map(val => Math.abs(parseInt(val)))

    canvas.width = width
    canvas.height = height

    ctx.drawImage(img, x, y, 47, 47, 0, 0, width, height)

    return canvas.toDataURL()
  }

  constructor() {
    super()
  }

  async connectedCallback() {
    super.connectedCallback()
    await this.render()
  }

  async render() {
    const spriteX = parseInt(this.getAttribute('px') || '0');
    const spriteY = parseInt(this.getAttribute('py') || '0');
    const spritePosition = this.calculateBackgroundPosition(spriteX, spriteY)
    const spriteImage = await this.loadSpriteImage(Sprites)
    this._backgroundImage = this.scaleSprite(spriteImage, spritePosition, this.clientWidth, this.clientHeight)
    this.className = this._selected || this.hovered ? 'brightness-100' : 'brightness-50'

    super.render()
  }
}