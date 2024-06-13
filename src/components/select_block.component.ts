import Sprites from "@/resources/sprites.png"
import {Block, Grid} from "@/components/_components"
import {AutoRepositoryProvider} from "@/components/providers/_providers"

export class SelectBlock extends Block {
  get scaleFactor(): number {
    return 0.65
  }

  set x(value: number) {
    this.setAttribute('px', value.toString())
    void this.render()
  }

  set y(value: number) {
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

  public click(): void {
    const grid = document.querySelector('mm-grid') as Grid
    let lastX = 0
    let lastY = 0
    const blocks: {x: number, y: number, oldImg: string}[] = []
    Array.from(grid.querySelectorAll('mm-block'))
      .filter((block: Element) => (block as Block).selected)
      .forEach(block => {
        blocks.push({x: (block as Block).x, y: (block as Block).y, oldImg: (block as Block).backgroundImage})
        ;(block as Block).backgroundImage = this._backgroundImage
        ;(block as Block).selected = false
        lastX = (block as Block).x
        lastY = (block as Block).y
      })

    const undoAction = () => blocks.forEach(block => {
      const blocks = grid.querySelectorAll('mm-block')
      blocks.forEach(blockElement => {
        if ((blockElement as Block).x === block.x && (blockElement as Block).y === block.y) {
          blockElement.backgroundImage = block.oldImg
        }
      })
    })

    const redoAction = () => blocks.forEach(block => {
      const blocks = grid.querySelectorAll('mm-block')
      blocks.forEach(blockElement => {
        if ((blockElement as Block).x === block.x && (blockElement as Block).y === block.y) {
          blockElement.backgroundImage = this._backgroundImage
        }
      })
    })

    this.historyRepository.addToHistory(undoAction, redoAction)
    const autoRepository = document.querySelector('mm-auto-repository-provider') as AutoRepositoryProvider
    autoRepository.getRepository().nextAutoEvent(
      grid,
      {x: lastX, y: lastY},
      (block: Block) => (block as SelectBlock).select()
    )
  }

  async connectedCallback() {
    this.addEventListener('click', this.click)
    this.addEventListener('mouseenter', () => this.hover())
    this.addEventListener('mouseleave', () => this.unhover())
    await this.render()
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.click)
    this.removeEventListener('mouseenter', () => this.hovered = true)
    this.removeEventListener('mouseleave', () => this.hovered = false)
  }

  async render() {
    const spriteX = parseInt(this.getAttribute('px') || '0');
    const spriteY = parseInt(this.getAttribute('py') || '0');
    const spritePosition = this.calculateBackgroundPosition(spriteX, spriteY)
    const spriteImage = await this.loadSpriteImage(Sprites)
    this._backgroundImage = this.scaleSprite(spriteImage, spritePosition, this.clientWidth, this.clientHeight)

    super.render()
    this.className = `${this.className} ${this._selected || this.hovered ? 'brightness-100' : 'brightness-50'}`
  }
}